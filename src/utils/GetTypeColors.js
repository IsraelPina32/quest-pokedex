const getTypeColors = (type) => {
    const colors = {
        fire: '#e63946',
        grass: '#76c893',
        electric: '#ffbe0b',
        water: '#00b2ca',
        ground: '#936639',
        rock: '#582f0e',
        fairy: '#be95c4',
        poison: '#a06cd5',
        bug: '#b69121',
        dragon: '#b7094c',
        psychic: '#f20089',
        flying: '#7bdff2',
        fighting: '#a71e34',
        normal: '#a78a7f',
        ghost: '#705898',
        ice: '#b9faf8',
        dark: '#4d194d',
        steel: '#8d99ae',
        default: '#80b918'
    };
    return colors[type] || colors.default;
}

export default getTypeColors