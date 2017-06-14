function showDialog(id) {
    var dialog = document.getElementById(id);
    showDialogOverlay();
    showDialogInContainer(dialog);
}

function showDialogInContainer(dialog) {
    var container = document.getElementById('dialog-container');
    if (container) {
        container.style.display = 'initial';
    } else {
        container = document.createElement('div');
        container.id = 'dialog-container';
        container.className = 'dialog-container';
        document.body.appendChild(container);
    }
    container.appendChild(dialog);
    dialog.style.display = 'block';
}

function showDialogOverlay() {
    var overlay = document.getElementById('dialog-overlay');
    if (overlay) {
        overlay.style.display = 'initial';
    } else {
        overlay = document.createElement('div');
        overlay.id = 'dialog-overlay';
        overlay.className = 'overlay';
        document.body.appendChild(overlay);
    }
}

function hideDialogOverlay() {
    var overlay = document.getElementById('dialog-overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}

function hideDialog(id) {
    var dialog = document.getElementById(id);
    dialog.style.display = 'none';
    var container = dialog.parentNode;
    document.body.appendChild(dialog);
    container.parentNode.removeChild(container);
    hideDialogOverlay();
}

function initDialog(dialog) {
    if (dialog) {
        dialog.style.display = 'none';
        forEach(dialog.getElementsByClassName('close-dialog'), function (closer) {
            closer.addEventListener('click', function () {
                hideDialog(dialog.id)
            });

        });
    }
}

function initDialogs() {
    forEach(document.getElementsByClassName('dialog'), function (dialog) {
        if (dialog) {
            initDialog(dialog);
        }
    });
}

initDialogs();
