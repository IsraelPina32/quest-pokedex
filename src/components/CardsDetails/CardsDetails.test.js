import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CardsDetails } from "../CardsDetails";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: () => ({ name: "charmander" }),
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                name: "charmander",
                height: 6,
                weight: 85,
                sprites: { front_default: "url_mocked" },
                types: [{ type: { name: "fire" } }],
            }),
    })
);

test("fetches and displays Pokemon details from PokeAPI", async () => {
    render(
        <MemoryRouter initialEntries={["/pokemon/charmander"]}>
            <Routes>
                <Route path="/pokemon/:name" element={<CardsDetails />} />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    expect(await screen.findByText(/charmander/i)).toBeInTheDocument();
});