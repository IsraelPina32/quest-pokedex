import { useState, useEffect } from "react";

export type PokemonDetail = {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: { type: { name: string } }[];
    sprites: { front_default: string | null };
};

export const usePokemonByName = (name: string | undefined) => {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) {
            setError("Nome do Pokémon não fornecido");
            setLoading(false);
            return;
        }

        let isCancelled = false;

        const fetchPokemon = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                if (!response.ok) throw new Error(`Erro de requisição: ${response.status}`);
                const data: PokemonDetail = await response.json();

                if (!isCancelled) setPokemon(data);
            } catch (err: any) {
                if (!isCancelled) setError(err.message || "Erro desconhecido");
            } finally {
                if (!isCancelled) setLoading(false);
            }
        };

        fetchPokemon();

        return () => { isCancelled = true };
    }, [name]);

    return { pokemon, loading, error };
};
