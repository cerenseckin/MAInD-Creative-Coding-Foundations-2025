//document.queryselector(".tile.A").style.backgroudImage.url('imgs/${number}/${number}_${i}.jpg') <-- in a for loop
// changePuzzle(number)

const tileSound = new Audio("assets/audio/snap.mp3");
const backgroundSound = new Audio("assets/audio/634771__garuda1982__city-park-with-pond-ducks-frogs-and-people.mp3")

// function changePuzzle(number){
//     for(let i = 1; i < 9 ; i++){
//         document.querySelector(`#puzzle-container:nth-child(${i})`).style.backgroundImage = `url('imgs/${number}/${number}_${i}.jpg')`;
//     }   
// }

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

//P is player
let correctPuzzle = ["P", "A", "B", "C", "D", "E", "F", "G", "H"];

//Predetermined Shuffle
//Solution: up-up-left-left-down-right-down-right
const shuffledPuzzle = ["P","D","B", "A","E","H", "C","F","G"];
let userPuzzle = [...shuffledPuzzle];

let playerPosition = userPuzzle.indexOf("P");

let moveCount = 0;

// Shuffle here by calling for loop on moveTo() with randomize position (left,...)

const Puzzle1 = document.getElementById('choose-puzzle-1');
const Puzzle2 = document.getElementById('choose-puzzle-2');
const Puzzle3 = document.getElementById('choose-puzzle-3');
const Puzzle4 = document.getElementById('choose-puzzle-4');

const popupBanner = document.getElementById("popup-banner");
const winMessage = document.getElementById("win-message");


// document.addEventListener('click', ()=>{

//setPuzzle(Element.getAttribute("data-puzzle"));

// });

document.addEventListener("click", (event) => {
    // Find a puzzle button, even if the user clicks its image
    const btn = event.target.closest(".choose-puzzle-button");
    if (btn) {
        const puzzleNumber = btn.querySelector("img").dataset.puzzle;
        setPuzzle(puzzleNumber);
        popupBanner.style.display = "none";
        backgroundSound.play().catch(e => console.log(e));
        return;
    }
});

// document.getElementById("continue-banner-btn").addEventListener("click", () => {

//     if(){

//     }
//     document.getElementById("popup-banner").style.display = "none";
//     backgroundSound.play().catch(e => console.log(e)); 
// });

function setPuzzle(number){
    document.getElementById("puzzle-container").setAttribute("data-puzzle", number);

    console.log("shuffledPuzzle");
    console.log(shuffledPuzzle);

    moveCount = -1;

    updatePuzzle();
}

//Changed the button directions :)
document.addEventListener('keydown', (keyEvent) =>{

    let updatedPosition = playerPosition;

    // if(keyEvent.key ==="ArrowLeft"){
    //     moveTo("left");
    // }

    if (keyEvent.key ==="ArrowLeft" && movementPossibilities[playerPosition].includes("r")){
        updatedPosition = playerPosition + 1;
    }

    if (keyEvent.key ==="ArrowRight" && movementPossibilities[playerPosition].includes("l")){
        updatedPosition = playerPosition - 1;
    }

    if (keyEvent.key ==="ArrowDown" && movementPossibilities[playerPosition].includes("u")){
        updatedPosition = playerPosition - 3;
    }

    if (keyEvent.key ==="ArrowUp" && movementPossibilities[playerPosition].includes("d")){
        updatedPosition = playerPosition + 3;
    }

    if (updatedPosition !== playerPosition){
        swapTiles(playerPosition, updatedPosition);
        playerPosition = updatedPosition;
        updatePuzzle();
    }

});

function moveTo(position){

}

function checkWin(){
    for(let i=0 ; i<userPuzzle.length ; i++){
        if(userPuzzle[i] !== correctPuzzle[i]) {
            console.log("false");
            return false;       
        }
    }
        console.log("true");
        return true;
}

function swapTiles(prevPosition,updatedPosition){
    let swappedPosition = userPuzzle[prevPosition];
    userPuzzle[prevPosition] = userPuzzle [updatedPosition];
    userPuzzle[updatedPosition] = swappedPosition;

    if(checkWin()){
        console.log("yes");

        /*
        const winBox = document.getElementById("puzzle-container")
        const winMessage = 'you won'
        const winning = document.createElement('p')
        winning.textContent = winMessage

        winBox.appendChild(winning);
        */

        winMessage.innerHTML = 'you won';


        setTimeout(reload, 3000)
    }

}

function reload(){
    console.log("reload");
    userPuzzle = [...shuffledPuzzle]; // spread operator to copy values over and not linking the memory address!
    winMessage.innerHTML = '';
    popupBanner.style.display = "flex";
}

//Redrawing the puzzle after moving
function updatePuzzle(){
    console.log("userPuzzle");
    console.log(userPuzzle);
    console.log("shuffledPuzzle");
    console.log(shuffledPuzzle);
    for(let i=0; i<userPuzzle.length; i++){
        let tile = document.getElementById(i);

        
        tile.className = "tile " + userPuzzle[i];
    }
   tileSound.play().catch(e => console.log(e)); 

   moveCount = moveCount + 1;

   const movesElement = document.getElementById('moves');

   document.getElementById('moves').innerHTML = moveCount;
}

// //Animation
// function animateSlide(from, to) {
//     const tile = document.getElementById(from);

//     let dx = (to % 3) - (from % 3);
//     let dy = Math.floor(to / 3) - Math.floor(from / 3);

//     tile.style.transform = `translate(${dx * 100}px, ${dy * 100}px)`;

//     setTimeout(() => tile.style.transform = "", 150);
// }

