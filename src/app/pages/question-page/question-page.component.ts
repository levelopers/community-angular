import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../shared/services/questions.service";
import {Observable, throwError} from "rxjs";
import {Question} from "../../shared/models/Question";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../shared/services/comment.service";
import {CreateCommentModel} from "../../shared/models/CreateCommentModel";
import {CommentDTOModel} from "../../shared/models/CommentDTOModel";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {catchError} from "rxjs/operators";
import {NotificationService} from "../../shared/services/notification.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  public question$: Observable<Question>;
  public postingComment: CreateCommentModel;
  public questionComments$: Observable<CommentDTOModel[]>;
  public RequestStatusEnum: any = Object.assign({}, RequestStatusEnum);
  public postCommentStatus: RequestStatusEnum;
  public currentUser: User;
  private questionId: number;

  constructor(private questionsService: QuestionsService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.questionId = Number(this.route.snapshot.paramMap.get("id"));
    this.question$ = this.questionsService.getQuestionByQuestionId(this.questionId);
    this.questionComments$ = this.questionsService.getCommentsByQuestionId(this.questionId);
    this.postingComment = new CreateCommentModel(this.questionId, 1);
    this.currentUser = this.userService.currentUser;
  }

  public postComment() {
    this.postCommentStatus = RequestStatusEnum.LOADING;
    this.commentService.postComment(this.postingComment)
      .pipe(catchError(err => {
        this.postCommentStatus = RequestStatusEnum.FAIL;
        return throwError(err);
      })).subscribe(res => {
        if (!!res) {
          this.notificationService.makeComment(this.questionId).subscribe();
          this.postingComment.content = '';
          this.postCommentStatus = RequestStatusEnum.SUCCESS;
          this.questionComments$ = this.questionsService.getCommentsByQuestionId(this.questionId);
        }
      }
    );
  }
}
