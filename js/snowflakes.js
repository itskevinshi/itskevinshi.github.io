// temporary snow effect
const snowflakeCount = 10;

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
    const rotation = parseFloat(snowflake.style.transform.replace(/rotate\((.*)deg\)/, '$1')) || initialRotation;
    snowflake.style.transform = `rotate(${rotation + 1}deg)`;
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
    const rotation = parseFloat(snowflake.style.transform.replace(/rotate\((.*)deg\)/, '$1')) || initialRotation;
    snowflake.style.transform = `rotate(${rotation + 1}deg)`;
    requestAnimationFrame(updateSnowflake);
  };

  updateSnowflake();

  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}, 600);
