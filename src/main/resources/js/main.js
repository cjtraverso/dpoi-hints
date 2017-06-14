function get(url, callbackFunction, errorFunction) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status !== 200) {
                if (errorFunction !== undefined) {
                    errorFunction(this.statusText)
                }
            } else {
                if (callbackFunction !== undefined) {
                    callbackFunction(this.responseText);
                }
            }
        }
    };

    request.open("get", url);
    request.send(null);
}

function fillTable(jsonContent) {
    var tableContent = JSON.parse(jsonContent);
    var items = tableContent.payload.items;
    var table = document.getElementById("table-info");
    for (var i = 0; i < items.length; i++) {
        var row = document.createElement('tr');

        if (i % 2 === 0) {
            row.className += 'white-row';
        } else {
            row.className += 'grey-row';
        }

        addDataCellToRow(row, items[i], 'firstname');
        addDataCellToRow(row, items[i], 'lastname');
        addDataCellToRow(row, items[i], 'mail');
        addDataCellToRow(row, items[i], 'phone');
        addImgCellToRow(row, "img/calendarIcon.gif", "calendar");
        addImgCellToRow(row, "img/edit.jpg", "edit");
        addImgCellToRow(row, "img/delete.jpg", "delete");
        table.appendChild(row);
    }
    document.getElementById('loading-table-message').style.display = 'none';

}

function addDataCellToRow(row, item, prop) {
    var cell = document.createElement('td');
    cell.innerHTML = item[prop];
    row.appendChild(cell);
}


var addImgCellToRow = function (row, src, alt) {
    var cell = document.createElement('td');
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    cell.appendChild(img);
    row.appendChild(cell);
};

function showErrorInTableData() {
    document.getElementById("table").innerHTML += '<h4 class="error"> Error loading table.</h4>';
    document.getElementById('loading-table-message').style.display = 'none';
}

get("http://dpoi2012api.appspot.com/api/1.0/list_delay?credential=dpoi", fillTable, showErrorInTableData);