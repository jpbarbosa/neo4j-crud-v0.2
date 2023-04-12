import axios from 'axios';

describe('GET /movies', () => {
  it('should return a list of movies', async () => {
    const res = await axios.get(`/movies`);

    expect(res.status).toBe(200);

    const firstMovie = res.data[0];

    expect(firstMovie).toBeInstanceOf(Object);
    expect(firstMovie).toHaveProperty('id');
    expect(firstMovie).toHaveProperty('title');
    expect(firstMovie).toHaveProperty('tagline');
  });
});
