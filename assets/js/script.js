/*question array for the 4 questions in the quiz*/
var questions = [

    {
        prompt: "Which is a primitive type in Javascript?",
        options: ["Paragraphs", "Elements", "Signs", "Numbers"],
        answer: "Numbers"
    },

    {
        prompt: "What is HTML",
        options: ["hypertext markup language", "help the makeup ladies", "how to make lettuce", "none"],
        answer: "hypertext markup language"
    },

    {
        prompt: "What is JavaScript?",
        options: ["JavaScript is a scripting language used to make the website interactive", 
        "it is an assembly language used for workers on assembly lines",
         "it compiles to make websites interact", "none"],
        answer: "JavaScript is a scripting language used to make the website interactive"
    },

    {
        prompt: " Which of the following is correct about JavaScript?",
        options: ["JavaScript is an Object-Based language",
         "JavaScript is an Object-Oriented language", "Javascript is a language that helps heal people", "none"],
        answer: "JavaScript is an Object-Based language" 
    },

    {
        prompt: "Which of the following scoping type does JavaScript use?",
        options: ["Lexical", "Chronological", "Sequencing", "unordered lists"],
        answer: "Lexical"
    }];

    /*creating variables that are linked with the IDs in the index file/element*/

    var questionsEl = document.querySelector('#question');
    var timer = document.querySelector('#timeLeft');
    var optionsEl = document.querySelector('#optionDiv');
    var submit = document.querySelector('#submission');
    var start = document.querySelector('#start-Quiz');
    var names = document.querySelector('#name');
    var restart = document.querySelector("#restart");
    var promptF = document.querySelector("#promptF");


    //DOM

    //Quiz
    var currentQuestion1 = 0;
    var time = questions.length * 15;
    var timerIdentifcator;


    //quiz begin
//sets increment of time with begnning screen and removes 
    function startQuiz () {
        timerIdentifcator = setInterval(timerTick, 1500);
        timer.textContent = time;
        var beginningScreen = document.getElementById("beginn");
        beginningScreen.setAttribute('class', 'hidden');
        questionsEl.removeAttribute('class');
        getQuestion();
    }

    //array loops questions. creates variables to get the questions and choices for them to appear on the screen after finishing the previous questions

    function getQuestion() {
        var currentQuestion = questions[currentQuestion1];
        var promptEl = document.getElementById("question-Contain");
        promptEl.textContent = currentQuestion.prompt;
        optionsEl.innerHTML = "";
        currentQuestion.options.forEach(function(choice, i) {
            var optionButton = document.createElement("button");
            optionButton.setAttribute("value", choice);
            optionButton.textContent = i + 1 + ". " + choice;
            optionButton.onclick = questionClick;
            optionsEl.appendChild(optionButton);
        })
            
        }
    //creates a function for getting the question qron which is -10 seconds as well as has it for correct questions

        function questionClick() {
            if (this.value !== questions[currentQuestion1].answer){
                time -= 20;
                if (time<0){
                    time = 0;
                }
                timer.textContent = time;
                promptF.textContent = `wrong, correct answer is ${questions[currentQuestion1].answer}.`;
                promptF.style.color = "red";

            } else {
                promptF.textContent = "correct";
                promptF.style.color = "Green";
            }
            promptF.setAttribute("class", "promptF");
            setTimeout(function() {
                promptF.setAttribute("class", "PromptF");
            }, 3000)
            currentQuestion1++;
            if(currentQuestion1 == questions.length) {
                quizEnd();
            }else {
                getQuestion();
            }
        }
//when finished with the quiz this clears out timer, gets rid of questions and answers and gives the final score. 
        function quizEnd(){
            clearInterval(timerIdentifcator);
            var screenF= document.getElementById("end-quiz");
            screenF.removeAttribute("class");
            var scoreF = document.getElementById("finalScore");
            scoreF.textContent = time;
            questionsEl.setAttribute("class", "hidden");
        }

        function timerTick() {
            time--;
            timer.textContent = time;
            if(time <= 0) {
                quizEnd();
            }
        }
//gives function to enter name for your highscore and trims it down so there is no whitespace. also creates an item to store via localstorage
        function highscoreSaving() {
            var name = names.value.trim();
            if (name !== "") {
                var highscore =
        JSON.parse(window.localStorage.getItem("highscore")) || [];
      var scoreN = {
        score: time,
        name: name
      };
      highscore.push(scoreN);
      window.localStorage.setItem("highscore", JSON.stringify(highscore));
            }
        }
//submit function for the highscore list
        function userSubmit (event){
            if(event.key =="Enter"){
                saveScore();
            }
        }//optional buttons on highscore screen
        names.onkeyup = userSubmit;
        submit.onclick = highscoreSaving;
        start.onclick = startQuiz;