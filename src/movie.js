
// Get the imdbID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('id');

// Declare variables for movie details
let movieTitle;
let movieGenre;
let movieDirector;
let movieActors;
let moviePlot;
let movieRating;

// Function to fetch movie details by imdbID
async function fetchMovieDetails(imdbID) {
  const url = `https://www.omdbapi.com/?apikey=1ee3626f&i=${encodeURIComponent(imdbID)}&plot=full`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
}

// Function to display movie details in the UI
function displayMovieDetails(movie) {
  const moviePosterContainer = document.getElementById('moviePoster');
  const movieDetailsContainer = document.getElementById('movieDetails');

  if (movie) {
    moviePosterContainer.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="400">
    `;

    movieDetailsContainer.innerHTML = `
      <h2>${movie.Title} (${movie.Year})</h2><br>
      <p><strong>Genre:</strong> ${movie.Genre}</p><br>
      <p><strong>IMDb ID:</strong> ${movie.imdbID} </p><br>
      <p><strong>Director:</strong> ${movie.Director}</p><br>
      <p><strong>Actors:</strong> ${movie.Actors}</p><br>
      <p><strong>Plot:</strong> ${movie.Plot}</p><br>
      <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    `;

    // Update the movie details variables
    movieTitle = movie.Title;
    movieGenre = movie.Genre;
    movieDirector = movie.Director;
    movieActors = movie.Actors 
    moviePlot = movie.Plot;
    movieRating = movie.imdbRating;

    // Enable the "Add to Watchlist" button
    addToWatchlistButton.disabled = false;
  } else {
    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
  }
}

// Fetch and display movie details
fetchMovieDetails(imdbID)
  .then((movie) => {
    displayMovieDetails(movie);
  })
  .catch((error) => {
    console.error('Error:', error);
    displayMovieDetails(null);
  });

// Add event listener to "Add to Watchlist" button
const addToWatchlistButton = document.getElementById('addToWatchlistButton');
addToWatchlistButton.addEventListener('click', addToWatchlist);

// Function to add movie to the watchlist
function addToWatchlist() {
  // Create an object to store the movie details
  const movie = {
    title: movieTitle,
    ID: imdbID,
    genre: movieGenre,
    director: movieDirector,
    actor: movieActors,
    plot: moviePlot,
    rating: movieRating,
    poster: document.querySelector('#moviePoster img').src // Add the poster property
  };

  // Save the movie object to local storage
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));

  // Redirect to the watchlist page
  window.location.href = 'watchlist.html';
}

// Add event listener to back button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
