const fetchPokemon = () => {
    const pokename = document.getElementById("pokeId");
    let pokeInput = pokename.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("../imagenes/pokeDesconocido.png");
            pokeNombre.textContent = ("Pokémon no encontrado")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        console.log(data);
        const {stats, types, moves} = data;
        let pokeImagen = data.sprites.front_default;
        pokeImage(pokeImagen);
        pokeNombre.textContent = data.name[0].toUpperCase() + data.name.slice(1);
        pokeNum.textContent = `N° ${data.id}`;
        pokeTypes.textContent = data.types;
        pokeStats.textContent = data.stats;
        colorCard(types);
        pokeTipos(types);
        pokeEstadisticas(stats);
        pokeMoves.textContent = ` Movimientos: ${data.moves.length}`; 
    })
}
const pokeImage = (url) => {
    pokeImg.src = url;
}
const pokeImg = document.getElementById("pokeImg");
const pokeCard = document.getElementById("data-poke-card");
const pokeNombre = document.getElementById("data-poke-name");
const pokeNum = document.getElementById("data-poke-num");
const pokeTypes = document.getElementById("data-poke-types");
const pokeStats = document.getElementById("data-poke-stats");
const pokeMoves = document.getElementById("data-poke-moves");
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const colorCard = types => {
    const colorUno = typeColors[types[0].type.name];
    const colorDos = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background = `radial-gradient(${colorDos} 33%, ${colorUno} 33%)`;
    pokeImg.style.backgroundSize = "5px 5px";
}
const pokeTipos = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}
const pokeEstadisticas = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}