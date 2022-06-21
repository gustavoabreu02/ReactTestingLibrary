import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './Helpers/renderWithRouter';

const texto1 = 'This intelligent Pokémon roasts hard berries';
const texto2 = 'with electricity to make them tender enough to eat.';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);
      const buttonDet = screen.getByRole('link', { name: /more details/i });
      expect(buttonDet).toBeInTheDocument();
      userEvent.click(buttonDet);
      const h1Pokemon = screen.getByRole('heading', { name: /pikachu details/i });
      expect(h1Pokemon).toBeInTheDocument();
      expect(buttonDet).not.toBeInTheDocument();
      const h2 = screen.getByRole('heading', { name: /summary/i, level: 2 });
      expect(h2).toBeInTheDocument();
      const pokemonDet = screen.getByText(`${texto1} ${texto2}`);
      expect(pokemonDet).toBeInTheDocument();
    });

  it('Testa se existe os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const buttonDet = screen.getByRole('link', { name: /more details/i });
    expect(buttonDet).toBeInTheDocument();
    userEvent.click(buttonDet);
    const pokemonLugarTitulo = screen
      .getByRole('heading', { name: /game locations of pikachu/i });
    expect(pokemonLugarTitulo).toBeInTheDocument();
    const pokeLugar = screen.getAllByAltText(/pikachu location/i);
    expect(pokeLugar).toHaveLength(2);
    expect(pokeLugar[0]).toHaveAttribute('src', 'https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');
    expect(pokeLugar[1]).toHaveAttribute('src', 'https://pwo-wiki.info/images/5/5b/Pp.gif');
    const mapa1 = screen.getByText(/kanto viridian forest/i);
    expect(mapa1).toBeInTheDocument();
    const mapa2 = screen.getByText(/kanto power plant/i);
    expect(mapa2).toBeInTheDocument();
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhe', () => {
    renderWithRouter(<App />);
    const buttonDet = screen.getByRole('link', { name: /more details/i });
    expect(buttonDet).toBeInTheDocument();
    userEvent.click(buttonDet);
    const favTitulo = screen.getByText(/pokémon favoritado\?/i);
    expect(favTitulo).toBeInTheDocument();
    const buttonFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(buttonFav).toBeInTheDocument();
    userEvent.click(buttonFav);
    const favSelecionado = screen
      .getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favSelecionado).toBeInTheDocument();
  });
});
