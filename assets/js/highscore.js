var scoring = document.querySelector('#highScoreHeader');

function HighscoreLog () {
    var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];
    highscore.sort(function (a , b) {
        return b.score - a.score;
    });
    highscore.forEach(function(score) {
        var listT = document.createElement("li");
        listT.textContent = score.name + " - " + score.score;
        var OrderedLi = document.getElementById("highscore");
        OrderedLi.appendChild(listT);

     } );
    }

    function emptyScore() {
        window.localStorage.removeItem("highscore");
        window.location.reload();

    }
    document.getElementById("empty").onclick = emptyScore;
    HighscoreLog();