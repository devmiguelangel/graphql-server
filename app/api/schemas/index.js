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

  union SearchResult = Professor | Course

  type Query {
    professors: [Professor]
    professor(id: Int): Professor
    courses: [Course]
    course(id: Int): Course
    search(query: String!): [SearchResult]
  }

  type Mutation {
    professorCreate(input: ProfessorCreateInput): Professor
    professorEdit(professorId: Int!, input: ProfessorEditInput): Professor
    professorDelete(professorId: Int!): Professor

    courseCreate(input: CourseCreateInput): Course
    courseEdit(courseId: Int!, input: CourseEditInput): Course
    courseDelete(courseId: Int!): Course
  }
`;

export { typeDefs };