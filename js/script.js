console.log("script.js loaded");

let endpoint = "https://api.giphy.com/v1/gifs/search?api_key=OM9f2NP9sExKxv5gsYqe6vmaDOrTZ0Jw&q=dogs&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips";
let images = [];

const gifContainer = document.querySelector("#gif-container");
const gifButton = document.querySelector('#fetch-gif-btn')

// Function to fetch Gif
async function getGif () {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Extract the URLs from the array
    images = data.data.map(gif => gif.images.original.url);

    // Show in console for debugging
    console.log(data);
    console.log(images);

}

// Run function
getGif();

// Listen for btn click
gifButton.addEventListener ("click", function () {
    // Random Gif loader
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomGif = images[randomIndex];
    //Show the Gif
    gifContainer.innerHTML += `<img src=${randomGif} class = "col-3 mb-3">`;
});
