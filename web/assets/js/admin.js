/*function enableSidebar() {
    /!* jQuery for dropdown sidebar menu *!/
    jQuery(function ($) {
        $(".sidebar-dropdown > a").on('click', function () {
            console.log("click");
            $(".sidebar-submenu").slideUp(200);
            if (
                $(this)
                    .parent()
                    .hasClass("active")
            ) {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .parent()
                    .removeClass("active");
            } else {
                $(".sidebar-dropdown").removeClass("active");
                $(this)
                    .next(".sidebar-submenu")
                    .slideDown(200);
                $(this)
                    .parent()
                    .addClass("active");
            }
        });

        $("#close-sidebar").on('click', function () {
            $(".page-wrapper").removeClass("toggled");
        });
        $("#show-sidebar").on('click', function () {
            $(".page-wrapper").addClass("toggled");
        });
    });
}*/

function showResult(result, message) {
    /**
     * show alert with message returned from server
     */
    if (result === 'success')
        alert(message);
    else if (result === 'fail')
        alert(message)

}

function setTmpId(id) {
    /**
     * Set id of object to delete before confirm this action into the modal */
    document.getElementById("tmpIdDel").value = id;
}

function deleteEmployee(id) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Staff.deleteEmployee" and set value of hidden input field (of show-employee.jsp)
     * with name="employeeID" to parameter id
     */
    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formEmployeeID = document.getElementById('action');
    formEmployeeID.elements['controllerAction'].value = 'admin.Staff.deleteEmployee';
    formEmployeeID.elements['employeeID'].value = id;
    formEmployeeID.submit();

}

function deleteById(id, subject, controller) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Customers.deleteCustomer" and set value of hidden input field (of show-customers.jsp)
     * with name="customerID" to parameter id
     */
    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formUserID = document.getElementById('action');
    let index = subject + 'ID';
    formUserID.elements['controllerAction'].value = controller + '.delete' + subject;
    formUserID.elements[index].value = id;
    formUserID.submit();

}

function blockById(id, user, controller) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Customers.deleteCustomer" and set value of hidden input field (of show-customers.jsp)
     * with name="customerID" to parameter id
     */

    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formUserID = document.getElementById('action');
    let index = user + 'ID';
    formUserID.elements['controllerAction'].value = controller + '.blocked' + user;
    formUserID.elements[index].value = id;
    formUserID.submit();
    console.log(index + "==> blockById successful called");
}

function unBlockById(id, user, controller) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Customers.deleteCustomer" and set value of hidden input field (of show-customers.jsp)
     * with name="customerID" to parameter id
     */

    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formUserID = document.getElementById('action');
    let index = user + 'ID';
    formUserID.elements['controllerAction'].value = controller + '.unBlocked' + user;
    formUserID.elements[index].value = id;
    formUserID.submit();
    console.log(index + "==> " + controller + ".unBlocked" + user + " for " + id + " Successful called");
}


function showcaseById(id, status) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Procuct.modifyShowcase" and set value of hidden input field (of show-products.jsp)
     */

    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formProductID = document.getElementById('action');
    let index = 'ProductID';
    formProductID.elements['controllerAction'].value = 'admin.Products.manageShowcase';
    formProductID.elements['ProductStatus'].value = status;
    formProductID.elements[index].value = id;
    formProductID.submit();
}

function editEmployee(id) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Staff.editEmployee" and set value of hidden input field (of show-employee.jsp)
     * with name="employeeID" to parameter id
     */
    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formEmployeeID = document.getElementById('action');
    formEmployeeID.elements['controllerAction'].value = 'admin.Staff.showFormEditEmployee';
    formEmployeeID.elements['employeeID'].value = id;
    formEmployeeID.submit();
}

function editProduct(id) {
    /**
     * for form with ID ==> action, set value of hidden input field with
     * name="controllerAction" to "Staff.editEmployee" and set value of hidden input field (of edit-product.jsp)
     * with name="ProductID" to parameter id
     */
    /* Setto la controllerAction usando il form con id="action" che è proprio della show-employee.jsp */
    let formProductID = document.getElementById('action');
    formProductID.elements['controllerAction'].value = 'admin.Products.showFormEditProduct';
    formProductID.elements['ProductID'].value = id;
    formProductID.submit();
}

function setSelectedAttribute(id_select, valueFromDb) {
    let select = document.getElementById(id_select).options;

    for (let option = 0; option < select.length; option++) {
        if (select[option].text === valueFromDb) {
            select[option].selected = true;
            break;
        }

    }
}

function toUpperCase(element) {
    /**
     * set the value of input selected  by ID to upperCase
     */
    element.value = element.value.toUpperCase();
}

function setButtonActiveSidebar(id) {
    /**
     * Add the class "button-side-active" to the button of sidebar based on actual active page
     * */
    let button2active = document.getElementById(id);
    button2active.classList.add("button-side-active");
}

function setCurrentDate(id) {
    /**
     * Return current date in format gg-mm-aaaa
     * */

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    document.getElementById(id).value = today;
}


/*




/!*ALL FUNCTIONS ABOUT STAFF SECTION*!/
function showFormNewEmployee(xhttp) {
    if (xhttp.status >= 200 && xhttp.status < 400) {
        document.getElementById('to-fill').innerHTML = xhttp.responseText;
    }
}

/!*FUNCTION TO SHOW ERROR WITH AJAX*!/
function showAjaxError(xhttp) {
    if (xhttp.status >= 200 && this.status < 400) {
        document.getElementById('to-fill').innerHTML = this.responseText;
    }
}

/!***********************************!/

function fetchStaffSection(event) {

    let xhttp = new XMLHttpRequest();

    if (event.target.id === 'staff_new_employee') {
        /!*Show form to insert a new employee into the DB*!/
        xhttp.open('GET', 'templates/add-employee.html', true);
        xhttp.onload = function () {
            showFormNewEmployee(this);
        };
    } else if (event.target.id === 'staff_edit_employee') {

    } else if (event.target.id === 'staff_show_employee') {

    } else if (event.target.id === 'staff_del_employee') {

    } else {
        /!*Show an error message*!/
        xhttp.open('GET', 'templates/errors/AjaxError.html', true);
        xhttp.onload = function () {
            showAjaxError(this);
        };
    }
    xhttp.setRequestHeader("Cache-Control", "max-age=0"); /!*after open xhttp in the if*!/
    xhttp.send();
}

function addOnClickListenerBtnSidebar() {
    /!* * * * * * Staff * * * * * *!/
    /!*1)Listener on click for: Add new employee*!/

    document.getElementById('staff_new_employee').addEventListener('click', addNewEmployee);

    /!*2)Listener on click for: Edit existing employee*!/
    document.getElementById('staff_edit_employee').addEventListener('click', fetchStaffSection);
}

function addNewEmployee() {
    let xhttp = new XMLHttpRequest();
    /!*Show form to insert a new employee into the DB*!/
    xhttp.open('GET', '/manage?controllerAction=Staff.addEmployee', true);
    xhttp.onload = function () {
        showFormNewEmployee(this);

    }
}*/
