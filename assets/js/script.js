var questions = [

    {
        prompt: "Which is a primitive type in Javascript?",
        options: ["Paragraphs", "Elements", "Signs", "Numbers"],
        answer: "<script>"
    },

    {
        prompt: "How do you call a function?",
        options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
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

    var questionsEl = document.querySelector('#question');
    var timer = document.querySelector('#timeLeft');
    var options = document.querySelector('#optionDiv');
    var submit = document.querySelector('#submission');
    var start = document.querySelector('#start-Quiz');
    var name = document.querySelector('#name');
    var restart = document.querySelector("#restart");
    var promptF = document.querySelector("#promptF");


    //DOM

    //Quiz
    var currentQuestion1 = 0;
    var time = questions.length * 15;
    var timerId;


    //quiz begin

    function startQuiz () {
        timerId = setInterval(timerTick, 1000);
        timer.textContent = time;
        var beginningScreen = document.getElementById("beginn");
        beginningScreen.setAttribute('class', 'hidden');
        questionsEl.removeAttribute('class');
        getQuestion();
    }

    //array loops questions

    function getQuestion() {
        var currentQuestion = questions[currentQuestion1];
        var promptEl = document.getElementById("question-Contain");
        promptEl.textContent = currentQuestion.prompt;
        options.innerHTML = "";
        currentQuestion.options.forEach(function(choice, i) {
            var optionButton = document.createElement("button");
            optionButton.setAttribute("value", choice);
            optionButton.onclick = questionClick;
            options.appendChild(optionButton);
        })
            
        }
    

        function questionClick() {
            if (this.value !== questions[currentQuestion1].answer){
                time -= 10;
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
            }, 2000)
            currentQuestion1++;
            if(currentQuestion1 == questions.length) {
                quizEnd();
            }else {
                getQuestion();
            }
        }

        function quizEnd(){
            clearInterval(timerId);
            var finalScreen = document.getElementById("end-quiz");
            finalScreen.removeAttribute("class");
            var finalScore = document.getElementById("finalScore");
            finalScore.textContent = time;
            questionsEl.setAttribute("class", "hidden");
        }

        function timerTick() {
            time--;
            timer.textContent = time;
            if(time <= 0) {
                quizEnd();
            }
        }

        function highscoreSaving() {
            var name = name.value.trim();
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

        function userSubmit (event){
            if(event.key =="Enter"){
                saveScore();
            }
        }
        name.onkeyup = userSubmit;
        submit.onclick = highscoreSaving;
        start.onclick = startQuiz;