import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router"
const neonPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px #FF9800, 0 0 10px #FF9800, 0 0 20px #FF9800;
  }
  50% {
    box-shadow: 0 0 10px #FF9800, 0 0 20px #FF9800, 0 0 30px #FF9800;
  }
`;

const StyleButton = styled.button`
    padding: 0.8rem 1.5rem;
    margin-top: 0.5rem;
    width: min-content;
    border: 1px solid #FBC02D;
    background: none;
    background-color: #FFEB3B;
    box-shadow: 0 0 5px #FF9800, 0 0 10px #FF9800;
    border-radius: 0.5rem;
    cursor: pointer;
    position: relative;
    top: 35px;
    right: 350px;
    animation: ${neonPulse} 1.5s infinite alternate;
    z-index: 2;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 15px #FF9800, 0 0 30px #FF9800, 0 0 45px #FF9800;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 425px) {
    right: 125px;
    top: 90px;
  }

   @media (max-width: 375px) {
    padding: 0.4rem 0.8rem;
    right: 110px;
  }
`


const StyleArrowReturn = styled.img`
    height: 30px;
    width: 30px;
    filter: drop-shadow(0 0 3px #FBC02D);
`

export const ButtonBack = () => {
    const navigate = useNavigate();
    return (
        <>
            <StyleButton onClick={() => navigate("/")} aria-label="Voltar para o Menu Principal">
                <StyleArrowReturn src="https://cdn0.iconfinder.com/data/icons/smoothies-vector-icons-volume-2/48/123-512.png" alt="Icone de Voltar" />
            </StyleButton>
        </>
    )
}