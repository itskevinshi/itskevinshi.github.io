const cursor = document.createElement('div');
cursor.style.width = '25px';
cursor.style.height = '25px';
cursor.style.borderRadius = '50%';
cursor.style.backgroundColor = 'white';
cursor.style.position = 'absolute';
cursor.style.zIndex = '9999';
cursor.style.mixBlendMode = 'difference';
cursor.style.pointerEvents = 'none';
cursor.style.transform = 'translate(-50%, -50%)'; // Center cursor
cursor.style.transition = 'width 0.2s, height 0.2s'; // Add transition effect
cursor.style.animation = 'breathe 2s ease-in-out infinite'; // Add breathe animation
document.body.appendChild(cursor);


// Create the outer ring element
const outerRing = document.createElement('div');
outerRing.style.width = '47px';
outerRing.style.height = '47px';
outerRing.style.borderRadius = '50%';
outerRing.style.border = '1px dashed white';
outerRing.style.position = 'absolute';
outerRing.style.zIndex = '9998';
outerRing.style.pointerEvents = 'none';
outerRing.style.transform = 'translate(-50%, -50%)'; // Center outer ring
outerRing.style.mixBlendMode = 'difference';
outerRing.style.animation = 'spin 20s linear infinite'; // Add spin animation
document.body.appendChild(outerRing);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';

  // Move the outer ring along with the cursor
  outerRing.style.left = e.pageX + 'px';
  outerRing.style.top = e.pageY + 'px';
});

const socialMediaIcons = document.querySelectorAll('.social-media-icons a');

socialMediaIcons.forEach(icon => {
  icon.addEventListener('mouseover', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
  });
  
  icon.addEventListener('mouseout', () => {
    cursor.style.width = '25px';
    cursor.style.height = '25px';
  });
});

const h2Elements = document.querySelectorAll('h2');

h2Elements.forEach(h2 => {
  h2.addEventListener('mouseover', () => {
    cursor.style.width = '45px';
    cursor.style.height = '45px';
  });
  
  h2.addEventListener('mouseout', () => {
    cursor.style.width = '25px';
    cursor.style.height = '25px';
  });
});

const toggleButton = document.querySelector('#toggle-button');

toggleButton.addEventListener('mouseover', () => {
  cursor.style.width = '45px';
  cursor.style.height = '45px';
});

toggleButton.addEventListener('mouseout', () => {
  cursor.style.width = '25px';
  cursor.style.height = '25px';
});