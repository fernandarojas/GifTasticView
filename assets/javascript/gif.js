var animals = ["panda", "giraffe", "lizard", "elephant"];

function renderButtons() {
    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.addClass("animal btn btn-default mr-2");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        $("#animal-buttons").append(a);
    };

    $(".animal").on("click", function (event) {
        var clickedAnimal = $(this).attr("data-name");
        console.log(clickedAnimal);
        callApi(clickedAnimal);
    });
    
};

function callApi(animal) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        var results = response.data;
        for (var i = 0; i < 10; i++) {
            var animalDisplay = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr('data-state', 'still');
            animalImage.attr('data-animate', results[i].images.fixed_height.url);
            animalImage.attr('data-still', results[i].images.fixed_height_still.url)
            animalImage.attr("src", results[i].images.fixed_height_still.url);

            animalDisplay.prepend(p);
            animalDisplay.prepend(animalImage);
            $("#animals-view").prepend(animalDisplay);
        };

        $("img").on("click", function () {
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animated');
            } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            };
        });
    });

};

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animalAdded = $("#animal-input").val().trim();
    animals.push(animalAdded);
    $("#animal-buttons").empty();
    renderButtons();
});

renderButtons();