//const search_button = document.getElementById("search");

//const axios = require("axios");

function handleResponse(response){
    return response.json().then(function (json){
        return response.ok ? json : Promise.reject(json);
    })
}

function handleData(data){
    console.log(data);
}

function handleError(error){
    alert("An error has occured, please check console for further detais");
    console.error(error);
}

function search_for_anime(){
    //const search_field = document.getElementById("search_field");
    //const anime = search_field.value;
    let variables = {
        search:"One Peace", //TODO: make this get the data from the input field
        page: 1,
        perPage: 3

    }
    console.log(variables);
    const query = `
        query ($id: Int, $page: Int, $perPage: Int, $search: String){
            Page (page: $page, perPage: $perPage){
                pageInfo {
                    total
                    currentPage
                    lastPage
                    hasNextPage
                    perPage
                }
            }
            Media (id: $id, search: $search) {
                id
                title{
                    romaji
                }
            }
        }
    `;

    const config = {
        url: "https://graphql.anilist.co",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        }
    };

    fetch(config["url"], config["options"]).then(handleResponse).then(handleData).catch(handleError);
}

search_for_anime();

//search_button.addEventListener("click", search_for_anime);