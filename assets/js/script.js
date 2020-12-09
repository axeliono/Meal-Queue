//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
const ytApiKey = "AIzaSyBP_BVHyh3I4DYpn17uQ--82M8G0rIIfYo";
var analyzeRecipeEl = document.getElementById("result-btn");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var indexValueCounter = 0;
var allIngredientArray = [];
var currentlyHoveredRecipeIngredients = [];
var modalUp = false;
var clearHistoryEl = document.querySelector(".btn");
var historyEl = document.querySelector("#history-box");
let searchTerm = "";

// Need description here
function getRecipe(searchTerm) {
  let recipeURL = `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=${searchTerm}`;
  fetch(recipeURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      indexValueCounter = 0;
      let recipesFound = data.hits;
      var cardHolder = document.querySelector(".recipe-card-holder");
      cardHolder.innerHTML = "";
      allIngredientArray= [];

      for (i = 0; i < recipesFound.length; i++) {
        let recipeName = data.hits[i].recipe.label;
        //console.log(recipeName);
        let recipeImage = data.hits[i].recipe.image;
        //console.log(recipeImage);
        let ingredientList = data.hits[i].recipe.ingredients;
        //console.log(ingredientList);
        var ingredientArrayObject = {
          ingredients: [],
          name: recipeName,
          picture: recipeImage,
        };
        for (x = 0; x < ingredientList.length; x++) {
          //put each ingredient into array
          ingredientArrayObject.ingredients.push(ingredientList[x].text);
        }
        allIngredientArray.push(ingredientArrayObject);
        //console.log(ingredientArrayObject);
        displayRecipeCards(recipeName, recipeImage, ingredientArrayObject);
      }
      if (data.count === 0) {
        console.log("No Responses found");
      } else {
        localStorage.setItem("search", JSON.stringify(searchHistory));
        displaySearchHistory();
      }
    });
  if (searchHistory.includes(searchTerm) == false) {
    searchHistory.push(searchTerm);
  }
}

// Need description here
function displayRecipeCards(recipeName, recipeImage, ingredientArrayObject) {
  var cardHolder = document.querySelector(".recipe-card-holder");

  // creates div element to contain recipe card
  var recipeCard = document.createElement("div");
  // take the text of each index of the object holding the array of ingredients

  var txtContainer = document.createElement("div");
  txtContainer.setAttribute("class", "text-container");
  var recipeCardTxt = document.createElement("p");
  recipeCardTxt.innerText = recipeName;

  // creates div element to contain "image"
  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");
  var image = document.createElement("img");

  recipeCard.className = "recipe-card";
  image.src = recipeImage;

  txtContainer.appendChild(recipeCardTxt);
  recipeCard.appendChild(imgContainer);
  recipeCard.appendChild(txtContainer);
  imgContainer.appendChild(image);

  //modal button labels and elements
  var recipeModalButton = document.createElement("div");
  recipeModalButton.setAttribute("class", "modal-container");
  var recipeModalButtonInput = document.createElement("input");
  recipeModalButtonInput.setAttribute("type", "checkbox");
  recipeModalButtonInput.setAttribute("id", "modal-toggle");
  var btnLabel = document.createElement("label");
  btnLabel.setAttribute("for", "modal-toggle");
  btnLabel.className = "modal-btn";
  recipeCardTxt.setAttribute("name", recipeName);
  recipeCardTxt.setAttribute("ingredients", ingredientArrayObject.ingredients);

  console.log(recipeCardTxt.getAttribute("ingredients"));

  btnLabel.innerText = "See More";
  btnLabel.setAttribute("index-value", indexValueCounter);
  indexValueCounter++;

  var backdropLabel = document.createElement("label");
  backdropLabel.setAttribute("for", "modal-toggle");
  backdropLabel.className = "modal-backdrop";
  recipeModalButton.appendChild(recipeModalButtonInput);
  recipeModalButton.appendChild(btnLabel);
  recipeModalButton.appendChild(backdropLabel);

  // It retreives incredient object to modal
  btnLabel.addEventListener("mouseenter", function (event) {
    loadNecessaryVariables(event);
  });
  btnLabel.addEventListener("mouseleave", function (event) {
    if (modalUp === false) {
      removeUnnecessaryVariables(event);
    }
  });
  btnLabel.addEventListener("click", populateModalContent);
  //btnLabel.addEventListener("click", getYT());

  //modal content labels and elements
  recipeModalContentEl = document.createElement("div");
  recipeModalContentEl.className = "modal-content";

  // Create closing icon "X" on top right
  var contentLabelEl = document.createElement("label");
  contentLabelEl.setAttribute("for", "modal-toggle");
  contentLabelEl.setAttribute("class", "modal-close");
  contentLabelEl.innerText = "\u2715";

  // Create modal title element inside of container : contentTitle
  var contentTitle = document.createElement("div");
  contentTitle.setAttribute("class", "content-title");
  var contentText = document.createElement("h2");
  contentText.setAttribute("class", "title");
  recipeModalContentEl.appendChild(contentLabelEl);
  recipeModalContentEl.appendChild(contentTitle);
  contentTitle.appendChild(contentText);

  //set ingredients as attribute to be accessed by modal
  // Create div element that will contain ingredient
  var ingredientSpan = document.createElement("span");
  ingredientSpan.setAttribute("class", "ingredient-box");
  var arrayLine = document.createElement("ol");
  arrayLine.setAttribute("class", "ingredient-list");

  // Append to the browser

  recipeModalButton.appendChild(recipeModalContentEl);
  recipeCard.appendChild(recipeModalButton);
  cardHolder.appendChild(recipeCard);

  // Append to the modal -- ingredients
  recipeModalContentEl.appendChild(ingredientSpan);
  ingredientSpan.appendChild(arrayLine);
}

function toggleSidebar(ref){
  document.getElementById("sidebar").classList.toggle('active');
  
}

//will display past searches on side
function displaySearchHistory() {
  historyEl.innerHTML = "";
  for (var i = 0; i < searchHistory.length; i++) {
    var pastRecipe = document.createElement("input");
    pastRecipe.setAttribute("type", "text");
    pastRecipe.setAttribute("readonly", true);
    pastRecipe.setAttribute("class", "recipe-space");
    pastRecipe.setAttribute("value", searchHistory[i]);
    let recipeNames = searchHistory[i];
    pastRecipe.addEventListener("click", function () {
      //console.log(this.value);
      //console.log(recipeNames);
      var searchInput = document.getElementById("name-input");
      searchInput.value = recipeNames;
      pastRecipe.setAttribute("onclick", toggleSidebar(this));
      getRecipe(recipeNames);
      
    });
    historyEl.append(pastRecipe);
  }
}
displaySearchHistory();


var loadNecessaryVariables = function (event) {
  modalUp = false;
  currentlyHoveredRecipeIngredients.push(
    allIngredientArray[event.target.getAttribute("index-value")]
  );
  console.log(currentlyHoveredRecipeIngredients);
};

var removeUnnecessaryVariables = function (event) {
  currentlyHoveredRecipeIngredients = [];
  console.log(currentlyHoveredRecipeIngredients);
};
//title needs a reset
var populateModalContent = function () {
  createYoutubeElements();
  modalUp = true;
  var title = document.querySelector(".title");
  console.log(title);
  title.innerHTML = currentlyHoveredRecipeIngredients[0].name;
  var orderedList = document.querySelector(".ingredient-list");
  orderedList.innerHTML = "";
  for (
    i = 0;
    i < currentlyHoveredRecipeIngredients[0].ingredients.length;
    i++
  ) {
    var listItem = document.createElement("li");
    listItem.innerText = currentlyHoveredRecipeIngredients[0].ingredients[i];
    orderedList.appendChild(listItem);
  }
  currentlyHoveredRecipeIngredients = [];
};

analyzeRecipeEl.addEventListener("click", function () {
  searchTerm = document.getElementById("name-input").value;
  getRecipe(searchTerm);
});

//when the clear history button is pressed it clears storage
clearHistoryEl.addEventListener("click", function () {
  searchHistory = [];
  localStorage.setItem("search", JSON.stringify(searchHistory));
  displaySearchHistory();
});

function getYT(recipeName) {
  let ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${recipeName}+ "making"&type=video&key=${ytApiKey}&maxResults=2`;
  fetch(ytURL)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data.items[0].id.videoId)
      var id = data.items[0].id.videoId;
      const videoURL =
        "https://www.youtube.com/embed/" +
        id +
        "?enablejsapi=1&origin=https://example.com";
      document.querySelector(".video-frame").setAttribute("src", videoURL);
    });
}

function createYoutubeElements() {
  // Create div element to contain Youtube video
  if (!document.querySelector(".video-container")) {
    var youtubeContainer = document.createElement("div");
    youtubeContainer.setAttribute("class", "video-container");
    var youtubeBox = document.createElement("div");
    youtubeBox.setAttribute("class", "youtube-box");
    var videoTitle = document.createElement("h1");
    videoTitle.setAttribute("class", "video-title");

    videoTitle.innerText = "HOW TO COOK TUTORIAL";

    // Append to the modal -- youtube
    var recipeModalContentEl = document.querySelector(".modal-content");
    recipeModalContentEl.appendChild(youtubeContainer);
    youtubeContainer.appendChild(youtubeBox);
    youtubeContainer.appendChild(youtubeBox);
    youtubeBox.appendChild(videoTitle);

    var frameBox = document.createElement("div");
    frameBox.setAttribute("class", "frame-box");
    var videoFrame = document.createElement("iframe");
    videoFrame.setAttribute("class", "video-frame");
    videoFrame.setAttribute("cid", "player");
    videoFrame.setAttribute("src", "");

    videoFrame.setAttribute("width", "640px");
    videoFrame.setAttribute("type", "text/html");
    videoFrame.setAttribute("height", "390");
    var youtubeContainer = document.querySelector(".video-container");
    youtubeContainer.appendChild(frameBox);
    frameBox.appendChild(videoFrame);
  }

  getYT(currentlyHoveredRecipeIngredients[0].name);
}
