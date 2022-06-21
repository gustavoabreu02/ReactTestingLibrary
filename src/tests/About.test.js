import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/renderWithRouter';
import { About } from '../pages';

describe('Testa o componente <About.js />', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokemon = screen.getByText(/One can filter Pokémons by type/i);
    expect(infoPokemon).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pagHeading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(pagHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pagHeading = screen.getAllByText(/Pokémon/i);
    expect(pagHeading).toHaveLength(2);
  });

  test('Testa se a página contém a imagem expecífica de uma Pokédex', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokemonImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pokemonImg.src).toContain(url);
    expect(pokemonImg).toHaveProperty('alt', 'Pokédex');
  });
});
