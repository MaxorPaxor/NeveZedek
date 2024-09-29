// Ensure that clickableAreasData is accessible globally
window.clickableAreasData = {

    // Grisha
    '2_3_N': [
        // Existing clickable areas in this scene
        {
            top: '39%',
            left: '13%',
            width: '7%',
            height: '20%',
            // getText: function() {
            //     if (progress === 0 && inventory.includes(1)) {
            //         return 'You have found a secret passage! (Text2)';
            //     } else {
            //         return 'This is an old oak tree. (Text1)';
            //     }
            // },
            onClick: function() {
                if (progress === 0 && inventory.includes(3)) {
                    progress += 1; // Increment the progress level by 1
                    showMessage('Go to Blacky!');
                }

                else if (progress != 0) {
                    showMessage('Meow');
                }
                
                else {
                    showMessage('Give me box');
                }
            }
        },
    ],

    // Box
    '3_1_N': [
        // Item 3 with conditional pickup
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 3, // Item ID
            // getText: function() {
            //     if (inventory.includes(1) && inventory.includes(2)) {
            //         return 'Take your box';
            //     } else {
            //         return 'Give me Fish and Cheese';
            //     }
            // },
            onClick: function() {
                if (inventory.includes(1) && inventory.includes(2)) {
                    // Player can pick up the item
                    inventory.push(3);
                    updateItemBar();
                    showMessage('You have the box');
                    // Remove the item from the scene
                    this.remove();
                } else {
                    // Cannot pick up the item yet
                    showMessage('Give me Fish and Cheese');
                }
            }
        },
    ],
    
    // Fish
    '0_2_W': [
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 1 // Item ID
            // No onClick function needed
        },
    ],

    // Cheese
    '2_2_E': [
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 2 // Item ID
            // No onClick function needed
        },
    ],

    // Blacky
    '0_3_W': [
        // Existing clickable areas in this scene
        {
            top: '40%',
            left: '13%',
            width: '7%',
            height: '19%',
            // getText: function() {
            //     if (progress === 0 && inventory.includes(1)) {
            //         return 'You have found a secret passage! (Text2)';
            //     } else {
            //         return 'This is an old oak tree. (Text1)';
            //     }
            // },
            onClick: function() {
                if (progress === 1 && inventory.includes(4)) {
                    progress += 1; // Increment the progress level by 1
                    showMessage('Ty for catnip, go to Binnie');
                }
                
                else if (progress != 1) {
                    showMessage('Go away');
                }

                else {
                    showMessage('Give me catnip');
                }
            }
        },
    ],

    // Catnip
    '3_0_N': [
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 4 // Item ID
            // No onClick function needed
        },
    ],

    // Binnie
    '0_1_S': [
        // Existing clickable areas in this scene
        {
            top: '40%',
            left: '13%',
            width: '7%',
            height: '19%',
            // getText: function() {
            //     if (progress === 0 && inventory.includes(1)) {
            //         return 'You have found a secret passage! (Text2)';
            //     } else {
            //         return 'This is an old oak tree. (Text1)';
            //     }
            // },
            onClick: function() {
                if (progress === 2 && inventory.includes(5)) {
                    progress += 1; // Increment the progress level by 1
                    showMessage('Ty for necklace, go to Ofira');
                }

                else if (progress != 2) {
                    showMessage('Go away');
                }
                
                else {
                    showMessage('Give me necklace');
                }
            }
        },
    ],

    // Necklace
    '1_2_E': [
        {
            top: '50%',
            left: '50%',
            width: '10%',
            height: '10%',
            item: 5 // Item ID
            // No onClick function needed
        },
    ],

    // Ofira
    '2_0_W': [
        // Existing clickable areas in this scene
        {
            top: '40%',
            left: '13%',
            width: '7%',
            height: '19%',
            // getText: function() {
            //     if (progress === 0 && inventory.includes(1)) {
            //         return 'You have found a secret passage! (Text2)';
            //     } else {
            //         return 'This is an old oak tree. (Text1)';
            //     }
            // },
            onClick: function() {
                if (progress === 3 && inventory.includes(6) && inventory.includes(7) && inventory.includes(8))  {
                    progress += 1; // Increment the progress level by 1
                    showMessage('Ty for socks, go back home');
                }

                else if (progress != 3) {
                    showMessage('BOB');
                }
                
                else {
                    showMessage('Give me socks');
                }
            }
        },
    ],

    // sock 1
    '3_3_E': [
        {
            top: '50%',
            left: '50%',
            width: '2%',
            height: '3%',
            item: 6 // Item ID
            // No onClick function needed
        },
    ],

    // sock 2
    '0_0_W': [
        {
            top: '50%',
            left: '50%',
            width: '2%',
            height: '3%',
            item: 7 // Item ID
            // No onClick function needed
        },
    ],

    // sock 3
    '2_1_N': [
        {
            top: '50%',
            left: '50%',
            width: '2%',
            height: '3%',
            item: 8 // Item ID
            // No onClick function needed
        },
    ],

};


// Ensure the scene exists in clickableAreasData
window.clickableAreasData['2_3_E'] = window.clickableAreasData['2_3_E'] || [];

// Add Item 4 to the scene
window.clickableAreasData['2_3_E'].push({
    top: '40%',
    left: '45%',
    width: '15%',
    height: '15%',
    item: 9, // Item ID for Item 9
    condition: function() {
        return progress >= 4 && !inventory.includes(9);
    },
    onClick: function() {
        // Add Item 4 to inventory
        // inventory.push(4);
        // updateItemBar();
        showMessage('You have found the final item!');
        // Play the video
        showVideo('video/final_video.mp4');
        // Remove the item from the scene
        this.remove();
    }
});