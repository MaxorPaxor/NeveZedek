// Define the grid size
const GRID_SIZE = 4;

// Player's current state (attached to the global window object)
window.player = {
    x: 2,  // Starting X-coordinate on the grid
    y: 3,  // Starting Y-coordinate on the grid
    direction: 'N'  // Facing direction ('N', 'E', 'S', 'W')
};

// Game progress state (attached to the global window object)
window.progress = 4; // A number representing game progress

// Player's inventory (attached to the global window object)
window.inventory = []; // Array to hold item IDs

// Game completion flag
window.gameCompleted = false; // Flag to indicate game completion

// Mapping of directions for rotation
const directions = ['N', 'E', 'S', 'W'];

// DOM elements
const sceneImage = document.getElementById('scene-image');
const rotateLeftBtn = document.getElementById('rotate-left');
const rotateRightBtn = document.getElementById('rotate-right');
const moveForwardBtn = document.getElementById('move-forward');
const overlay = document.getElementById('overlay');
const messageBox = document.getElementById('message-box');

// Object to keep track of preloaded images
const preloadedImages = {};

// Function to preload all scene images
function preloadAllImages() {
    const promises = [];
    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            directions.forEach(dir => {
                const imagePath = `areas/area_${x}_${y}_${dir}.jpg`;
                const promise = preloadImageAsync(imagePath);
                promises.push(promise);
            });
        }
    }
    return Promise.all(promises);
}

// Function to preload an image and return a Promise
function preloadImageAsync(src) {
    return new Promise((resolve, reject) => {
        if (!preloadedImages[src]) {
            const img = new Image();
            img.onload = () => {
                preloadedImages[src] = img;
                resolve();
            };
            img.onerror = reject;
            img.src = src;
        } else {
            resolve();
        }
    });
}

// window.videoPreloaded = false;
// // Function to preload the video
// function preloadVideo() {
//     const gameVideo = document.getElementById('game-video');
//     gameVideo.src = 'video/final_video.mp4';
//     gameVideo.load(); // Start loading the video
// }

function initGame() {
    const startGameBtn = document.getElementById('start-game-btn');
    startGameBtn.addEventListener('click', function() {
        // Hide the Start Screen
        const startScreen = document.getElementById('start-screen');
        startScreen.style.display = 'none';

        // Show loading indicator
        const loadingIndicator = document.getElementById('loading-indicator');
        loadingIndicator.style.display = 'block';

        // Set the video source to start preloading
        const gameVideo = document.getElementById('game-video');
        gameVideo.src = 'video/final_video.mp4';

        // Preload all images
        preloadAllImages().then(() => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';

            // Show the game container
            document.getElementById('game-container').style.display = 'block';

            // Show the music control button
            document.getElementById('toggle-music-btn').style.display = 'block';

            // Play background music
            playBackgroundMusic();

            // Proceed with the game setup
            updateSceneImage();

            // Add event listeners for controls
            rotateLeftBtn.addEventListener('click', rotateLeft);
            rotateRightBtn.addEventListener('click', rotateRight);
            moveForwardBtn.addEventListener('click', moveForward);

            // Add event listener to toggle music button
            const toggleMusicBtn = document.getElementById('toggle-music-btn');
            toggleMusicBtn.addEventListener('click', toggleMusic);
        });
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

// Update the scene image based on player's position and direction
function updateSceneImage() {
    // Ensure coordinates are within grid bounds
    if (player.x < 0) player.x = 0;
    if (player.x >= GRID_SIZE) player.x = GRID_SIZE - 1;
    if (player.y < 0) player.y = 0;
    if (player.y >= GRID_SIZE) player.y = GRID_SIZE - 1;

    // Construct the image filename
    const imagePath = `areas/area_${player.x}_${player.y}_${player.direction}.jpg`;
    sceneImage.src = imagePath;

    // Remove existing clickable areas
    removeClickableAreas();

    // Add new clickable areas for the current scene
    const sceneKey = `${player.x}_${player.y}_${player.direction}`;
    if (window.clickableAreasData && window.clickableAreasData.hasOwnProperty(sceneKey)) {
        const areas = window.clickableAreasData[sceneKey];
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
    // Check for condition
    if (areaData.condition && !areaData.condition()) {
        return; // Do not add this area if the condition is not met
    }

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
                showMessage(`הופה! מצאתי משהו`);
                area.remove();
            } else {
                showMessage('ברר');
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
            showMessage('לא קורה כלום');
        }
    });

    overlay.appendChild(area);
}

// Function to update the item bar (attached to the global window object)
window.updateItemBar = function() {
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
};

// Function to display a message in the message box (attached to the global window object)
window.showMessage = function(message) {
    messageBox.textContent = message;
    messageBox.classList.add('show');
    messageBox.style.display = 'block';

    // Hide the message after a delay (e.g., 3 seconds)
    setTimeout(() => {
        messageBox.classList.remove('show');
        messageBox.style.display = 'none';
    }, 6000);
};

// Function to show and play the video
window.showVideo = function(videoSrc) {
    const videoOverlay = document.getElementById('video-overlay');
    const gameVideo = document.getElementById('game-video');
    const closeVideoBtn = document.getElementById('close-video-btn');
    const backgroundMusic = document.getElementById('background-music');

    // Store the previous muted state of the background music
    const wasMusicMuted = backgroundMusic.muted;

    // Mute the background music
    backgroundMusic.muted = true;

    // Set the video source
    // gameVideo.src = videoSrc;

    // Show the video overlay
    videoOverlay.style.display = 'flex';

    // Play the video
    gameVideo.play();

    // Event listener to close the video
    closeVideoBtn.addEventListener('click', closeVideo);

    // Close the video when it ends
    gameVideo.addEventListener('ended', closeVideo);

    // Function to close the video
    function closeVideo() {
        // Pause the video
        gameVideo.pause();
        // Reset the video source
        gameVideo.src = '';
        // Hide the overlay
        videoOverlay.style.display = 'none';
        // Remove event listeners
        closeVideoBtn.removeEventListener('click', closeVideo);
        gameVideo.removeEventListener('ended', closeVideo);

        // Unmute the background music if it was not muted before
        backgroundMusic.muted = wasMusicMuted;

        // Additional logic after video ends
        window.gameCompleted = true;
        showMessage(
            `יפה, מצאת את טובי.
            מזל טוב!`
        );
    }
};


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
            player.y += 1; // Moving North increases y by 1
            break;
        case 'E':
            player.x += 1; // Moving East increases x by 1
            break;
        case 'S':
            player.y -= 1; // Moving South decreases y by 1
            break;
        case 'W':
            player.x -= 1; // Moving West decreases x by 1
            break;
    }

    // Check for boundaries
    if (player.x < 0 || player.x >= GRID_SIZE || player.y < 0 || player.y >= GRID_SIZE) {
        // Revert to previous position
        player.x = prevX;
        player.y = prevY;
        // Display the message in the message box
        showMessage('טובי לא שם');
    } else {
        // Proceed with scene change
        updateSceneImage();
    }
}

// Start the game
initGame();
