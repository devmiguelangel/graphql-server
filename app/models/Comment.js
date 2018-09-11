import { Model } from 'objection';
import path from 'path';


class Comment extends Model {
  constructor() {
    super.constructor();
  }

  static tableName = 'comments';

  static relationMappings = {
    course: {
      relation: Model.BelongsToOneRelation,
      modelClass: path.join(__dirname, '/Course'),
      join: {
        from: 'comments.course_id',
        to: 'courses.id'
      }
    }
  }
}