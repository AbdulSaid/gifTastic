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

  function renderButtons() {
    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $('#topics').empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {
      // Then dynamicaly generating buttons for each movie in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $('<button>');
      // Adding a class
      a.addClass('animal');
      // Adding a data-attribute with a value of the topics at index i
      a.attr('data-animal', topics[i]);
      // Providing the button's text with a value of the topics at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $('#topics').append(a);
    }
  }

  // This function handles events where one button is clicked
  $('#add-topic').on('click', function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $('#topic-input')
      .val()
      .trim();
    // The animal from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();

  // for (var i = 0; i < topics.length; i++) {
  //   var topicButton = $('<button>');
  //   topicButton.attr('data-animal', topics[i]);
  //   topicButton.text(topics[i]);
  //   $('#topics').append(topicButton);
  // }

  $('button').on('click', function() {
    var animal = $(this).attr('data-animal');
    var queryURL =
      'https://api.giphy.com/v1/gifs/search?q=' +
      animal +
      '&api_key=GhQ2S6VWefM1pAVPgzvN3ryOC3cvcBkM&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      var results = response.data;
      console.log(response.data);
      $('#gifs-appear-here').empty();

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $('<div>');

        var rating = results[i].rating;

        var p = $('<p>').text('Rating: ' + rating);

        var animalImage = $('<img>');
        animalImage.attr('src', results[i].images.fixed_height_still.url);
        animalImage.attr(
          'data-still',
          results[i].images.fixed_height_still.url
        );
        animalImage.attr('data-animate', results[i].images.fixed_height.url);
        animalImage.attr('data-state', 'still');
        animalImage.addClass('gif');

        gifDiv.prepend(animalImage, p);

        $('#gifs-appear-here').prepend(gifDiv);
        $(animalImage).on('click', function() {
          var state = $(this).attr('data-state');
          console.log(this);
          if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', 'animate');
          } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
          }
        });
      }
    });
  });
});

// my api key GhQ2S6VWefM1pAVPgzvN3ryOC3cvcBkM
