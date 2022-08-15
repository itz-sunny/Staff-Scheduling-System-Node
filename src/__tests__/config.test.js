const { get } = require('../../config/config.js')
describe('read properties', () => {
    test('Should have value equal to 8080', () => {
        expect(get('PORT', 8080)).toEqual(8080);
    });
  });