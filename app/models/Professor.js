import { Model } from 'objection';
import path from 'path';


class Professor extends Model {
  static tableName = 'professors';

  static relationMappings = {
    courses: {
      relation: Model.HasManyRelation,
      modelClass: path.join(__dirname, '/Course'),
      join: {
        from: 'professors.id',
        to: 'courses.professor_id'
      }
    }
  }
}

export default Professor;