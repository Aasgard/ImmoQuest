import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  public toto = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TestComponent>) {
    console.log('constructor');
    console.log(this.data);
  }

  public ngOnInit(): void {
    alert(this.data.name);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
