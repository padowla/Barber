<%@ page import="java.util.ArrayList" %>
<%@ page import="model.mo.User" %>
<%@ page import="model.mo.Structure" %>

<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%
    /* Prendo il parametro "loggedOn" che mi consente di sapere se l'utente attuale è loggato o meno */
    Boolean loggedOn = false;
    if (request.getAttribute("loggedOn") != null) {
        loggedOn = (Boolean) request.getAttribute("loggedOn");
    }

    /* Prendo il parametro "loggedUser" che mi consente di sapere qual'è l'utente attualmente loggato */
    User loggedUser = null;
    if (request.getAttribute("loggedUser") != null && loggedOn != null) {
        loggedUser = (User) request.getAttribute("loggedUser");
    }

    String applicationMessage = null;
    if (request.getAttribute("applicationMessage") != null) {
        applicationMessage = (String) request.getAttribute("applicationMessage");
    }

    Structure structure = null;
    if (request.getAttribute("structure") != null) {
        /* SE MI È STATO PASSATO L'ATTRIBUTO structure */
        structure = (Structure) request.getAttribute("structure");
    }

    /* Parametro per settare di volta in volta dove ci si trova nel title */
    String menuActiveLink = "Book";

    /* Parametro per aggiungere la classe active2 al bottone della pagina in cui si trova */
    String idBtnAttivo = "showBook";
%>
<!doctype html>
<html lang="en">

<%@include file="/templates/head.jsp"%>

<body>

<%@include file="/templates/header.jsp"%>
<!------------------------------------------------ Book section ----------------------------------------------------->

<div class="container text-center my-4" style="background-color: #f1e7cb; border-radius: 25px;">
    <img src="img/homepage/book.jpg" alt="BookImage">
    <h4>We are open every day from 9:00 to 18:00!</h4>
    <h3>You can book your appointment after selecting the date and time below.</h3>

    <div class="d-flex justify-content-center" >
        <div class="col-4 pt-4 my-5 book-box" >
            <label for="appointment-date">Select a date:</label>
            <input type="date" id="appointment-date" name="appointment date"
                   onchange="findSlot('<%=structure.getId()%>' , this.value)">
            <hr>
            <label for="time">Choose an hour:</label>
            <select id="time" name="time">
                <option disabled selected>Before, choose a date</option>
            </select>
            <hr>
            <button class="btn btnheader active2" onclick="setNavFormHome('Home.showShop')" type="button" id='showShop'>
                Book Now!
            </button>
        </div>
    </div>
</div>
<!---------------------------------------------- End of Book section ------------------------------------------------>

<%@ include file="/templates/footer.html"%>
<script type="text/javascript">
    window.addEventListener("load",() =>{
        setDateBook("appointment-date");
    });
</script>
</body>
</html>