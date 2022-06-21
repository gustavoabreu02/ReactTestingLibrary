import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import { FavoritePokemons } from '../pages';
import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('"No favorite pokemon found" caso não haja pokémons favoritos;', () => {
    renderWithRouter(<FavoritePokemons />);

    const msgNaoEncontrado = screen.getByText(/No favorite pokemon found/i);
    expect(msgNaoEncontrado).toBeInTheDocument();
  });
  test('Testa se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favoritos = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favoritos);

    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(linkFav);

    const nomePokemon = screen.getByText(/Pikachu/i);
    expect(nomePokemon).toBeInTheDocument();
  });
});
