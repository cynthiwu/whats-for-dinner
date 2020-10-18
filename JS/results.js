$(document).ready(function() {

    let recipesArr = JSON.parse(localStorage.getItem("recipes-list")) || [];
    console.log(recipesArr);

    if (recipesArr) {

        for (let i = 0; i < recipesArr.length; i++) {
            // Takes information from the response and populates in a table on the results page
            let recipeImg = $("<img>").attr("src", recipesArr[i].recipe.image).addClass("thumbnail");
           
            let imageEl = $("<td>").append(recipeImg);
            imageEl.addClass("imageRow");
            let recipeName = $("<td>").text(recipesArr[i].recipe.label);
            recipeName.addClass("recipeTitle");
            let cookTime = $("<td>").text(recipesArr[i].recipe.totalTime);
            cookTime.addClass("cooktime")
            if (recipesArr[i].recipe.totalTime === 0) {
                cookTime.text("N/A");
            }
            let servingSize = $("<td>").text(recipesArr[i].recipe.yield);
            let recipeLink = $("<a>").attr("href", recipesArr[i].recipe.url).attr("target", "_blank").html(recipesArr[i].recipe.source + " : " + recipesArr[i].recipe.label);
            recipeLink.addClass("recipeLink");
            let linkEl = $("<td>").append(recipeLink);
            linkEl.addClass("linkRow");
            let saveBtnEl = $("<td>").attr("type", "button").attr("class", "primary button save").text("Save");
            saveBtnEl.on("click", saveRecipe);
            saveBtnEl.on("click", function(){
                $(saveBtnEl).attr("class", "saved").text("Saved");
            });

            console.log(recipesArr[i].recipe.url);

            // Establish results table
            let tableRowEl = $("<tr>");
            
            $("#table-body").append(tableRowEl);

            tableRowEl.append(imageEl);
            tableRowEl.append(recipeName);
            tableRowEl.append(cookTime);
            tableRowEl.append(servingSize);
            tableRowEl.append(linkEl);
            tableRowEl.append(saveBtnEl);

            console.log("working");
        }
    }

    const savedArr = JSON.parse(localStorage.getItem("saved-recipes")) || [];
    
    // Function to save the recipe
    function saveRecipe() {
        let title = $(this).siblings(".recipeTitle").text();
        let time = $(this).siblings(".cooktime").text();
        let image = $(this).siblings(".imageRow").find(".thumbnail").attr("src");
        let link = $(this).siblings(".linkRow").find(".recipeLink").attr("href");
        
        console.log(image);
        console.log(link);
        console.log(title);
        console.log(time);
        
        savedArr.push({label: title, totalTime: time, img: image, url: link});
        localStorage.setItem("saved-recipes", JSON.stringify(savedArr));
        console.log(savedArr);
    }
})
