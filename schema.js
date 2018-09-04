import { gql } from 'apollo-server-express';
import faker from 'faker';


const courses = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
  },
  {
    id: 2,
    title: 'Jurassic Park',
  },
  {
    id: 3,
    title: 'Jurassic Park',
  },
];

// GraphQL schema
const typeDefs = gql`
  # Course schema
  type Course {
    id: ID!
    title: String!
    description: String!
    professor: Professor
    rating: Float @deprecated(reason: "No creemos mas en los puntajes")
    comments: [Comment]
  }

  type Professor {
    id: ID!
    name: String!
    nationality: String!
    gender: Gender
    courses: [Course]
  }

  enum Gender {
    MASCULINO
    FEMENINO
  }

  type Comment {
    id: ID!
    name: String!
    body: String!
  }

  type Query {
    courses: [Course]
    professors: [Professor]
    course(id: Int): Course
    professor(id: Int): Professor
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    courses: () => courses
  }
};


const mocks = {
  Course: () => ({
    id: faker.random.uuid,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentences(),
  }),
  Professor: () => ({
    id: faker.random.uuid,
    name: faker.name.findName(),
    nationality: faker.address.country
  })
}

export { typeDefs, resolvers, mocks };