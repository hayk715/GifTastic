var topics = ['cat', 'dog', 'pig', 'zebra', 'dinosaur'];
 
function renderButtons() {
    $('#animalButtons').empty();

    for (var i = 0; i < topics.length; i++) {
        var animalBut = $('<button class="btn btn-primary">');
        animalBut.addClass('animal');
        animalBut.attr('type', 'button');
        animalBut.attr('data-name', topics[i]);
        animalBut.text(topics[i]);
        $('#animalButtons').append(animalBut);

    }

}

renderButtons();

$(document).on('click', '.animal', function() {

    var animal = $(this).data('name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&rating=g&pg";
    $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var animalDiv = $('<div>');
                var animalImage = $('<img>');
                var rating = results[i].rating;
                var ratingDisplay = $('<p>').text('Rating: ' + rating);

                animalImage.attr('src', results[i].images.fixed_height_still.url);
                animalImage.addClass('gif');
                animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                animalImage.attr('data-animate', results[i].images.fixed_height.url);
                animalImage.attr('data-state', 'still');
                animalDiv.append(animalImage);
                animalDiv.append(ratingDisplay);

                $('#animal-gifs').prepend(animalDiv);
            }
        });
});

$(document).on('click', '.gif', function() {

    var state = $(this).attr('data-state');

    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});

$('#add-animal').on('click', function() {
    var userInputAnimal = $('#animal-input').val().trim();
    topics.push(userInputAnimal);
    renderButtons();
    return false;
});
