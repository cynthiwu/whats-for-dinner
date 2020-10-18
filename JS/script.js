$(document).ready(function() {

    // let ingredientsArr = JSON.parse(localStorage.getItem("add-ingredients")) || [];
    let ingredientsArr = [];
    localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

    // Function to search for a recipe using the user input
    function searchRecipe(input) {
        let apiKey = "5d5d79c2c0msh5d8b76850693b7ep1e1c05jsn7b1b3e77821b";
        let recipeURL = "https://edamam-recipe-search.p.rapidapi.com/search?q=" + input + "&rapidapi-key=" + apiKey;

        $.ajax({
            url: recipeURL,
            method: "GET"
        }).then(function(response) {
            // Switches to results page
            location.href = "./Pages/results.html";

            console.log(response);
            console.log(response.hits);

            // Set results to local storage
            localStorage.setItem("recipes-list", JSON.stringify(response.hits.splice(0, 10)));
        })
    }

    // Function for x buttons to delete ingredient items. //
    function deleteIngredient() {
        let clearIngred = JSON.parse(localStorage.getItem("ingredients-list")|| []);
        let searchTitle = $(this).parent().attr("data-label");
        
        for (let i=0; i < clearIngred.length; i++) {
            if (searchTitle === clearIngred[i]) {
                clearIngred.splice(i,1);
                localStorage.setItem("ingredients-list", JSON.stringify(clearIngred));
                console.log(clearIngred);
                console.log("Hello");
            }

            $(this).parent().remove();  
        }   
    }

    // Takes user input ingredient and puts it into an unordered list
    $("#add-button").on("click", function(event) {
        event.preventDefault();
        
        let addedIngredient = $("#form-input").val();
        let ingredientListEl = $("#ingredient-list");
        let ingredientLiEl = $("<li>").text(addedIngredient);
        ingredientLiEl.attr("data-label",addedIngredient);
        let spanEl = $("<span>").text("x");
        spanEl.addClass("close");
        spanEl.on("click", deleteIngredient);
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

    $(".switch-input").on("click", function(event) {
        // Will show true or false
        let userChoice = $(this)[0].checked;
        console.log(userChoice);

        // Takes the id of the switch
        let dietaryChoice = $(this).attr("id");
        console.log(dietaryChoice);

        // If user chooses Yes
        if (userChoice) {
            console.log("yes");

            // // Adds id to the ingredientsArr
            ingredientsArr.push(dietaryChoice);

            // // Will set ingredientsArr (the user's list) into localstorage
            localStorage.setItem("ingredients-list", JSON.stringify(ingredientsArr));

            console.log(ingredientsArr);

        // If user chooses No
        } else {
            console.log("no");

            // Takes the array out of local storage
            let clearIngred = JSON.parse(localStorage.getItem("ingredients-list")|| []);
            
            // Looks for the id of the switch and removes and resets localstorage
            for (let i=0; i < clearIngred.length; i++) {
                if (dietaryChoice === clearIngred[i]) {
                    clearIngred.splice(i,1);
                    localStorage.setItem("ingredients-list", JSON.stringify(clearIngred));
                    console.log(clearIngred);
                    console.log("Hello");
                }
            }  
        }
    })
   
    // on click to take ingredient list set to local storage than pull that out to run in the searchRecipe function?
    $("#search-button").on("click", function() {
        let ingredientSearch = localStorage.getItem("ingredients-list");
        console.log(ingredientSearch);

        // Run searchRecipe function for items in ingredients list
        searchRecipe(ingredientSearch);

        // Switches to results page
        // location.href = "./Pages/results.html";
    })

    // On click to find random "taco tuesday" recipe using the searchRecipe function
    $("#taco-button").on("click", function(){
        let tacoArr = ["tacos", "quesadilla", "enchilada", "tostada", "horchata", "huevos rancheros", "churros", "tamales", "mole", "barbacoa", "carnitas", "poblano", "fajitas", "burritos", "nachos", "taquito"];
        let randomTacoIndex = tacoArr[Math.floor(Math.random()*tacoArr.length)];
        tacoArr[randomTacoIndex];
        searchRecipe(randomTacoIndex);
        // location.href = "./Pages/results.html";
        console.log(randomTacoIndex);
    });

    // On click to find random recipe using the searchRecipe function
    $("#dice-button").on("click", function() {
        let ranArr = ["chicken", "pork", "potatoes", "asparagus", "beef", "shrimp", "seafood", "pasta", "fruit", "vegetables", "fish", "apples", "rice", "vegetarian", "vegan", "greens", "eggs"];
        let randomIndex = ranArr[Math.floor(Math.random()*ranArr.length)];
        ranArr[randomIndex];
        searchRecipe(randomIndex);
        // location.href = "./Pages/results.html";
        console.log(randomIndex);
    })
 

    




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