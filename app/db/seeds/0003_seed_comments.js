const faker = require('faker');


exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      const comments = [];

      Array(415).fill().map((_, i) => {
        comments.push({
          id: i + 1,
          name: faker.name.findName(),
          body: faker.lorem.sentences(3),
          course_id: faker.random.number({ min: 1, max: 155 }),
        });
      });

      // Inserts seed entries
      return knex('comments').insert(comments);
    });
};
