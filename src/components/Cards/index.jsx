import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";


const StyleCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 1rem;
`

const StyleCardsPokemons = styled.div`
    display: flex;
    max-width: 750px;
    width: 100%;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    border-radius: 1rem;
    background-color: #008393;
    padding: 1rem;
`

const StyleCardPokemon = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem;
    width: 150px;
    height: 200px;
    border-radius: 0.5rem;
    background-color: #C2D5E4;
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: scale(1.1);
    }
`

const StyleTitlePokemons = styled.div`
     padding: 0 1rem;
     font-size: 1.2rem;
     font-weight: bold;
`
const StylePhrase = styled.div`
    width: fit-content;
    padding: 0.1rem 0.6rem;
    border-radius: 0.8rem;
    font-size: 0.7rem;
    font-weight: 700;
    background-color: ${({ type }) => getTypeColors(type)}
`
export const Cards = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading , setLoading] = useState(false);
        async function getPokemons(offset) {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?&offset=${offset}`);
                if(!response.ok) {
                    throw new Error("Seu Pokemon não foi encontrado");
                }
                const data = await response.json();

                const details = await Promise.all(data.results.map(async (pokemon) => {
                    const pokemonsDetails = await fetch(pokemon.url);
                    return pokemonsDetails.json();
                }));
                setPokemons((prevPokemons) => [...prevPokemons, ...details]);
            } catch (error) {
                console.log("Seu Pokemon não foi encontrado", error);
            } finally {
                setLoading(false);
            }
        };
        const handleLoadMore = () => {
            setOffset((prevOffset) => prevOffset + 10);
        };

        useEffect(() => {
            if(offset >= 0){
                getPokemons(offset);
            }
        }, [offset])
    return (
        <div>
            <StyleCard>
                <StyleCardsPokemons>
                    {pokemons.map((pokemon) => (
                        <StyleCardPokemon key={pokemon.id} type={pokemon.types[0]?.type.name}>
                            <img src={pokemon.sprites.front_default} alt={` Imagem do Pokemon ${pokemon.name} `} />
                            <StyleTitlePokemons>{pokemon.name}</StyleTitlePokemons>
                            {pokemon.types.map((type) => (
                                <StylePhrase key={type.type.name} type={type.type.name}>{type.type.name}</StylePhrase>
                            ))}
                        </StyleCardPokemon>
                    ))}
                </StyleCardsPokemons>
            </StyleCard>
            <button onClick={handleLoadMore } disabled={loading}>Carregar mais</button>
        </div>
    );
}