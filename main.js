const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com";

// Fetch all game data from API
let q = "";
async function getAllGames(query) {
    try {
        let url = `${BASE_URL}/games?limit=30`;
        if (query) {
            url += `&genres=${query}`;
        }
        if (q) {
            url += `&q=${q}`
        }
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
}
// End function----

// render game element
function renderGameElement(game) {
    let cover = document.querySelector('.container-game')
    let Element = document.createElement("a");
    Element.classList.add("cover");
    let img = document.createElement("img");
    img.src = game.header_image;
    img.classList.add("img")
    let gameName = document.createElement("div");
    gameName.classList.add("game-name");
    let p = document.createElement("p");
    p.textContent = game.name;
    gameName.appendChild(p);
    Element.appendChild(img);
    Element.appendChild(gameName);

    Element.addEventListener('click', async () => {
        const appid = game.appid;
        const gameDetailsData = await getGameDetails(appid);
        console.log(gameDetailsData);
        let element = await renderGameDetails(gameDetailsData);
        cover.appendChild(element);
    })

    return Element;

};
// End function


// load all game on UI
async function loadAllGames() {
    try {
        const data = await getAllGames();
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";

        data.data.forEach(game => {
            const gameElement = renderGameElement(game);
            cover.appendChild(gameElement);

        })
        let hidden = document.querySelectorAll(".hidden");
        hidden.forEach(element => {
            element.classList.remove('hidden');
        })
    } catch (error) {
        console.log("error:", error);
    };
};
// End function----

// ----fetch genres of game from API
async function getGenresList() {
    try {
        let url = `${BASE_URL}/genres?`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error:", error);
    }
};
// End function----

// CapitalizeFirstLetter function
function capitalizeFirstLetter(string) {
    if (typeof string !== "string") {
        console.log("Invalid input for capitalization:", string);
        return "";
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Load genres of game on UI
async function loadGenresList() {
    try {
        const data = await getGenresList();
        let typeList = document.querySelector(".type-list");
        data.data.forEach(game => {
            let li = document.createElement("li");
            let button = document.createElement("button");
            button.classList.add("btn");
            button.textContent = capitalizeFirstLetter(game.name);
            li.appendChild(button);
            typeList.appendChild(li);

            let btn = document.querySelectorAll(".btn");
            btn.forEach(button => {
                button.addEventListener("click", (e) => {
                    const genres = e.target.textContent.toLowerCase();
                    console.log(genres);
                    let cover = document.querySelector(".container-game");
                    cover.innerHTML = '';
                    let loadingIcon = document.createElement('div');
                    loadingIcon.classList.add('fui-loading-spinner-2');
                    cover.appendChild(loadingIcon);
                    setTimeout(() => gameByGenres(genres), 1000);
                });
            });
        })

    } catch (error) {
        console.log("error: ", error);
    }
}
// End function----




// call all funtion
function initialize() {
    setTimeout(loadGenresList, 1000);
    setTimeout(loadAllGames, 1000);
}

initialize();
// End function



// get Games base on category

async function gameByGenres(genres) {
    try {
        const data = await getAllGames(genres);
        let cover = document.querySelector(".container-game");
        cover.innerHTML = "";
        data.data.forEach(game => {
            gameElement = renderGameElement(game);
            cover.appendChild(gameElement);
        })
    }
    catch (error) {
        console.log("error:", error);
    }
};
// End function

// search game function
async function searchGame() {
    q = search.value;
    const data = await getAllGames();
    let cover = document.querySelector(".container-game");
    // cover.innerHTML = "";    
    // let loadingIcon = document.createElement('div');
    // loadingIcon.classList.add('fui-loading-spinner-2');
    // cover.appendChild(loadingIcon);
    data.data.forEach(game => {
        const gameElement = renderGameElement(game);
        cover.appendChild(gameElement);
    });

}
// call function when users search game
const search = document.querySelector("#search-bar");
search.addEventListener("input", () => {
    let cover = document.querySelector(".container-game");
    cover.innerHTML = "";
    // let loadingIcon = document.createElement('div');
    // loadingIcon.classList.add('fui-loading-spinner-2');
    // cover.appendChild(loadingIcon);
    setTimeout(searchGame, 1000);
    // if (searchGame.done) {
    //     loadingIcon.style.display = 'none';
    // }
});
// End function

// function to load game detail

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
};

async function renderGameDetails(gameDetailsData) {
    let cover = document.querySelector(".container-game");
    cover.innerHTML = '';
    // Game detail container
    let element = document.createElement('div');
    element.classList.add('game-detail-container');

    let gameTitle = document.createElement('h1');
    gameTitle.classList.add('game-title', 'text');
    gameTitle.textContent = gameDetailsData.data.name;

    let gamePrice = document.createElement('p');
    gamePrice.classList.add('game-price', 'text');
    gamePrice.textContent = `Price: ${gameDetailsData.data.price}`;

    let gameImgContainer = document.createElement('div');
    gameImgContainer.classList.add('game-image-container');
    let gameImg = document.createElement('img');
    gameImg.classList.add('game-image');
    gameImg.src = gameDetailsData.data.header_image;

    gameImgContainer.appendChild(gameImg);

    let gameDescription = document.createElement('div');
    gameDescription.classList.add('game-description', 'text');
    let gameDescriptionDetail = document.createElement('p');
    gameDescriptionDetail.textContent = gameDetailsData.data.description;
    gameDescription.appendChild(gameDescriptionDetail);

    let gameInfo = document.createElement('div');
    gameInfo.classList.add('game-info', 'text');
    gameInfo.innerHTML = `
    <p><strong>RECENT REVIEWS:</strong> Very Positive</p>
        <p><strong>AVERAGE PLAYTIME:</strong> ${gameDetailsData.data.average_playtime} </p>
        <p><strong>DEVELOPER:</strong> ${gameDetailsData.data.developer}</p>
        <p><strong>PUBLISHER:</strong> Rockstar Games</p>
    `;

    let gameTag = document.createElement('div');
    gameTag.classList.add('game-tags', 'text');
    let text = document.createElement('p');
    text.textContent = 'Popular user-defined tags for this product:';

    let tag = document.createElement('p');
    tag.classList.add('text');
    tag.textContent = gameDetailsData.data.steamspy_tags;

    let tagContainer = document.createElement('div');
    tagContainer.classList.add('tags-container');
    gameTag.appendChild(text);
    gameTag.appendChild(tagContainer);

    element.appendChild(gameTitle);
    element.appendChild(gamePrice);
    element.appendChild(gameImgContainer);
    element.appendChild(gameDescription);
    element.appendChild(gameInfo);
    element.appendChild(gameTag);
    element.appendChild(tag);

    return element;
}


