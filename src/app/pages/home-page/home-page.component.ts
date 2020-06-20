import {Component, OnInit} from '@angular/core';
import {QuestionsService} from "../../shared/services/questions.service";
import {Observable} from "rxjs";
import {Question} from "../../shared/models/Question";

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  quesionts$: Observable<Question[]>;

  constructor(private questionsService: QuestionsService) {
  }

  ngOnInit(): void {
    this.quesionts$ = this.questionsService.getQuestions()
  }

}
