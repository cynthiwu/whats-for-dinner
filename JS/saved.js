$(document).ready(function() {

    //Call to get local storage. 
    
    // Testing object //
    
    const testArray = [
        {
        label: "Poop Tacos",
        totalTime: "20",
        img: "https://www.edamam.com/web-img/32d/32da8c201c42d8aae7a7f51449c83e2a.jpg",
        url: "http://www.google.com/",
        },
        {
        label: "Crisp Tacos Picadillo",
        totalTime: "60",
        img: "https://www.edamam.com/web-img/32d/32da8c201c42d8aae7a7f51449c83e2a.jpg",
        url: "http://www.lottieanddoof.com/2009/07/picadillo/",
        },
    ]
    
    function deleteCard() {
        $(this).parent().parent().parent().remove();
        // Need code to delete this from local storage. 
    }

    createCard(testArray);
    
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
        
        let close = $("<span>").addClass("card-close").text("x");
        innerDiv.append(close);
        
        let time = $("<p>").addClass("cook-time").text(array.totalTime + ": min");
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
        // $.ajax({
        //     url: "http://api.pdflayer.com/api/convert?access_key=fc89c18463a3601f09f7161ad08a5e5b&document_url=" + recipeurl + "&document_name=" + documentName + "&test=1",
        //     method: "GET",
        // }).then(function(response) {
        //     console.log(response);
        // })

    };
    

    
    $(".card-close").on("click", deleteCard);
    $(".pdf-button").on("click", convertPDF);
    
    });