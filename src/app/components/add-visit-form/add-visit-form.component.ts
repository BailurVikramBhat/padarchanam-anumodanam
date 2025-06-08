import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  signal,
  WritableSignal,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { IVisit, EVisitStatus } from '../../services/visit.service';
import { TooltipComponent } from '../tooltip/tooltip.component';
import { getIsoToday } from '../../pages/dashboard/dashboard.component';
type CountOpts = {
  status?: EVisitStatus;
  local?: boolean;
};
@Component({
  selector: 'app-add-visit-form',
  imports: [ReactiveFormsModule, CommonModule, TooltipComponent],
  templateUrl: './add-visit-form.component.html',
  styleUrl: './add-visit-form.component.scss',
})
export class AddVisitFormComponent implements OnInit {
  @Input({
    required: true,
  })
  visitList!: IVisit[];
  readonly VisitStatus = EVisitStatus;
  get tooltipMessage() {
    return 'For non-Indian numbers, please contact admin';
  }
  completedOpts: CountOpts = { status: EVisitStatus.SUCCESS };
  completedLocalOpts: CountOpts = { status: EVisitStatus.SUCCESS, local: true };
  pendingGlobalOpts: CountOpts = { status: EVisitStatus.PENDING, local: false };

  visitForm!: FormGroup;
  @Output() addVisit = new EventEmitter<IVisit>();
  selectedType: WritableSignal<string> = signal('local');
  public minDate: string = getIsoToday();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      gotra: ['', [Validators.required, Validators.minLength(3)]],
      visitDate: [this.todayString(), Validators.required],
      local: [true, Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  todayString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  selectType(selected: string) {
    console.log('select type is coming as: ' + selected);
    this.selectedType.set(selected);
  }

  onSubmit(): void {
    if (this.visitForm.invalid) {
      return;
    }
    const formValue = this.visitForm.value;

    const newVisit: IVisit = {
      id: Date.now(),
      name: formValue.name,
      gotra: formValue.gotra,
      visitDate: formValue.visitDate,
      local: this.selectedType() === 'local',
      phone: formValue.phone,
      status: EVisitStatus.PENDING,
      createdDate: new Date().toISOString(),
    };
    console.log(newVisit);
    this.addVisit.emit(newVisit);
    this.visitForm.reset({
      name: '',
      gotra: '',
      visitDate: this.todayString(),
      local: true,
      phone: '',
    });
  }

  getCount(opts: CountOpts = {}): number {
    const { status, local } = opts;
    return this.visitList.reduce((acc, v) => {
      if (
        (status === undefined || v.status === status) &&
        (local === undefined || v.local === local)
      ) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
}
