let data;
let current = null;
let in_scroll = [];

// Setup Images
function setupImages(images_data) {
    data = images_data;
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
        let parent = document.getElementById('scroll_bar');
        parent.style.width = window.innerWidth-40 + 'px';
        for (const key of Object.keys(data)) {
            if (in_scroll.indexOf(key) === -1) {
                let div = document.createElement('div');
                let img = document.createElement('img');
                div.style.display = 'inline-block';
                div.style.cursor = 'pointer';
                img.style.height = document.getElementById('scroll_bar').clientHeight + 'px';
                img.style.border = '2px solid #458BC6';
                img.style.margin = '0 2px';
                img.src = '/image/' + key;
                img.onclick = function () {
                    setMain(key)
                };
                div.appendChild(img);
                parent.appendChild(div);
                in_scroll.push(key);
            }
        }

        if (current === null && in_scroll.length > 0) {
            setMain('1');
        }
    }
}

function setMain(id) {
    if (id === null) {
        document.getElementById('main_img').src = '';
        document.getElementById('info_date').innerHTML = '';
        document.getElementById('info_size').innerHTML = '';
        document.getElementById('info_dimensions').innerHTML = '';
        document.getElementById('info_model').innerHTML = '';
        document.getElementById('info_location').innerHTML = '';
    } else {
        document.getElementById('main_img').src = '/image/' + id;
        document.getElementById('info_date').innerHTML = 'N/A';
        document.getElementById('info_size').innerHTML = 'N/A';
        document.getElementById('info_dimensions').innerHTML = 'N/A';
        document.getElementById('info_model').innerHTML = 'N/A';
        document.getElementById('info_location').innerHTML = 'N/A';
    }
    current = id;
}

// Main Image Clicks
function mainImageClicked(event) {
    let size_x = document.getElementById("main_img").clientWidth;
    let pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("main_img").offsetLeft;
	if (pos_x < size_x*0.2) {
	    let next = (parseInt(current) - 1) + '';
	    if (next in data) {
	        setMain(next);
        }
    } else if (pos_x > size_x - (size_x*0.2)) {
	    let next = (parseInt(current) + 1) + '';
	    if (next in data) {
	        setMain(next);
        }
    } else {
	    expandMain();
    }
}

function expandMain() {
    console.log("Expand");
    let node = document.getElementById('main_img');
    console.log()
}

function shrinkMain() {

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

// User Methods
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

function clearFiles() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', '/clearImages/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.onload = function() {
        console.log("Reloading");
        window.location.reload(true)
    };
    xhr.send();
}

function clearChoices() {

}

function exportCopy() {

}

function exportMove() {

}

function viewOutputFolder() {

}

// On load
window.addEventListener('load', function () {
    setupImages(null);
});
