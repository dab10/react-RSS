import { rest } from 'msw';
import { setupServer } from 'msw/node';
interface Card {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  location: {
    name: string;
  };
}

interface Response {
  results: Card[];
}

export const mockApi = setupServer(
  rest.get<Response>('https://rickandmortyapi.com/api/character/', async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        results: [
          {
            id: 1,
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: 'Human',
            gender: 'Male',
            location: {
              name: 'Earth',
            },
          },
          {
            id: 2,
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: 'Human',
            gender: 'Male',
            location: {
              name: 'Citadel of Ricks',
            },
          },
        ],
      })
    );
  })
);
