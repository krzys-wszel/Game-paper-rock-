var newGameBtn = document.getElementById('js-newGameButton');

var pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    pickLizard = document.getElementById('js-playerPick_lizard'),
    pickSpock = document.getElementById('js-playerPick_spock');

var gameState = 'notStarted',  // ended//  started 
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
      break;
    case 'ended':
        newGameBtn.innerText = 'Play again';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}
setGameElements();

function newGame() {
  player.name = prompt('Please enter your name', 'your name');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();
    playerNameElem.innerHTML = player.name;
    setGamePoints(); 
  }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return possiblePicks[Math.floor(Math.random()*5)];
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    setTimeout(checkFinalResult,0);
} 

function setGamePoints() {
    playerPointsElem.innerText = player.score;
    computerPointsElem.innerText = computer.score;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'none';
    } else if (
        (computerPick === 'rock' &&  playerPick === 'scissors') ||
        (computerPick === 'scissors' &&  playerPick === 'paper') ||
        (computerPick === 'paper' &&  playerPick === 'rock') ||
        (computerPick === 'rock' &&  playerPick === 'lizard') ||
        (computerPick === 'scissors' &&  playerPick === 'lizard') ||
        (computerPick === 'paper' &&  playerPick === 'spock') ||
        (computerPick === 'lizard' &&  playerPick === 'spock') ||
        (computerPick === 'lizard' &&  playerPick === 'paper') ||
        (computerPick === 'spock' &&  playerPick === 'scissors') ||
        (computerPick === 'spock' &&  playerPick === 'rock')) {
        winnerIs = 'computer';
    }

    if (winnerIs === 'player') {
        playerResultElem.innerHTML = "Win!";
        computerResultElem.innerHTML = "Lose!";
        player.score++;
    } else if (winnerIs === 'computer') {
        computerResultElem.innerHTML = "Win!";
        playerResultElem.innerHTML = "Lose!";
        computer.score++;
    }
}

function checkFinalResult() {
	if (player.score === 10) {
		alert('Congratulations! You win!');
		gameState = 'ended';
        setGameElements();
	} else if (computer.score === 10) {
		alert('Too bad... You lose!');
		gameState = 'ended';
		setGameElements();
	}
}

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });
pickLizard.addEventListener('click', function() { playerPick('lizard') });
pickSpock.addEventListener('click', function() { playerPick('spock') });