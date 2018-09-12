import { gql } from 'apollo-server-express';
import faker from 'faker';
import ProfessorSchema from './ProfessorSchema';
import CourseSchema from './CourseSchema';
import CommentSchema from './CommentSchema';


// GraphQL schema
const typeDefs = gql`
  ${ProfessorSchema}
  
  ${CourseSchema}

  ${CommentSchema}

  type Query {
    professors: [Professor]
    professor(id: Int): Professor
    courses: [Course]
    course(id: Int): Course
  }

  type Mutation {
    professorCreate(input: ProfessorCreateInput): Professor
    professorEdit(professorId: Int!, input: ProfessorEditInput): Professor
    professorDelete(professorId: Int!): Professor
  }
`;

export { typeDefs };