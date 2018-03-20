let data;
let current = null;

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
            if (document.getElementById('SCROLL_IMAGE_' + key) === null) {
                let div = document.createElement('div');
                let img = document.createElement('img');
                img.style.height = document.getElementById('scroll_bar').clientHeight + 'px';
                img.src = '/image/' + key;
                img.id ='SCROLL_IMAGE_' + key;
                img.onclick = function () {
                    setMain(key)
                };
                div.appendChild(img);
                parent.appendChild(div);
            }
        }

        if (current === null && document.getElementById('SCROLL_IMAGE_1') !== null) {
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
        if (current !== null) {
            document.getElementById('SCROLL_IMAGE_' + current).style.opacity = '0.75';
        }
        document.getElementById('SCROLL_IMAGE_' + id).style.opacity = '1';
        document.getElementById('SCROLL_IMAGE_' + id).scrollIntoView();
        document.getElementById('main_img').src = '/image/' + id;
        document.getElementById('info_date').innerHTML = 'N/A';
        document.getElementById('info_size').innerHTML = data[id]['size'] + 'Mb';
        document.getElementById('info_dimensions').innerHTML = document.getElementById('main_img').naturalWidth + 'x' + document.getElementById('main_img').naturalHeight;
        document.getElementById('info_model').innerHTML = 'N/A';
        document.getElementById('info_location').innerHTML = data[id]['location'];
    }
    current = id;
}

// Main Image Clicks
function shiftImageLeft() {
    let next = (parseInt(current) - 1) + '';
    if (next in data) {
        setMain(next);
    }
}

function shiftImageRight() {
    let next = (parseInt(current) + 1) + '';
    if (next in data) {
        setMain(next);
    }
}

function mainImageClicked(event) {
    event.stopPropagation();
    let size_x = document.getElementById("main_img").clientWidth;
    let pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("main_img").offsetLeft;
	if (pos_x < size_x * 0.2) {
	    shiftImageLeft();
    } else if (pos_x > size_x - (size_x * 0.2)) {
	    shiftImageRight();
    } else {
	    expandMain();
    }
}

function expandMain() {
    document.getElementById('imageOverlay').style.display = 'flex';
    document.getElementById('imageOverlayImage').src = '/image/' + current;
    document.getElementById('scroll_bar').style.display = 'none';
}

function shrinkMain() {
    document.getElementById('imageOverlay').style.display = 'none';
    document.getElementById('scroll_bar').style.display = 'block';
}

function imageBackgroundClicked(event) {
    let size_x = document.getElementById("imageBackground").clientWidth;
    let pos_x = event.offsetX?(event.offsetX):event.pageX-document.getElementById("imageBackground").offsetLeft;
    if (pos_x < size_x/2) {
        shiftImageLeft();
    } else {
        shiftImageRight();
    }
}

// Main Button Clicks
function keepImage() {
    document.getElementById('SCROLL_IMAGE_' + current).classList.add('green');
    document.getElementById('SCROLL_IMAGE_' + current).classList.remove('red');
}

function noKeepImage() {
    document.getElementById('SCROLL_IMAGE_' + current).classList.add('red');
    document.getElementById('SCROLL_IMAGE_' + current).classList.remove('green');
}

function getKeep(keep) {
    let nodes = [];
    if (keep) {
        let greens = document.getElementsByClassName('green');
        for(let i = 0; i < greens.length; i++) {
            if (greens[i].id !== 'keep') {
                nodes.push(greens[i].id);
            }
        }
    } else {
        let reds = document.getElementsByClassName('red');
        for(let i = 0; i < reds.length; i++) {
            if (reds[i].id !== 'noKeep') {
                nodes.push(reds[i].id);
            }
        }
    }
    return nodes;
}

// Convert ids to data indexes
function getGreenIndexes() {
    let green_ids = getKeep(true);
    let id_filtered = [];
    for(let i = 0; i < green_ids.length; i++) {
        id_filtered.push(green_ids[i].replace('SCROLL_IMAGE_', ''));
    }
    return id_filtered;
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
    let green_ids = getKeep(true);
    for(let i = 0; i < green_ids.length; i++) {
        document.getElementById(green_ids[i]).classList.remove('green');
    }
    let red_ids = getKeep(false);
    for(let i = 0; i < red_ids.length; i++) {
        document.getElementById(red_ids[i]).classList.remove('red');
    }
}

function exportCopy() {
    let green_indexes = getGreenIndexes();

}

function exportMove() {
    let green_indexes = getGreenIndexes();
}

// On load
window.addEventListener('load', function () {
    setupImages(null);
});
