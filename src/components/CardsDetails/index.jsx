import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";



const StyleContainer = styled.div`
    background-color: #E7E7E6;
    height: 100vh;
`

const StyleCardDetails = styled.div`
    display: flex;
    gap: 0.4rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    list-style: none;
    font-weight: 500;
`
const StyleH1 = styled.h1`
    font-size: 2.3rem;
    margin-bottom: 1rem;
`
const StyleImg = styled.img`
    width: 200px;
    height: 200px;
`
const StyleP = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
`
const StyleList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`
const StyleL = styled.li`
    font-size: 1.2rem;
    list-style: none;
`
export const CardsDetails = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
                const data = await response.json();
                setPokemon(data)
            } catch (error) {
                console.log("Seu Pokemon não foi encontrado", error);

            } finally {
                setLoading(false);
            }
        }
        fetchPokemon(false);
    }, [name]);

    if (loading) {
        return <div>Carregando....</div>
    }

    if (!pokemon) {
        return <div>Pokemon não encontrado....</div>
    }

    return (
        <StyleContainer>
            <StyleCardDetails>
                <StyleH1>{pokemon.name}</StyleH1>
                <StyleImg src={pokemon.sprites?.front_default} alt={pokemon.name} />
                <StyleP>Altura: {pokemon.height}</StyleP>
                <StyleP>Peso: {pokemon.weight} kg</StyleP>
                <StyleP>Tipos: </StyleP>
                <StyleList>
                    {pokemon.types.map((type) => (
                        <StyleL key={type.type.name}>{type.type.name}</StyleL>
                    ))}
                </StyleList>
            </StyleCardDetails>
        </StyleContainer>
    )
}
