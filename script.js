function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {

    console.log(responseJson);
    $('#results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++){
      $('#results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <p><a href=${responseJson.data[i].url}>${responseJson.data[i].url}</a></p>
        </li>`
      )};

    $('#results').removeClass('hidden');
  };

function getNationalParks() {

    const apiKey = "envY06bEH90cHGaZukdIVYThQCnqfixrNUiVzQH7";
    const state = $('#js-search-state').val();
    const qty = $('#js-max-results').val();
    const searchURL = "https://developer.nps.gov/api/v1/parks";

    const params = {
        api_key: apiKey,
        stateCode: state,
        limit: qty
    };

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
}

function handleSearch() {
    $('.submit').on('click', function(event) {
        event.preventDefault();
        getNationalParks();
    });
}

handleSearch();