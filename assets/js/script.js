const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-t'));
const displayText = document.querySelector('#diplsayText');
const scoreNum = document.querySelector('#score');
const displaybarfull = document.querySelector('#displaybarfull');



let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;

