const image = document.getElementById("waldo-image");
const targetBox = document.getElementById("target-box");
const select = document.getElementById("character-select");
const checkBtn = document.getElementById("check-btn");

let clickX, clickY;

// Show targeting box on click
image.addEventListener("click", (e) => {
    const rect = image.getBoundingClientRect();
    clickX = e.clientX - rect.left;
    clickY = e.clientY - rect.top;

    targetBox.style.left = `${clickX}px`;
    targetBox.style.top = `${clickY}px`;
    targetBox.classList.remove("hidden");
});

// Hide box if clicked outside
document.addEventListener("click", (e) => {
    if (!targetBox.contains(e.target) && e.target !== image) {
        targetBox.classList.add("hidden");
    }
});

// Check click with backend
checkBtn.addEventListener("click", async () => {
    const character = select.value;
    if (!character) return alert("Select a character!");

    const response = await fetch("http://localhost:3000/api/game/check", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ character, x: clickX, y: clickY })
    });

    const result = await response.json();
    if (result.correct) {
        alert(`Correct! You found ${character}`);
        const marker = document.createElement("div");
        marker.style.position = "absolute";
        marker.style.left = `${clickX-10}px`;
        marker.style.top = `${clickY-10}px`;
        marker.style.width = "20px";
        marker.style.height = "20px";
        marker.style.background = "red";
        marker.style.borderRadius = "50%";
        image.parentElement.appendChild(marker);
    } else {
        alert("Wrong! Try again.");
    }

    targetBox.classList.add("hidden");
});
