import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { Link } from "react-router-dom";

const StyleCard = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 3.9rem;
`
const StyleCardsPokemons = styled.div`
    display: flex;
    max-width: 750px;
    width: 100%;
    gap: 0.7rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
`
const StyleCardPokemon = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.4rem;
    padding: 0.6rem;
    width: 230px;
    height: 200px;
    border-radius: 0.5rem;
    border: 1px solid #ffffff;
    background-color: ${({ type }) => getTypeColors(type)};
`

const StyleImage = styled.img`
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
const StyleTitlePokemons = styled.h1`
     padding: 0 1rem;
     font-size: 1.3rem;
     font-weight: bold;
     text-decoration: none;
`
const StylePhrase = styled.div`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 700;
    background-color: ${({ type }) => getTypeColors(type)}
`

const StyleButton = styled.button`
    background-color: #5DC3EB;
    color: #FAFAFA;
    padding: 0.6rem;
    border: 1px solid #5E99AE;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    bottom: 27px;
`
export const Cards = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    async function getPokemons(offset) {
        setLoading(true);
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?&offset=${offset}`);
            if (!response.ok) {
                throw new Error("Seu Pokemon não foi encontrado");
            }
            const data = await response.json();

            const details = await Promise.all(data.results.map(async (pokemon) => {
                const pokemonsDetails = await fetch(pokemon.url);
                return pokemonsDetails.json();
            }));
            setPokemons((prevPokemons) => {
                const newPokemons = details.filter((pokemon) => !prevPokemons.some(prevPokemons => prevPokemons.id === pokemon.id));
                return [...prevPokemons, ...newPokemons];

            });
        } catch (error) {
            console.log("Seu Pokemon não foi encontrado", error);
        } finally {
            setLoading(false);
        }
    };
    const handleLoadMore = () => {
        setOffset((prevOffset) => prevOffset + 10);
    };

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (offset >= 0) {
            getPokemons(offset);
        }
    }, [offset])
    return (
        <div>
            <StyleCard>
                <StyleCardsPokemons>
                    {pokemons.map((pokemon) => (
                        <StyleCardPokemon key={pokemon.id} type={pokemon.types[0]?.type.name}>
                            <Link to={`pokemon/${pokemon.name}`}>
                                <StyleImage src={pokemon.sprites.front_default} alt={` Imagem do Pokemon ${pokemon.name} `} />
                                <StyleTitlePokemons>{pokemon.name}</StyleTitlePokemons>
                            </Link>
                            <div>
                                {pokemon.types.map((type) => (
                                    <StylePhrase key={type.type.name} type={type.type.name}>{type.type.name}</StylePhrase>
                                ))}
                            </div>

                        </StyleCardPokemon>
                    ))}
                </StyleCardsPokemons>
            </StyleCard>
            <StyleButton onClick={handleLoadMore} disabled={loading}>Carregar mais</StyleButton>
        </div>
    );
}