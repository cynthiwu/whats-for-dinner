$(document).ready(function() {

    let savedArr = JSON.parse(localStorage.getItem("saved-recipes")) || [];
    
    function deleteCard() {
        let storedRecipes = JSON.parse(localStorage.getItem("saved-recipes")) || [];
        let linkData = $(this).parent().parent().parent();
        for (let i = 0; i < storedRecipes.length; i++) {

            if (linkData.attr("data-label") === storedRecipes[i].label) {
                storedRecipes.splice(i, 1);
                console.log(storedRecipes);
                localStorage.setItem("saved-recipes", JSON.stringify(storedRecipes));
            }
        }
        console.log(linkData.attr("data-label"));
        linkData.remove();
    }

    createCard(savedArr);
    
    function createCard(array) {
        $.each(array, function(index, array) {
        console.log(array.label);
        console.log(array.totalTime);
        console.log(array.img); 

        let cardLink = $("<a>").attr({href: array.url, target: "_blank"});
        
        let outerDiv = $("<div>").addClass("card saved-card");
        cardLink.append(outerDiv);
       
        let innerDiv = $("<div>").addClass("card-divider");
        outerDiv.append(innerDiv);
        
        let title = $("<h6>").addClass("saved-head");
        title.text(array.label);
        innerDiv.append(title);
        // cardLink.attr(`data-${array.label}`);
        cardLink.attr("data-label", array.label);
        
        let close = $("<span>").addClass("card-close").text("x");
        innerDiv.append(close);
        
        let time = $("<p>").addClass("cook-time").text("Time: " + array.totalTime + " min");
        innerDiv.append(time);
        
        let pdf = $("<img>").attr({src: "../Assets/pdf.png", alt: "PDF icon", target: "_blank"});
        pdf.addClass("pdf-button");
        innerDiv.append(pdf);
        
        let imageSection = $("<div>").addClass("card-section card-image");
        outerDiv.append(imageSection);
        
        let image = $("<img>").attr({src: array.img, alt:"Recipe photo"});
        imageSection.append(image);

        close.click(function(e){
            e.preventDefault();
        });
        
        pdf.click(function(e){
            e.preventDefault();
        });

        $("#save-section").append(cardLink);
        });
    };

    function convertPDF() {
        let recipeurl = $(this).closest("a").attr("href");
        console.log(recipeurl);
        let documentName = $(this).siblings("h6").text();
        console.log(documentName);
        let pdfurl = "http://api.pdflayer.com/api/convert?access_key=fc89c18463a3601f09f7161ad08a5e5b&document_url=" + recipeurl + "&document_name=" + documentName + "&test=1";

        window.open(pdfurl, '_blank');
    };
    
    $(".card-close").on("click", deleteCard);
    $(".pdf-button").on("click", convertPDF);
});