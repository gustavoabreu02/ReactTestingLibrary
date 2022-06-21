import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/renderWithRouter';
import { NotFound } from '../pages';

describe('Testa o componente <NotFound.js />', () => {
  test('A página contém um heading h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);

    const pagHeading = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(pagHeading).toBeInTheDocument();
  });
  test('Testa se a página mostra a imagem específica', () => {
    renderWithRouter(<NotFound />);

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFound = screen.getByRole('img', { name: /pikachu crying/i });
    expect(notFound.src).toContain(url);
    expect(notFound).toBeInTheDocument();
  });
});
