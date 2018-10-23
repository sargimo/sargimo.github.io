//Duck, Duck, Goose. Check console for output

let _players = ["Bob", "Mary", "Jane", "Steve", "Harry", "Ted", "Arnold"];
let _noOfRounds = 5;
let _currentRound = 1;
let _goose = getRandomFirstGoose(_players);
let _nextGooseIndex = getRandomIndex(_players);

function getRandomFirstGoose(players) {
  let rand = getRandomIndex(players);
  return players.splice(rand, 1).join(""); //splice returns an array so using 'join' to coerce it to a string
}

function getRandomIndex(arr) {
  return Math.floor(Math.random() * arr.length); 
}

function playGame() {
  console.log("---------START OF GAME--------");
  while (_currentRound <= _noOfRounds) {
    console.log("---------Start round (" + _goose + " is goose)--------");
    playRound(_goose, _nextGooseIndex);
    _nextGooseIndex = getRandomIndex(_players);
    _currentRound++;
  }
  console.log("---------END OF GAME--------");
}

function playRound(goose, nextGooseIndex) {
  for (let i = 0; i < _players.length; i++) {
    let player = _players[i]; 
    if (i === nextGooseIndex || i === _players.length - 1) {
      doGoose(goose, player, i);
      break;
    } else {
      doDuck(player);
    }
  }
}

function doDuck(player) {
  console.log("Duck... (" + player + ")");
}

function doGoose(goose, chosenPlayer, index) {
  console.log("Goose! (" + chosenPlayer + ")");
  if (Math.random() < 0.5) {
    console.log(
      chosenPlayer + " is caught! " + chosenPlayer + " is now goose!"
    );
    //take new goose out of players
    _players.splice(index, 1);
    //add old goose to players
    _players.splice(index, 0, goose);
    _goose = chosenPlayer;
  } else {
    console.log(chosenPlayer + " is not caught. " + goose + " is still goose.");
  }
}

playGame();
