let data;
let current;

// async function setImages() {
//     // TODO Loading bar
//     data = await eel.getImageData()();
//     let parent = document.getElementById('scroll_bar');
//     parent.style.width = window.innerWidth-40 + 'px';
//     for (const key of Object.keys(data)) {
//         let div = document.createElement('div');
//         let img = document.createElement('img');
//         div.style.display = 'inline-block';
//         img.style.height = document.getElementById('scroll_bar').clientHeight + 'px';
//         img.style.border = '2px solid #458BC6';
//         img.style.margin = '0 2px';
//         img.src = 'data:image/jpg;base64,' + data[key]['base64_thum'];
//         img.onclick = function () { setAsMain(key)};
//         div.appendChild(img);
//         parent.appendChild(div);
//     }
//     setAsMain('1');
// }
//
// function setAsMain(id) {
//     document.getElementById('main_img').src = 'data:image/jpg;base64,' + data[id]['base64'];
//     document.getElementById('info_date').innerHTML = data[id]['date'];
//     document.getElementById('info_size').innerHTML = data[id]['size'] + "Mb";
//     document.getElementById('info_dimensions').innerHTML = 'N/A';
//     document.getElementById('info_model').innerHTML = data[id]['model'];
//     document.getElementById('info_location').innerHTML = 'N/A';
//     current = id;
// }
//
// // setImages();
// function call(event) {
//     document.getElementById('main_img').src = URL.createObjectURL(event.target.files[0]);
//     console.log(event.target.files[0].name);
// }

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
function getImagesWithFileSelect() {

}
function getImagesWithFolderSelect() {

}
