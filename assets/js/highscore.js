var scoring = document.querySelector('#highScoreHeader');
/*create function that will have a variable for highscores and change it from a string. this then sorts them in decsending order*/
function HighscoreLog () {
    var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];
    highscore.sort(function (a , b) {
        return b.score - a.score;
    });/*also associates the score with the name that it was taken with*/
    highscore.forEach(function(score) {
        var listT = document.createElement("li");
        listT.textContent = score.name + " - " + score.score;
        var OrderedLi = document.getElementById("highscore");
        OrderedLi.appendChild(listT);

     } );
    }
    /*empty scores function as explained in the index.html. this will also loig the highscores*/

    function emptyScore() {
        window.localStorage.removeItem("highscore");
        window.location.reload();

    }
    document.getElementById("empty").onclick = emptyScore;
    HighscoreLog();