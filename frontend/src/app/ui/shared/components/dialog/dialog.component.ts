// dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { AlertDialog} from '../../../uiService/dialog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  standalone: true,
})
export class DialogComponent implements OnInit {
  title: string = "";
  message: string = "";
  buttonText: string = "";
  dialog?: HTMLDialogElement;

  constructor(private dialogService: AlertDialog) {}

  ngOnInit(): void {
    this.dialog = document.getElementById('my_modal_2') as HTMLDialogElement;
    this.dialogService.showDialog$.subscribe(data => {
      this.title = data.title;
      this.message = data.message;
      this.buttonText = data.buttonText;
      this.dialog!.showModal();
    });
  }
}
