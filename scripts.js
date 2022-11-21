// Slide Pagina inicial

let time = 5000,
    currentImageIndex = 0,
    images = document.querySelectorAll("#slider img")
    max = images.length;

function nextImage() {

    images[currentImageIndex].classList.remove("selected")
    currentImageIndex++

    if(currentImageIndex >= max)
        currentImageIndex = 0

    images[currentImageIndex].classList.add("selected")
}

function start() {
    setInterval(() => {
        // troca de imagem
        nextImage()
    }, time)
}
window.addEventListener("load", start)

// Slide Quem-Somos -------------------

let time1 = 2000,
    currentImageIndex1 = 0,
    images1 = document.querySelectorAll("#slider1 img")
    max1 = images1.length;

function nextImage1() {

    images1[currentImageIndex1].classList.remove("selected");
    currentImageIndex1++

    if(currentImageIndex1 >= max1)
        currentImageIndex1 = 0

    images1[currentImageIndex1].classList.add("selected")
}

function start1() {
    setInterval(() => {
        // troca de imagem
        nextImage1()
    }, time1)
}
window.addEventListener("load", start1)

//---------------------------------------------------------------

