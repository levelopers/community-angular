export class CreateCommentModel {
  public content: string;
  public parentId: number;
  public type: number;

  constructor(parentId?: number, type?: number, content?: string) {
    this.parentId = parentId;
    this.type = type;
    this.content = content;
  }
}
