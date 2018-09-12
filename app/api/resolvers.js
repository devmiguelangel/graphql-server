import Professor from './../models/Professor';
import Course from './../models/Course';


const getProfessors = async (id = null) => {
  if (id) {
    return await Professor.query().eager('courses').findById(id);
  }

  return await Professor.query().eager('courses');
}

const getCourses = async (id = null) => {
  if (id) {
    return await Course.query().eager('[professor, comments]').findOne({ id });
  }

  return await Course.query().eager('[professor, comments]');
}

const professorCreate = async (data) => {
  return await Professor.query().insert(data);
}


// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    professors: () => getProfessors(),
    professor: (rootValue, args) => getProfessors(args.id),
    courses: () => getCourses(),
    course: (rootValue, args) => getCourses(args.id),
  },

  Mutation: {
    professorCreate: (_, args) => professorCreate(args.input),
  }
};

export default resolvers;