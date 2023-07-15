const moviesContainer = document.getElementById('movies');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Function to fetch movies from the OMDB API
async function fetchMoviesByTitle(title) {
  const apiKey = '1ee3626f';

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.Search;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
}

// Function to display movies in the UI
function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  const filteredMovies = movies.filter(movie => movie.Type === 'movie');

  // Sort movies by year of release in descending order
  filteredMovies.sort((a, b) => b.Year - a.Year);

  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200"> 
      <h3>${movie.Title}</h3>
      <p>Imdb ID: ${movie.imdbID}</p>
      <p>Released: ${movie.Year}</p>

    `;

    // Add event listener to movie element
    movieElement.addEventListener('click', () => {
      window.location.href = `movie.html?id=${movie.imdbID}`;
    });

    moviesContainer.appendChild(movieElement);
  });
}

// Function to handle search button click event
function handleSearchButtonClick() {
  const searchInputValue = searchInput.value.trim();

  if (searchInputValue !== '') {
    fetchMoviesByTitle(searchInputValue)
      .then((movies) => {
        displayMovies(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

// Add event listener for search button click
searchButton.addEventListener('click', handleSearchButtonClick);
