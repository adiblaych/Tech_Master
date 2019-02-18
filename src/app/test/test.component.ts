import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Langueges } from '../../services/models/langueges';
import { Questions } from '../../services/models/questions';
import { Answers } from 'services/models/answers';
import { QuestionService } from 'services/questions.service';
import { AnswersService } from 'services/answers.service';
import { FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material';
import { TestResultsComponent } from '../test-results/test-results.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public subjectList: Array<Object>;
  questionsByLang: Questions[];
  answersByQuestion: Answers[];
  userAnswers = {}; // תשובות המשתמש
  testIsFinished = false;
  numQst: number; // מספר שאלות לשפה
  numTrue = 0; // מספר תשובות נכונות
  showAns = 0;
  allAnswers: any = {}; // כל התשובות לכל השאלות
  site: string; // קישור לאתר של השפה
  selectedSubject: object;
  currentQuiz: Questions;
  selectedLang: Langueges;
  questionId: number;
  index = 0;
  currentAnswers: any;
  PlangList: Langueges[];
  langList: Langueges[];
  primaryID = 1;
  foreword: string;
  langName: string;
  showTest: Boolean = false;
  showLanguage: Boolean = true;
  answersTest:Answers;
  selectedLevel = 1;
  filteredQuestions: Questions[];

  constructor(private languageService: LanguageService, private questionsService: QuestionService,
    private answersService: AnswersService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadData();
    // this.startQuiz();
  }
  loadData() {
    this.languageService.getPLanguages()
      .subscribe(data => { this.PlangList = data }, error => { console.log(error) });
  }

  getSubLang() {
    this.languageService.getLanguagesById(this.primaryID)
      .subscribe(data => { this.langList = data }, error => { console.log(error) });
  }

  updateTest() {
    this.primaryID = this.selectedLang.primaryID;
    this.foreword = this.selectedLang.foreword;
    this.langName = this.selectedLang.subLangueges;
    this.showAns = 0;
    this.showTest = true;
    this.showLanguage = false;

    // שליפת השאלות לפי השפה שנבחרה
    this.questionsService.getQuestionsByLangId(this.primaryID)
      .subscribe(data => {
          this.questionsByLang = data;
          forkJoin( this.questionsByLang.map(qst => this.answersService.getAnswersByQuestionId(qst.questionID))
         ).subscribe(res => {
           console.log(res);
           res.forEach(ans => {
             this.allAnswers[ans[0].questionID] = ans;
           })
           this.setLevel(1);
          this.showTest = true;
         })
          // this.questionsByLang.forEach(qst => {
          //     this.answersService.getAnswersByQuestionId(qst.questionID).subscribe(ans => {
          //         this.allAnswers[qst.questionID] = ans;
          //     });
          //     this.site = qst.matrial;
          // });
      }, error => { console.log(error) });

    this.languageService.onLanguegeSelected.next(this.selectedLang.logo);
  }

  nextQuestion() {
    if (this.index > 0) {
      this.saveUserAnswer();
    }

    this.currentQuiz = this.filteredQuestions[this.index];

    if (this.index + 1 === this.filteredQuestions.length) {
      this.testIsFinished = true;
    }
    else {
      this.testIsFinished = false;
    }
   // שליפת התשובות לשאלה הנוכחית
    this.questionId = this.currentQuiz.questionID;

    this.answersByQuestion = this.allAnswers[this.questionId];

    this.index++;
  }

  saveUserAnswer() {
      // שמירת התשובה של המשתמש
      this.userAnswers[this.questionId] = this.answersTest.answerID;

      // סך התשובות הנכונות
      if (this.answersTest.correctAnswer) {
        this.numTrue++;
      }

      this.answersTest = undefined;
  }

  finishTest() {
    this.saveUserAnswer();
    this.showResult();
  }

  resetLang() {
    this.selectedLang = null;
  }

  check() {
    this.showAns = 1;
  }

  setLevel(level) {
    this.selectedLevel = level;
    this.filterQuestions();
    this.index = 0;
    this.numTrue = 0;
    this.nextQuestion();
  }

  filterQuestions() {
    this.filteredQuestions = this.questionsByLang.filter(question => question.questionLevel === this.selectedLevel);
  }
  // setCategoty(id) {
  //   console.log('setCategoty ' + id);
  //   this.selectedSubject = this.subjectService.getSubject(id);
  //   // todo: update navbar
  // }
  // private startQuiz() {
  //   this.currentAnswers = this.quizService.getQuiz();
  // }
  showResult() {
    const dialogRef = this.dialog.open(TestResultsComponent, {
      disableClose: true, width: '450px', height: '200px', autoFocus: false,
      data: { correct: this.numTrue, total: this.filteredQuestions.length }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.checkAnswers) {
        this.showAns = 1;
      } else {
        this.resetData();
      }

      this.showTest = false;
    })
  }

  resetData() {
    this.showLanguage = true;
    this.selectedLang = undefined;
    this.showAns = 0;
  }
}
