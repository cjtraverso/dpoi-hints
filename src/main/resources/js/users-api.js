function Service(path, methodType) {
  this.path = path;
  this.methodType = methodType;
}

var credential = "ctraverso";
var basePath = "http://dpoi2012api.appspot.com/api/1.0/"
var listService = new Service("list", "POST");
var listDelayService = new Service("list_delay", "POST");

var invokeService = function(serviceUrl, methodType, executionMethod) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status !== 200) {
        alert("Error invoking service!");
      } else {
        executionMethod(this);
      }
    }
  };
  httpRequest.open(methodType, serviceUrl, true);
  httpRequest.send();
}

function invokeListService(executionMethod) {
  var listUrl = basePath + listService.path + "?credential=" + credential;
  invokeService(listUrl, listService.methodType, executionMethod);
}

function invokeListDelayService(executionMethod) {
  var listUrl = basePath + listDelayService.path + "?credential=" + credential;
  invokeService(listUrl, listDelayService.methodType, executionMethod);
}

function loadTable(response) {
  var responseJson = JSON.parse(response.responseText);
  var responseCode = responseJson.status.code;
  if (responseCode != 1) alert("Error loading table");
  var responseCount = responseJson.payload.count;
  var body = document.getElementById('userTable').getElementsByTagName('tbody')[0]

  for (var i = 0; i < responseCount; i++) {
    var row = body.insertRow(body.rows.length);
    row.id = responseJson.payload.items[i].id;

    //FirstName
    addData(row, 0, responseJson.payload.items[i].firstname);
    //LastName
    addData(row, 1, responseJson.payload.items[i].lastname);
    //Mail
    addData(row, 2, responseJson.payload.items[i].mail);
    //Phone
    addData(row, 3, responseJson.payload.items[i].phone);
    //View
    addImage(row, 4, "fa fa-user");
    //Edit
    addImage(row, 5, "fa fa-pencil-square");
    //Delete
    addImage(row, 6, "fa fa-trash");
  }

  document.getElementById('loadingTable').style.display = "none";
  document.getElementById('userTable').style.display = "table";
}

function addData(row, index, data) {
  var cell = row.insertCell(index);
  cell.innerHTML = data;
}

function addImage(row, index, className) {
  var imageCell = row.insertCell(index);
  var imageElement = document.createElement("i");
  imageElement.className = className;
  imageCell.appendChild(imageElement);
}