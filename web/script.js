async function setImages() {
    // TODO Loading bar - get size and inc when we pass a file
    let data = await eel.getImageData()();
    let parent = document.getElementById('scroll_bar');
    parent.style.width = window.innerWidth-40 + 'px';
    for (const key of Object.keys(data)) {
        let div = document.createElement('div');
        let img = document.createElement('img');
        div.style.display = 'inline-block';
        img.style.height = document.getElementById('scroll_bar').clientHeight + 'px';
        img.src = 'data:image/jpg;base64,' + data[key]['base64_thum'];
        div.appendChild(img);
        parent.appendChild(div);
    }
}

setImages();