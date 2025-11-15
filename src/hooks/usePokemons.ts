import { useState, useEffect } from "react";

export type PokemonDetail = {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    height: number;
    weight: number;
};

type UsePokemonsReturn = {
    pokemons: PokemonDetail[];
    loading: boolean;
    error: string | null;
};

export const UsePokemonsByType = (identifier: string): UsePokemonsReturn => {
    const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!identifier) return;

        let isCancelled = false;
        const ctrl = new AbortController();

        const fetchPokemonsByType = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/type/${identifier}`, { signal: ctrl.signal });
                if (!response.ok) throw new Error(`Error fetching Pokemons of type ${identifier}: ${response.statusText}`);

                const data = await response.json();

                const pokemonsWithDetails: PokemonDetail[] = await Promise.all(
                    data.pokemon.map(async (pokeEntry: any) => {
                        const pokeResponse = await fetch(pokeEntry.pokemon.url);
                        return pokeResponse.json();
                    })
                );

                if (!isCancelled) {
                    // remove duplicados
                    const uniquePokemonsMap = new Map<number, PokemonDetail>();
                    pokemonsWithDetails.forEach((pokemon: PokemonDetail) => {
                        if (!uniquePokemonsMap.has(pokemon.id)) {
                            uniquePokemonsMap.set(pokemon.id, pokemon);
                        }
                    });

                    setPokemons(Array.from(uniquePokemonsMap.values()));
                }

            } catch (error: any) {
                if (!isCancelled) setError(error.message);
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        fetchPokemonsByType();

        return () => {
            isCancelled = true;
            ctrl.abort();
        };
    }, [identifier]);

    return { pokemons, loading, error };
};