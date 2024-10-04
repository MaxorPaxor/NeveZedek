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
                    showMessage(
                        `גרישה:
                        מיאו!
                        תודה על הקופסה, עכשיו יהיה לי איפה לישון בחורף.
                        טובי אמר לי שהוא הולך לבלאקי העבריין,
                        בלאקי נמצא בפח זבל בסוף השכונה, מאחורי הבית של דנה.
                        `
                    );
                }

                else if (progress != 0) {
                    showMessage(
                        `גרישה:
                        מיאו!
                        תודה על הקופסה, עכשיו יהיה לי איפה לישון בחורף.
                        טובי אמר לי שהוא הולך לבלאקי העבריין,
                        בלאקי נמצא בפח זבל בסוף השכונה, מאחורי הבית של דנה.
                        `
                    );
                }
                
                else {
                    showMessage(
                        `גרישה:
                        טובי ברח??? הוי לא, חייבים למצוא אותו!
                        אבל קודם אני צריך את הקופסה שלי!
                        החתולים השובבים אלדד ואלון גנבו לי את הקופסה!
                        הם מבלים בפארק ליד אניטה...
                        תחזיר לי אותה ואני אעזור לך למצוא את טובי השמן.
                        `
                    );
                }
            }
        },
    ],

    // Box
    '3_1_N': [
        // Item 3 with conditional pickup
        {
            top: '55%',
            left: '15%',
            width: '12%',
            height: '14%',
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
                    showMessage(
                        `אלדד ואלון:
                        איזה פרייארית...
                        `
                    );
                    // Remove the item from the scene
                    this.remove();

                } else {
                    // Cannot pick up the item yet
                    showMessage(
                        `אלדד ואלון:
                        זאת הקופסת קרטון הכי שווה בעיר!
                        אם את רוצה לקבל אותה, תצטרכי להביא לנו משהו בתמורה.
                        אם תביאי לנו דג רקוב וגבינה ממש מסריחה,
                        .אנחנו נהיה מוכנים לשקול להביא לך את הקופסה
                        `
                    );
                }
            }
        },
    ],
    
    // Fish
    '0_2_W': [
        {
            top: '42%',
            left: '92%',
            width: '5%',
            height: '5%',
            item: 1 // Item ID
            // No onClick function needed
        },
    ],

    // Cheese
    '2_2_E': [
        {
            top: '49.5%',
            left: '67.5%',
            width: '3%',
            height: '3%',
            item: 2 // Item ID
            // No onClick function needed
        },
    ],

    // Blacky
    '0_3_W': [
        // Existing clickable areas in this scene
        {
            top: '38%',
            left: '51%',
            width: '5%',
            height: '13%',
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
                    showMessage(
                        `בלאקי העבריין:
                        מיאוו... פררר... יפה יפה...
                        טובי הלך לבקר את ביני, היא מסתובבת הרבה בסוזן דלל... חושבת שהיא משהו מיוחד 
                        `
                    );
                }

                else if (progress == 1) {
                    showMessage(
                        `בלאקי העבריין:
                        אז גרישה הלשין עלי אה??
                        הוא יקבל ממני צ'אפחה...
                        בסדר, בסדר, טובי היה פה, אבל הוא הלך.
                        אני אספר לך לאן אם תעשי לי טובה...
                        המשתלה בשכונה קיבלה משלוח חדש של קטניפ
                        אם תביאי לי קצת... אני אולי אספר לך לאן טובי הלך...
                        `
                    );
                }
                
                else if (progress > 1) {
                    showMessage(
                        `בלאקי העבריין:
                        אמרתי לך, הוא הלך לביני, היא בסוזן דלל
                        הסס!!
                        `
                    );
                }

                else {
                    showMessage(
                        `בלאקי העבריין:
                        הססס!!
                        תעופי מפה ילדה
                        `
                    );
                }
            }
        },
    ],

    // Catnip
    '3_0_N': [
        {
            top: '60%',
            left: '35%',
            width: '2%',
            height: '4%',
            item: 4 // Item ID
            // No onClick function needed
        },
    ],

    // Binnie
    '0_1_S': [
        // Existing clickable areas in this scene
        {
            top: '54%',
            left: '74%',
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
                    showMessage(
                        `ביני החיה בסרט:
                        מיאומם... מיאודר...
                        טובי הלך להיפגש עם החברה שלו אופירה,
                        היא התחילה עבודה חדשה במוזיאון גוטמן בתור חתולת רחוב מחוץ למוזיאון...
                        איזה חנונית...                        
                        `
                    );
                }

                else if (progress == 2) {
                    showMessage(
                        `ביני החיה בסרט:
                        טובי... טובי... כן, הוא היה פה
                        הוא היה בדרך למקום אחר ורק עצר להגיד שלום,
                        כיפכפתי אותו, חתול כאפות הטובי הזה, כל היום מיילל.
                        בכל מקרה, המעצב הנודע קטווין קליין עיצב שרשרת חדשה ונדירה בצורה של דג,
                        שמעתי שאחת החנויות תכשיטים פה בשכונה הצליחה לשים את היד על התכשיט הזה...
                        פררר...
                        התכשיט הזה חייב להיות על החתולה הכי יפה בשכונה...
                        תביאי לי את התכשיט, ואני אגיד לך לאן טובי הלך...
                        פררר...
                        `
                    );
                }

                else if (progress > 2) {
                    showMessage(
                        `ביני החיה בסרט:
                        אני כזאת יפה... פררר...
                        טובי הלך להיפגש עם החברה שלו אופירה,
                        היא התחילה עבודה חדשה במוזיאון גוטמן בתור חתולת רחוב מחוץ למוזיאון...
                        איזה חנונית...     
                        `
                    );
                }
                
                else {
                    showMessage(
                        `ביני החיה בסרט:
                        ...
                        `
                    );
                }
            }
        },
    ],

    // Necklace
    '1_2_E': [
        {
            top: '39%',
            left: '20.6%',
            width: '3%',
            height: '6%',
            item: 5 // Item ID
            // No onClick function needed
        },
    ],

    // Ofira
    '2_0_W': [
        // Existing clickable areas in this scene
        {
            top: '53%',
            left: '66%',
            width: '7%',
            height: '16%',
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
                    showMessage(
                        `אופירה:
                        מיאו מיאו מיאו!
                        אני לא מאמינה שמצאת את כל הגרביים!
                        תודה!
                        אה כן טובי אמר שהוא חזר הביתה...
                        `
                    );
                }

                else if (progress == 3) {
                    showMessage(
                        `אופירה:
                        יעל שלום! איזה כיף שאת פה!
                        זה היום הראשון שלי בעבודה במוזיאון, והכנתי תערוכת גרביים מהממת, אבל...
                        הגיע משב רוח מאוד חזק והעיף את הגרביים על צמרות עצים בשכונה!!! מיאוו הסססס!!!!
                        לצערי הכלב הזה לא נותן לי לרדת מהספסל,
                        ולכן את חייבת לעזור לי.
                        פרר.
                        `
                    );
                }

                else if (progress > 3) {
                    showMessage(
                        `אופירה:
                        איום ונורא הכלב הזה...
                        הססס!!!
                        בכל מקרה, טובי אמר שהוא חזר הביתה
                        `
                    );
                }
                
                else {
                    showMessage(
                        `אופירה:
                        איום ונורא הכלב הזה...
                        הססס!!!
                        `
                    );
                }
            }
        },
    ],

    // sock 1
    '3_3_E': [
        {
            top: '15%',
            left: '25%',
            width: '4%',
            height: '6%',
            item: 6 // Item ID
            // No onClick function needed
        },
    ],

    // sock 2
    '0_0_W': [
        {
            top: '15%',
            left: '15%',
            width: '4%',
            height: '6%',
            item: 7 // Item ID
            // No onClick function needed
        },
    ],

    // sock 3
    '2_1_N': [
        {
            top: '10%',
            left: '49%',
            width: '4%',
            height: '6%',
            item: 8 // Item ID
            // No onClick function needed
        },
    ],

};


// Ensure the scene exists in clickableAreasData
window.clickableAreasData['2_3_E'] = window.clickableAreasData['2_3_E'] || [];

// Add Item 4 to the scene
window.clickableAreasData['2_3_E'].push({
    top: '45%',
    left: '20%',
    width: '15%',
    height: '30%',
    item: 9, // Item ID for Item 9
    condition: function() {
        return progress >= 4 && !inventory.includes(9);
    },
    onClick: function() {
        // Add Item 4 to inventory
        // inventory.push(4);
        // updateItemBar();
        // showMessage('You have found the final item!');
        // Play the video
        showVideo('video/final_video.mp4');
        // Remove the item from the scene
        this.remove();
    }
});