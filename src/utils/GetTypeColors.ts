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
        dark: '#5c1d5cff',
        steel: '#8d99ae',
        default: '#2b2d42'
    };
    const getTypeColors = (type: string): string => {
    return colors[type] || colors.default;
   }  
   
    export const getPokemonBackground = (types: string[]): string => {
        if (!types || types.length === 0) {
            return colors.default;
        }
    
        if (types.length === 1) {
            return colors[types[0]] || colors.default;
        }
    
        const color1 = colors[types[0]] || colors.default;
        const color2 = colors[types[1]] || colors.default;
        return `linear-gradient(45deg, ${color1} 0%, ${color2} 100%)`; // Gradiente na diagonal
    };

    export const getTypeColor = (type: string): string => {
        return colors[type] || colors.default;
    };

export default getTypeColors;