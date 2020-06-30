import {UserModel} from "./UserModel";

export class CommentModel {
  id: number;
  likeCount: number;
  commentCount: number;
  content: string;
  commentator: UserModel;
}
