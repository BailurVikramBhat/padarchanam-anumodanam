import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  signal,
  WritableSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { IVisit, EVisitStatus } from "../../services/visit.service";
@Component({
  selector: "app-add-visit-form",
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./add-visit-form.component.html",
  styleUrl: "./add-visit-form.component.scss",
})
export class AddVisitFormComponent implements OnInit {
  visitForm!: FormGroup;
  @Output() addVisit = new EventEmitter<IVisit>();
  selectedType: WritableSignal<string> = signal("local");

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.visitForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      gotra: ["", [Validators.required, Validators.minLength(3)]],
      visitDate: [this.todayString(), Validators.required],
      local: [true, Validators.required],
      phone: ["", [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  todayString(): string {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }

  selectType(selected: string) {
    console.log("select type is coming as: " + selected);
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
      local: this.selectedType() === "local",
      phone: formValue.phone,
      status: EVisitStatus.PENDING,
      createdDate: new Date().toISOString(),
    };
    console.log(newVisit);
    this.addVisit.emit(newVisit);
    this.visitForm.reset({
      name: "",
      gotra: "",
      visitDate: this.todayString(),
      local: true,
      phone: "",
    });
  }
}
