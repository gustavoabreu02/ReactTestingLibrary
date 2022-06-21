import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  test('Topo da aplicação contém os links "Home", "About" e "Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    const linkFavPokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkHome).toBeInTheDocument();
    expect(linkAbout).toBeInTheDocument();
    expect(linkFavPokemons).toBeInTheDocument();
  });

  test('Ao clicar no link "Home", é direcionado para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Ao clicar no link "About", é direcionado para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pok",é direcionado para a pag Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkFavPokemons = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(linkFavPokemons).toBeInTheDocument();

    userEvent.click(linkFavPokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
