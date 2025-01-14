// Temporary snow effect
const snowflakeCount = 30;
const maxSnowflakes = 100;
let activeSnowflakes = 0;

const isWinter = () => {
  const now = new Date();
  const month = now.getMonth();
  const day = now.getDate();

  return (month === 11 && day >= 1) || // December
         (month === 0) ||             // January
         (month === 1 && day <= 29);  // February
};

const createSnowflake = () => {
  if (activeSnowflakes >= maxSnowflakes) return;
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerText = '*';

  const initialRotation = Math.random() * 360;
  snowflake.style.left = Math.random() * 100 + 'vw';
  snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
  snowflake.style.fontSize = 8 + Math.random() * 10 + 'px';
  snowflake.style.transform = `rotate(${initialRotation}deg)`;

  document.body.appendChild(snowflake);
  activeSnowflakes++;

  const updateSnowflake = () => {
    const rotation = parseFloat(snowflake.style.transform.replace(/rotate\((.*)deg\)/, '$1')) || initialRotation;
    snowflake.style.transform = `rotate(${rotation + 1}deg)`;
    requestAnimationFrame(updateSnowflake);
  };

  updateSnowflake();

  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
    activeSnowflakes--;
  });
};

if (isWinter()) {
  for (let i = 0; i < snowflakeCount; i++) {
    createSnowflake();
  }

  setInterval(() => {
    createSnowflake();
  }, 600);
}