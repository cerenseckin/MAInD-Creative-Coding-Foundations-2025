//Puzzle & API



//declaring API variables
const API_KEY = "xiXBuIhj"; // <--- PASTE YOUR KEY HERE
const API_URL = `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&format=json&ps=100&type=painting&imgonly=True`;

//The array that gives you the correct painting
let correctPuzzle = ["A", "B", "C", "D", "E", "F", "G", "H", "P"];

//I used a predetermined shuffled array to ensure the puzzle is always solvable
let shuffledPuzzle = ["D", "A", "C", "B", "H", "E", "P", "G", "F"];

//In JavaScript, arrays are references, not independent copies.
//when userPuzzle=shuffledPuzzle, both variables pointed to the same array in memory.
//So any change to userPuzzle also changed shuffledPuzzle, which broke my logic, because I also had to reuse the shuffledPuzzle each time users played a new game.
//If there was a shuffle function this would not be a problem, I would call that everytime
let userPuzzle = [...shuffledPuzzle]; 

//to follow where the users tile inside the array
let playerPosition = userPuzzle.indexOf("P");

// Starts at -1 because we run updatePuzzle() once at setup
let moveCount = -1;

// This holds the ID of the painting we find
let selectedPuzzleID = null;

let paintingList = [];

//Array for constraining the tile movements
let movementPossibilities = [
    ["r", "d"],
    ["l", "r", "d"], 
    ["l", "d"],
    ["u", "r", "d"], 
    ["u", "d", "l", "r"], 
    ["l", "u", "d"],
    ["u", "r"], 
    ["l", "u", "r"], 
    ["l", "u"]
];


//Audio
const tileSound = new Audio("assets/audio/snap.mp3");
const backgroundSound = new Audio("assets/audio/634771__garuda1982__city-park-with-pond-ducks-frogs-and-people.mp3");

//HTML
const puzzleContainer = document.getElementById("puzzle-container");
const menuScreen = document.getElementById("menu-screen");
const overlay = document.getElementById("overlay");
const movesDisplay = document.getElementById('moves');

//Buttons
const startBtn = document.getElementById("start-game-btn");
const menuBtn = document.getElementById("back-to-menu-btn");
const continueBtn = document.getElementById("continue-play-btn");
const headerBackBtn = document.getElementById("header-back-btn");


function getValidPaintings(paintingsList) {
    let validList = [];
    for (let i = 0; i < paintingsList.length; i++) {
        let item = paintingsList[i];
        if (!item.webImage) continue;

        let width = item.webImage.width;
        let height = item.webImage.height;
        let ratio = width / height;

        if (ratio >= 0.8 && ratio <= 1.5) {
            validList.push(item);
        }
    }
    return validList;
}

function getArtDetails(art) {
    let title = art.title;
    let artist = art.principalOrFirstMaker;
    let imageUrl = art.webImage.url;
    let width = art.webImage.width;
    let height = art.webImage.height;

    let description = "No description available.";
    if (art.label && art.label.description) {
        description = art.label.description;
    } else if (art.plaqueDescriptionEnglish) {
        description = art.plaqueDescriptionEnglish;
    }

    let date = "Unknown";
    if (art.dating && art.dating.presentingDate) {
        date = art.dating.presentingDate;
    }

    let details = {
        title: title,
        artist: artist,
        imageUrl: imageUrl,
        width: width,
        height: height,
        description: description,
        date: date
    };
    return details;
}

function updateScreenText(details) {
    document.getElementById("artwork-title").innerText = details.title;
    document.getElementById("artist-name").innerText = details.artist;
    document.getElementById("description").innerText = details.description; 
    document.getElementById("artwork-reference-image").src = details.imageUrl; 
    document.getElementById("artwork-date").innerText = details.date;
    puzzleContainer.style.aspectRatio = `${details.width} / ${details.height}`;
}

function createTiles(imageUrl) {
    puzzleContainer.innerHTML = ""; 
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("li");
        tile.id = i;
        tile.classList.add("tile");
        tile.style.backgroundImage = `url('${imageUrl}')`;
        puzzleContainer.appendChild(tile);
    }
}

function prepareGame() {
    selectedPuzzleID = null;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
        
            paintingList = getValidPaintings(data.artObjects);
            
            pickRandomPainting();
        })
        .catch(error => console.log(error));
}

function instantPlay() {
    pickRandomPainting();

    if (selectedPuzzleID) {
        fetchSpecificPainting(selectedPuzzleID);
    }
}

function fetchSpecificPainting(id) {
    let detailUrl = `https://www.rijksmuseum.nl/api/en/collection/${id}?key=${API_KEY}&format=json`;

    fetch(detailUrl)
        .then(response => response.json())
        .then(detailData => {
            let artDetails = getArtDetails(detailData.artObject);
            startGame(artDetails);
        })
        .catch(err => console.error(err));
}

function startGame(details) {
    userPuzzle = [...shuffledPuzzle];
    playerPosition = userPuzzle.indexOf("P");
    moveCount = -1;

    updateScreenText(details);
    createTiles(details.imageUrl);
    updatePuzzle();
    
    menuScreen.style.display = "none";
}

function updatePuzzle() {
    for (let i = 0; i < userPuzzle.length; i++) {
        let tile = document.getElementById(i);
        tile.className = "tile " + userPuzzle[i];
    }
    
    moveCount = moveCount + 1;
    movesDisplay.innerText = moveCount;

    if (moveCount > 0) {
        tileSound.play().catch(e => console.log(e));
    }
}

function swapTiles(prev, current) {
    let temp = userPuzzle[prev];
    userPuzzle[prev] = userPuzzle[current];
    userPuzzle[current] = temp;

    if (checkWin()) {
        console.log("You Won!");
        overlay.style.visibility = 'visible';
    }
}

function checkWin() {
    for (let i = 0; i < userPuzzle.length; i++) {
        if (userPuzzle[i] !== correctPuzzle[i]) 
            return false;
    }
    return true;
}

function pickRandomPainting() {
    if (paintingList.length === 0) return;

    let randomIndex = Math.floor(Math.random() * paintingList.length);
    let winner = paintingList[randomIndex];
    
    selectedPuzzleID = winner.objectNumber;
}

document.addEventListener('keydown', (keyEvent) => {
    if (menuScreen.style.display !== "none" || overlay.style.visibility === "visible") return;

    let updatedPosition = playerPosition;

  if (keyEvent.key === "ArrowLeft" && movementPossibilities[playerPosition].includes("r")) {
        updatedPosition = playerPosition + 1;
    }
    if (keyEvent.key === "ArrowRight" && movementPossibilities[playerPosition].includes("l")) {
        updatedPosition = playerPosition - 1;
    }
    if (keyEvent.key === "ArrowDown" && movementPossibilities[playerPosition].includes("u")) {
        updatedPosition = playerPosition - 3;
    }
    if (keyEvent.key === "ArrowUp" && movementPossibilities[playerPosition].includes("d")) {
        updatedPosition = playerPosition + 3;
    }

    if (updatedPosition !== playerPosition) {
        swapTiles(playerPosition, updatedPosition);
        playerPosition = updatedPosition;
        updatePuzzle();
    }
});

startBtn.addEventListener("click", () => {

    if (!selectedPuzzleID) return;
    backgroundSound.play().catch(e => console.log(e));
    fetchSpecificPainting(selectedPuzzleID);
});

menuBtn.addEventListener('click', () => {
    overlay.style.visibility = 'hidden';
    menuScreen.style.display = 'flex';
   
    prepareGame();
});

continueBtn.addEventListener('click', () => {
    overlay.style.visibility = 'hidden';
    menuScreen.style.display = 'none';
    
    instantPlay();
});

headerBackBtn.addEventListener("click", () => {
    menuScreen.style.display = "flex";
    overlay.style.visibility = "hidden";
    
    prepareGame();
});

prepareGame();