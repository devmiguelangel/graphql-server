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

const professorCreate = async (args) => {
  return await Professor.query().insert(args.input);
}

const professorEdit = async (args) => {
  return await Professor.query().patchAndFetchById(args.professorId, args.input);
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
    professorCreate: (_, args) => professorCreate(args),
    professorEdit: (_, args) => professorEdit(args),
  }
};

export default resolvers;