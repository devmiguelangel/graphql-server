import { gql } from 'apollo-server-express';
import faker from 'faker';
import './app/db/config';
import Professor from './app/models/Professor';
import Course from './app/models/Course';


const getProfessors = async (id = null) => {
  if (id) {
    return await Professor.query().eager('courses').findById(id);
  }

  return await Professor.query().eager('courses');
}

const getCourses = async (id = null) => {
  if (id) {
    return await Course.query().eager('[professor, comments]').findOne({id});
  }

  return await Course.query().eager('[professor, comments]');
}

/* const courses = [
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
]; */

// GraphQL schema
const typeDefs = gql`
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

  # Course schema
  type Course {
    id: ID!
    title: String!
    description: String!
    professor: Professor
    rating: Float @deprecated(reason: "No creemos mas en los puntajes")
    comments: [Comment]
  }

  type Comment {
    id: ID!
    name: String!
    body: String!
  }

  type Query {
    professors: [Professor]
    professor(id: Int): Professor
    courses: [Course]
    course(id: Int): Course
  }
`;


// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    professors: () => getProfessors(),
    professor: (rootValue, args) => getProfessors(args.id),
    courses: () => getCourses(),
    course: (rootValue, args) => getCourses(args.id),
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