// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Define the API endpoint URL
const apiUrl = 'http://localhost:3000/films';

// Function to fetch anime data from the API
async function fetchAnimeData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching anime data:', error);
        return null;
    }
}

// Function to display anime cards
function displayAnimeCards(animeData) {
    const animeContainer = document.getElementById("anime-container");
    if (!animeData || animeData.length === 0) {
        animeContainer.innerHTML = "<p>No anime found</p>";
        return;
    }

    animeContainer.innerHTML = ""; // Clear previous anime cards
    animeData.forEach(anime => {
        const card = document.createElement("div");
        card.classList.add("anime-card");

        const image = document.createElement("img");
        image.src = anime.image;
        image.alt = anime.name;

        const description = document.createElement("p");
        description.textContent = anime.description;

        card.appendChild(image);
        card.appendChild(description);
        animeContainer.appendChild(card);
    });
}

// Function to search for anime
async function searchAnime() {
    const searchTerm = document.getElementById("search-input").value.trim().toLowerCase();
    const animeData = await fetchAnimeData();
    if (!animeData) return; // Exit if there's an error fetching data

    const filteredAnime = animeData.filter(anime => anime.name.toLowerCase().includes(searchTerm));
    displayAnimeCards(filteredAnime);
}

// Event listener for search button click
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchAnime);
