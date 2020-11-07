//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
var analyzeRecipeEl = document.getElementById("result-btn");
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//var clearHistoryEl = 
var historyEl = document.querySelector(".operation-right");
let searchTerm = "";

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
           // console.log(ingredientList);

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
}
// when a recipe is searched its put in local storage
analyzeRecipeEl.addEventListener("click", function() {
    searchTerm = document.getElementById("name-input").value;
    getRecipe(searchTerm);
    if (searchHistory.includes(searchTerm) == false) {
        searchHistory.push(searchTerm);
    }
    localStorage.setItem("search",JSON.stringify(searchHistory));
   displaySearchHistory();
})
// when the clear history button is pressed it clears storage
/*clearHistoryEl.addEventListener("click",function() {
    searchHistory = [];
    localStorage.setItem("search",JSON.stringify(searchHistory));
    displaySearchHistory();
 })*/

 //will display past searches on side
function displaySearchHistory() {
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
}