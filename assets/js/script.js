//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
var analyzeRecipeEl = document.getElementById("result-btn");


function getRecipe() {
    var recipeName = document.getElementById("name-input").value;
    let recipeURL = `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=${recipeName}`;
    fetch(recipeURL).then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let recipesFound = data.hits
        var cardHolder = document.querySelector(".recipe-card-holder");
        cardHolder.innerHTML = "";

        for (i = 0; i < recipesFound.length; i++) {
            let recipeName = data.hits[i].recipe.label;
            console.log(recipeName);
            let recipeImage = data.hits[i].recipe.image;
            console.log(recipeImage);
            let ingredientList = data.hits[i].recipe.ingredients;
            console.log(ingredientList);

            displayRecipeCards(recipeName, recipeImage, ingredientList);

        
        }

    })
}

function displayRecipeCards(recipeName, recipeImage, ingredientList) {
    var cardHolder = document.querySelector(".recipe-card-holder");
    
    // creates div element to contain recipe card
    var recipeCard = document.createElement("div");
    var txtContainer = document.createElement("div");
    var recipeCardTxt = document.createElement("p");
    txtContainer.setAttribute("class", "text-container");

    // creates div element to contain "image"
    var imgContainer = document.createElement("div");
    imgContainer.setAttribute("class", "img-container");
    var image = document.createElement("img");

    

    recipeCard.className = "recipe-card";
    image.src = recipeImage;

    

    recipeCardTxt.innerText = recipeName;
    recipeCard.appendChild(txtContainer)
    txtContainer.appendChild(recipeCardTxt);
    recipeCard.appendChild(imgContainer);
    imgContainer.appendChild(image);
    cardHolder.appendChild(recipeCard);
    
    
// Joshua's code for modals = you can delete this or keep this in a reference
//     // Function for modals
//     let modalEl = () => {
//     // create div element to contain button
//     let modalContainer = document.createElement("div");
//     modalContainer.setAttribute("class", "modal-container");
//     // Create an input
//     let modalToggle = document.createElement("input");
//     modalToggl.setAttribute("id", "modal-toggle")
//     modalToggle.setAttribute("type", "checkbox");
//     // Create label for button
//     let modalBtn = document.createElement("label");
//     modalBtn.setAttribute("class", "modal-btn");
//     modalBtn.setAttribute("id", "modal-btn");
//     modalBtn.setAttribute("for", "modal-toggle");
//     modalBtn.textContent = "See More";
//     // Create another label
//     let modalBackDrop = document.createElement("label");
//     modalBackDrop.setAttribute("class", "modal-backdrop");
//     modalBackDrop.setAttribute("for", "modal-toggle");

//     // create div element for popup window
//     let modalContent = document.createElement("div");
//     modalContent.setAttribute("class", "modal-content");

//     // Create label for "X" icon
//     let modalClose = document.createElement("label");
//     modalClose.setAttribute("class", "modal-close");
//     modalClose.setAttribute("for", "modal-toggle");

//     modalClose.innerText = "&#x2715;";

//     // Create an eventlistner for modalBtn
//     modalBtn.addEventListener("click", function(){
//         // For Jullia and Peter to write a function - if user clicks modalBtn, it directs to the content
//     });

//     modalContainer.appendChild(modalBtn);
//     recipeCard.appendChild(modalContainer);
//     }

// }

analyzeRecipeEl.addEventListener("click", function() {
    console.log("button pressed");
    getRecipe();
})