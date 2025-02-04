const getTypeColors = (type) => {
    const colors = {
        fire: '#e63946',
        grass: '#76c893',
        electric: '#ffbe0b',
        water: '#00b2ca',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#ffd6ff',
        poison: '#a06cd5',
        bug: '#b69121',
        dragon: '#bf0603',
        psychic: '#f20089',
        flying: '#7bdff2',
        fighting: '#a71e34',
        normal: '#a78a7f',
        ghost: '#705898',
        ice: '#c0fdfb',
        dark: '#231942',
        steel: '#8d99ae',
        default: '#a78a7f'
    };
    return colors[type] || colors.default;
}

export default getTypeColors