import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ThemeContext } from '../../contexts/index';
import { TypeDetails } from '../TypeDetails';

// Mock do fetch
global.fetch = jest.fn();

describe('TypeDetails Component', () => {
    const mockTheme = {
        background: '#fff',
        color: '#000'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        
        fetch.mockImplementation((url) => {
            if (url === 'https://pokeapi.co/api/v2/type/fire') {
                return Promise.resolve({
                    ok: true,
                    json: jest.fn().mockResolvedValue({
                        pokemon: [
                            { pokemon: { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/charmander' } }
                        ]
                    })
                });
            }

            if (url === 'https://pokeapi.co/api/v2/pokemon/charmander') {
                return Promise.resolve({
                    ok: true,
                    json: jest.fn().mockResolvedValue({
                        name: 'charmander',
                        types: [{ type: { name: 'fire' } }],
                        sprites: { front_default: 'https://img.pokemondb.net/sprites/home/normal/charmander.png' }
                    })
                });
            }

            return Promise.reject(new Error('URL não mapeada no mock'));
        });
    });

    test('deve exibir os pokemons corretamente', async () => {
        render(
            <ThemeContext.Provider value={{ theme: mockTheme }}>
                <MemoryRouter initialEntries={['/type/fire']}>
                    <Routes>
                        <Route path="/type/:type" element={<TypeDetails />} />
                    </Routes>
                </MemoryRouter>
            </ThemeContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/charmander/i)).toBeInTheDocument();
            expect(screen.getByRole('img', { name: /imagem do pokemon charmander/i })).toBeInTheDocument();
        });
    });
});

