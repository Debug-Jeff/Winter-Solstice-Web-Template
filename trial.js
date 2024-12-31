const snowflakeCount = 1000;
let mouseX = window.innerWidth / 2;
let smoothingFactor = 0.05;
let targetMouseX = mouseX;

window.addEventListener('mousemove', (event) => {
    targetMouseX = event.clientX;
});

const smoothMouseUpdate = () => {
    mouseX += (targetMouseX - mouseX) * smoothingFactor;
    requestAnimationFrame(smoothMouseUpdate);
};

smoothMouseUpdate();

for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerText = '*';

    const initialRotation = Math.random() * 360;
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
    snowflake.style.fontSize = 8 + Math.random() * 10 + 'px';
    snowflake.style.transform = `rotate(${initialRotation}deg)`;

    document.body.appendChild(snowflake);

    const updateSnowflake = () => {
        const rect = snowflake.getBoundingClientRect();
        const snowflakeX = rect.left + rect.width / 2;
        const distance = (mouseX - snowflakeX) * 0.02;
        const rotation = parseFloat(snowflake.style.transform.replace(/rotate\((.*)deg\)/, '$1')) || initialRotation;
        snowflake.style.transform = `translateX(${distance}px) rotate(${rotation + 1}deg)`;
        requestAnimationFrame(updateSnowflake);
    };

    updateSnowflake();

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}

setInterval(() => {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerText = '*';

    const initialRotation = Math.random() * 360;
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = 6 + Math.random() * 5 + 's';
    snowflake.style.fontSize = 8 + Math.random() * 10 + 'px';
    snowflake.style.transform = `rotate(${initialRotation}deg)`;

    document.body.appendChild(snowflake);

    const updateSnowflake = () => {
        const rect = snowflake.getBoundingClientRect();
        const snowflakeX = rect.left + rect.width / 2;
        const distance = (mouseX - snowflakeX) * 0.02;
        const rotation = parseFloat(snowflake.style.transform.replace(/rotate\((.*)deg\)/, '$1')) || initialRotation;
        snowflake.style.transform = `translateX(${distance}px) rotate(${rotation + 1}deg)`;
        requestAnimationFrame(updateSnowflake);
    };

    updateSnowflake();

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
    });
}, 600);