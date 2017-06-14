/* Fill the table from a list of elements*/
function fillTable(elements) {
    forEach(elements, function (element) {
        addToTable(element);
    });
    document.getElementById('loading-table-message').style.display = 'none';
}

/*Add one element to table*/
function addToTable(item) {
    var table = document.getElementById("table-info");
    var row = document.createElement('tr');
    row.id = item.id;

    addDataCellToRow(row, item, 'firstname');
    addDataCellToRow(row, item, 'lastname');
    addDataCellToRow(row, item, 'mail');
    addDataCellToRow(row, item, 'phone');
    addButtonCellToRow(row, function(){openViewDialog(row.id)}, "img/calendarIcon.gif", "calendar");
    addButtonCellToRow(row, function(){openEditDialog(row.id)}, "img/edit.jpg", "edit");
    addButtonCellToRow(row, function(){openDeleteDialog(row.id, item.firstname)}, "img/delete.jpg", "delete");
    table.appendChild(row);
}

function addDataCellToRow(row, item, prop) {
    var cell = document.createElement('td');
    cell.innerHTML = item[prop];
    cell.className += ' ' + prop;
    row.appendChild(cell);
}

function addButtonCellToRow(row, action, src, alt) {
    var cell = document.createElement('td');
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    cell.appendChild(img);
    cell.addEventListener('click', action);
    cell.className += 'button';
    row.appendChild(cell);
}

/*Updates an element in the table*/
function updateInTable(item) {
    var row = document.getElementById(item.id);
    if (row) {
        row.getElementsByClassName('firstname')[0].innerHTML = item['firstname'];
        row.getElementsByClassName('lastname')[0].innerHTML = item['lastname'];
        row.getElementsByClassName('mail')[0].innerHTML = item['mail'];
        row.getElementsByClassName('phone')[0].innerHTML = item['phone'];
    }
}

/*Delete an element in the table*/
function deleteInTable(item) {
    var row = document.getElementById(item.id);
    if (row) {
        row.parentNode.removeChild(row);
    }
}

function showErrorInTableData() {
    document.getElementById("table").innerHTML += '<h4 class="error"> Error loading table.</h4>';
    document.getElementById('loading-table-message').style.display = 'none';
}

function showErrorDialog() {
}

function addPerson() {
    var data = getObjectFromForm('personForm');
    create(data, addToTable, showErrorDialog);
}

function editPerson(id) {
    var data = getObjectFromForm('personForm');
    data.id = id;
    edit(data, updateInTable, showErrorDialog);
}

function deletePerson(id) {
    remove(id, deleteInTable, showErrorDialog);
}

function openAddDialog() {
    var form = document.getElementById('personForm');
    clearForm(form);
    var button = document.getElementById('formDialog').getElementsByClassName('accept-dialog')[0];
    button.onclick= function() {
        addPerson();
        hideDialog('formDialog');
    };
    showDialog('formDialog');
}

function openEditDialog(id) {
    var form = document.getElementById('personForm');
    view(id, function(element){
        fillForm(form, element);
        var button = document.getElementById('formDialog').getElementsByClassName('accept-dialog')[0];
        button.onclick = function() {
            editPerson(id);
            hideDialog('formDialog');
        };
        showDialog('formDialog');
    }, showErrorDialog());
}

function openDeleteDialog(id, name) {
    var span = document.getElementById('deletePerson');
    span.innerHTML = name;
    var button = document.getElementById('deleteDialog').getElementsByClassName('accept-dialog')[0];

    button.onclick = function () {
        deletePerson(id);
        hideDialog('deleteDialog');
    };
    showDialog('deleteDialog');
}

function openViewDialog(id){
    var personView = document.getElementById('personView');
    view(id, function(element){
        fillView(personView, element);
        showDialog('viewDialog');
    }, showErrorDialog());
}

function fillView(personView, element){
    var values = personView.getElementsByClassName('value');
    forEach(values, function (value) {
        if (value && element[value.id]) {
            value.innerHTML = element[value.id];
        } else {
            value.innerHTML = '';
        }
    });
}

function fillForm(form, element){
    var inputs = form.getElementsByTagName('input');
    forEach(inputs, function (input) {
        if (input && element[input.name]) {
            input.value = element[input.name];
        } else {
            input.value = '';
        }
    });
}

function clearForm(form) {
    var inputs = form.getElementsByTagName('input');
    forEach(inputs, function (input) {
        if (input && input.type !== 'submit') {
            input.value = '';
        }
    });
}

function init() {
    list(fillTable, showErrorInTableData);
    forEach(document.getElementsByClassName('add-person-button'), function (button) {
        button.addEventListener('click', openAddDialog);
    })
}

init();