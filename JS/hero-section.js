// === Mobile hamburger menu functionality ===
const hamburgerMenuButton = document.querySelector("#hamburger-menu");
const menuBar = document.querySelector("nav");

hamburgerMenuButton.addEventListener("click", () => {
    toggleClass(hamburgerMenuButton, "unfolded");
    toggleClass(menuBar, "unfolded");
});

function toggleClass(element, className) {
    element.classList.toggle(className);
}

// === INIT EYE CANDY ===
const challengeMeA = document.querySelector(".challenge-me-a");

function forceAnimation(element) {
    const event = new Event("mouseenter");
    element.dispatchEvent(event);
}

setTimeout(() => forceAnimation(challengeMeA), 1400);

// === MENU LOGIC ===
const menuItems = document.querySelectorAll("li.menu-item, #challenge-me, .challenge-me-a");

menuItems.forEach(item => {
    item.addEventListener("mouseenter", handleMenuMouseEnter);
    item.addEventListener("animationend", handleMenuAnimationEnd);
    item.addEventListener("click", handleMenuClick);
});

function handleMenuMouseEnter() {
    if (!this.classList.contains("animate")) {
        this.classList.add("animate");
    }
}

function handleMenuAnimationEnd() {
    this.classList.remove("animate");
}

function handleMenuClick() {
    forceAnimation(this);
    if (this.classList.contains("menu-item")) {
        toggleMenu(this);
    }
    menuBar.classList.remove("unfolded");
    hamburgerMenuButton.classList.remove("unfolded");
}

function toggleMenu(menuItemCandidate) {
    const activeMenuItem = document.querySelector("li.active");
    if (activeMenuItem) {
        activeMenuItem.classList.toggle("active");
    }
    menuItemCandidate.classList.toggle("active");
}


const challengeMeButton = document.querySelector('#challenge-me');
challengeMeButton.addEventListener('click', () => {
    window.location = 'contact.html';
});

// === GALLERY ZOOM ===
const galleryTiles = document.querySelectorAll(".hero-gallery-tile");

galleryTiles.forEach(tile => {
    tile.addEventListener("mousemove", handleGalleryMouseMove);
    tile.addEventListener("click", handleGalleryTileClick);
});

function handleGalleryMouseMove(e) {
    const rect = this.getBoundingClientRect();
    this.children[0].style.transformOrigin = `${e.clientX - rect.left}px ${e.clientY - rect.top}px`;
}

function handleGalleryTileClick() {
    mediaPopupViewer.classList.add("active");
    dimWebsite.classList.add("active");

    changeImageInPopup(this.children[0]);

    const galleryItemCandidate = document.querySelector(`.gallery-item-bar-image[src="${this.children[0].src}"]`);
    toggleGalleryItemBar(galleryItemCandidate);
}

// === MEDIA POPUP ===
const mediaCloseButton = document.querySelector("#media-popup-close");
const mediaPopupViewer = document.querySelector("#media-popup-viewer");
const dimWebsite = document.querySelector("#dim-website");
const mediaDisplayer = document.querySelector("#media-displayer");

mediaCloseButton.addEventListener("click", closeMediaPopup);
mediaCloseButton.addEventListener("mouseenter", handleMenuMouseEnter);
mediaCloseButton.addEventListener("animationend", handleMenuAnimationEnd);

function closeMediaPopup() {
    mediaPopupViewer.classList.remove("active");
    dimWebsite.classList.remove("active");
}

function changeImageInPopup(img) {
    mediaDisplayer.children[0].src = img.src;
    mediaDisplayer.children[0].alt = img.alt || '';
}

const galleryItemBarImages = document.querySelectorAll(".gallery-item-bar-image");

galleryItemBarImages.forEach(image => {
    image.addEventListener("click", () => {
        changeImageInPopup(image);
        toggleGalleryItemBar(image);
    });
});

function toggleGalleryItemBar(candidateImage) {
    const activeImage = document.querySelector(".gallery-item-bar-image.active");
    if (activeImage) activeImage.classList.remove("active");
    candidateImage.classList.add("active");
}
