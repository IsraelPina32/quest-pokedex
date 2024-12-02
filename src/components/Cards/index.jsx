import React, { useState, useEffect } from "react";
import styled from "styled-components";
export const Cards = () => {
    const [pokemons, setPokemons] = useState([]);
    useEffect(() => {
        async function getPokemons() {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                const data = await response.json();

                const details = await Promise.all(data.results.map(async (pokemon) => {
                    const pokemonsDetails = await fetch(pokemon.url);
                    return pokemonsDetails.json();

                })
                );
                setPokemons(details);
            } catch (error) {
                console.log("Seu Pokemon não foi encontrado", error);

            }
        };
        getPokemons();
    }, [])
    return (
        <div>
             {pokemons.map((pokemon) => (
                <div key={pokemon.name}>
                    <h3>{pokemon.name}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    {pokemon.types.map((type) => (
                        <span key={type.type.name}>{type.type.name}</span>
                    ))}
                </div>
             ))}
        </div>

    );
}

const StyleCard = styled.div`
    display: flex;
`
