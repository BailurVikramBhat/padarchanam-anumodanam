import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-alert-notification',
  imports: [],
  templateUrl: './alert-notification.component.html',
  styleUrl: './alert-notification.component.scss',
})
export class AlertNotificationComponent implements OnChanges {
  @Input({
    required: true,
  })
  isAlertVisible: boolean = false;

  @Input()
  alertMessage: string = 'Please try again after sometime';

  @Output()
  alertClosed = new EventEmitter<void>();

  @Input({
    required: true,
  })
  alertHeader: string = 'Error!';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isAlertVisible'] && changes['isAlertVisible'].currentValue) {
      setTimeout(() => this.closeAlert(), 5000);
    }
  }

  closeAlert() {
    this.isAlertVisible = false;
    this.alertClosed.emit();
  }
}
