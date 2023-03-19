const search_button = document.getElementById("search");

function handleResponse(response){
    return response.json().then(function (json){
        return response.ok ? json : Promise.reject(json);
    })
}
const imagesdiv = document.getElementById("imgdiv");
function handleData(data){
    console.log(data);
    if (data.data.Page.media.lenght === 0){
        alert("Invalid search");
        return;
    }
    let AnimeCardTemplate = document.getElementById("AnimeInfo").content;
    let dswitch = document.getElementById("darkmode");
    for (let result of data.data.Page.media){
        let NEW_ANIME = AnimeCardTemplate.cloneNode(true);
        const ANIME_TITLE = NEW_ANIME.querySelector("#AnimeTitle")
        ANIME_TITLE.textContent = result.title.english;
        if (document.getElementById("darkmode").checked){
            ANIME_TITLE.classList.toggle("darkmode_textcolor")
        }
        const ANIME_COVER = NEW_ANIME.querySelector("#AnimeCover");
        ANIME_COVER.src = result.coverImage.large;
        imagesdiv.appendChild(NEW_ANIME);
    }
}

function handleError(error){
    console.log("Error");
    alert("An error has occured, please check console for further detais");
    console.error(error);
}

function search_for_anilist(){
    while (imagesdiv.firstChild){
        imagesdiv.removeChild(imagesdiv.lastChild);
    }
    const search_field = document.getElementById("search_field");
    const anime = search_field.value;
    if (anime.length === 0){
        alert("Please enter an anime name");
        return;
    }

    let variables = {
        search: anime,
        page: 1,
        perPage: 99
    }
    const query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String){
            Page (page: $page, perPage: $perPage) {
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
                media (id: $id, search: $search, type: ANIME){
                    id
                    coverImage{
                        large
                    }
                    title {
                        english
                        romaji
                    }
                    type
                    genres
                    status
                }
            }
        }
    
    `

    const url = "https://graphql.anilist.co";

    const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
    };

    fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

//search_for_anilist();

function search_for_animal(){
    const URL = "https://api.myanimelist.net/v2/anime/30230?fields=id,title";
    const NSFW = false;

    const OPTIONS = {
        method: "POST",
        headers: {
            "Content-Type": "appl"
        }
    }
    
    fetch('https://api.myanimelist.net/v2/anime/30230?fields=id,title', {
    headers: {
        'Authorization': 'Bearer YOUR_TOKEN'
    }
}).then(handleResponse)
                                                                        .then(handleData)
                                                                        .catch(handleError);


}

//search_for_anilist();
search_button.addEventListener("click", search_for_anilist);