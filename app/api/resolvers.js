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
    search: async (_, params) => {
      const professors = await Professor.query().where('name', 'like', `%${params.query}%`);
      const courses = await Course.query().where('title', 'like', `%${params.query}%`);
      
      return [
        ...professors,
        ...courses,
      ];
    }
  },

  SearchResult: {
    __resolveType(obj, context, info) {
      if (obj instanceof Professor) {
        return 'Professor';
      }
      
      if (obj instanceof Course) {
        return 'Course';
      }
      
      return null;
    }
  },

  Mutation: {
    professorCreate: (_, args) => professorCreate(args),
    professorEdit: (_, args) => professorEdit(args),
    professorDelete: (_, args) => professorDelete(args),
    
    courseCreate: async (_, args) => {
      args.input.professor_id = args.input.professorId;
      delete args.input['professorId'];

      return await Course.query().eager('professor').insert(args.input);
    },
    
    courseEdit: async (_, args) => {
      if ('professorId' in args.input) {
        args.input.professor_id = args.input.professorId;
        delete args.input['professorId'];
      }

      return await Course.query().eager('professor').patchAndFetchById(args.courseId, args.input);
    },
    
    courseDelete: async (_, args) => {
      const course = await Course.query().eager('professor').findOne({id: args.courseId});

      if (course instanceof Course) {
        const nRows = await Course.query().deleteById(args.courseId);

        if (nRows > 0) {
          return course;
        }
      }
      
      throw new Error(`El profesor con ID ${args.professorId} no se pudo eliminar :(`);
    }
  }
};

export default resolvers;