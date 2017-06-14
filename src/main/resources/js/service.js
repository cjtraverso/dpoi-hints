/*If success callback function will receive a list of all the elements,
 else errorFunction will receive the error message*/
function list(callback, errorFunction) {
    var processResponse = function(response) {
        var tableContent = JSON.parse(response);
        callback(tableContent.payload.items);
    };

    get("http://dpoi2012api.appspot.com/api/1.0/list", "credential=muleflot", processResponse, errorFunction);
}

function view(id, callback, errorFunction) {
    var processResponse = function(response) {
        if (callback) {
            var tableContent = JSON.parse(response);
            callback(tableContent.payload);
        }
    };
    get("http://dpoi2012api.appspot.com/api/1.0/view", "credential=muleflot&id=" + id, processResponse, errorFunction);
}

function create(data, callback, errorFunction) {
    var processResponse = function(response) {
        if (callback) {
            var tableContent = JSON.parse(response);
            callback(tableContent.payload);
        }
    };
    data.credential = 'muleflot';
    post("http://dpoi2012api.appspot.com/api/1.0/create",data,processResponse, errorFunction);
}

function edit(data, callback, errorFunction) {
    var processResponse = function(response) {
        if (callback) {
            var tableContent = JSON.parse(response);
            callback(tableContent.payload);
        }
    };
    data.credential = 'muleflot';
    post("http://dpoi2012api.appspot.com/api/1.0/update",data, processResponse, errorFunction);
}

function remove(id, callback, errorFunction) {
    var processResponse = function(response) {
        if (callback) {
            var tableContent = JSON.parse(response);
            callback(tableContent.payload);
        }
    };
    post("http://dpoi2012api.appspot.com/api/1.0/delete", "credential=muleflot&id=" + id, processResponse, errorFunction);
}