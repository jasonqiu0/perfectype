function toggleButton(selector) {
    const group = document.querySelector(selector);
    if (!group) return;
    const buttons = group.querySelectorAll("button");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
  
        console.log(`Button ${button.id} clicked.`);
      });
    });
  }
  
  toggleButton("#wordsButtons");
  toggleButton("#difficultyButtons");


document.getElementById("10wordsButton").addEventListener("click", function() {
    wordsLen = 10;
    startGame();
    updateStats();
});

document.getElementById("25wordsButton").addEventListener("click", function() {
    wordsLen = 25;
    startGame();
    updateStats();
});

document.getElementById("50wordsButton").addEventListener("click", function() {
    wordsLen = 50;
    startGame();
    updateStats();
});

document.getElementById("easyButton").addEventListener("click", function() {
    words = wordsEasy;
    startGame();
    updateStats();
});

document.getElementById("mediumButton").addEventListener("click", function() {
    words = wordsMedium;
    startGame();
    updateStats();
});

document.getElementById("hardButton").addEventListener("click", function() {
    words = wordsHard;
    startGame();
    updateStats();
});

