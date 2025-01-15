function updateCountdown() {
    const now = new Date();
    const nineAM = new Date();
    const fivePM = new Date();
    const midnight = new Date();
    const weekday = now.getDay();

    // Set time boundaries for the workday
    nineAM.setHours(9, 0, 0, 0);
    fivePM.setHours(17, 0, 0, 0);
    midnight.setHours(0, 0, 0, 0);

    const countdownElement = document.getElementById('countdown');

    // Workday check: Monday (1) to Friday (5)
    if (weekday >= 1 && weekday <= 5) {
        if (now >= nineAM && now <= fivePM) {
            // Calculate remaining time to 5 PM
            const diffMs = fivePM - now;
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            // Display countdown to 5 PM
            if (countdownElement) {
                countdownElement.textContent = `Time until 5 PM: ${hours}h ${minutes}m`;
            }
        } else if (now >= fivePM) {
            // After work hours
            if (countdownElement) {
                countdownElement.textContent = "Work's done! Phew...";
            }
        } else if (now < nineAM) {
            // Before work hours (if after midnight, but not yet 9 AM)
            if (countdownElement) {
                countdownElement.textContent = "You're up early! Almost time to start!";
            }
        }
    } else {
        // Weekend or non-workday
        if (countdownElement) {
            countdownElement.textContent = "It's the weekend! Time to relax!";
        }
    }

    // Refresh every minute
    setTimeout(updateCountdown, 60000);
}

// Initialize countdown
updateCountdown();
