function updateProgressBar() {
    // Check if needed elements exist before proceeding
    const progressBarElement = document.getElementById("progress-bar");
    const percentageElement = document.getElementById("percentage");
    
    // If elements don't exist, don't proceed with the update
    if (!progressBarElement || !percentageElement) return;
    
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

    progressBarElement.textContent =
        '▮'.repeat(filledBars) + '▯'.repeat(emptyBars);
    percentageElement.textContent = `${percentage}%`;

    // Store the animation frame ID for potential cleanup
    window.progressBarAnimationFrame = requestAnimationFrame(updateProgressBar);
}

document.addEventListener('DOMContentLoaded', function() {
    const recapYearElement = document.getElementById("recap-year");
    const currentYearElement = document.getElementById("current-year");
    
    // Only set content if elements exist
    if (recapYearElement) recapYearElement.textContent = new Date().getFullYear() - 1;
    if (currentYearElement) currentYearElement.textContent = new Date().getFullYear();
    
    updateProgressBar();
});