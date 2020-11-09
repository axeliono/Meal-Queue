//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
const ytApiKey = "AIzaSyBfA_iWGNboQ7NaUCYZK0b7BytWLfSkbX4";
const recipeName = document.getElementById("name-input").value;
var analyzeRecipeEl = document.getElementById("result-btn");

function getRecipe() {
  var recipeName = document.getElementById("name-input").value;
  let recipeURL = `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=${recipeName}`;
  fetch(recipeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let recipesFound = data.hits;
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
    });
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
  recipeCard.appendChild(txtContainer);
  txtContainer.appendChild(recipeCardTxt);
  recipeCard.appendChild(imgContainer);
  imgContainer.appendChild(image);
  cardHolder.appendChild(recipeCard);
}

// YOUTUBE API
function getYT() {
  var recipeName = document.getElementById("name-input").value;
  let ytURL = `https://youtube.googleapis.com/youtube/v3/search?&part=snippet&maxResults=2&q=${recipeName} + "making"&key=${ytApiKey}`;
  fetch(ytURL)
    .then(function (response) {
      console.log(recipeName);
      return response.json();
    })
    .then(function (data) {
      var id = data.items[0].id.videoId;
      console.log(id);
      displayYT(id);
    });
}

function displayYT(id) {
  var playerEl = document.getElementById("player");
  playerEl.setAttribute(
    "src",
    "http://www.youtube.com/embed/" +
      id +
      "?enablejsapi=1&origin=http://example.com"
  );
}

var videoBtnEl = document.getElementById("video-btn");
videoBtnEl.addEventListener("click", function () {
  getYT();
});

analyzeRecipeEl.addEventListener("click", function () {
  console.log("button pressed");
  getRecipe();
});
