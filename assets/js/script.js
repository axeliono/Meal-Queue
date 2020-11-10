//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
var analyzeRecipeEl = document.getElementById("result-btn");
//var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const recipeName = document.getElementById("name-input").value;
const ytApiKey = "AIzaSyCwJNSo98gcvzFPQLMWt8HhKVXCMI5weWI";
//var clearHistoryEl = 
//var historyEl = document.querySelector(".operation-right");
//let searchTerm = "";

function getRecipe(searchTerm) {

 
    
    let recipeURL = `https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=${searchTerm}`;
    fetch(recipeURL).then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let recipesFound = data.hits
        var cardHolder = document.querySelector(".recipe-card-holder");
        cardHolder.innerHTML = "";
        
        for (i = 0; i < recipesFound.length; i++) {
            let recipeName = data.hits[i].recipe.label;
            //console.log(recipeName);
            let recipeImage = data.hits[i].recipe.image;
            //console.log(recipeImage);
            let ingredientList = data.hits[i].recipe.ingredients;
            //console.log(ingredientList);
            var ingredientArrayObject = { ingredients: [] };
            for (x = 0; x < ingredientList.length; x++) {
              //put each ingredient into array
              ingredientArrayObject.ingredients.push(ingredientList[x].text);
            }
            console.log(ingredientArrayObject);
            displayRecipeCards(recipeName, recipeImage, ingredientList);
          }
        
    })
}


function displayRecipeCards(recipeName, recipeImage, ingredientArrayObject) {
  var cardHolder = document.querySelector(".recipe-card-holder");

  // creates div element to contain recipe card
  var recipeCard = document.createElement("div");
  // take the text of each index of the object holding the array of ingredients

  var txtContainer = document.createElement("div");
  var recipeCardTxt = document.createElement("p");
  txtContainer.setAttribute("class", "text-container");
  recipeCardTxt.innerText = recipeName;

  // creates div element to contain "image"
  var imgContainer = document.createElement("div");
  imgContainer.setAttribute("class", "img-container");
  var image = document.createElement("img");

  recipeCard.className = "recipe-card";
  image.src = recipeImage;

  //modal button labels and elements
  var recipeModalButton = document.createElement("div");
  recipeModalButton.setAttribute("class", "modal-container");
  var recipeModalButtonInput = document.createElement("input");
  recipeModalButtonInput.setAttribute("type", "checkbox");
  recipeModalButtonInput.setAttribute("id", "modal-toggle");
  var btnLabel = document.createElement("label");
  btnLabel.setAttribute("for", "modal-toggle");
  btnLabel.className = "modal-btn";
  var backdropLabel = document.createElement("label");
  backdropLabel.setAttribute("for", "modal-toggle");
  backdropLabel.className = "modal-backdrop";
  recipeModalButton.appendChild(recipeModalButtonInput);
  recipeModalButton.appendChild(btnLabel);
  recipeModalButton.appendChild(backdropLabel);

  //modal content labels and elements
  recipeModalContentEl = document.createElement("div");
  recipeModalContentEl.className = "modal-content";
  var contentLabelEl = document.createElement("label");
  contentLabelEl.setAttribute("for", "modal-toggle");
  contentLabelEl.setAttribute("class", "modal-close");
  contentLabelEl.innerText = "\u2715";
  var contentText = document.createElement("h2");
  contentText.innerText = recipeName;
  recipeModalContentEl.appendChild(contentLabelEl);
  recipeModalContentEl.appendChild(contentText);

  //set ingredients as attribute to be accessed by modal
  recipeCard.setAttribute("ingredients", ingredientArrayObject);
  recipeCard.appendChild(txtContainer);
  txtContainer.appendChild(recipeCardTxt);
  recipeCard.appendChild(imgContainer);
  imgContainer.appendChild(image);

  recipeModalButton.appendChild(recipeModalContentEl);

  recipeCard.appendChild(recipeModalButton);
  cardHolder.appendChild(recipeCard);

  getYT(recipeName);

}
// YOUTUBE API
function getYT(recipeName) {
  //var recipeName = document.getElementById("name-input").value;
  let ytURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=pizza&type=video&key=${ytApiKey}`;
  fetch(ytURL)
    .then(function (response) {
      console.log(recipeName, response);
      //return response.json();
    })
    // .then(function (data) {
    //   var id = data.items[0].id.videoId;
    //   console.log(id);
    //   displayYT(id);
    // });
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

// when a recipe is searched its put in local storage
analyzeRecipeEl.addEventListener("click", function() {
    searchTerm = document.getElementById("name-input").value;
    getRecipe(searchTerm);
    if (searchHistory.includes(searchTerm) == false) {
        searchHistory.push(searchTerm);
    }
    localStorage.setItem("search",JSON.stringify(searchHistory));
   //displaySearchHistory();
})
// when the clear history button is pressed it clears storage
/*clearHistoryEl.addEventListener("click",function() {
    searchHistory = [];
    localStorage.setItem("search",JSON.stringify(searchHistory));
    displaySearchHistory();
 })*/

 //will display past searches on side
/*function displaySearchHistory() {
   historyEl.innerHTML = "";
   for (var i = 0; i < searchHistory.length; i++) {
      var pastRecipe = document.createElement("input");
      pastRecipe.setAttribute("type","text");
      pastRecipe.setAttribute("readonly",true);
      pastRecipe.setAttribute("class", "recipe-space");
      pastRecipe.setAttribute("value", searchHistory[i]);
      let recipeNames = searchHistory[i];
      pastRecipe.addEventListener("click",function() {
          console.log(this.value);
          console.log(recipeNames);
          var searchInput =  document.getElementById("name-input");
          searchInput.value = recipeNames;
         getRecipe(recipeNames);  
      })
      historyEl.append(pastRecipe);
      

}}

displaySearchHistory();
if (searchHistory.length > 0) {
   getRecipe(searchHistory[searchHistory.length - 1]);
}*/