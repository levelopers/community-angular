import {User} from "./User";

export class CommentDTOModel {
  commentCount: number;
  commentator: number;
  content: string;
  gmtCreate: number;
  gmtModified: number;
  id: number;
  likeCount: number;
  parentId: number;
  type: number;
  user: User;
}
