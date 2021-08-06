import { getData, fillSelect } from "./functions.js";


const API = 'https://pokeapi.co/api/v2/pokemon/';
const pokemonList = document.querySelector('#selectPokemon');
const pokemonCard = document.querySelector('#pokemonCard');


pokemonList.addEventListener("change", pokemonPrint)

function pokemonUrl() {
    const url = [];
    for (let i = 152; i<=251; i++) {
        url.push(getData(`${API}${i}`));
    }
    Promise.all(url)
    .then(results => {
        fillSelect(results, pokemonList, pokemonCard);
        pokemonPrint();
    })
}

function pokemonPrint() {
    let pokemonSelected = pokemonList.value;
    pokemonCard.innerHTML = pokemonSelected;
}


pokemonUrl();


