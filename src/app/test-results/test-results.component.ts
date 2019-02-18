import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  correct: number;
  total: number;

  constructor(private _dialogRef: MatDialogRef<TestResultsComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
      this.correct = data.correct;
      this.total = data.total;
  }

  ngOnInit() {

  }

  checkAnswers() {
    this._dialogRef.close({ checkAnswers: true });
  }

  newTest() {
    this._dialogRef.close({ checkAnswers: false });
  }
}
