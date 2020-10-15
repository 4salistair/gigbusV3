import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class UIService {
 loadingStateChange = new Subject<boolean>();


constructor(private snackbar: MatSnackBar) { }

showSnackbar(message, action, duration ): void {
        this.snackbar.open(message, action, {
        duration: duration
    });
}

  }
