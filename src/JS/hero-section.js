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

// === MEDIA POPUP ===

let galleryVisibilityTimeout;

function handleGalleryTileClick() {
    if(window.innerWidth <= 500) return;

    mediaPopupViewer.classList.add("active");
    clearTimeout(galleryVisibilityTimeout);
    mediaPopupViewer.classList.remove("invisible");
    dimWebsite.classList.add("active");
    dimWebsite.classList.remove("invisible");

    changeImageInPopup(this.children[0]);

    const galleryItemCandidate = document.querySelector(`.gallery-item-bar-image[src="${this.children[0].src}"]`);
    toggleGalleryItemBar(galleryItemCandidate);
}


const mediaCloseButton = document.querySelector("#media-popup-close");
const mediaPopupViewer = document.querySelector("#media-popup-viewer");
const dimWebsite = document.querySelector("#dim-website");
const mediaDisplayer = document.querySelector("#media-displayer");

mediaCloseButton.addEventListener("click", closeMediaPopup);
// mediaCloseButton.addEventListener("mouseenter", handleMenuMouseEnter);
// mediaCloseButton.addEventListener("animationend", handleMenuAnimationEnd);


function closeMediaPopup() {
    mediaPopupViewer.classList.remove("active");
    dimWebsite.classList.remove("active");
    galleryVisibilityTimeout = setTimeout(() => {
        mediaPopupViewer.classList.add('invisible');
        dimWebsite.classList.add('invisible');
    }, 500);
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

// Close popup on [Escape]
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
        if(mediaPopupViewer.classList.contains('active'))
            closeMediaPopup();
    }
});

// Make side buttons change image

const btnL = document.querySelector('button.left');
const btnR = document.querySelector('button.right');

btnL.addEventListener('click', () => {
    rollGallery(-1);
});

btnR.addEventListener('click', () => {
    rollGallery(1);
});
function rollGallery(operation) {
    let activeImageIdNum = Number(document.querySelector(".gallery-item-bar-image.active").id.slice(-1));

    let newImgId = (activeImageIdNum + operation + 3) % 3;
    let image = document.querySelector(`img#img-${newImgId}`);
    changeImageInPopup(image);
    toggleGalleryItemBar(image);
}

// Arrow key gallery traversal
document.addEventListener('keydown', function(event) {
    if(mediaPopupViewer.classList.contains("invisible")) return;
    if (event.key === 'ArrowLeft') {
        // Call rollGallery with -1 when the left arrow is pressed
        rollGallery(-1);
    } else if (event.key === 'ArrowRight') {
        // Call rollGallery with +1 when the right arrow is pressed
        rollGallery(1);
    }
});






// === TOGGLE MENU ON SCROLL ===

// Map sections to their corresponding menu items
const sections = [
    {
        id: "hero",
        element: document.getElementById("hero"),
        menuItem: document.querySelector('a[href="#start"]').parentElement,
    },
    {
        id: "my-story-container",
        element: document.getElementById("my-story-container"),
        menuItem: document.querySelector('a[href="#my-story-container"]').parentElement,
    },
    {
        id: "projects-container",
        element: document.getElementById("projects-container"),
        menuItem: document.querySelector('a[href="#projects-container"]').parentElement,
    },
];

let currentActiveSection = null;

// Function to handle scroll events
function toggleMenuActiveClassOnScroll() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let foundSection = false;

    // Loop through sections to find which one is in view
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            foundSection = true;
            if (currentActiveSection !== section.id) {
                toggleMenu(section.menuItem);
                currentActiveSection = section.id;
            }
            break;
        }
    }

    // If no section is found, remove active class
    if (!foundSection && currentActiveSection !== null) {
        const activeMenuItem = document.querySelector("li.active");
        if (activeMenuItem) {
            activeMenuItem.classList.remove("active");
        }
        currentActiveSection = null;
    }
}

window.addEventListener("scroll", toggleMenuActiveClassOnScroll);
toggleMenuActiveClassOnScroll();