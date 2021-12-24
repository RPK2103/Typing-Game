const  word = document.getElementById('word'),
text = document.getElementById('text'),
scoreEl = document.getElementById('score'),
timeEl = document.getElementById('time'),
endgameEl = document.getElementById('end-game-container'),
settingsBtn = document.getElementById('settings-btn'),
settings = document.getElementById('settings'),
settingsForm = document.getElementById('settings-form'),
difficultySelect = document.getElementById('difficulty');

//list of words games- fetch words from api
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

//   Init word
let randomWord;

// Init score
let score =0;

// Init time
let time = 10;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// focus on text area when starts the game
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime , 1000);

// Generate random word from array
function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;

}

addWordToDOM();


// Update the score
function updateScore()
{
    score++;
    scoreEl.innerHTML = score;
}

// Update time
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        // end the game
        gameOver();
    }
}

// Game Over show end screen
function gameOver(){
    endgameEl.innerHTML = `
    <h1> Time Ran Out ☹ </h1>
    <p> Your final Score is ${score}</p>
    <button onclick = "location.reload()">Reload</button>

    `;

    endgameEl.style.display = 'flex';
}


// Event Listeners

// Typing
text.addEventListener('input', e=>{
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDOM();

        updateScore();
        // Clear
        e.target.value = '';
        if (difficulty === 'hard') {
            time += 2;
          } else if (difficulty === 'medium') {
            time += 3;
          } else {
            time += 5;
          }
        
        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', ()=>
settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});