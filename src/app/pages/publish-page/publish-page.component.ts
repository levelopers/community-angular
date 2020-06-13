import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../shared/services/questions.service";
import {Question} from "../../shared/models/Question";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css']
})
export class PublishPageComponent implements OnInit {
  public postingQuestion: Question = new Question();
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);
  public postQuestionStatus: RequestStatusEnum;

  constructor(private questionsService: QuestionsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  publishQuestion() {
    if (!this.postingQuestion.title){
      alert("title required");
    }
    this.postQuestionStatus = RequestStatusEnum.LOADING;
    this.questionsService.postQuestion(this.postingQuestion)
      .pipe(catchError(err => {
        this.postQuestionStatus = RequestStatusEnum.FAIL;
        return throwError(err);
      })).subscribe(res => {
      if (!!res) {
        this.postQuestionStatus = RequestStatusEnum.SUCCESS;
        setTimeout(() => {
          this.router.navigate(['/']);
        },1500)
      }
    })
  }
}
