const nav = document.querySelector("#main-nav");
const supportPageOffset = window.pageXOffset !== undefined;
const isCSS1Compat = (document.compatMode || "") === "CSS1Compat";

let previousScrollPosition = 0;

const isScrollingDown = () => {
  let scrolledPosition = supportPageOffset
    ? window.pageYOffset
    : isCSS1Compat
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
  let isScrollDown;

  if (scrolledPosition > previousScrollPosition) {
    isScrollDown = true;
  } else {
    isScrollDown = false;
  }
  previousScrollPosition = scrolledPosition;
  return isScrollDown;
};

const handleNavScroll = () => {
  if (isScrollingDown() && !nav.contains(document.activeElement)) {
    nav.classList.add("scroll-down");
    nav.classList.remove("scroll-up");
  } else {
    nav.classList.add("scroll-up");
    nav.classList.remove("scroll-down");
  }
};

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("scroll", () => {
  if (mediaQuery && !mediaQuery.matches) {
    throttle(handleNavScroll, 250);
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
// Get modal element
const modal = document.getElementById('modal');

// Get open modal buttons (boxes in your case)
const boxElements = document.querySelectorAll('.box');

// Get close button
const closeBtn = document.querySelector('.close-btn');

// Get the modal gallery container
const modalGallery = document.getElementById('modal-gallery');

// Image sets for each celebration
const images = {
    newgrange: [
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg', 'assets/img-11.jpg',
        'assets/img-11.jpg', 'assets/img-11.jpg'
    ],
    intiraymi: [
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg', 'assets/img-12.jpg',
        'assets/img-12.jpg', 'assets/img-12.jpg'
    ],
    modranicht: [
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg', 'assets/img-13.jpg',
        'assets/img-13.jpg', 'assets/img-13.jpg'
    ],
    koliada: [
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg', 'assets/img-8.jpg',
        'assets/img-8.jpg', 'assets/img-8.jpg'
    ]
};

// Add click event listener to each box to open modal with specific images
boxElements.forEach(box => {
    box.addEventListener('click', () => {
        const celebration = box.getAttribute('data-celebration');
        modal.style.display = 'block'; // Show modal
        document.body.style.overflow = 'hidden'; // Disable body scroll

        // Clear previous gallery items
        modalGallery.innerHTML = '';

        // Get images for the selected celebration
        const selectedImages = images[celebration];

        // Add images to the modal gallery
        selectedImages.forEach(src => {
            const imgElement = document.createElement('img');
            imgElement.src = src;
            imgElement.alt = 'Celebration Image';
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.appendChild(imgElement);
            modalGallery.appendChild(galleryItem);
        });
    });
});

// Add click event listener to close button to close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
});

// Close modal if clicked outside the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none'; // Hide modal if clicked outside
        document.body.style.overflow = 'auto'; // Re-enable body scroll
    }
});


