import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { LanguageService } from '../../services/language.service';
import { Langueges } from '../../services/models/langueges';
import { Questions } from '../../services/models/questions';
import { Answers } from 'services/models/answers';
import { QuestionService } from 'services/questions.service';
import { AnswersService } from 'services/answers.service';
import { FormControl} from '@angular/forms';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { from } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public subjectList: Array<Object>;
  form = new FormControl('');
  questionsByLang: Questions[];
  answersByQuestion: Answers[];
  answersUser = {}; // תשובות המשתמש
  answers = {}; // תשובות נכונות
  ngIf = 1;
  numQst: number; // מספר שאלות לשפה
  numTrue = 0; // מספר תשובות נכונות
  showAns = 0;
  allAnswers: Answers[]; // כל התשובות לכל השאלות
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
  selectedTab: string;
  showTest: Boolean = false;
  answersTest: string;
  x = 0;
  selectedLevel: number = 1;
  filteredQuestions: Questions[];

  constructor(private languageService: LanguageService, private questionsService: QuestionService,
    private answersService: AnswersService) {
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
    this.primaryID = this.selectedLang.languegesID;
    this.foreword = this.selectedLang.foreword;
    this.langName = this.selectedLang.subLangueges;
    localStorage.setItem('logo', this.selectedLang.logo);
  }
  updateTest() {
    this.showAns = 0;
    this.index = 0;
    this.ngIf = 1;
    this.primaryID = this.selectedLang.primaryID;
    // שליפת השאלות לפי השפה שנבחרה
    this.questionsService.getQuestionsByLangId(this.primaryID)
      .subscribe(data => {
        this.questionsByLang = data;
        this.numQst = data.length;
        this.questionsByLang.forEach(qst => {
        this.answersService.getAnswersByQuestionId(qst.questionID)
      .subscribe(data1 => {
      this.answersByQuestion = data1
        this.answersByQuestion.forEach(ans => {
          this.allAnswers[this.x++] = ans;
        });
      });
    });
        this.nextQuestion();
        this.showTest = true;
        // localStorage.setItem('logo', this.selectedLang.logo);
      }, error => { console.log(error) });


  }
  nextQuestion() {
    this.foreword = this.selectedLang.foreword;
    // שמירת התשובה שנבחרה
    this.currentQuiz = this.filteredQuestions[this.index];
   // שליפת התשובות לשאלה הנוכחית
    this.questionId = this.currentQuiz.questionID;
    this.answersService.getAnswersByQuestionId(this.questionId)
      .subscribe(data => {
        this.answersByQuestion = data

        this.answersByQuestion.forEach(ans => {
          // שמירת התשובה הנכונה לכל שאלה
          if (ans.correctAnswer === true) {
            this.answers[this.index] = ans.answerText;
          }
        });

        if (this.index > 0) {
          // שמירת התשובה של המשתמש
          this.answersUser[this.index] = this.answersTest;
          // סך התשובות הנכונות
          if (this.answers[this.index] === this.answersUser[this.index]) {
            this.numTrue++;
          }
        }
        if (this.numQst === this.index + 1) {
          this.ngIf = 0;
        }

        this.index++;
      }, error => { console.log(error) });
  }

  resetLang() {
    this.selectedLang = null;
  }
  check() {
      this.showAns = 1;
  }

  setLevel(level) {
    this.selectedLevel = level;
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
}
