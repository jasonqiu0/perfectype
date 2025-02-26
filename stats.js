function updateStats() {
    const wordElements = document.querySelectorAll("#words .word");
    const totalWords = wordElements.length;
    
    let totalLetters = 0;
    wordElements.forEach(word => {
      totalLetters += word.querySelectorAll(".letter").length;
    });
  
    const correctLetters = document.querySelectorAll("#words .letter.correct").length;
    
    const typedLetters = document.querySelectorAll("#words .letter.correct, #words .letter.incorrect").length;
    
    let finishedWords = 0;
    let correctWords = 0;
    wordElements.forEach(word => {
      if (word.classList.contains("finished")) {
        finishedWords++;
        if (!word.querySelector(".letter.incorrect")) {
          correctWords++;
        }
      }
    });

    let wordAccuracy = typedWords > 0 ? Math.round((correctWords / typedWords) * 100) : 0;
    let letterAccuracy = typedCharacters > 0 ? Math.round((correctCharacters / typedCharacters) * 100) : 0;

    document.getElementById("correctWords").textContent = `Correct Words: ${correctWords} / ${totalWords}`;
    document.getElementById("wordsTyped").textContent = `Words Typed: ${finishedWords} / ${totalWords}`;
    document.getElementById("correctLetters").textContent = `Correct Letters: ${correctLetters} / ${totalLetters}`;
    document.getElementById("charactersTyped").textContent = `Characters Typed: ${typedLetters} / ${totalLetters}`;

    document.getElementById("wordAccuracy").textContent = `Word Accuracy: ${wordAccuracy}%`;
    document.getElementById("letterAccuracy").textContent = `Letter Accuracy: ${letterAccuracy}%`;

    if (finishedWords == totalWords && timeStarted) {
      const finalTime = (Date.now() - timeStart) / 1000;
      stopTime();
    }

}
  
document.getElementById("game").addEventListener("keyup", updateStats);

