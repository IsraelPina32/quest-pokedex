import { useState, useEffect } from "react";

export type PokemonDetail = {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: { type: { name: string} }[];
};

export const usePokemonsList = (offset: number) => {
    const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isCancelled = false;

        const fetchPokemons = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`
                );
                const data = await response.json();

                const details = await Promise.all(
                    data.results.map(async (p: any) => {
                        const res = await fetch(p.url);
                        return res.json();
                    })
                );

                if (!isCancelled) {
                    setPokemons(
                        
                        prev => {
                           
                           const combined = [...prev, ...details]
                              const unique = Array.from(
                            new Map(combined.map(p => [p.id, p])).values()
                        );
                        return unique;
                        });
                }
            } catch (err: any) {
                if (!isCancelled) setError(err.message);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        fetchPokemons();

        return () => { isCancelled = true };
    }, [offset]);

    return { pokemons, loading, error };
};
