const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const resultsContainer = document.getElementById("results");
const resultCount = document.getElementById("resultCount");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error");



// Pixabay API settings
const API_URL = "https://pixabay.com/api/";


// Search button
searchButton.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if (!query) {
        showError("Please enter a search term.");
        return;
    }

    searchPixabay(query);
});


// Press Enter to search
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        const query = searchInput.value.trim();

        if (!query) {
            showError("Please enter a search term.");
            return;
        }

        searchPixabay(query);
    }
});


// Challenge buttons
const challengeButtons =
    document.querySelectorAll(".challenge-btn");

challengeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const query = button.dataset.query;

        searchInput.value = query;

        searchPixabay(query);
    });

});


// Main Pixabay search function
async function searchPixabay(query) {

    clearResults();
    hideError();

    loading.classList.remove("hidden");

    try {

        const encodedQuery = encodeURIComponent(query);

        const parameters = new URLSearchParams({

            key: PIXABAY_API_KEY,

            q: query,

            image_type: "photo",

            orientation: "all",

            safesearch: "true",

            per_page: "20"

        });


        const requestURL =
            `${API_URL}?${parameters.toString()}`;



        console.log("Pixabay API Request:");
        console.log(requestURL);


        const response = await fetch(requestURL);


        if (!response.ok) {

            throw new Error(
                `API request failed with status ${response.status}`
            );

        }


        const data = await response.json();


        console.log("Pixabay API Response:");
        console.log(data);


        if (!data.hits || data.hits.length === 0) {

            resultCount.textContent = "0 results";

            resultsContainer.innerHTML = `
                <div class="error">
                    No results found for "${escapeHTML(query)}".
                </div>
            `;

            return;
        }


        resultCount.textContent =
            `${data.hits.length} results`;


        displayResults(data.hits);


    } catch (error) {

        console.error(error);

        showError(
            "Unable to load Pixabay results. " +
            "Please check your API key and internet connection."
        );

    } finally {

        loading.classList.add("hidden");

    }

}


// Display results
function displayResults(results) {

    resultsContainer.innerHTML = "";


    results.forEach((item) => {

        const card = document.createElement("div");

        card.className = "result-card";


        card.innerHTML = `

            <img
                class="result-media"
                src="${item.webformatURL}"
                alt="${escapeHTML(item.tags)}"
                loading="lazy"
            >

            <div class="result-content">

                <h3>
                    Pixabay Image
                </h3>

                <p>
                    <strong>Tags:</strong>
                    ${escapeHTML(item.tags)}
                </p>

                <p>
                    <strong>Views:</strong>
                    ${item.views.toLocaleString()}
                </p>

                <p>
                    <strong>Likes:</strong>
                    ${item.likes.toLocaleString()}
                </p>

                <p>
                    <strong>Downloads:</strong>
                    ${item.downloads.toLocaleString()}
                </p>

                <a
                    href="${item.pageURL}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on Pixabay →
                </a>

            </div>

        `;


        resultsContainer.appendChild(card);

    });

}


// Clear results
function clearResults() {

    resultsContainer.innerHTML = "";

    resultCount.textContent = "0 results";

}


// Show error
function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

}


// Hide error
function hideError() {

    errorMessage.textContent = "";

    errorMessage.classList.add("hidden");

}


// Basic HTML escaping
function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}