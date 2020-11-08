//edamam API
const appID = "3e035de5";
const apiKey = "736b0810150196f28b8c1028864f5f3f";
var analyzeRecipeEl = document.getElementById("result-btn");


function getRecipe() {
    var recipeName = document.getElementById("name-input").value;

    let recipeURL = `https://api.edamam.com/search?app_id=${ssappID}&app_key=${apiKey}&q=${recipeName}`;
    fetch(recipeURL).then(function(response) {
        console.log(response.json());
    })
}
analyzeRecipeEl.addEventListener("click", function() {
    console.log("button pressed");
    getRecipe();
})
