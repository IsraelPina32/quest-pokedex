import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { ThemeContext } from "../../contexts/index";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";


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
    border: 1px solid rgb(82, 84, 85);
    background-color: ${({ type }) => getTypeColors(type)};
`

const StyleImage = styled.img`
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
const StyleCardTypes = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.background}; 
`
const StyleTitlePokemons = styled.h1`
     padding: 0 1rem;
     font-size: 1.4rem;
     font-weight: bold;
     text-decoration: none;
`
const StyleTypes = styled.div`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: 800;
    background-color: ${({ type }) => getTypeColors(type)}
`

const StyleClipLoader = styled.div`
    display: flex;
    justify-content: center;
`

const StyleButton = styled.button`
    background: linear-gradient(145deg, #c0c0c0, #e0e0e0) ;
    color: #333;
    padding: 0.8rem 1.5rem;
    border: 1px solid #c0c0c0;
    border-radius: 0.5rem;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    position: relative;
    bottom: 27px;
    transition: all 0.3s ease-in-out;

    &:hover {
        background: liner-gradient(145deg, #e0e0e0, #c0c0c0);
        transform: scale(1.1);
        box-shadow: 2px 2px 5px #b0b0b0, -2px -2px 5px #ffffff;
    }
`
export const Cards = () => {
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const { theme } = useContext(ThemeContext);
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
                const pokemonsMap = new Map(prevPokemons.map((pokemon) => [pokemon.id, pokemon]));
                details.forEach((pokemon) => {
                    pokemonsMap.set(pokemon.id, pokemon);
                });
                return Array.from(pokemonsMap.values());
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
                            <StyleCardTypes theme={theme}>
                                {pokemon.types.map((type) => (
                                    <StyleTypes key={type.type.name} type={type.type.name}>{type.type.name}</StyleTypes>
                                ))}
                            </StyleCardTypes>
                        </StyleCardPokemon>
                    ))}
                </StyleCardsPokemons>
            </StyleCard>
            {loading ?  
                    (
                        <StyleClipLoader>
                            <ClipLoader color="#52b788" loading={loading} size={30}/>
                        </StyleClipLoader>
                    ) : (
                    <StyleButton onClick={handleLoadMore} disabled={loading}>Carregar mais</StyleButton>
                )}
        </div>
    );
}