import styled, { keyframes, css } from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';


type ThemeShape = {
    background: string;
    color: string;
    primary?: string;
    secondary?: string; 
    accent?: string;   
    [key: string]: any;
}

type ErrorLoadingProps = {
    loading: boolean;
    error: string | null | boolean;
    theme: ThemeShape;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2); }
  70% { box-shadow: 0 0 0 10px rgba(0, 0, 0, 0); }
  100% { box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); }
`;


const Container = styled.div<{ theme: ThemeShape }>`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.color};
    transition: background 0.3s ease;
`;

const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    animation: ${fadeIn} 0.5s ease-out;
`;

const LoadingText = styled.h2`
    font-size: 1.5rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    opacity: 0.8;
    animation: ${pulse} 2s infinite;
`;

const ErrorCard = styled.div<{ theme: ThemeShape }>`
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    width: 90%;
    animation: ${fadeIn} 0.6s ease-out;
`;

const ErrorImage = styled.img`
    width: 220px;
    height: auto;
    margin-bottom: 2rem;
    filter: drop-shadow(0 10px 15px rgba(0,0,0,0.2));
    animation: ${float} 6s ease-in-out infinite;
`;

const ErrorTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    // Gradiente sutil no texto para elegância
    background: -webkit-linear-gradient(45deg, ${({ theme }) => theme.color}, ${({ theme }) => theme.primary || '#007ea7'});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ErrorMessage = styled.p`
    font-size: 1rem;
    opacity: 0.7;
    margin-bottom: 2rem;
    line-height: 1.5;
`;

const RetryButton = styled.button<{ theme: ThemeShape }>`
    padding: 0.8rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 3rem; // Pill shape (mais moderno)
    cursor: pointer;
    transition: all 0.3s ease;
    
    // Cores dinâmicas baseadas no tema, mas com fallback elegante
    background: ${({ theme }) => theme.primary || '#007ea7'}; 
    color: #ffffff;
    box-shadow: 0 4px 15px ${({ theme }) => theme.primary ? `${theme.primary}40` : 'rgba(0, 126, 167, 0.4)'};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px ${({ theme }) => theme.primary ? `${theme.primary}60` : 'rgba(0, 126, 167, 0.6)'};
    }

    &:active {
        transform: translateY(0);
    }
`;

// --- Component ---

export const ErrorLoading = ({ loading, error, theme }: ErrorLoadingProps) => {
    const navigate = useNavigate();

    // Loading State
    if (loading) {
        return (
            <Container theme={theme}>
                <LoaderWrapper>
                    <ClipLoader 
                        color={theme.primary ?? "#007ea7"} 
                        loading={loading} 
                        size={80}
                        speedMultiplier={0.8}
                    />
                    <LoadingText>Sincronizando Pokedex...</LoadingText>
                </LoaderWrapper>
            </Container>
        );
    }

    // Error State
    if (error) {
        return (
            <Container theme={theme}>
                <ErrorCard theme={theme}>
                    <ErrorImage src="/assets/not-found.png" alt="Pokemon confuso" />
                    <ErrorTitle theme={theme}>Algo deu errado</ErrorTitle>
                    <ErrorMessage>
                        Não conseguimos localizar este Pokémon nos dados da API. 
                        Pode ser um erro de conexão ou o Pokémon não existe.
                    </ErrorMessage>
                    <RetryButton theme={theme} onClick={() => navigate("/")}>
                        Retornar ao Início
                    </RetryButton>
                </ErrorCard>
            </Container>
        );
    }

    return null;
};