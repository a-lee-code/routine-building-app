

document.addEventListener("DOMContentLoaded", function () {
    // Handle checkboxes
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach((checkbox) => {
        // Load saved state from localStorage
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState === "true") {
            checkbox.checked = true;
        }

        // Save checkbox state to localStorage on change
        checkbox.addEventListener("change", function () {
            localStorage.setItem(checkbox.id, checkbox.checked.toString());
        });
    });

    // Handle text inputs
    const textInputs = document.querySelectorAll("input[type='text']");

    textInputs.forEach((input) => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }

        input.addEventListener("input", function () {
            localStorage.setItem(input.id, input.value);
        });
    });

    // Handle Clear All buttons
    const clearButtons = document.querySelectorAll(".clear-btn");

    clearButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Clear all checkboxes
            checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
                localStorage.removeItem(checkbox.id); // Remove saved state from localStorage
            });

        
        });
    });
});
