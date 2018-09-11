const faker = require('faker');


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('professors').del()
    .then(function () {
      const professors = [];

      Array(45).fill().map((_, i) => {
        professors.push({
          id: i + 1,
          name: faker.name.findName(),
          nationality: faker.address.country(),
          gender: faker.random.arrayElement(['MASCULINO', 'FEMENINO']),
        });
      });

      // Inserts seed entries
      return knex('professors').insert(professors);
    });
};
