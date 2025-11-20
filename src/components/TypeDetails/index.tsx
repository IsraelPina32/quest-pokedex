import { Link } from 'react-router-dom';
import {getTypeColor, getPokemonBackground} from '../../utils/GetTypeColors';
import { ErrorLoading } from '../ErrorLoading';
import { ButtonBack } from '../ButtonBack';
import { UsePokemonsByType } from '../../hooks/usePokemons';
import { ThemeContext} from '../../contexts/index';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useContext } from 'react';

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

const StyleContainer = styled.div<{ $isDark: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    padding: 3.9rem;
    background: url("/assets/background2.jpg") no-repeat center center;
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
    z-index: 1;
   
     @media (max-width: 425px) {
       padding: 6rem 0 0.7rem 0;
    }
`

const StyleListPokemons = styled.div<{ $pokemonTypes: string[] }>`
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
     border-top: 1px solid rgba(255, 255, 255, 0.5); 
        border-left: 1px solid rgba(255, 255, 255, 0.5);
        background: ${({ $pokemonTypes }) => getPokemonBackground($pokemonTypes)}; 
        backdrop-filter: blur(5px);
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
const StyleTitlePokemons = styled.h2<{ $isDark: boolean}>`
     padding: 0 1rem;
     font-size: 1.4rem;
     font-weight: bold;
     text-decoration: none;
     color: ${({ $isDark }) => $isDark ? '#ffffff' : '#333333'};
     text-shadow: ${({ $isDark }) => $isDark ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'};
`

const StyleCardTypes = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.background};
`

const StyleTypes = styled.div<{ type: string }>`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: 800;
    background-color: ${({ type }) => getTypeColor(type)}
`

export const TypeDetails = () => {
    const { type } = useParams<{type: string}>();
    const { pokemons, loading, error} = UsePokemonsByType(type || "");
    const { theme } = useContext(ThemeContext);
    const isDark = isColorDark(theme.background);

    return (
        <>
            <ErrorLoading loading={loading} error={error} theme={theme}/>
            {!loading && !error && pokemons.length > 0 && (
                    <StyleContainer $isDark={isColorDark(theme.background)}>
                    <ButtonBack  />
                    <StyleCardsPokemons >
                        {pokemons.map((pokemon) => (
                            <StyleListPokemons key={pokemon.name} $pokemonTypes={pokemon.types.map((type: any) => type.type.name)}>
                                <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
                                    <StyleImage src={pokemon.sprites?.front_default || "url_not_found"} alt={`Imagem do pokemon ${pokemon.name}`} />
                                    <StyleTitlePokemons $isDark={isDark}>{pokemon.name}</StyleTitlePokemons>
                                </Link>
                                <StyleCardTypes theme={theme}>
                                    {pokemon.types.map((type: any) => (
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