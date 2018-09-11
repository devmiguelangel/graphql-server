import { Model } from 'objection';
import path from 'path';


class Course extends Model {
  static tableName = 'courses';

  static relationMappings = {
    professor: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, '/Professor'),
      join: {
        from: 'courses.professor_id',
        to: 'professors.id'
      }
    },
    comments: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, '/Comment'),
      join: {
        from: 'courses.id',
        to: 'comments.course_id'
      }
    }
  }
}

export default Course;