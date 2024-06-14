// dialog.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertDialog {
  private showDialogSubject = new Subject<any>();

  showDialog$ = this.showDialogSubject.asObservable();

  showDialog(data: { title: string; message: string; buttonText: string }) {
    this.showDialogSubject.next(data);
  }
}
