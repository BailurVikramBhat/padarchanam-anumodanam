import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIsoToday } from '../../pages/dashboard/dashboard.component';
@Component({
  selector: 'app-date-selector',
  imports: [FormsModule],
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.scss',
})
export class DateSelectorComponent implements OnChanges {
  @Input({
    required: true,
  })
  today!: string;
  private initialToday!: string;
  selectedDate: string = '';

  public minDate: string = getIsoToday();

  @Output() dateChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    console.log('onChanges called. Received date: ', this.today);

    if (changes['today']) {
      if (!this.initialToday) {
        this.initialToday = changes['today'].currentValue;
      }
      this.selectedDate = changes['today'].currentValue;
      this.dateChange.emit(this.selectedDate);
    }
  }

  onDateChange(event: Event) {
    const newDate = (event.target as HTMLInputElement).value;
    console.log('dateSelector.ts::onDateChange():newDate= ', newDate);
    console.log('dateSelector.ts::onDateChange():today= ', this.today);
    this.selectedDate = newDate;
    this.dateChange.emit(newDate);
  }
  clearDate() {
    console.log(
      'dateSelector.ts:clearDate()=> selectedDate: ',
      this.selectedDate
    );
    console.log('dateSelector.ts:clearDate()=> today: ', this.today);

    this.selectedDate = this.initialToday;
    this.dateChange.emit(this.initialToday);
  }
}
