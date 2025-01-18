const streakStartDate = new Date('2022-08-06T23:00:00');
const now = new Date();
const streakCount = Math.floor((now - streakStartDate) / (1000 * 60 * 60 * 24));
document.getElementById('streak-counter').textContent = streakCount;