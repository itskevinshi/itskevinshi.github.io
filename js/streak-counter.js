(function() {
  // Only run the streak counter if it hasn't been initialized yet
  if (window.streakCounterInitialized) return;
  
  // Set a flag to indicate the streak counter has been initialized
  window.streakCounterInitialized = true;
  
  const streakStartDate = new Date('2022-08-06T23:00:00');
  const now = new Date();
  const streakCount = Math.floor((now - streakStartDate) / (1000 * 60 * 60 * 24));
  
  const streakCounterElement = document.getElementById('streak-counter');
  if (streakCounterElement) {
    streakCounterElement.textContent = streakCount;
  }
})();