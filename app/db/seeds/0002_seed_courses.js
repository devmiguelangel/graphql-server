const faker = require('faker');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function () {
      const courses = [];

      Array(155).fill().map((_, i) => {
        courses.push({
          id: i + 1,
          title: faker.name.findName(),
          description: faker.lorem.sentence(),
          professor_id: faker.random.number({min: 1, max: 45}),
          rating: faker.finance.amount(0, 10),
        });
      });

      // Inserts seed entries
      return knex('courses').insert(courses);
    });
};
