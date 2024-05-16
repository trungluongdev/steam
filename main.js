const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com"

async function getAllGames() {
    try {
        const url = `${BASE_URL}/games`;
        // const url = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games";
        const res = await fetch(url);
        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.log("error:", error)
    }
    
}

getAllGames()