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

// Player's inventory
let inventory = []; // Array to hold item IDs

// Mapping of directions for rotation
const directions = ['N', 'E', 'S', 'W'];

// DOM elements
const sceneImage = document.getElementById('scene-image');
const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const moveForwardBtn = document.getElementById('move-forward');
const overlay = document.getElementById('overlay');
const messageBox = document.getElementById('message-box');

// Initialize the game
function initGame() {
    // Add event listener to Start Game button
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', function() {
        // Hide the Start Game button
        startGameBtn.style.display = 'none';
        // Show the game container
        document.getElementById('game-container').style.display = 'block';
        // Show the music control button
        document.getElementById('toggle-music-btn').style.display = 'block';
        // Play background music
        playBackgroundMusic();
        // Proceed with the game setup
        updateSceneImage();
        // Add event listeners
        rotateLeftBtn.addEventListener('click', rotateLeft);
        rotateRightBtn.addEventListener('click', rotateRight);
        moveForwardBtn.addEventListener('click', moveForward);
        // Add event listener to toggle music button
        const toggleMusicBtn = document.getElementById('toggle-music-btn');
        toggleMusicBtn.addEventListener('click', toggleMusic);
    });
}

// Function to play background music
function playBackgroundMusic() {
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.loop = true; // Enable looping
    backgroundMusic.volume = 0.5; // Set volume (0.0 to 1.0)
    backgroundMusic.play().catch(function(error) {
        // Handle autoplay blocking in browsers
        console.log('Autoplay was prevented:', error);
    });
}

// Function to toggle music
function toggleMusic() {
    const backgroundMusic = document.getElementById('background-music');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    if (backgroundMusic.muted) {
        backgroundMusic.muted = false;
        toggleMusicBtn.textContent = 'Mute Music';
    } else {
        backgroundMusic.muted = true;
        toggleMusicBtn.textContent = 'Unmute Music';
    }
}

// Clickable areas data with new items added
const clickableAreasData = {
    '0_0_N': [
        // Existing clickable areas in this scene
        {
            top: '30%',
            left: '40%',
            width: '20%',
            height: '20%',
            getText: function() {
                if (progress === 0 && inventory.includes(1)) {
                    return 'You have found a secret passage! (Text2)';
                } else {
                    return 'This is an old oak tree. (Text1)';
                }
            },
            onClick: function() {
                if (progress === 0 && inventory.includes(1)) {
                    progress += 1; // Increment the progress level by 1
                    showMessage('Your progress has increased!');
                }
            }
        },
        // Item 1 placement
        {
            top: '50%',
            left: '60%',
            width: '10%',
            height: '10%',
            item: 1 // Item ID
            // No onClick function needed
        },
    ],
    '0_0_E': [
        // Item 2 placement
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 2 // Item ID
            // No onClick function needed
        },
    ],
    '0_0_S': [
        // Item 3 with conditional pickup
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 3, // Item ID
            getText: function() {
                if (inventory.includes(1) && inventory.includes(2)) {
                    return 'You can now pick up the mystical Item 3!';
                } else {
                    return 'A mysterious object is here, but you feel like something is missing.';
                }
            },
            onClick: function() {
                if (inventory.includes(1) && inventory.includes(2)) {
                    // Player can pick up the item
                    inventory.push(3);
                    updateItemBar();
                    showMessage('You have acquired Item 3!');
                    // Remove the item from the scene
                    this.remove();
                } else {
                    // Cannot pick up the item yet
                    showMessage('You need Items 1 and 2 to pick this up.');
                }
            }
        },
    ],
    // Other scenes...
};

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
    // If this area is for an item, and the item is already picked up, don't add the area
    if (areaData.item && inventory.includes(areaData.item)) {
        return;
    }

    const area = document.createElement('div');
    area.classList.add('clickable-area', 'dynamic-clickable-area');
    area.style.top = areaData.top;
    area.style.left = areaData.left;
    area.style.width = areaData.width;
    area.style.height = areaData.height;

    if (areaData.getText) {
        area.getTextFunction = areaData.getText;
    }

    if (areaData.onClick) {
        area.onClickFunction = areaData.onClick;
    }

    // If this area represents an item, display the item image
    if (areaData.item) {
        const itemImage = document.createElement('img');
        itemImage.src = `items/item_${areaData.item}.png`;
        itemImage.alt = `Item ${areaData.item}`;
        itemImage.style.width = '100%';
        itemImage.style.height = '100%';
        area.appendChild(itemImage);
    }

    area.addEventListener('click', function() {
        if (areaData.onClick) {
            // Custom onClick logic for this area
            areaData.onClick.call(area);
        } else if (areaData.item) {
            // Handle item pickup
            if (!inventory.includes(areaData.item)) {
                inventory.push(areaData.item);
                updateItemBar();
                showMessage(`You picked up Item ${areaData.item}!`);
                area.remove();
            } else {
                showMessage('You already have this item.');
            }
        } else if (area.getTextFunction) {
            // Handle dialogues with conditions
            const message = area.getTextFunction();
            showMessage(message);

            // Execute the onClick function if it exists
            if (area.onClickFunction) {
                area.onClickFunction.call(area);
            }
        } else {
            // Default action if no getTextFunction
            showMessage('Nothing happens.');
        }
    });

    overlay.appendChild(area);
}

// Function to update the item bar
function updateItemBar() {
    // Get all item slots
    const itemSlots = document.querySelectorAll('.item-slot');
    // Clear all slots
    itemSlots.forEach(slot => {
        slot.innerHTML = '';
    });
    // Add items to slots
    inventory.forEach((itemId, index) => {
        if (index < itemSlots.length) {
            const slot = itemSlots[index];
            const itemImage = document.createElement('img');
            itemImage.src = `items/item_${itemId}.png`; // Ensure item images are in 'items' folder
            itemImage.alt = `Item ${itemId}`;
            slot.appendChild(itemImage);
        }
    });
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
        // Display the message in the message box
        showMessage('You cannot move further in this direction.');
    } else {
        // Proceed with scene change
        updateSceneImage();
    }
}

// Start the game
initGame();
