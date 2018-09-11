import { Model } from 'objection';
import path from 'path';


class Comment extends Model {
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

export default Comment;