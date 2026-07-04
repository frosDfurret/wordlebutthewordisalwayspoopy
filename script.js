// warning code is GARBAGE
// that's how you know it's not ai generated :>

row = 1;
column = 1;
currentGuess = [];
guessHistory = [];
win = false;
lose = false;
const regex = /^[a-zA-Z]$/;

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert("Copied to clipboard!!!!1");
    } catch (err) {
        alert("DID NOT COPY TRY AGAIN");
    }
}
function keyboard(key) {
    console.log(key);
    if (column < 6 && win == false) {
        currentGuess.push(key);
        let tile = document.getElementById(
            "row" + row + "column" + column + "tile",
        );
        tile.innerHTML = key;
        column += 1;
    } else if (win == true) {
        document.getElementById("winScreen").style.visibility = "visible";
    }
}

function doit() {
    console.log("doin it");
    if (column == 6) {
        for (var columnTest = 1; columnTest < 6; columnTest++) {
            tile = document.getElementById(
                "row" + row + "column" + columnTest + "tile",
            );
            key = document.getElementById("kb" + currentGuess[columnTest - 1]);
            let currentLetter = currentGuess[columnTest - 1];
            tile.style.transitionDelay =
                ((columnTest - 1) / 3 + 0.5).toString() + "s";
            tile.style.animationDelay = ((columnTest - 1) / 3).toString() + "s";
            tile.style.animationName = "flip";
            if (currentLetter == "P") {
                if (columnTest == 1 || columnTest == 4) {
                    tile.style.backgroundColor = "#6aaa64";
                    key.style.backgroundColor = "#6aaa64";
                    guessHistory.push("G");
                } else {
                    tile.style.backgroundColor = "#c9b458";
                    key.style.backgroundColor = "#c9b458";
                    guessHistory.push("Y");
                }
            } else if (currentLetter == "O") {
                if (columnTest == 2 || columnTest == 3) {
                    tile.style.backgroundColor = "#6aaa64";
                    key.style.backgroundColor = "#6aaa64";
                    guessHistory.push("G");
                } else {
                    tile.style.backgroundColor = "#c9b458";
                    key.style.backgroundColor = "#c9b458";
                    guessHistory.push("Y");
                }
            } else if (currentLetter == "Y") {
                if (columnTest == 5) {
                    tile.style.backgroundColor = "#6aaa64";
                    key.style.backgroundColor = "#6aaa64";
                    guessHistory.push("G");
                } else {
                    tile.style.backgroundColor = "#c9b458";
                    key.style.backgroundColor = "#c9b458";
                    guessHistory.push("Y");
                }
            } else {
                tile.style.backgroundColor = "gray";
                key.style.backgroundColor = "gray";
                guessHistory.push("X");
            }
            key.style.color = "white";
            /*
            tile.style.color = "white";
            tile.style.border = "0";
            */
        }
        if (currentGuess.join("") == "POOPY") {
            win = true;
            setTimeout(function () {
                document.getElementById("winScreen").style.visibility =
                    "visible";
            }, 3000);
        } else if (row == 6) {
            win = true;
            lose = true;
            document.getElementById("winMessage").innerHTML =
                "how did you lose i literally told you what the word is";
            setTimeout(function () {
                document.getElementById("winScreen").style.visibility =
                    "visible";
            }, 3000);
        }
        row += 1;
        column = 1;
        currentGuess = [];
    }
}

function deleteit() {
    console.log("deletin it");
    if (column > 1 && win == false) {
        column -= 1;
        currentGuess.pop();
        let tile = document.getElementById(
            "row" + row + "column" + column + "tile",
        );
        tile.innerHTML = "";
    }
}

function shareit() {
    guessHistoryTemp = [...guessHistory];
    let copyText =
        "I beat Wordle but the Word Is Always Poopy in " +
        guessHistoryTemp.join("").length / 5 +
        " guesses!";
    if (lose == true) {
        copyText = "I LOST Wordle but the Word Is Always Poopy somehow";
    }
    while (guessHistoryTemp.length > 0) {
        copyText += "\n";
        for (var i = 0; i < 5; i++) {
            if (guessHistoryTemp[0] == "G") {
                copyText += "🟩";
            } else if (guessHistoryTemp[0] == "Y") {
                copyText += "🟨";
            } else {
                copyText += "⬛";
            }
            guessHistoryTemp.shift();
        }
    }
    copyText += "\n" + window.location.href;
    console.log(copyText);
    copyToClipboard(copyText);
}

function closeit() {
    document.getElementById("winScreen").style.visibility = "hidden";
}

document.addEventListener("keydown", function (event) {
    if (regex.test(event.key)) {
        keyboard(event.key.toUpperCase());
    }
    if (event.key == "Enter") {
        doit();
    }
    if (event.key == "Backspace") {
        deleteit();
    }
});
