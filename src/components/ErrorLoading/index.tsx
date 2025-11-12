import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


type themeShape = {
    background: string;
    color: string;
    primary?: string;
    [key: string]: any;
}

type ErrorLoadingProps = {
    loading: boolean;
    error: string | null | boolean;
    theme: themeShape;
}

const StyleCardDefault = styled.div<{theme: themeShape}>`
    height: 100vh;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({ theme }) => theme.color};
    background: ${({ theme }) => theme.background};
`;

const StyleH1 = styled.h1<{theme: themeShape}>`
    font-size: 2.2rem;
    font-weight: bold;
    margin-top: 1.5rem;
    color: ${({ theme }) => theme.color};
`;

const StyleImg = styled.img`
    width: 300px;
    height: 250px;
    transition: all 0.3s ease-in-out;
    border-radius: 0.5rem;

    &:hover {
        transform: scale(1.1);
    }
`;

const StyleButtonError = styled.button`
    padding: 0.8rem;
    margin-top: 0.5rem;
    border: 1px solid #2b2d42;
    background: none;
    background-color: #ef233c;
    box-shadow: 0 0 0.5em #8d99ae;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;
    margin-top: 1.5rem;
`;


export const ErrorLoading = ({ loading, error, theme }: ErrorLoadingProps) => {

    const navigate = useNavigate();

    if (loading) {
        return (
            <StyleCardDefault theme={theme}>
                <ClipLoader color={theme.primary ?? " #007ea7"} loading={loading} size={150} />
                <StyleH1>Buscando o seu Pokemon, aguarde...</StyleH1>
            </StyleCardDefault>
        );
    }

    if (error) {
        return (
            <StyleCardDefault theme={theme}>
                <StyleImg src="/assets/not-found.png" alt="Erro 404" />
                <StyleH1 theme={theme}>Error Not Found 404 </StyleH1>
                <StyleButtonError onClick={() => navigate("/")}>Volte para a Pagina Inicial</StyleButtonError>
            </StyleCardDefault>
        );
    }

    return null;
};