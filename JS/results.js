$(document).ready(function() {

    let recipesArr = JSON.parse(localStorage.getItem("recipes-list")) || [];
    console.log(recipesArr);

    if (recipesArr) {

        for (let i = 0; i < recipesArr.length; i++) {
            // response calls
            let recipeImg = $("<img>").attr("src", recipesArr[i].recipe.image).addClass("thumbnail");
            let imageEl = $("<td>").append(recipeImg);
            let recipeName = $("<td>").text(recipesArr[i].recipe.label);
            let cookTime = $("<td>").text(recipesArr[i].recipe.totalTime);
            if (recipesArr[i].recipe.totalTime === 0) {
                cookTime.text("N/A")
            };
            let servingSize = $("<td>").text(recipesArr[i].recipe.yield);
            let recipeLink = $("<a>").attr("href", recipesArr[i].recipe.url).attr("target", "_blank").html(recipesArr[i].recipe.source + " : " + recipesArr[i].recipe.label);
            let linkEl = $("<td>").append(recipeLink);
            let saveBtnEl = $("<td>").attr("type", "button").attr("class", "primary button").text("Save");

            console.log(recipesArr[i].recipe.url);

            // html establishment
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
})
