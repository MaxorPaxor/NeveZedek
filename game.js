// Define the grid size
const GRID_SIZE = 4;

// Player's current state
let player = {
    x: 0,  // X-coordinate on the grid
    y: 0,  // Y-coordinate on the grid
    direction: 'N'  // Facing direction ('N', 'E', 'S', 'W')
};

// Game progress state
let progress = 0; // A number between 0 and 7

// Mapping of directions for rotation
const directions = ['N', 'E', 'S', 'W'];

// DOM elements
const sceneImage = document.getElementById('scene-image');
const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const moveForwardBtn = document.getElementById('move-forward');
const overlay = document.getElementById('overlay');
const messageBox = document.getElementById('message-box');

// Clickable areas data
const clickableAreasData = {
    '0_0_N': [
        {
            top: '30%',
            left: '40%',
            width: '20%',
            height: '20%',
            texts: {
                0: 'You found a hidden object!',
                1: 'You already found this object.',
                2: 'The object seems different now.',
                3: 'Nothing more to see here.'
            },
            onClick: function() {
                if (progress === 0) {
                    progress = 1;
                } else if (progress === 2) {
                    progress = 3;
                }
                // You can add more conditions as needed
            }
        },
        // Add more clickable areas for this scene...
    ],
    // Add more scenes...
};

// Initialize the game
function initGame() {
    updateSceneImage();
    // Add event listeners
    rotateLeftBtn.addEventListener('click', rotateLeft);
    rotateRightBtn.addEventListener('click', rotateRight);
    moveForwardBtn.addEventListener('click', moveForward);
}

// Update the scene image based on player's position and direction
function updateSceneImage() {
    // Ensure coordinates are within grid bounds
    if (player.x < 0) player.x = 0;
    if (player.x >= GRID_SIZE) player.x = GRID_SIZE - 1;
    if (player.y < 0) player.y = 0;
    if (player.y >= GRID_SIZE) player.y = GRID_SIZE - 1;

    // Construct the image filename
    const imagePath = `images/area_${player.x}_${player.y}_${player.direction}.jpg`;
    sceneImage.src = imagePath;

    // Remove existing clickable areas
    removeClickableAreas();

    // Add new clickable areas for the current scene
    const sceneKey = `${player.x}_${player.y}_${player.direction}`;
    if (clickableAreasData.hasOwnProperty(sceneKey)) {
        const areas = clickableAreasData[sceneKey];
        areas.forEach((areaData, index) => {
            addClickableArea(areaData, index);
        });
    }
}

// Function to remove existing clickable areas
function removeClickableAreas() {
    const existingAreas = document.querySelectorAll('.dynamic-clickable-area');
    existingAreas.forEach(area => {
        area.remove();
    });
}

// Function to add a clickable area
function addClickableArea(areaData, index) {
    const area = document.createElement('div');
    area.classList.add('clickable-area', 'dynamic-clickable-area'); // Add a class for easy removal
    area.style.top = areaData.top;
    area.style.left = areaData.left;
    area.style.width = areaData.width;
    area.style.height = areaData.height;
    // Store the texts and onClick function in data attributes
    area.dataset.texts = JSON.stringify(areaData.texts);
    area.dataset.index = index; // Optional, if needed
    if (areaData.onClick) {
        area.onClickFunction = areaData.onClick;
    }

    // For debugging: make it visible
    area.style.backgroundColor = 'rgba(255, 255, 0, 0.3)'; // Remove or comment out to hide after debugging

    // Add event listener
    area.addEventListener('click', function() {
        const texts = JSON.parse(this.dataset.texts);
        const message = texts[progress] || 'Nothing happens.';
        showMessage(message);

        // Call the onClick function if it exists
        if (this.onClickFunction) {
            this.onClickFunction();
        }
    });

    overlay.appendChild(area);
}

// Function to display a message in the message box
function showMessage(message) {
    messageBox.textContent = message;
    messageBox.classList.add('show');
    messageBox.style.display = 'block';

    // Hide the message after a delay (e.g., 3 seconds)
    setTimeout(() => {
        messageBox.classList.remove('show');
        messageBox.style.display = 'none';
    }, 3000);
}

// Rotate the player to the left
function rotateLeft() {
    let currentIndex = directions.indexOf(player.direction);
    currentIndex = (currentIndex - 1 + directions.length) % directions.length;
    player.direction = directions[currentIndex];
    updateSceneImage();
}

// Rotate the player to the right
function rotateRight() {
    let currentIndex = directions.indexOf(player.direction);
    currentIndex = (currentIndex + 1) % directions.length;
    player.direction = directions[currentIndex];
    updateSceneImage();
}

// Move the player forward in the direction they are facing
function moveForward() {
    let prevX = player.x;
    let prevY = player.y;

    switch (player.direction) {
        case 'N':
            player.y -= 1;
            break;
        case 'E':
            player.x += 1;
            break;
        case 'S':
            player.y += 1;
            break;
        case 'W':
            player.x -= 1;
            break;
    }

    // Check for boundaries
    if (player.x < 0 || player.x >= GRID_SIZE || player.y < 0 || player.y >= GRID_SIZE) {
        // Revert to previous position
        player.x = prevX;
        player.y = prevY;
        alert('You cannot move further in this direction.');
    }

    updateSceneImage();
}

// Start the game
initGame();
