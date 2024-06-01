// Function to fetch game details by appid
async function getGameDetails(appid) {
    try {
        const url = `${BASE_URL}/single-game/${appid}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
}

// Function to render game details in a modal
function renderGameDetails(game) {
    const modal = document.getElementById("game-detail-modal");
    const gameDetailContainer = document.getElementById("game-detail");

    gameDetailContainer.innerHTML = `
    <h2>${game.name || 'No name available'}</h2>
    <img src="${game.header_image || ''}" alt="${game.name || 'No image available'}">
    <p><strong>Release Date:</strong> ${new Date(game.release_date).toDateString() || 'No release date available'}</p>
    <p><strong>Developer:</strong> ${(game.developer && game.developer.join(', ')) || 'No developer information available'}</p>
    <p><strong>Platforms:</strong> ${(game.platforms && game.platforms.join(', ')) || 'No platforms available'}</p>
    <p><strong>Genres:</strong> ${(game.genres && game.genres.join(', ')) || 'No genres available'}</p>
    <p><strong>Description:</strong> ${game.description || 'No description available'}</p>
    <p><strong>Price:</strong> $${game.price || 'No price available'}</p>
    `;

    // Show the modal
    modal.style.display = "block";

    // Close the modal when the user clicks on <span> (x)
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Update renderGameElement function to include a click event listener
function renderGameElement(game) {
    let Element = document.createElement("a");
    Element.classList.add("cover");
    let img = document.createElement("img");
    img.src = game.header_image;
    img.classList.add("img");
    let gameName = document.createElement("div");
    gameName.classList.add("game-name");
    let p = document.createElement("p");
    p.textContent = game.name;
    gameName.appendChild(p);
    Element.appendChild(img);
    Element.appendChild(gameName);

    // Add click event listener to fetch and display game details
    Element.addEventListener("click", async () => {
        const gameDetails = await getGameDetails(game.appid);
        renderGameDetails(gameDetails);
    });

    return Element;
};
