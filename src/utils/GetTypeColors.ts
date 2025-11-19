const getTypeColors = (type: string): string => {
    const colors: Record<string, string> = {
        fire: '#FF4500',
        grass: '#00FF7F',
        electric: '#FFD700',
        water: '#00BFFF',
        ground: '#936639',
        rock: '#582f0e',
        fairy: '#be95c4',
        poison: '#9400D3',
        bug: '#b69121',
        dragon: '#b7094c',
        psychic: '#f20089',
        flying: '#7bdff2',
        fighting: '#a71e34',
        normal: '#C0C0C0',
        ghost: '#705898',
        ice: '#b9faf8',
        dark: '#4d194d',
        steel: '#8d99ae',
        default: '#32CD32'
    };
    return colors[type] || colors.default;
}

export default getTypeColors