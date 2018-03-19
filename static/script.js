let data;
let current = null;

// Setup Images
function setupImages(images_data) {
    if (images_data === null) {
        let xhr = new XMLHttpRequest();
        xhr.open('get', '/getImages/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'json';
        xhr.onload = function() {
            setupImages(this.response);
        };
        xhr.send();
    } else {
        data = images_data;
        let parent = document.getElementById('scroll_bar');
        parent.style.width = window.innerWidth-40 + 'px';
        for (const key of Object.keys(data)) {
            // TODO Make sure images aren't already there
            let div = document.createElement('div');
            let img = document.createElement('img');
            div.style.display = 'inline-block';
            div.style.cursor = 'pointer';
            img.style.height = document.getElementById('scroll_bar').clientHeight + 'px';
            img.style.border = '2px solid #458BC6';
            img.style.margin = '0 2px';
            img.src = '/image/' + key;
            img.onclick = function () { setMain(key) };
            div.appendChild(img);
            parent.appendChild(div);
        }

        // TODO Setup images
        if (current === null) {
            setMain('1');
        }
    }
}

function setMain(id) {
    document.getElementById('main_img').src = '/image/' + id;
    document.getElementById('info_date').innerHTML = 'N/A';
    document.getElementById('info_size').innerHTML = 'N/A';
    document.getElementById('info_dimensions').innerHTML = 'N/A';
    document.getElementById('info_model').innerHTML = 'N/A';
    document.getElementById('info_location').innerHTML = 'N/A';
    current = id;
}

// Dialogs
function overlayChoice(id) {
    document.getElementById("overlay").style.display = "grid";
    document.getElementById(id).style.display = "grid";
}

function closeOverlayChoice() {
    document.getElementById("overlay").style.display = "none";
    let children = document.getElementById("overlay").children;
    for(let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
}

// Choice Methods
function getImagesWithFolderSelect() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/selectDirectory/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = function() {
        setupImages(this.response);
    };
    xhr.send();
}

function getImagesWithFileSelect() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/selectFiles/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = function() {
        setupImages(this.response);
    };
    xhr.send();
}

window.addEventListener('load', function () {
    setupImages(null);
});
