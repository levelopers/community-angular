import {UserModel} from "./UserModel";

export class Question {
  id: number;
  title: string;
  description: string;
  tag: string;
  commentCount: number;
  creatorId: number;
  gmtCreate: number;
  gmtModified: number;
  likeCount: number;
  viewCount: number;
  creator: UserModel;
}
