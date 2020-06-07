import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../shared/services/questions.service";
import {Question} from "../../shared/models/Question";
import {RequestStatusEnum} from "../../shared/models/RequestStatus.enum";

@Component({
  selector: 'publish-page',
  templateUrl: './publish-page.component.html',
  styleUrls: ['./publish-page.component.css']
})
export class PublishPageComponent implements OnInit {
  public postingQuestion: Question = new Question();
  public RequestStatusEnum: any = Object.assign({},RequestStatusEnum);
  public postQuestionStatus: RequestStatusEnum;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
  }

  publishQuestion() {
    if (!this.postingQuestion.title){
      alert("title required");
    }
    this.postQuestionStatus = RequestStatusEnum.LOADING;
    // TODO jump to default page after request success
    this.questionsService.postQuestion(this.postingQuestion).subscribe(res => {
      if(res) {
        this.postQuestionStatus = RequestStatusEnum.SUCCESS;
      }
      this.postQuestionStatus = RequestStatusEnum.FAIL;
    });
  }
}
