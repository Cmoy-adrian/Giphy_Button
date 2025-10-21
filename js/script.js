console.log("script.js loaded");

let apiKey = "OM9f2NP9sExKxv5gsYqe6vmaDOrTZ0Jw";
let images = [];

// Store Elements
const gifContainer = document.querySelector("#gif-container");
const gifButton = document.querySelector('#fetch-gif-btn');
const SearchInput = document.querySelector("#search-input");

// Function to fetch Gif
async function getGif (searchTerm = "dogs") {
    // Create access link using user search term
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        // Extract the URLs from the array
        images = data.data.map(gif => gif.images.original.url);

        // Debugging output
        console.log(`Search term: ${searchTerm}`);
        console.log(`Found ${images.length} GIFs`);
        console.log(images);

        // Show one random GIF
        showRandomGif();
    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }
}

// NEW: Random Gif Loader
function showRandomGif () {
    if (images.length === 0) {
        gifContainer.innerHTML = "No GIFs found";
        return;
    }

    const randomIndex = Math.floor(Math.random() * images.length);
    const randomGif = images[randomIndex];

    gifContainer.innerHTML = `<img src="${randomGif}" class="col-3 mb-3">`;
}

// Listen for btn click
gifButton.addEventListener ("click", function () {
    // Get text input from search
    const searchTerm = SearchInput.value.trim();

    // If the field is empty, use a default search
    if (searchTerm === "") {
        getGif("dogs");
    } else {
        getGif(searchTerm);
    }
});
