function updateProgressBar() {
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(`${year}-01-01T00:00:00`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00`);
    const totalMillis = endOfYear - startOfYear;
    const elapsedMillis = now - startOfYear;
    const percentage = Math.min((elapsedMillis / totalMillis) * 100, 100).toFixed(6);

    const totalBars = 30;
    const filledBars = Math.floor((percentage / 100) * totalBars);
    const emptyBars = totalBars - filledBars;

    document.getElementById("progress-bar").textContent =
        '▮'.repeat(filledBars) + '▯'.repeat(emptyBars);
    document.getElementById("percentage").textContent = `${percentage}%`;

    requestAnimationFrame(updateProgressBar);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("recap-year").textContent = new Date().getFullYear() - 1;
    document.getElementById("current-year").textContent = new Date().getFullYear();
    updateProgressBar();
});