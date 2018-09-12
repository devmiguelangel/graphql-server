const ProfessorSchema = `
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

  input ProfessorCreateInput {
    name: String!
    nationality: String!
    gender: Gender
  }
`;

export default ProfessorSchema;