const API = 'https://pokeapi.co/api/v2/pokemon?';
const firstGen = 'limit=151&offset=0'
const select = document.querySelector('#selectPokemon');
const pokemonCard = document.querySelector('#pokemonCard');



const getData = async () => {
    const apiURL = `${API}${firstGen}`;
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    };
};

const home = async () => {
    const pokemons = await getData();
    // console.log(pokemons)
    const view = () => {
        pokemons.results.forEach(pokemon => {
            const option = document.createElement('option');
            option.text = pokemon.name;
            option.value = pokemon.url;
            select.appendChild(option);
        });
    };
    view();
    pokemonPrint();
};

const getDataPokemon = async (value) => {
    const url = value;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    };
};

const pokemonPrint = async () => {
    let pokemonSelected = select.value;
    const urlPokemon = pokemonSelected;
    const pokemonData = await getDataPokemon(urlPokemon);
    // console.log(pokemonData)
    const pokemon = {
        name: pokemonData.name,
        id: pokemonData.id,
        types: pokemonData.types.map((type) => type.type.name).join(', '),
        sprite: pokemonData.sprites.front_default
    };
    const localMemory = window.localStorage;
    localMemory.setItem('pokemon', JSON.stringify(pokemon));
    const localDataMemory = JSON.parse(localMemory.getItem('pokemon'))
    console.log(localDataMemory);
    // console.log(pokemon);
    displayPokemon(localDataMemory)
};

const displayPokemon = async (character) => {
    // console.log(character)
    const print = `
        <img class = "sprites" src = "${character.sprite}"/>
        <p class = "information">${character.id} - ${character.name}</p>
        <p class = "types">type: ${character.types}</p>
    `;
    pokemonCard.innerHTML = print;
}

home();

select.addEventListener("change", pokemonPrint);