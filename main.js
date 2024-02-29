//  Select The Start Game Button
document.querySelector(".control-button span ").onclick = function () {

    // Prompt Window To Ask For Game
    let yourName = prompt("Whats is Your Name ?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {
        // Set Alert
        alert("Plaese Enter Your Name")
    } else {
        // Set Name To Your Name
        document.querySelector(".name span ").innerHTML = yourName;
        document.querySelector(".control-button").remove();
    }
};

// Effect Duration
let duration = 1000;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys

let orderRange = Array.from(Array(blocks.length).keys());

Shuffle(orderRange);


// Add Order CSS Property To Game Blocks 
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    // Add Click Events
    block.addEventListener('click', function () {
        //Trigger The Flip Block Function
        flipBlock(block);
    })
});

// Flip Block Function
function flipBlock(selectedBlock) {
    // Add Class is Flipped 
    selectedBlock.classList.add('is-flipped');
    // Collect All Flipped Cards
    let allFlippedBlock = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Block 
    if (allFlippedBlock.length === 2) {
        // Stop Clicking Function
        stopClicking();
        // Check Matched Block Function
        checkMatchedBlock(allFlippedBlock[0], allFlippedBlock[1]);
    }
};
// Stop Clicking Function
const stopClicking = () => {
    // Add class Mo Clicking On Main Container
    blocksContainer.classList.add('no-clicking');
    // 
    setTimeout(() => {
        // Remove Class No Clicking After The duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
};

// Check Matched Block
function checkMatchedBlock(firstBlock, secondBlock) {
    //
    let triesElement = document.querySelector('.tries span');
    // 
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        // 
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        //
        firstBlock.classList.add('has-match')
        secondBlock.classList.add('has-match')
    } else {
        // 
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        // 
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)
    }
};

// Shuffle Function
function Shuffle(array) {
    // Setting Vars 
    let current = array.length,
        temp,
        random;
    // 
    while (current > 0) {
        // get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;
        //  [1] Save Current Element In Stash 
        temp = array[current];
        //  Current Elements = Random Element
        array[current] = array[random];
        //  Random Elements = Get Elements From Stash
        array[random] = temp;
    }
    return array;

};


// Current Array [ 1,2,3,4,5,6,7,8,9,0]
// New Array [1,2,3,4,5,6,7,8,9,0,]
/*
 *  [1] Save Current Element In Stash 
 *  [2] Current Elements = Random Element
 *  [3] Random Elements = Get Elements From Stash
 */
