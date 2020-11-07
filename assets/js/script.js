//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
const ytApiKey = "AIzaSyBfA_iWGNboQ7NaUCYZK0b7BytWLfSkbX4";
const recipeName = document.getElementById("name-input").value;
var analyzeRecipeEl = document.getElementById("result-btn");


function getRecipe() {
    const recipeName = document.getElementById("name-input").value;
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

// YOUTUBE API
function getYT () {
    var recipeName = document.getElementById("name-input").value;
    let ytURL = `https://youtube.googleapis.com/youtube/v3/search?&part=snippet&maxResults=2&q=${recipeName} + "making"&key=${ytApiKey}`;
    fetch(ytURL).then(function(response) {
        console.log(recipeName);
        return response.json()
        
    })
    .then(function(data) {
        // var displayVideo = document.getElementById("you-tube");
        // var thumbnail = document.createElement("img");
        // thumbnail.src = data.items[0].snippet.thumbnails;
        // displayVideo.appendChild(thumbnail);
        console.log(data);
    })
}

// function displayYT () {
//    let videoURL = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=[AIzaSyBfA_iWGNboQ7NaUCYZK0b7BytWLfSkbX4]'; 
// }
var videoBtnEl = document.getElementById("video-btn");
videoBtnEl.addEventListener("click", function() {
    getYT();
})


analyzeRecipeEl.addEventListener("click", function() {
    console.log("button pressed");
    getRecipe();
})