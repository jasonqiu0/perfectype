
wordsEasy = 'the this and that with from word but what some can like time just now know take good new come used work long way look very only day use man find here thing give many well want need life call right back mean even name same tell help talk turn move start show play live hold large must big high such follow act why ask keep try last off need put end does set three small own home read hand part place year change much about after before again great where through because different while point group still those leave between old under state run house world let side begin seem next hard open example together white children head story always without grow stop few food land real leave let above kind every around form need air mother father boy girl animal answer learn carry country school plant sentence letter picture soon song river idea city sea second book eye face watch far close night light song leave family door song car dog cat fish bird horse tree star space cloud grass road fire glass stone rain sun moon king queen happy sad fun fast slow big small high low easy hard young old right left hot cold dark light rich poor best worst early late short long new old first last north south east west'.split(' ');
wordsMedium = 'academy account achieve acquire active action adapt address advance advice affect agenda already amazing analysis ancient another anxiety approve argue arrange aspect assume attack attend attempt average balance banking barrier because become before behave belief benefit between billion breakthrough building cabinet capable capital capture careful central century certain chapter charity choice choose circuit classic college combine command comment  company compete concept concern conduct connect consent contact contain content contest context control counsel counter country crucial culture current custom damage decade decline  deposit desktop despite destroy develop device digital discuss disease display dispute diverse dynamic edition element elegant emerge energy engine enhance enormous entire entity episode equal equity error ethics examine example explain express extreme factory feature federal feeling fiction finance focused foreign forever formula function general global govern graduate greater happen healthy hearing history holiday honest however illegal imagine impact improve include initial inquiry insight install instead integral intend internal invest involve journal justice justify kitchen largely legacy limited logical machine manager manual marine maximum measure medical mention message mixture monitor monthly motive mystery natural neither network neutral nonetheless notion obtain  ongoing operate opinion organic overall  partial partner pattern penalty perform perhaps physical quiet quite random reading reality recover regular release relevant remains replace request resolve respect respond restore revenue reverse routine satisfy science section segment serious service session setting similar sincere society speaker special species sponsor station storage strange student subject success suggest summary support suppose sustain teacher telling theory through tonight total tourist traffic training transfer translate tremble trouble typical ultimate uncover unknown unusual upgrade variety various version victory visible waiting weather wedding willing winning without wonder worker writing'.split(' ');
wordsHard = 'awkward rhythm mnemonic sapphire labyrinth precarious exquisite zephyr quizzical juxtapose paradox kaleidoscope succinct enigmatic eccentric phenomenon transcend whimsical meticulous obstinate cumbersome redundant articulate diligent extravagant perseverance incandescent eloquent serendipity oscillate iridescent incorrigible multifaceted clandestine effervescent labyrinthine nonchalant quintessential silhouette juxtaposition meticulously capricious discombobulate ephemeral fortuitous gossamer haphazard insidious labyrinths mellifluous nebulous obfuscate panacea quintessentially rambunctious scintillating tenacious ubiquitous vivacious whirligig xenial yearnful abstruse belligerent circumvent dissonance efflorescence flamboyant grandiloquent hegemony idiosyncrasy juxtaposed kudos litigious magnanimous nebulosity oscillation perspicacious querulous recalcitrant salient tantamount unanimous veneration wistful xanthic yonder zeppelin acerbic benevolent contrarian disheveled ethereal fastidious gastronomic harmonious impetuous jocular kaleidoscopic lithe mellifluent nascent opulent picturesque quintessence rapturous undulating virtuoso winsome xenomorphic zephyrean audacious buoyant cerebral dexterous effervescing fractious galvanize hypotenuse judicious kinetic lucidity multifarious notorious oscillatory persnickety tenebrous ubiquitousness whiplash yesteryear zestful ambidextrous bombastic disingenuous effulgent frenetic gregarious harmoniousness luminous myriad obstreperous querulously rejuvenate scintilla tangential unflappable voracious whimsicalness xylophone yawning zygomatic ambivalence bibliophile conundrum disquietude enigmatically flamboyance gratuitous hypersensitive incongruous juxtaposing kaleidoscopically loquacious mellifluousness nonpareil obsequious paradoxical questionably rambunctiously salubrious tangibility unequivocal vacillate warrantable xenogeny yonderly zealotry acrobatic bellwether constellation dichotomy eccentricity fastidiously grandiosity haphazardly immensity juxtaposer kinesthetic labyrinthically mellifluously nebulousness oscillating persuasiveness questionnaire recalcitrantly sophisticated transcendence uncharacteristic veracity wretchedly xenotransplant yearnings zealousness discombobulated efflorescent gargantuan hierarchy jubilantly kleptomaniac luminescence misinterpretation nonconformist oscillograph preternatural'.split(' ');

words = wordsEasy
wordsLen = 25;
window.difficulty = "easy";

function addClass(element, name) {
    return element.className += ' '+name
}

function removeClass(element,name) {
    return element.className = element.className.replace(name,''); 
}

function randomWord() {
    const randomIndex = Math.floor(Math.random() * 210);
    return words[randomIndex]; 
}


function wordToDiv(word) {
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
}

function startGame() {
    document.getElementById('words').innerHTML = '';
    document.getElementById('words').style.transform = 'translateY(0px)';
    for(let i = 0; i < wordsLen; i++) {
        document.getElementById('words').innerHTML += wordToDiv(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
    
    typedCharacters = 0
    correctCharacters = 0
    typedWords = 0
    correctWords = 0
    document.getElementById("game").focus();
    resetChart();
}
document.getElementById("game").addEventListener('keydown', ev => {
    const key = ev.key;
    const isEscape = key === 'Escape';
    if(isEscape) {
        startGame();
        resetTime();
    }
});

let typedCharacters = 0
let correctCharacters = 0
let typedWords = 0
let correctWords = 0
document.getElementById("game").addEventListener('keyup', ev => {
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');
    const currentLetter = document.querySelector('.letter.current');
    const expected = currentLetter?.innerHTML || ' ';
    const isLetter = key.length === 1 && key !== ' ';
    const isSpace = key === ' ';

    console.log({key,expected});

    if(isLetter) {
        if(currentLetter) {
            if(key == expected) {
                addClass(currentLetter, 'correct');
                removeClass(currentLetter, 'current');
                typedCharacters += 1
                correctCharacters += 1
                console.log(correctCharacters)
            }
            else if(key != expected) {
                addClass(currentLetter, 'incorrect');
                removeClass(currentLetter, 'current');
                typedCharacters += 1

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
        typedWords += 1;
        if (!currentWord.querySelector('.letter.incorrect')) {
            correctWords += 1;
        }
        
        currentWord.classList.add("finished");
        document.querySelector('.word.current').classList.add("finished");
        
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
          removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }

    const threshold = 0.1;
    if (currentWord.nextSibling) { 
        const newCurrentWord = document.querySelector('.word.current');
        if(newCurrentWord && newCurrentWord.offsetTop > threshold) {
            const scrollAmount = newCurrentWord.offsetTop - threshold;
            document.getElementById('words').style.transform = `translateY(-${scrollAmount}px)`;
        }
    }

});

document.getElementById('game').addEventListener('keydown', () => {
    document.getElementById('game').classList.add('typing');
});

document.addEventListener('mousemove', () => {
    document.getElementById('game').classList.remove('typing');
});


startGame();
