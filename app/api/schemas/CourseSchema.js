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
`;

export default CourseSchema;