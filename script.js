/*====================NAVIGATION SCROLL====================*/
const nav = document.querySelector("#main-nav");

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

window.addEventListener("scroll", () => {
  if (mediaQuery && !mediaQuery.matches) {
    throttle(handleNavScroll, 250);
  }
});

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

/*====================MODAL FUNCTIONALITY====================*/
const modal = document.getElementById('modal');
const modalGallery = document.getElementById('modal-gallery');
const closeBtn = document.querySelector('.close-btn');
const boxElements = document.querySelectorAll('.box');

// Gallery style configuration
const modalStyles = {
    newgrange: 'grid-gallery',     // Design 1
    intiraymi: 'flex-gallery',     // Design 2
    modranicht: 'grid-gallery',    // Design 1
    koliada: 'flex-gallery'        // Design 2
};

// Image arrays (replace with your actual image URLs)
const images = {
    newgrange: [
        'assets/Celebrations/Newgrange/img-300.jfif',
        'assets/Celebrations/Newgrange/img-301.jfif',
        'assets/Celebrations/Newgrange/img-302.jfif',
        'assets/Celebrations/Newgrange/img-303.jfif',
        'assets/Celebrations/Newgrange/img-304.jfif',
        'assets/Celebrations/Newgrange/img-305.jfif',
        'assets/Celebrations/Newgrange/img-306.jfif',
        'assets/Celebrations/Newgrange/img-307.jfif',
        'assets/Celebrations/Newgrange/img-308.jfif',
        'assets/Celebrations/Newgrange/img-309.jfif'
    ],
    intiraymi: [
        'assets/Celebrations/IntiRaymi/img-200.jfif',
        'assets/Celebrations/IntiRaymi/img-201.jfif',
        'assets/Celebrations/IntiRaymi/img-202.jfif',
        'assets/Celebrations/IntiRaymi/img-204.jfif',
        'assets/Celebrations/IntiRaymi/img-205.jfif',
        'assets/Celebrations/IntiRaymi/img-206.jfif',
        'assets/Celebrations/IntiRaymi/img-207.jfif',
        'assets/Celebrations/IntiRaymi/img-208.jfif',
        'assets/Celebrations/IntiRaymi/img-209.jfif',
        'assets/Celebrations/IntiRaymi/img-210.jfif'
    ],
    modranicht: [
        'assets/Celebrations/Modranicht/img-400.jfif',
        'assets/Celebrations/Modranicht/img-401.jfif',
        'assets/Celebrations/Modranicht/img-402.jfif',
        'assets/Celebrations/Modranicht/img-403.jfif',
        'assets/Celebrations/Modranicht/img-404.jfif',
        'assets/Celebrations/Modranicht/img-405.jfif',
        'assets/Celebrations/Modranicht/img-406.jfif',
        'assets/Celebrations/Modranicht/img-407.jfif',
        'assets/Celebrations/Modranicht/img-408.jfif',
        'assets/Celebrations/Modranicht/img-409.jfif'

    ],
    koliada: [
        'assets/Celebrations/Koliada/img-100.jfif',
        'assets/Celebrations/Koliada/img-101.jfif',
        'assets/Celebrations/Koliada/img-102.jfif',
        'assets/Celebrations/Koliada/img-103.jfif',
        'assets/Celebrations/Koliada/img-104.jfif',
        'assets/Celebrations/Koliada/img-105.jfif',
        'assets/Celebrations/Koliada/img-106.jfif',
        'assets/Celebrations/Koliada/img-107.jfif',
        'assets/Celebrations/Koliada/img-108.jfif',
        'assets/Celebrations/Koliada/img-109.jfif'
    ]
};

// Event handler for box clicks
boxElements.forEach(box => {
    box.addEventListener('click', () => {
        const celebration = box.getAttribute('data-celebration');
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        modalGallery.innerHTML = '';
        const selectedImages = images[celebration];
        
        if (modalStyles[celebration] === 'grid-gallery') {
            modalGallery.className = 'grid-gallery';
            selectedImages.slice(0, 9).forEach(src => {
                const imgElement = document.createElement('img');
                imgElement.src = src;
                imgElement.alt = 'Celebration Image';
                modalGallery.appendChild(imgElement);
            });
        } else {
            modalGallery.className = 'flex-gallery';
            selectedImages.slice(0, 7).forEach(src => {
                const li = document.createElement('li');
                const imgElement = document.createElement('img');
                imgElement.src = src;
                imgElement.alt = 'Celebration Image';
                li.appendChild(imgElement);
                modalGallery.appendChild(li);
            });
        }
    });
});

// Close modal events
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});


/*====================PARTICLE ANIMATIONS====================*/
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

/*====================MAIN LOOP AND CANVAS INITIALIZATION====================*/
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

// Falling-Snowflake effect
function createSnowflakes() {
  const header = document.getElementById('main-header');
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
  header.appendChild(snowflake);
  
  setTimeout(() => snowflake.remove(), 5000);
}

setInterval(createSnowflakes, 500);


