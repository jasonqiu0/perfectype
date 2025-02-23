const words = 'the this and that with from word but what some can like time just now know take good new come used work long way look very only day use man find here thing give many well want need life call right back mean even name same tell help talk turn move start show play live hold large must big high such follow act why ask keep try last off need put end does set three small own home read hand part place year change much about after before again great where through because different while point group still those leave between old under state run house world let side begin seem next hard open example together white children head story always without grow stop few food land real leave let above kind every around form need air mother father boy girl animal answer learn carry country school plant sentence letter picture soon song river idea city sea second book eye face watch far close night light song leave family door song car dog cat fish bird horse tree star space cloud grass road fire glass stone rain sun moon king queen happy sad fun fast slow big small high low easy hard young old right left hot cold dark light rich poor best worst early late short long new old first last north south east west'.split(' ');
const wordsLen = words.length;

function addClass(element, name) {
    return element.className += ' '+name
}

function removeClass(element,name) {
    return element.className = element.className.replace(name,''); 
}

function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordsLen);
    return words[randomIndex]; 
}


function wordToDiv(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function startGame() {
    document.getElementById('words').innerHTML = '';
    for(let i = 0; i < wordsLen; i++) {
        document.getElementById('words').innerHTML += wordToDiv(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');

}

document.getElementById("game").addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';
    const isBackspace = key === 'Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;
    
    console.log({key,expected});

    if(isLetter) {
        if(currentLetter) {
            if(key == expected) {
                addClass(currentLetter, 'correct');
                removeClass(currentLetter, 'current');
            }
            else if(key != expected) {
                addClass(currentLetter, 'incorrect');
                removeClass(currentLetter, 'current');
            }
            if (currentLetter.nextElementSibling) {
                addClass(currentLetter.nextElementSibling, 'current');
            } 
        }
    }

    if (isSpace) {
        if (expected !== ' ') {
          const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
          lettersToInvalidate.forEach(letter => {
            addClass(letter, 'incorrect');
          });
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
          removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
      }
    const threshold = 60;
    if (currentWord.nextSibling) { 
        const newCurrentWord = document.querySelector('.word.current');
        if(newCurrentWord && newCurrentWord.offsetTop > threshold) {
            const scrollAmount = newCurrentWord.offsetTop - threshold;
            document.getElementById('words').style.transform = `translateY(-${scrollAmount}px)`;
        }
    }

});


startGame();
