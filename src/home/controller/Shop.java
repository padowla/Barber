package home.controller;

import model.dao.DAOFactory;
import model.dao.ProductDAO;
import model.dao.UserDAO;
import model.mo.Product;
import model.mo.User;
import services.config.Configuration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;

public class Shop {
    private Shop(){}

    public static void showShop(HttpServletRequest request, HttpServletResponse response) {
        /**
         * Check if user is logged then call shop.jsp
         */

        DAOFactory daoFactory = null; //per il db
        DAOFactory sessionDAOFactory = null; //per i cookie
        ProductDAO productDAO = null; /* per fetchare i prodotti */
        User loggedUser = null;
        ArrayList<Product> products = null; /* prodotti fetchati dal db da mostrare nella pagina shop */
        String applicationMessage = null;
        ArrayList<String> categories = null; /*categorie da mostrare nel dropdown del filtro */
        ArrayList<String> brands = null; /*produttori da mostrare nel dropdown del filtro */
        String categoryToFilter = "All"; /* voce predefinita nel filtro delle categorie */
        String brandToFilter = "All"; /* voce predefinita nel filtro dei brands */

        try {
            /* Inizializzo il cookie di sessione */
            HashMap sessionFactoryParameters = new HashMap<String, Object>();
            sessionFactoryParameters.put("request", request);
            sessionFactoryParameters.put("response", response);
            sessionDAOFactory = DAOFactory.getDAOFactory(Configuration.COOKIE_IMPL, sessionFactoryParameters);

            /* Come in una sorta di connessione al DB, la beginTransaction() per i cookie setta
             *  nel costruttore di CookieDAOFactory la request e la response presenti in sessionFactoryParameters*/
            sessionDAOFactory.beginTransaction();


            UserDAO sessionUserDAO = sessionDAOFactory.getUserDAO();/* Ritorna: new UserDAOCookieImpl(request, response);*/

            loggedUser = sessionUserDAO.findLoggedUser();


            /* DAOFactory per manipolare i dati sul DB */
            daoFactory = DAOFactory.getDAOFactory(Configuration.DAO_IMPL, null);


            /* Inizio la transazione sul Database*/
            daoFactory.beginTransaction();

            /* Istanzio un DAO per poter fetchare i prodotti */
            productDAO = daoFactory.getProductDAO();

            /* Prendo tutte le categorie dal database */
            categories = productDAO.findAllCategories();

            /* Prendo tutti i produttori dal database */
            brands = productDAO.findAllProducers();

            System.err.println("categoryToFilter" + categoryToFilter);
            System.err.println("brandToFilter" + brandToFilter);
            /* Fetching dei parametri  */
            String toFilter = request.getParameter("filter");
            System.err.println("toFilter ==>" + toFilter);
            int filter = 0; /* ipotizzo che non venga richiesto il filtraggio dei prodotti */
            if (toFilter != null) {
                /* posso provare a parsarlo per evitare NullPointerException*/
                filter = Integer.parseInt(toFilter);
            }
            System.err.println("filter:" + filter);
            if (filter == 1) {
                brandToFilter = request.getParameter("brand");
                categoryToFilter = request.getParameter("category");

                products = productDAO.findFilteredProducts((categoryToFilter.equals("All")) ? "%" : categoryToFilter, (brandToFilter.equals("All")) ? "%" : brandToFilter);
                System.err.println("categoryToFilter" + categoryToFilter);
                System.err.println("brandToFilter" + brandToFilter);
            } else {
                products = productDAO.findAllProducts();
            }



            /* Commit della transazione sul db */
            daoFactory.commitTransaction();

            /* Commit fittizio */
            sessionDAOFactory.commitTransaction();


            boolean loggedOn = loggedUser != null;
            /* 1) Attributo che indica se è loggato oppure no */
            request.setAttribute("loggedOn", loggedOn);

            System.err.println("loggedOn==>" + loggedOn);
            /* 2) Attributo che indica quale utente è loggato ( da leggere solo se loggedOn = true */
            request.setAttribute("loggedUser", loggedUser);
            System.err.println("loggedUser=> " + loggedUser);
            /* 3) Application messagge da mostrare all'utente */
            request.setAttribute("applicationMessage", applicationMessage);
            /* 4) Setto quale view devo mostrare */
            request.setAttribute("viewUrl", "common/shop");
            /* 5) Setto la lista dei prodotti da mostrare */
            request.setAttribute("products", products);
            /* 6) Setto la lista delle categorie completa */
            request.setAttribute("categories", categories);
            /* 7) Setto la lista dei brand completa */
            request.setAttribute("brands", brands);
            /* 8) Setto il brand che era stato selezionato per poterlo mostrare nella pagina filtrata all'interno del dropdown */
            request.setAttribute("brandFiltered", brandToFilter);
            /* 9) Setto la categoria che era stata selezionata per poterla mostrare nella pagina filtrata all'interno del dropdown */
            request.setAttribute("categoryFiltered", categoryToFilter);
        } catch (Exception e) {
            try {
                if (daoFactory != null) daoFactory.rollbackTransaction(); /* Rollback della transazione sul db */
                if (sessionDAOFactory != null) sessionDAOFactory.rollbackTransaction();/* Rollback fittizio */
            } catch (Throwable t) {
            }
            throw new RuntimeException(e);

        } finally {

            try {
                if (daoFactory != null) daoFactory.closeTransaction(); /* Close della transazione sul db */
                if (sessionDAOFactory != null) sessionDAOFactory.closeTransaction();/* Close fittizia */
            } catch (Throwable t) {
            }
        }
    }
}