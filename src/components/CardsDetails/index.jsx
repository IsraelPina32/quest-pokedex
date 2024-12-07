import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { ThemeContext } from "../../contexts/index";
import { useContext } from "react";

const StyleContainer = styled.div`
    height: 100vh;
    max-width: 2240px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`
const StyleCardDefault = styled.div`
    position: relative;
    top: 200px;
    font-size: 1.2rem;
    font-weight:500;
`

const StyleCardDetails = styled.div`
    display: flex;
    gap: 0.2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    list-style: none;
    font-weight: 500;
    width: 45%;
    border-radius: 0.5rem;
    background-color: #820D0D;
`
const StyleH1 = styled.h1`
    font-size: 2rem;
    margin-top: 1.5rem;
`
const StyleImg = styled.img`
    width: 250px;
    height: 250px;
`
const StyleP = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
`
const StyleList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
`
const StyleL = styled.li`
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.1rem 0.6rem;
    border-radius: 0.8rem;
    font-weight: 700;
    list-style: none;
    background-color: ${({ type }) => getTypeColors(type)}
`
const StyleButton = styled.button`
    background-color: #5DC3EB;
    color: #FAFAFA;
    padding: 0.7rem;
    margin-top: 0.5rem;
    border: 1px solid #5E99AE;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    top: 0px;
`
export const CardsDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                if(!response.ok) {
                    throw new Error(`Error de requisição : ${response.status}`);
                }
                const data = await response.json();
                setPokemon(data)
                setLoading(false);
            } catch (error) {
                console.log("Error: ", error.message);
                setError(error.message);

            }
        }
        fetchPokemon();
    }, [name]);

    if (loading) {
        return  (
            <StyleCardDefault>
            <StyleImg src="https://pbs.twimg.com/media/EQCJmpQUEAA4eQj.jpg:large" alt="Carregando" />
            <StyleH1>Buscando o seu Pokemon, aguarde...</StyleH1>
            <StyleButton onClick={() => navigate("/")}>Voltar para a Pagina Inicial</StyleButton>
            </StyleCardDefault>
        )  
    } 

    if (error) {
        return (
            <StyleCardDefault>
                <StyleImg src="https://media.tenor.com/QvnSpdGuVXUAAAAM/pikachu-crying.gif" alt="Erro 404" />
                <StyleH1>Error o Pokemon Digitado não foi encontrado, tente novamente.</StyleH1>
                <StyleButton onClick={() => navigate("/")}>Volte para a Pagina Inicial</StyleButton>
            </StyleCardDefault>
        )
    }
    const {theme} = useContext(ThemeContext)

    return (
        <StyleContainer style={{color: theme.color, background: theme.background} }>
            <StyleCardDetails>
                <StyleH1>{pokemon.name}</StyleH1>
                <StyleImg src={pokemon.sprites?.front_default || 'url_not_found'} alt={pokemon.name} />
                <StyleP>Altura: {(pokemon.height / 10).toFixed(1)} m</StyleP>
                <StyleP>Peso: {(pokemon.weight / 10).toFixed(1)} kg</StyleP>
                <StyleP>Tipos: </StyleP>
                <StyleList> {pokemon.types?.length > 0 ?(
                     pokemon.types.map((type) => (
                        <StyleL key={type.type.name} type={type.type.name}>{type.type.name}</StyleL>
                    ))
                ) : (
                    <StyleL type="normal">Normal</StyleL>
                )}      
                </StyleList>
                <StyleButton onClick={() => navigate("/")}>Voltar para a Pagina Inicial</StyleButton>
            </StyleCardDetails>
        </StyleContainer>
    )
}