const CourseSchema = `
  # Course schema
  type Course {
    id: ID!
    title: String!
    description: String!
    professor: Professor
    rating: Float @deprecated(reason: "No creemos mas en los puntajes")
    comments: [Comment]
  }

  input CourseCreateInput {
    title: String!
    description: String!
    professorId: Int!
  }
  
  input CourseEditInput {
    title: String
    description: String
    professorId: Int
    rating: Float
  }
`;

export default CourseSchema;