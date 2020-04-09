import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Question} from "../../shared/models/Question";
import {QuestionsService} from "../../shared/services/questions.service";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public postedQuestions$: Observable<Question[]>;
  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.postedQuestions$ = this.questionsService.getCurrentUserQuestions();
  }

}
