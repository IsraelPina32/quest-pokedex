const getTypeColors = (type) => {
    const colors = {
        fire: '#F62D14',
        grass: '#5F9569',
        electric: '#FFF06A',
        water: '#0077BC',
        ground: '#f4e7da',
        rock: '#d5d5d4',
        fairy: '#E3ABB5',
        poison: '#7D78A3',
        bug: '#f8d5a3',
        dragon: '#97b3e6',
        psychic: '#eaeda1',
        flying: '#BFE4DE',
        fighting: '#E6E0D4',
        normal: '#C5915D',
        ghost: '#705898',
        ice: '#98d8d8',
        dark: '#705848',
        default: '#f5f5f5'
    };
    return colors[type] || colors.default;
}

export default getTypeColors