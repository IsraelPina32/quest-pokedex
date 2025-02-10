import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ThemeContext } from "../../contexts/index";
import { useContext } from 'react';
import getTypeColors from '../../utils/GetTypeColors';
import { ErrorLoading } from '../ErrorLoading';
import { ButtonBack } from '../ButtonBack';


const StyleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 3.9rem;
    background-color: ${({ theme }) => theme.background};
    color:  ${({ theme }) => theme.color};
`

const StyleCardsPokemons = styled.div`
    display: flex;
    max-width: 800px;
    width: 100%;
    gap: 0.7rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
`

const StyleListPokemons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem;
    width: 230px;
    height: 200px;
    border-radius: 0.5rem;
    border: 1px solid rgb(82, 84, 85);
    background-color: ${({ type }) => getTypeColors(type)}
`

const StyleImage = styled.img`
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`
const StyleTitlePokemons = styled.h2`
     padding: 0 1rem;
     font-size: 1.4rem;
     font-weight: bold;
     text-decoration: none;
`

const StyleCardTypes = styled.p`
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    color:  ${({ theme }) => theme.color};
`

const StyleTypes = styled.div`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: 800;
    background-color: ${({ type }) => getTypeColors(type)}
`

export const TypeDetails = () => {
    const { type } = useParams();
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        const fetchPokemonsByType = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log(`Fetching Pokemons of type: ${type}`);
                const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
                console.log(response);

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);

                }
                const data = await response.json();
                const pokemonsWithDetails = await Promise.all(
                    data.pokemon.map(async (p) => {
                        const pokemonResponse = await fetch(p.pokemon.url);
                        const pokemonData = await pokemonResponse.json();

                        if (pokemonData.types.some(t => t.type.name === type)) {
                            return pokemonData
                        }
                        return null;
                    })
                );
                setPokemons(pokemonsWithDetails.filter(p => p !== null))
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchPokemonsByType();
    }, [type]);


    return (

        <>
            <ErrorLoading loading={loading} error={error} theme={theme}/>
            {!loading && !error && pokemons.length > 0 && (
                    <StyleContainer style={{color: theme.color, background: theme.background }}>
                    <ButtonBack  />
                    <StyleCardsPokemons>
                        {pokemons.map((pokemon) => (
                            <StyleListPokemons key={pokemon.name} type={pokemon.types?.[0]?.type.name}>
                                <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
    
                                    <StyleImage src={pokemon.sprites?.front_default || "url_not_found"} alt={`Imagem do pokemon ${pokemon.name}`} />
                                    <StyleTitlePokemons>{pokemon.name}</StyleTitlePokemons>
                                </Link>
                                <StyleCardTypes theme={theme}>
                                    {pokemon.types.map((type) => (
                                        <StyleTypes key={type.type.name} type={type.type.name}>{type.type.name}</StyleTypes>
                                    ))}
                                </StyleCardTypes>
                            </StyleListPokemons>
                        ))}
                    </StyleCardsPokemons>
                </StyleContainer>
            )}   
        </>
    )
}