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
    
    document.getElementById("correctWordsStat").textContent = `Correct Words: ${correctWords} / ${totalWords}`;
    document.getElementById("wordsTypedStat").textContent = `Words Typed: ${finishedWords} / ${totalWords}`;
    document.getElementById("correctLettersStat").textContent = `Correct Letters: ${correctLetters} / ${totalLetters}`;
    document.getElementById("charactersTypedStat").textContent = `Characters Typed: ${typedLetters} / ${totalLetters}`;
}
  
document.getElementById("game").addEventListener("keyup", updateStats);
