export async function getData(url_api) {
    try {
        const response = await fetch(url_api);
        return response.json();
    } catch (error) {
        console.log(error);
    };
};

export function fillSelect(arrayData, select, pokeCard) {
    arrayData.forEach(data => {
        const option = document.createElement('option');
        option.text = data.name;
        select.appendChild(option);
        const id = data.id;
        const name = data.name;
        const sprite = data.sprites.front_default;
        const type = data.types.map((type) => type.type.name).join(', ')
        const card = `<img class = "sprites" src = "${sprite}"/>
        <p class = "information">${id} ${name}</p>
        <p class = "types">type: ${type}</p>`;
        option.value = card;
        console.log(card);
    });
};

