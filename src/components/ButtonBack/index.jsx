import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router"
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
    right: 350px;

    @media (max-width: 425px) {
        right: 125px;
        top: 90px;
    }
`
const StyleArrowReturn = styled.img`
    height: 30px;
    width: 30px;
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