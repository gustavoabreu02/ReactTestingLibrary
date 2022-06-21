import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

describe('Testa o componente <Pokemon.js />', () => {
  it('Testa se é renderizado um card com as informações de determinado pokémon',
    () => {
      renderWithRouter(<App />);
      const nomePokemon = screen.getByText(/pikachu/i);
      expect(nomePokemon).toBeInTheDocument();
      const typePokemon = screen.getByTestId('pokemon-type', { name: 'Electric' });
      expect(typePokemon).toHaveTextContent('Electric');
      const pesoPokemon = screen.getByText(/average weight: 6\.0 kg/i);
      expect(pesoPokemon).toBeInTheDocument();
      const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
      expect(imgPokemon).toBeInTheDocument();
      expect(imgPokemon).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    });

  it(`Testa se o card do pokémon indicado na 
  Pokédex contém um link de navegação para exibir detalhes deste pokémon`,
  () => {
    renderWithRouter(<App />);
    const detPokemon = screen.getByRole('link', { name: /more details/i });
    expect(detPokemon).toHaveAttribute('href', '/pokemons/25');
  });

  it('Testa se ao clicar no link de navegação do pokémon é feito o redirecionamento',
    () => {
      const { history } = renderWithRouter(<App />);
      const maisDetalhes = screen.getByRole('link', { name: /more details/i });
      userEvent.click(maisDetalhes);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/pokemons/25');
      const button = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
      userEvent.click(button);
      const favEstr = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
      expect(favEstr).toHaveAttribute('src', '/star-icon.svg');
    });
});
