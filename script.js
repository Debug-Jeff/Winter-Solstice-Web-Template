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

//SNOW-FLAKE {SIX-SIDED}
// Array of image paths - replace with your local image paths
const imagePaths = [
  'assets/img-11.jpg',
  'assets/img-10.jpg',
  'assets/img-12.jpg',
  'assets/img-13.jpg',
  'assets/img-14.jpg',
  'assets/img-1.jpg'
];

const sampleTexts = [
  "The winter solstice is a profound event that connects humanity across time and space.",
  "It marks the year's longest night and shortest day, a celestial turning point.",
  "Despite differences in culture and climate, people around the world share similar themes.",
  "Celebrations often emphasize hope, renewal, and the enduring human spirit amid darkness and cold.",
  "Understanding the solstice's science deepens our appreciation of its traditions and cosmic connections.",
  "This timeless event inspires awe, reflection, and unity across generations and global boundaries."
];

function createMiniArms(parentArm, startPosition, count) {
  for (let i = 0; i < count; i++) {
      const miniArm = document.createElement('div');
      miniArm.className = i < count / 2 ? 'mini-arm' : 'tiny-arm';
      miniArm.style.left = `${startPosition + (i * 15)}px`;
      parentArm.appendChild(miniArm);
  }
}

function createSnowflake() {
  const armsContainer = document.getElementById('arms-container');
  const numArms = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--arm-count'));

  for (let i = 0; i < numArms; i++) {
      const arm = document.createElement('div');
      arm.className = 'arm';

      const circleWrapper = document.createElement('div');
      circleWrapper.className = 'circle-wrapper';

      const imageCircle = document.createElement('div');
      imageCircle.className = 'image-circle';

      // Create front of circle
      const circleFront = document.createElement('div');
      circleFront.className = 'circle-front';
      const frontImg = document.createElement('img');
      frontImg.src = imagePaths[i];
      frontImg.alt = `Circle ${i + 1} image`;
      circleFront.appendChild(frontImg);

      // Create back of circle with blurred image
      const circleBack = document.createElement('div');
      circleBack.className = 'circle-back';
      
      // Add blurred background image
      const backImg = document.createElement('img');
      backImg.src = imagePaths[i];
      backImg.alt = `Circle ${i + 1} background`;
      circleBack.appendChild(backImg);

      // Add text content
      const circleContent = document.createElement('div');
      circleContent.className = 'circle-content';
      circleContent.textContent = sampleTexts[i];
      circleBack.appendChild(circleContent);

      imageCircle.appendChild(circleFront);
      imageCircle.appendChild(circleBack);
      circleWrapper.appendChild(imageCircle);
      arm.appendChild(circleWrapper);

      // Create sub-arms
      for (let j = 0; j < 2; j++) {
          const subArm = document.createElement('div');
          subArm.className = 'sub-arm';
          createMiniArms(subArm, 30, 4);
          arm.appendChild(subArm);
      }

      createMiniArms(arm, 60, 6);

      // Create tiny decorative arms
      for (let k = 0; k < 4; k++) {
          const tinyArm = document.createElement('div');
          tinyArm.className = 'tiny-arm';
          arm.appendChild(tinyArm);
      }

      armsContainer.appendChild(arm);
  }
}

document.addEventListener('DOMContentLoaded', createSnowflake);

// Add snow particle creation with snowflakes that have more distinct size and opacity.
function createSnowParticles() {
  const snowWrapper = document.querySelector('.snow-wrapper');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'snow-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    particle.style.opacity = Math.random();
    snowWrapper.appendChild(particle);
  }
}


// Update the document ready function
document.addEventListener('DOMContentLoaded', () => {
  createSnowflake();
  createSnowParticles();
});

// Add subtle movement to the background
function moveBackground() {
  const conclusion = document.getElementById('conclusion');
  let offset = 0;
  
  setInterval(() => {
      offset += 0.1;
      conclusion.style.backgroundPosition = `${Math.sin(offset) * 10}px ${Math.cos(offset) * 10}px`;
  }, 50);
}

// Initialize background movement
document.addEventListener('DOMContentLoaded', moveBackground);

console.clear();

let canvas, canvasCtx;
let canvasSize = [0, 0];
let state;

requestAnimationFrame(main);

function main() {
    const winterSection = document.getElementById('winter-ln'); // Target the #winter section

    canvas = document.createElement('canvas');
    winterSection.appendChild(canvas); // Append canvas to the section
    winterSection.style.position = 'relative'; // Ensure section has relative positioning
    canvas.style.position = 'absolute'; // Make canvas fill the section
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1'; // Place canvas behind other content

    canvasCtx = canvas.getContext('2d');

    checkResizeAndInit();
    state = createState();

    requestAnimationFrame(mainLoop);

    function mainLoop() {
        tick();
        requestAnimationFrame(mainLoop);
    }
}

function createState() {
    const state = {
        time: 0,
        timeDelta: 1 / 60,
        pointer: {
            pos: [canvasSize[0] / 2, canvasSize[1] / 2 + 128],
            vel: [640, 8],
        },
    };
    return state;
}

function tick() {
    checkResizeAndInit();
    canvasCtx.fillStyle = `rgba(0, 0, 0, ${1 / 32})`;
    canvasCtx.fillRect(0, 0, canvasSize[0], canvasSize[1]);

    doIt();

    state.time += state.timeDelta;
}

function checkResizeAndInit() {
    const rect = document.getElementById('winter-ln').getBoundingClientRect(); // Get #winter's dimensions
    if (rect.width === canvasSize[0] && rect.height === canvasSize[1]) return;
    canvasSize[0] = canvas.width = rect.width;
    canvasSize[1] = canvas.height = rect.height;
}

function doIt() {
    const { pointer, timeDelta } = state;

    const oldPos = [pointer.pos[0], pointer.pos[1]];

    let x = pointer.pos[0] - canvasSize[0] / 2;
    let y = pointer.pos[1] - canvasSize[1] / 2;

    const l = Math.hypot(x, y);
    const m = (1 / l) * 40000000 / Math.max(32, l) ** 2;
    pointer.vel[0] -= x * m * timeDelta;
    pointer.vel[1] -= y * m * timeDelta;
    pointer.vel[Math.random() < 0.5 ? 0 : 1] += 100 + (Math.random() * 2 - 1);

    const velLimit = 2048;
    if (Math.hypot(pointer.vel[0], pointer.vel[1]) > velLimit) {
        pointer.vel[0] *= 0.95;
        pointer.vel[1] *= 0.95;
    }
    pointer.pos[0] += pointer.vel[0] * timeDelta;
    pointer.pos[1] += pointer.vel[1] * timeDelta;

    const min = Math.min(canvasSize[0], canvasSize[1]);
    const left = canvasSize[0] / 2 - min / 2;
    const right = canvasSize[0] / 2 + min / 2;
    const top = canvasSize[1] / 2 - min / 2;
    const bottom = canvasSize[1] / 2 + min / 2;

    if (pointer.pos[0] < left) {
        pointer.pos[0] = left + (left - pointer.pos[0]);
        pointer.vel[0] *= -1;
    } else if (pointer.pos[0] > right) {
        pointer.pos[0] = right - (pointer.pos[0] - right);
        pointer.vel[0] *= -1;
    }

    if (pointer.pos[1] < top) {
        pointer.pos[1] = top + (top - pointer.pos[1]);
        pointer.vel[1] *= -1;
    } else if (pointer.pos[1] > bottom) {
        pointer.pos[1] = bottom - (pointer.pos[1] - bottom);
        pointer.vel[1] *= -1;
    }

    const pos = [pointer.pos[0], pointer.pos[1]];

    canvasCtx.beginPath();

    const rVec = [0, 0];
    const t = [0, 0];
    const origin = [canvasSize[0] / 2, canvasSize[1] / 2];
    const n = 15;
    for (let i = 0; i < n; ++i) {
        const a = (Math.PI / 180) * 55 * i;
        const s = 0.2 + (0.8 / n) * i;
        rVec[0] = Math.cos(a);
        rVec[1] = Math.sin(a);
        rotateByVector(t, oldPos, rVec, origin, s);
        canvasCtx.moveTo(t[0], t[1]);
        rotateByVector(t, pos, rVec, origin, s);
        canvasCtx.lineTo(t[0], t[1]);
    }

    canvasCtx.strokeStyle = '#64e1f3';
    canvasCtx.stroke();
}

function rotateByVector(out, a, v, origin, s) {
    const rx = v[0];
    const ry = v[1];
    const x = a[0] - origin[0];
    const y = a[1] - origin[1];
    out[0] = origin[0] + (x * rx - y * ry) * s;
    out[1] = origin[1] + (y * rx + x * ry) * s;
    return out;
}

//SNOW FLAKES - CONTENT_BREAK
const flakesCount = 1000;
const winterContainer = document.getElementById('snow');

if (winterContainer) {
    for (let i = 0; i < flakesCount; i++) {
    const flakes = document.createElement('div');
    flakes.className = 'flakes';
    flakes.innerText = '*';

    const initialRotation = Math.random() * 360;
    flakes.style.left = Math.random() * 100 + '%'; // Position within #winter width
    flakes.style.animationDuration = 5 + Math.random() * 5 + 's';
    flakes.style.fontSize = 8 + Math.random() * 10 + 'px';
    flakes.style.transform = `rotate(${initialRotation}deg)`;

    winterContainer.appendChild(flakes);

    // Remove flakes when animation ends
    flakes.addEventListener('animationend', () => {
        flakes.remove();
    });
    
    // Continuous snowfall
    setInterval(() => {
        const flakes = document.createElement('div');
        flakes.className = 'flakes';
        flakes.innerText = '*';

        const initialRotation = Math.random() * 360;
        flakes.style.left = Math.random() * 100 + '%'; // Position within #winter width
        flakes.style.animationDuration = 6 + Math.random() * 5 + 's';
        flakes.style.fontSize = 8 + Math.random() * 10 + 'px';
        flakes.style.transform = `rotate(${initialRotation}deg)`;

        winterContainer.appendChild(flakes);

        // Remove flakes when animation ends
        flakes.addEventListener('animationend', () => {
            flakes.remove();
        });
    }, 600);
}
}

// Continuous snowfall
setInterval(() => {
    const flakes = document.createElement('div');
    flakes.className = 'flakes';
    flakes.innerText = '*';

    const initialRotation = Math.random() * 360;
    flakes.style.left = Math.random() * 100 + '%'; // Position within #winter width
    flakes.style.animationDuration = 6 + Math.random() * 5 + 's';
    flakes.style.fontSize = 8 + Math.random() * 10 + 'px';
    flakes.style.transform = `rotate(${initialRotation}deg)`;

    winterContainer.appendChild(flakes);

    // Remove flakes when animation ends
    flakes.addEventListener('animationend', () => {
        flakes.remove();
    });
}, 600);

//SNOW-BALL EFFECT

