import { Link } from 'react-router-dom';
import getTypeColors from '../../utils/GetTypeColors';
import { ErrorLoading } from '../ErrorLoading';
import { ButtonBack } from '../ButtonBack';
import { UsePokemonsByType } from '../../hooks/usePokemons';
import { ThemeContext} from '../../contexts/index';
import styled from 'styled-components';
import { useParams } from 'react-router';
import { useContext } from 'react';


type TypeProp = {
    type: string;
}

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

     @media (max-width: 425px) {
       padding: 6rem 0 0.7rem 0;
    }
`

const StyleListPokemons = styled.div<TypeProp>`
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

const StyleCardTypes = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.9rem;
    border-radius: 0.5rem;
    width: 100%;
    background-color: ${({ theme }) => theme.background};
    color:  ${({ theme }) => theme.color};
`

const StyleTypes = styled.p<TypeProp>`
    width: fit-content;
    padding: 0.2rem 0.8rem;
    border-radius: 0.3rem;
    font-size: 0.9rem;
    font-weight: 800;
    background-color: ${({ type }) => getTypeColors(type)}
`

export const TypeDetails = () => {
    const { type } = useParams<{type: string}>();
    const { pokemons, loading, error} = UsePokemonsByType(type || "");
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <ErrorLoading loading={loading} error={error} theme={theme}/>
            {!loading && !error && pokemons.length > 0 && (
                    <StyleContainer style={{color: theme?.color, background: theme?.background }}>
                    <ButtonBack  />
                    <StyleCardsPokemons>
                        {pokemons.map((pokemon) => (
                            <StyleListPokemons key={pokemon.name} type={pokemon.types?.[0]?.type.name}>
                                <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
    
                                    <StyleImage src={pokemon.sprites?.front_default || "url_not_found"} alt={`Imagem do pokemon ${pokemon.name}`} />
                                    <StyleTitlePokemons>{pokemon.name}</StyleTitlePokemons>
                                </Link>
                                <StyleCardTypes>
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