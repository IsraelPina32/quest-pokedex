import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ButtonBack } from "./index";


test('renders ButtonBack and navigates on click', () => {
    render(
        <BrowserRouter>
            <ButtonBack />
        </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /voltar para o menu principal/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
});