import { Component, OnInit } from '@angular/core';
import {QuestionsService} from "../../shared/services/questions.service";
import {Observable} from "rxjs";
import {Question} from "../../shared/models/Question";
import {ActivatedRoute} from "@angular/router";
import {CommentModel} from "../../shared/models/CommentModel";
import {CommentService} from "../../shared/services/comment.service";
import {CreateCommentModel} from "../../shared/models/CreateCommentModel";
import {CommentDTOModel} from "../../shared/models/CommentDTOModel";

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.css']
})
export class QuestionPageComponent implements OnInit {
  public question$: Observable<Question>;
  public postingComment: CreateCommentModel;
  public questionComments$: Observable<CommentDTOModel[]>;
  constructor(private questionsService: QuestionsService,
              private commentService: CommentService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const questionId =  Number(this.route.snapshot.paramMap.get("id"));
    this.question$ = this.questionsService.getQuestionByQuestionId(questionId);
    this.questionComments$ = this.questionsService.getCommentsByQuestionId(questionId);
    this.postingComment = new CreateCommentModel(questionId, 1);
  }

 public postComment() {
    // TODO request status (update UX)
    this.commentService.postComment(this.postingComment).subscribe();
  }
}
