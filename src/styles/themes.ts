export const themes =  {
    light: {
        color: '#111d13',
        background: '#ecf8f8',        
    },
    dark: {
        color: '#fbfbf2',
        background: '#0a0908'
    }
} as const;


export type ThemeType = typeof themes.light | typeof themes.dark;