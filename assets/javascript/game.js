$(document).ready(function() {
  var topics = [
    'dog',
    'cat',
    'hamster',
    'skunk',
    'gold fish',
    'bird',
    'ferret',
    'turtle',
    'sugar glider',
    'chinchilla',
    'hedgehog',
    'hermit crab',
    'gerbil',
    'pygmy goat',
    'chicken',
    'capybara',
    'teacup pig',
    'serval',
    'salamander',
    'frog'
  ];

  for (var i = 0; i < topics.length; i++) {
    var topicButton = $('<button>');
    topicButton.attr('data-animal', topics[i]);
    topicButton.text(topics[i]);
    $('#topics').append(topicButton);
  }

  $('button').on('click', function() {
    var animal = $(this).attr('data-animal');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      animal +
      '&api_key=GhQ2S6VWefM1pAVPgzvN3ryOC3cvcBkM&limit5';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      var results = response.data;
      console.log(response.data);

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $('<p>').text('Rating: ' + rating);

        var animalImage = $('<img>');
        animalImage.attr('src', results[i].images.fixed_height.url);

        gifDiv.prepend(animalImage, p);

        $('#gifs-appear-here').prepend(gifDiv);
      }
    });
  });
});

// my api key GhQ2S6VWefM1pAVPgzvN3ryOC3cvcBkM
