const { idValidation, loginValidation, registerValidation, roleUpdateValidation, userUpdateValidation, fetchAllSchedulesValidation, fetchAllUsersSortedValidation,  } = require('../validators.js');

describe('check if id is valid ', () => {
  describe('for empty object', () => {
    test('Should have error message "id" is required', () => {
      const { error } = idValidation({});
      expect(error).not.toBeUndefined();
      expect(error.message).toBe('"id" is required');
    });
  });

  describe('for id as non number', () => {
    test('Should have error message "id" must be a number', () => {
      const { error } = idValidation({ id: 'abc' });
      expect(error).not.toBeUndefined();
      expect(error.message).toBe('"id" must be a number');
    });
  });

  describe('for id as number', () => {
    test('Should have undefined error', () => {
      const { error } = idValidation({ id: '123' });
      expect(error).toBeUndefined();
    });
  });
});

describe('check if login request is valid', () => {
  describe('for empty object', () => {
    test('Should have error', () => {
      const { error } = loginValidation({});
      expect(error).not.toBeUndefined();
    });
  });

  describe('for missing property', () => {
    test('Should have error', () => {
      const { error } = loginValidation({email: "sunny@email.com"});
      expect(error).not.toBeUndefined();
    });
  });

  describe('for all property present but invalid', () => {
    test('Should have error', () => {
      const { error } = loginValidation({email: "sunny@email", password: "pa$$word"});
      expect(error).not.toBeUndefined();
    });
  });

  describe('for all property present and valid', () => {
    test('Should have error', () => {
      const { error } = loginValidation({email: "sunny@email.com", password: "pa$$word"});
      expect(error).toBeUndefined();
    });
  });
});

describe('check if register request is valid', () => {
    describe('for empty object', () => {
      test('Should have error', () => {
        const { error } = registerValidation({});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for missing property', () => {
      test('Should have error', () => {
        const { error } = registerValidation({email: "sunny@email.com"});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for all property present but invalid', () => {
      test('Should have error', () => {
        const { error } = registerValidation({name: "sunny", email: "sunny@email", password: "pa$$word"});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for all property present and valid', () => {
      test('Should have error', () => {
        const { error } = registerValidation({name: "Sunny Kumar", email: "sunny@email.com", password: "pa$$word"});
        expect(error).toBeUndefined();
      });
    });
  });

  describe('check if role update request is valid', () => {
    describe('for empty object', () => {
      test('Should have error', () => {
        const { error } = roleUpdateValidation({});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for missing property', () => {
      test('Should have error', () => {
        const { error } = roleUpdateValidation({role: "STAFF"});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for all property present but invalid', () => {
      test('Should have error', () => {
        const { error } = roleUpdateValidation({role: "STAFF", userId: "abc"});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for all property present and valid', () => {
      test('Should have error', () => {
        const { error } = roleUpdateValidation({role: "STAFF", userId: "123"});
        expect(error).toBeUndefined();
      });
    });
  });

  describe('check if user update request is valid', () => {
    describe('for empty object', () => {
      test('Should have error', () => {
        const { error } = userUpdateValidation({});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for missing userId property', () => {
      test('Should not have have error', () => {
        const { error } = userUpdateValidation({name: "Sunny Kumar"});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for invalid property', () => {
      test('Should have error', () => {
        const { error } = userUpdateValidation({email: "abc"});
        expect(error).not.toBeUndefined();
      });
    });

    describe('for property other than userId missing', () => {
        test('Should not have error', () => {
          const { error } = userUpdateValidation({userId: "123", name: "Sunny Kumar"});
          expect(error).toBeUndefined();
        });
      });
  });
  
  describe('check if fetch all schedules request is valid', () => {
    describe('for empty object', () => {
      test('Should have error', () => {
        const { error } = fetchAllSchedulesValidation({});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for missing property', () => {
      test('Should not have have error', () => {
        const { error } = fetchAllSchedulesValidation({startDate: new Date()});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for invalid property', () => {
      test('Should have error', () => {
        const { error } = fetchAllSchedulesValidation({startDate: "abc"});
        expect(error).not.toBeUndefined();
      });
    });

    describe('for all property present and valid', () => {
        test('Should not have error', () => {
          const { error } = fetchAllSchedulesValidation({startDate: new Date(), endDate: new Date()});
          expect(error).toBeUndefined();
        });
      });
  });

  describe('check if fetch all user sorted request is valid', () => {
    describe('for empty object', () => {
      test('Should have error', () => {
        const { error } = fetchAllUsersSortedValidation({});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for missing property', () => {
      test('Should not have have error', () => {
        const { error } = fetchAllUsersSortedValidation({startDate: new Date()});
        expect(error).not.toBeUndefined();
      });
    });
  
    describe('for invalid property', () => {
      test('Should have error', () => {
        const { error } = fetchAllUsersSortedValidation({startDate: "abc"});
        expect(error).not.toBeUndefined();
      });
    });

    describe('for all property present and valid', () => {
        test('Should not have error', () => {
          const { error } = fetchAllUsersSortedValidation({startDate: new Date(), endDate: new Date()});
          expect(error).toBeUndefined();
        });
      });
  });
