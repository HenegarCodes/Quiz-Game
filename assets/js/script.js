var questions = [

    {
        prompt: "Inside which ",
        options: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },

    {
        prompt: "How do you call ",
        options: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
    },

    {
        prompt: "How does a fo",
        options: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", " for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i++)"
    },

    {
        prompt: "?",
        options: ["|", "&&", "%", "/"],
        answer: "&&" 
    },

    {
        prompt: " to store and retrieve d___.",
        options: ["method", "assignment operator", "variable", "string"],
        answer: "variable"
    }];

    var questions = document.querySelector('#questions');
    var timer = document.querySelector('#timeLeft');
    var options = document.querySelector('#optionDiv');
    var submit = document.querySelector('#submission');
    var  start = document.querySelector('#start-Quiz');
    var name = document.querySelector('#name');
    var restart = document.querySelector("#restart");
    var promptF = document.querySelector("promptF");


    //DOM

    //Quiz
    var currentQuestion = 0;
    var time = questions.length * 15;
    var timerId;


    //quiz begin

    function startQuiz () {
        timerId = setInterval(clockTick, 1000);
        timer.textContent = time;
        var beginningScreen = document.getElementById("begin");
        beginningScreen.setAttribute('class', 'hide');
        questions.removeAttribute("class");
        getQuestion();
    }

    //array loops questions

    function getQuestion() {
        var currentQuestion = questions[currentQuestion];
        var qPrompt = document.getElementById("question-contain");
        qPrompt.textContent = currentQuestion.prompt;
        options.innerHTML = "";
        currentQuestio.options.forEach(function(choice, i) {
            var optionButton = document.createElement("button");
            optionButton.setAttribute("value", choice);
            optionButton.onclick = questionClick;
            options.appendChild(optionButton);
        })
            
        }
    

        function questionClick() {
            if (this.value !== questions[currentQuestion].answer){
                time -= 10;
                if (time<0){
                    time = 0;
                }
                timer.textContent = time;
                promptF.textContent = `wrong, correct answer is ${questions[currentQuestion].answer}`;
                promptF.style.color = "red";

            } else {
                promptF.textContent = "correct";
                promptF.style.color = "Green";
            }
            promptF.setAttribute("class", "promptF");
            setTimeout(function() {
                promptF.setAttribute("class", "PromptF");
            }, 2000)
            currentQuestion++;
            if(currentQuestion == questions.length) {
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
            questions.setAttribute("class", "hidden");
        }

        function timerTick() {
            time--;
            timer.textContent = time;
            if(time <= 0) {
                quizEnd();
            }
        }

        function HighscoreSaving() {
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
        submit.onclick = saveScore;
        start.onclick = startQuiz;