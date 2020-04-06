import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommentDTOModel} from "../../../../shared/models/CommentDTOModel";
import {MatMenuTrigger} from "@angular/material/menu";
import {CommentService} from "../../../../shared/services/comment.service";
import {Observable} from "rxjs";
import {CreateCommentModel} from "../../../../shared/models/CreateCommentModel";
import {CommentModel} from "../../../../shared/models/CommentModel";
import {RequestStatusEnum} from "../../../../shared/models/RequestStatus.enum";

@Component({
  selector: 'question-comment',
  templateUrl: './question-comment.component.html',
  styleUrls: ['./question-comment.component.css']
})
export class QuestionCommentComponent implements OnInit {
  @Input() comment: CommentDTOModel;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public isLiked: boolean;
  public isSubCommentCollapsed: boolean;
  public postSubCommentStatus: RequestStatusEnum;
  public subComments$: Observable<CommentDTOModel[]>;
  public postSubCommentBody: CreateCommentModel;
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);

  constructor(private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.subComments$ = this.commentService.getSubComments(this.comment.id);
    this.postSubCommentBody = new CreateCommentModel(this.comment.id, 2);
  }

  clickLike() {
    this.isLiked = true;
  }

  clickSubComments($event) {
    $event.stopPropagation();
    this.trigger.openMenu();
  }

  replyComment() {
    if (!this.postSubCommentBody || !this.postSubCommentBody.content) {
      alert("can not submit subComment");
      return;
    }
    this.postSubCommentStatus = RequestStatusEnum.LOADING;
    this.commentService.postComment(this.postSubCommentBody).subscribe((res: CommentModel) => {
        this.isSubCommentCollapsed = true;
        if (res) {
          this.postSubCommentBody.content = "";
          this.postSubCommentStatus = RequestStatusEnum.SUCCESS;
        }
        this.postSubCommentStatus = RequestStatusEnum.FAIL;
        this.trigger.closeMenu();
      }
    );

  }
}
