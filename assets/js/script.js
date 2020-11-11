//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
const ytApiKey = "AIzaSyBfA_iWGNboQ7NaUCYZK0b7BytWLfSkbX4";
var analyzeRecipeEl = document.getElementById("result-btn");
const recipeName = document.getElementById("name-input").value;
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//var clearHistoryEl = 
//var historyEl = document.querySelector(".operation-right");
//let searchTerm = "";

// Need description here
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
            console.log(recipeName);
            let recipeImage = data.hits[i].recipe.image;
            console.log(recipeImage);
            let ingredientList = data.hits[i].recipe.ingredients;
            console.log(ingredientList);
            var ingredientArrayObject = { ingredients: [] };
            for (x = 0; x < ingredientList.length; x++) {
              //put each ingredient into array
              ingredientArrayObject.ingredients.push(ingredientList[x].text);
            }
            console.log(ingredientArrayObject);
            displayRecipeCards(recipeName, recipeImage, ingredientArrayObject);
          }
        
    })
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

  //modal button labels and elements
  var recipeModalButton = document.createElement("div");
  recipeModalButton.setAttribute("class", "modal-container");
  var recipeModalButtonInput = document.createElement("input");
  recipeModalButtonInput.setAttribute("type", "checkbox");
  recipeModalButtonInput.setAttribute("id", "modal-toggle");
  var btnLabel = document.createElement("label");
  btnLabel.setAttribute("for", "modal-toggle");
  btnLabel.className = "modal-btn";
  btnLabel.innerText = "See More"
  //btnLabel.onclick = getYT();
  var backdropLabel = document.createElement("label");
  backdropLabel.setAttribute("for", "modal-toggle");
  backdropLabel.className = "modal-backdrop";
  recipeModalButton.appendChild(recipeModalButtonInput);
  recipeModalButton.appendChild(btnLabel);
  recipeModalButton.appendChild(backdropLabel);

  // It retreives incredient object to modal
  btnLabel.addEventListener("click", function(){
    
  })

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
  contentText.innerText = recipeName;
  recipeModalContentEl.appendChild(contentLabelEl);
  recipeModalContentEl.appendChild(contentTitle);
  contentTitle.appendChild(contentText);

  //set ingredients as attribute to be accessed by modal
  // Create div element that will contain ingredient
  var ingredientBox = document.createElement("div");
  ingredientBox.setAttribute("class", "ingredient-box");
  var ingredientSpan = document.createElement("span");
  ingredientSpan.setAttribute("class", "get-ingredients");
  var arrayLine = document.createElement("ol");
  arrayLine.setAttribute("class", "ingredient-list");
  var arrayList = document.createElement("li");
  

  ingredientSpan.innerHTML = ingredientArrayObject.ingredients;



  recipeModalContentEl.appendChild(ingredientBox);
  ingredientBox.appendChild(ingredientSpan);
  ingredientSpan.appendChild(arrayLine);
  arrayLine.appendChild(arrayList);


  // recipeCard.setAttribute("ingredients", ingredientArrayObject);




  // Append to the browser
  txtContainer.appendChild(recipeCardTxt);
  recipeCard.appendChild(imgContainer);
  recipeCard.appendChild(txtContainer);
  imgContainer.appendChild(image);

  recipeModalButton.appendChild(recipeModalContentEl);
  recipeCard.appendChild(recipeModalButton);
  cardHolder.appendChild(recipeCard);

// when a recipe is searched its put in local storage
analyzeRecipeEl.addEventListener("click", function() {
    searchTerm = document.getElementById("name-input").value;
    getRecipe(searchTerm);
    // if (searchHistory.includes(searchTerm) == false) {
    //     searchHistory.push(searchTerm);
    // }
    // localStorage.setItem("search",JSON.stringify(searchHistory));
   //displaySearchHistory();
})
// when the clear history button is pressed it clears storage
// /*clearHistoryEl.addEventListener("click",function() {
//     searchHistory = [];
//     localStorage.setItem("search",JSON.stringify(searchHistory));
//     displaySearchHistory();
//  })*/

 //will display past searches on side
//function displaySearchHistory() {
//    historyEl.innerHTML = "";
//    for (var i = 0; i < searchHistory.length; i++) {
//       var pastRecipe = document.createElement("input");
//       pastRecipe.setAttribute("type","text");
//       pastRecipe.setAttribute("readonly",true);
//       pastRecipe.setAttribute("class", "recipe-space");
//       pastRecipe.setAttribute("value", searchHistory[i]);
//       let recipeNames = searchHistory[i];
//       pastRecipe.addEventListener("click",function() {
//           console.log(this.value);
//           console.log(recipeNames);
//           var searchInput =  document.getElementById("name-input");
//           searchInput.value = recipeNames;
//          getRecipe(recipeNames);  
//       })
//       historyEl.append(pastRecipe);
      

// }}

// displaySearchHistory();
// if (searchHistory.length > 0) {
//    getRecipe(searchHistory[searchHistory.length - 1]);}