const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-t'));
const displayText = document.querySelector('#displaytext');
const scoreNum = document.querySelector('#score');
const progressbarfull = document.querySelector('#progressbarfull');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What is Javascript",
        choice1: '2',
        choice2: '6',
        choice3: '4',
        choice4: '5',
        answer: 1,
    },

    {
        question: 'What is a WEB API',
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 2,
    },

    {
        question: "How do we linik the Javascript file within an HTML file",
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 3,
    },

    {
        question: "When using JSON what is Parse",
      
        choice1: '2',
        choice2: '3',
        choice3: '4',
        choice4: '5',
        answer: 4,

    }


    
]
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/final.html');
    }
    questionCounter++;
    displayText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressbarfull.style.width = `${(questionCounter/MAX_QUESTIONS)* 100}%`;
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerext = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply == 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)
    })
})

incrementScore = num => {
    score+= num;
    scoreNum.innerText = score;

}

startGame();