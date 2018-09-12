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

const professorDelete = async (args) => {
  const professor = await Professor.query().findById(args.professorId);
  
  if (professor instanceof Professor) {
    const nRows = await Professor.query().delete().where({id: args.professorId});

    if (nRows > 0) {
      return professor;
    }
  }

  throw new Error(`El profesor con ID ${args.professorId} no se pudo eliminar :(`);
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
    professorDelete: (_, args) => professorDelete(args),
  }
};

export default resolvers;