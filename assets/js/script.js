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

    var recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    var image = document.createElement("img");
    image.src = recipeImage;

    recipeCard.innerText = recipeName;
    recipeCard.appendChild(image);

    cardHolder.appendChild(recipeCard);
    


}

analyzeRecipeEl.addEventListener("click", function() {
    console.log("button pressed");
    getRecipe();
})