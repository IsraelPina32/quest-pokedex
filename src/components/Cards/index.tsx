import { useState } from "react";
import styled from "styled-components";
import getTypeColors from "../../utils/GetTypeColors";
import { ThemeContext } from "../../contexts/index";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { usePokemonsList } from "../../hooks/usePokemonsList";
import GlassButton from "../../ui/GlassButton";


function isColorDark(hex: string | undefined) {
  if (!hex) return false;
  
  const h = hex.replace("#", "");
  if (h.length !== 6) return false;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
 
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L < 0.5;
}


const StyleCard = styled.div<{ $isDark: boolean}>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0 auto;
    gap: 1rem;
    padding: 3.9rem;
    background: url("/assets/background.jpg") no-repeat center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    min-height: 100vh;
    position: relative;

    &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    inset: 0;
    background: ${({ $isDark }) => ($isDark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0)")};
    transition: background 240ms ease;
    z-index: 0;

      @media (max-width: 425px) {
        padding: 12rem 3.6rem 3.6rem 3.6rem;
    }
  }
`
const StyleCardsPokemons = styled.div`
    display: flex;
    max-width: 1200px;
    width: 100%;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    border-radius: 1rem;
    padding: 1rem;
`
const StyleCardPokemon = styled.div<{ type: string }>`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.6rem;
    width: 230px;
    height: 260px;
    border-radius: 0.7rem;
    border: 1px;
    background: ${({ type }) => getTypeColors(type)};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    z-index: 2;
    border-top: 1px solid rgba(255, 255, 255, 0.5); 
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    background: linear-gradient(
        145deg, 
        rgba(255, 255, 255, 0.15) 0%, 
        rgba(0, 0, 0, 0.05) 100%
    ), ${({ type }) => getTypeColors(type)};
    backdrop-filter: blur(10px); 
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 
        0 8px 32px 0 rgba(0, 0, 0, 0.3),
        inset 0 0 20px rgba(255, 255, 255, 0.2);

    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 2;

    &:hover {
        transform: translateY(-8px);
        
        border-color: rgba(255, 255, 255, 0.9);
        box-shadow: 
            0 15px 45px 0 rgba(0, 0, 0, 0.4),
            inset 0 0 30px rgba(255, 255, 255, 0.4);
    }
`

const StyleImage = styled.img`
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
`

const StyleTitlePokemons = styled.h1`
     padding: 0.3rem 0;
     font-size: 1rem;
     font-weight: bold;
     font-family: 'PressStart2P', monospace;
     text-decoration: none;
     text-transform: uppercase;
     margin: 0;
`
const StyleCardTypes = styled.div`
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding: 0.9rem;
    border-radius: 1rem;
    width: 100%;
    background-color: ${({ theme }) => theme.background}; 
`

const StyleTypes = styled.div<{ type: string }>`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 1.2rem;
    background-color: ${({ type }) => getTypeColors(type)};
    z-index: 2;
`

const StyleClipLoader = styled.div`
    display: flex;
    justify-content: center;
    z-index: 2;
`

export const Cards = () => {
    const [offset, setOffset] = useState(0);
    const {pokemons, loading, error} =  usePokemonsList(offset);
    const { theme } = useContext(ThemeContext);
   
    const handleLoadMore = () => {
        setOffset((prevOffset) => prevOffset + 10);
    };

    return (
        <>
            <StyleCard $isDark={isColorDark(theme.background)}>
                <StyleCardsPokemons>
                    {pokemons.map((pokemon : any) => (
                        <StyleCardPokemon key={pokemon.id} type={pokemon.types[0]?.type.name}>
                            <Link to={`pokemon/${pokemon.name}`}>
                                <StyleImage src={pokemon.sprites.front_default} alt={` Imagem do Pokemon ${pokemon.name} `} />
                                <StyleTitlePokemons>{pokemon.name}</StyleTitlePokemons>
                            </Link>
                            <StyleCardTypes theme={theme}>
                                {pokemon.types.map((type : any) => (
                                    <StyleTypes key={type.type.name} type={type.type.name}>{type.type.name}</StyleTypes>
                                ))}
                            </StyleCardTypes>
                        </StyleCardPokemon>
                    ))}
                </StyleCardsPokemons>
           
            {loading ?  
                    (
                        <StyleClipLoader>
                            <ClipLoader color="#52b788" loading={loading} size={30}/>
                        </StyleClipLoader>
                    ) : (
                    <GlassButton onClick={handleLoadMore} disabled={loading}>Carregar mais Pokemons!</GlassButton>
                )}
            </StyleCard>
        </>
    );
}