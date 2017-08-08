window.onload = function () {
    document.getElementById("Orange").addEventListener("click", incrementCounter);
}

function incrementCounter() {
    var val = parseInt(document.getElementById("countLbl").textContent) + 1;
    document.getElementById("countLbl").textContent = val;
}