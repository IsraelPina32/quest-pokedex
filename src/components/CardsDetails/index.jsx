import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { ThemeContext } from "../../contexts/index";
import { useContext } from "react";
import { ErrorLoading } from "../ErrorLoading";

const StyleContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    margin: 0 auto;
`

const StyleCardDetails = styled.div`
    display: flex;
    gap: 0.6rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    list-style: none;
    font-weight: 500;
    border-radius: 0.5rem;
    background: url("/assets/background.jpg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    object-fit: cover;
    box-shadow: 0 0 1em #000;
    max-width: 1500px;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    margin: 0 auto;
    opacity: 0.9;

    @media (max-width: 425px) {
       padding: 6rem 0 0.7rem 0;
    }
    
`
const StyleCardPokemon = styled.div`
    padding: 1rem;
    height: 90%;
    background-color: ${({type}) => getTypeColors(type)};
    border-radius: 0.5rem;

     @media (max-width: 425px) {
        height: 95%;
    }
`
const StyleH1 = styled.h1`
    font-size: 2.2rem;
    font-weight: bold;
    margin-top: 1.5rem;
    color: ${({theme}) => theme.color};
`
const StyleImg = styled.img`
    width: 300px;
    height: 250px;
    transition: all 0.3s ease-in-out;
    border-radius: 0.5rem;

    &:hover {
        transform: scale(1.1);
    }
`
const StyleSkills = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 1.3rem;
    border-radius: 0.3rem;
    background: url("/assets/background-card.jpg") no-repeat center center;
    background-size: cover;
    object-fit: center;
    border: 1px solid #007ea7;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(76, 74, 74, 0.5);
        z-index: 1;
    }

    & > * {
        position: relative;
        z-index: 2;
    }
`
const StyleP = styled.p`
    font-size: 1.3rem;
    font-weight: 900;
    margin-bottom: 0.7rem;
    border-bottom: 1px solid #9ef01a;
    width: 100%;
`
const StyleList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.9rem;
`
const StyleL = styled.li`
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 0.8rem;
    font-weight: 900;
    list-style: none;
    background-color: ${({ type }) => getTypeColors(type)}
`
const StyleButton = styled.button`
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: 1px solid #4d908e;
    background: none;
    background-color: #34a0a4;
    box-shadow: 0 0 0.5em #4d908e;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    top: 35px;
    right: 150px;
    
     @media (max-width: 425px) {
        right: 125px;
        top: 70px;
    }
`


const StyleArrowReturn = styled.img`
    height: 30px;
    width: 30px;
`
export const CardsDetails = () => {
    const { name  } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { theme } = useContext(ThemeContext);

   
    useEffect(() => {
        if(!name) {
            setError("Nome do Pokemon não fornecido");
            setLoading(false);
            return;
        }
        const fetchPokemon = async () => {
            try {
                setLoading(true)
                setError(null)
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
                if (!response.ok) {
                    throw new Error(`Error de requisição : ${response.status}`);
                }
                const data = await response.json();
                console.log('Dados recebidos: ', data);
                setPokemon(data)
               
            } catch (error) {
                console.log("Error: ", error.message);
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        fetchPokemon();
    }, [name]);

    return (
       <>
            <ErrorLoading loading={loading} error={error} theme={theme}/>
            {!loading && !error && pokemon  && (
                  <StyleContainer style={{ color: theme?.color, background: theme?.background }}>
                  <StyleCardDetails>
                      <StyleButton onClick={() => navigate("/")} aria-label="Voltar para o Menu Principal">
                          <StyleArrowReturn src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-2/48/123-512.png" alt="Icone de Voltar" />
                      </StyleButton>
                      <StyleCardPokemon type={pokemon.types?.[0].type?.name}>
                          <StyleH1>{pokemon.name}</StyleH1>
                          <StyleImg src={pokemon.sprites?.front_default || 'url_not_found'} alt={pokemon.name} />
                          <StyleSkills>
                              <StyleP>Altura: {(pokemon.height / 10).toFixed(1)} m</StyleP>
                              <StyleP>Peso: {(pokemon.weight / 10).toFixed(1)} kg</StyleP>
                              <StyleP>Tipo(s) </StyleP>
                              <StyleList> {pokemon.types?.length > 0 ? (
                                  pokemon.types.map((type) => (
                                      <StyleL key={type.type.name} type={type.type.name}>{type.type.name}</StyleL>
                                  ))
                              ) : (
                                  <StyleL type="normal">Normal</StyleL>
                              )}
                              </StyleList>
                          </StyleSkills>
                      </StyleCardPokemon>
                  </StyleCardDetails>
              </StyleContainer>
            )}
       </>
    )
}