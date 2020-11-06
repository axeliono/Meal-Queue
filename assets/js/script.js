//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
var analyzeRecipeEl = document.getElementById("result-btn");

analyzeRecipeEl.addEventListener("click", function() {
    console.log("button pressed");
    getRecipe();
})


function getRecipe() {

    let recipeURL = "https://api.edamam.com/search?app_id=${appID}&app_key=${apiKey}&q=pizza";
    fetch(recipeURL).then(function(response) {
        console.log(response);
    })
}