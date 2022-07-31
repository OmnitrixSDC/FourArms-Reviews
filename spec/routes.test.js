const axios = require('axios');

describe('Route Tests', () => {
  test('The GET Reviews route should return 200', () => {
    axios.get('http://127.0.0.1:45348/reviews')
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test('The GET Metadata route shoudl return 200', () => {
    axios.get('http://127.0.0.1:45348/reviews/meta')
      .then((result) => {
        expect(result.status).toBe(200);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test('The POST reviews route should return 201', () => {
    axios.post('http://127.0.0.1:45348/reviews')
      .then((result) => {
        expect(result.status).toBe(201);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test('The PUT helpfulness route should return 204', () => {
    axios.put('http://127.0.0.1:45348/reviews/4/helpful')
      .then((result) => {
        expect(result.status).toBe(204);
      })
      .catch((err) => {
        throw new Error(err);
      });
  });

  test('The PUT report route should return 204', () => {
    axios.put('http://127.0.0.1:45348/reviews/4/report')
      .then((result) => {
        expect(result.status).toBe(204);
      });
  });
});
