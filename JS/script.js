$(document).ready(function() {

    let ingredientsArr = JSON.parse(localStorage.getItem("add-ingredients")) || [];

    // Takes user input ingredient and puts it into an unordered list
    $("#add-button").on("click", function(event) {
        event.preventDefault();
        
        let addedIngredient = $("#form-input").val();
        let ingredientListEl = $("#ingredient-list");
        let ingredientLiEl = $("<li>").text(addedIngredient);
        let spanEl = $("<span>").text("x");
        spanEl.addClass("close");
        ingredientLiEl.append(spanEl);

        ingredientListEl.append(ingredientLiEl);

        // Will push each ingredient into the ingredientsArr
        ingredientsArr.push(addedIngredient);
        // Will set ingredientsArr (the user's list) into localstorage
        localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

        console.log(ingredientsArr);

        // Clears search bar 
        $("#form-input").val("");
    })

    // on click to take ingredient list set to local storage than pull that out to run in the searchRecipe function?
    $("#search-button").on("click", function() {
        // Switches to results page
        location.href = "./Pages/results.html";

        let ingredientSearch = localStorage.getItem("ingredients-list");
        console.log(ingredientSearch);

        // Run searchRecipe function for items in ingredients list
        searchRecipe(ingredientSearch);
    })

    // function to search for a recipe using the user input
    function searchRecipe(input) {
        let apiKey = "5d5d79c2c0msh5d8b76850693b7ep1e1c05jsn7b1b3e77821b";
        let recipeURL = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + input + "&rapidapi-key=" + apiKey;

        $.ajax({
            url: recipeURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            
            for (let i = 0; i < 5; i++) {
                // response calls
                let recipeImg = response.hits[i].recipe.image;
                let recipeName = response.hits[i].recipe.label;
                let cookTime = response.hits[i].recipe.totalTime;
                let servingSize = response.hits[i].recipe.yield;
                let recipeLink = response.hits[i].recipe.url;
    
                // html establishment
                let tableRowEl = $("<tr>");
                let tableColEl = $("<td>");
                
                $("#table-body").append(tableRowEl);

                tableRowEl.append(tableColEl).attr("src", recipeImg);
                tableRowEl.append(tableColEl).text(recipeName);
                tableRowEl.append(tableColEl).text(cookTime);
                tableRowEl.append(tableColEl).text(servingSize);
                tableRowEl.append(tableColEl).text(recipeLink);
            }
        })
    }





    // GIVEN this website
    // WHEN I search using ingredients on hand
    // THEN I am given a list of possible recipes using those ingredients

    // WHEN I find a recipe I like
    // THEN I can save it to a list of favorite recipes

    // WHEN I want to save the recipe locally
    // THEN I can click a button to convert the HTML page to PDF 

    // WHEN I click the dice
    // THEN I am presented with a random recipe

    // WHEN I click the taco
    // THEN I am presented with taco tuesday
    // ----------------------------------------------------------------------------------------------
    // WHEN I find a recipe
    // THEN I can add it to a weekly meal calendar

    // WHEN I don’t have an ingredient
    // THEN I can add it to a shopping list

})