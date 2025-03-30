document.addEventListener("DOMContentLoaded", function () {
    // Function to update streak and progress
    function updateStreakAndProgress() {
        const tasks = document.querySelectorAll("input[type='checkbox']");
        let completedTasks = 0;
        let totalTasks = 0;

        // Loop through the tasks and calculate progress
        tasks.forEach((task) => {
            const taskId = task.id;
            const taskCompleted = localStorage.getItem(taskId) === "true";

            if (taskCompleted) {
                completedTasks++;
            }
            totalTasks++;
        });

        // Calculate streak
        let streak = localStorage.getItem("streak") || 0;
        const lastCompletedDate = localStorage.getItem("lastCompletedDate");
        const today = new Date().toDateString();

        if (lastCompletedDate !== today && completedTasks === totalTasks) {
            streak = parseInt(streak) + 1; // Increment streak if all tasks are completed
        }

        localStorage.setItem("lastCompletedDate", today);
        localStorage.setItem("streak", streak);

        // Update the streak display
        document.getElementById("streak-count").textContent = `${streak} day${streak !== 1 ? 's' : ''}`;

        // Update the task progress
        const progressList = document.getElementById("task-list");
        progressList.innerHTML = ""; // Clear the previous list

        tasks.forEach((task) => {
            const taskId = task.id;
            const taskCompleted = localStorage.getItem(taskId) === "true";
            const taskLabel = task.nextElementSibling.textContent;

            const listItem = document.createElement("li");
            listItem.textContent = `${taskLabel}: ${taskCompleted ? "Completed" : "Not Completed"}`;
            progressList.appendChild(listItem);
        });
    }

    // Listen for checkbox state changes to update progress
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const taskId = checkbox.id;
            localStorage.setItem(taskId, checkbox.checked.toString());

            // Update streak and progress after every change
            updateStreakAndProgress();
        });
    });

    // Reset progress button
    document.getElementById("reset-progress").addEventListener("click", function () {
        localStorage.removeItem("streak");
        localStorage.removeItem("lastCompletedDate");

        // Reset all checkbox states
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
            localStorage.setItem(checkbox.id, "false");
        });

        // Recalculate and update progress
        updateStreakAndProgress();
    });

    // Initial update on page load
    updateStreakAndProgress();
});
