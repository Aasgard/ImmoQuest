import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(public dialogRef: MatDialogRef<TestComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
