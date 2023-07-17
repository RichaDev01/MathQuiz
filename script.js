// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

//equations
let questionsAmount = 0;
let equationArray=[];

//game play
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];

//get random numbers
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

//create correct/incorrect random equations
function createEquation(){
//randomly choose how many correct equations there should be
const correctEquations =  getRandomInt(questionsAmount);
const wrongEquations = questionsAmount - correctEquations;  

//loop through, and multiply random numbers upto 9, push to array
for(let i=0;i<correctEquations; i++){
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber * secondNumber;
    const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
    equationObject = {value:equation, evaluated:'true'};
    equationArray.push(equationObject);
}

//loop through, mess with equations results, push to array
for(let i=0; i<wrongEquations;i++){
    firstNumber = getRandomInt(9);
    secondNumber = getRandomInt(9);
    const equationValue = firstNumber*secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`
    const formatChoice = getRadioValue(3);
    const equation = wrongFormat[formatChoice];
    equationObject = {value:equation, evaluated: 'false'};
    equationArray.push(equationObject);

}

}

//display 3,2,1, go!
function countdownStart(){
countdown.textContent = '3';
setTimeout(()=>{
    countdown.textContent = '2';
},1000)
setTimeout(()=>{
    countdown.textContent = '1';
},2000)
setTimeout(()=>{
    countdown.textContent = 'Go!';
},3000)
}

//navigate from spash page to countdown page
function showCountdown(){
    countdownPage.hidden = false;
    splashPage.hidden = true;
    countdownStart();
    createEquation();
}

//get the value from selected radio button
function getRadioValue(){
    let radioValue;
    radioInputs.forEach((radioInput)=>{
        if(radioInput.checked){
            radioValue = radioInput.value;
        }
        
    });
    return radioValue;
}

//form that decides amount of questions
function selectQuestionAmount(e){
    e.preventDefault();
    questionsAmount = getRadioValue();
    console.log(questionsAmount);
    
    if(questionsAmount){
       showCountdown();
    }
}

startForm.addEventListener('click',()=>{
    radioContainers.forEach((radioEl)=>{
       radioEl.classList.remove('selected-label');
       if(radioEl.children[1].checked){
        radioEl.classList.add('selected-label');
       }
    })
});

//event listener
startForm.addEventListener('submit', selectQuestionAmount);