function get(url, data, callbackFunction, errorFunction) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status !== 200) {
                if (errorFunction !== undefined) {
                    errorFunction(this.statusText);
                }
            } else {
                if (callbackFunction !== undefined) {
                    callbackFunction(this.responseText);
                }
            }
        }
    };
    data instanceof Object && (data = objectToRequestString(data));
    request.open("GET", url + '?' + data, true);
    request.send(null);
}

function post(url, data, callbackFunction, errorFunction) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status !== 200) {
                if (errorFunction !== undefined) {
                    errorFunction(this.statusText);
                }
            } else {
                if (callbackFunction !== undefined) {
                    callbackFunction(this.responseText);
                }
            }
        }
    };
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    data instanceof Object && (data = objectToRequestString(data));
    request.send(data);
}

function getObjectFromForm(id){
    var form = document.getElementById(id);
    if(form){
        var inputs = form.getElementsByTagName('input');
        var result = {};
        forEach(inputs, function(input){
            if(input && input.type === 'radio' ){
                if(input.checked){
                    result[input.name] = input.value;
                }
            } else if(input && input.type !== 'submit' && input.name){
                result[input.name] = input.value;
            }
        });

        return result;
    }
    return null;
}

function objectToRequestString(object){
    if(object){
        var strings = [];
        for(var key in object){
            strings.push(key + '=' + object[key])
        }
        return strings.join('&');
    } else {
        return '';
    }
}

function forEach(elements, functionToCall){
    for(var i = 0; i < elements.length; i++){
        functionToCall(elements[i]);
    }
}

