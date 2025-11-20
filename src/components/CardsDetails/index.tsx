import { useParams } from "react-router-dom";
import { ButtonBack } from "../ButtonBack/index.js";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/index.js";
import { useContext } from "react";
import { ErrorLoading } from "../ErrorLoading/index";
import {getTypeColor, getPokemonBackground} from "../../utils/GetTypeColors.js";
import { usePokemonByName } from "../../hooks/usePomeonsByName.js";

const StyleContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    background: url("/assets/background.jpg") no-repeat center center;
    background-size: cover;
    background-attachment: fixed;
    object-fit: cover;
    width: 100%;
`

const StyleCardDetails = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    list-style: none;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
    margin: 0 auto; 
`
const StyleCardPokemon = styled.div<{ $pokemonTypes: string[]}>`
    padding: 1rem;
    height: 80%;
    width: 650px;
    border-radius: 0.7rem;
    padding: 2rem 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background: ${({ $pokemonTypes }) => getPokemonBackground($pokemonTypes)}; 
       backdrop-filter: blur(5px);
       -webkit-backdrop-filter: blur(10px);
       box-shadow: 
           0 8px 32px 0 rgba(0, 0, 0, 0.3),
           inset 0 0 20px rgba(255, 255, 255, 0.2);
   
       transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
       z-index: 1;
   
       &:hover {
           transform: translateY(-8px);
           
           border-color: rgba(255, 255, 255, 0.9);
           box-shadow: 
               0 15px 45px 0 rgba(0, 0, 0, 0.4),
               inset 0 0 30px rgba(255, 255, 255, 0.4);
       }
    @media (max-width: 425px) {
        width: 90%;
        margin-top: 40px;
    }
    
`
const StyleImg = styled.img`
    width: 300px;
    height: 250px;
    transition: all 0.3s ease-in-out;
    border-radius: 0.5rem;

    &:hover {
        transform: scale(1.1);
    }
    @media (max-width: 425px) {
        width: 250px;
        height: 200px;
    }
`
const StyleH1 = styled.h1`
    font-family: 'PressStart2P', monospace;
    font-size: 1.9rem;
    font-weight: bold;
    margin-top: 2rem;
    color: ${({theme}) => theme.color};
`

const StyleSkills = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.3rem;
    border-radius: 0.8rem;
    background: url("/assets/background-card.jpg") no-repeat center center;
    box-shadow: 
        0 8px 32px 0 rgba(0, 0, 0, 0.3),
        inset 0 0 20px rgba(255, 255, 255, 0.2);
    background-size: cover;
    object-fit: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(109, 106, 106, 0.5);
        z-index: 1;
    }

    & > * {
        position: relative;
        z-index: 2;
    }
`
const StyleP = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e2b934ff;
    width: 100%;
`
const StyleList = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`
const StyleL = styled.li<{ type: string }>`
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.3rem 0.8rem;
    border-radius: 0.8rem;
    font-weight: 900;
    list-style: none;
    background-color: ${({ type }) => getTypeColor(type)}
`

export const CardsDetails = () => {
    const { name  } = useParams<{name: string}>();
    const {pokemon, loading, error} = usePokemonByName(name);
    const { theme } = useContext(ThemeContext);


    return (
       <>
            <ErrorLoading loading={loading} error={error} theme={theme}/>
            {!loading && !error && pokemon  && (
                  <StyleContainer style={{ color: theme?.color, background: theme?.background }}>
                  <StyleCardDetails>
                         <ButtonBack/>
                      <StyleCardPokemon key={pokemon.id} $pokemonTypes={pokemon.types.map((type: any) => type.type.name)}>
                          <StyleH1>{pokemon.name}</StyleH1>
                          <StyleImg src={pokemon.sprites?.front_default || 'url_not_found'} alt={pokemon.name} />
                          <StyleSkills>
                              <StyleP>Altura: {(pokemon.height / 10).toFixed(1)} M</StyleP>
                              <StyleP>Peso: {(pokemon.weight / 10).toFixed(1)} KG</StyleP>
                              <StyleP>Tipo(s) </StyleP>
                              <StyleList> {pokemon.types?.length > 0 ? (
                                  pokemon.types.map((type: any) => (
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