import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IVisit } from "../../services/visit.service";
@Component({
  selector: "app-visit-card",
  imports: [CommonModule],
  templateUrl: "./visit-card.component.html",
  styleUrl: "./visit-card.component.scss",
})
export class VisitCardComponent {
  @Input({
    required: true,
  })
  visit!: IVisit;

  @Output() markSuccess = new EventEmitter<number>();
  @Output() markFailure = new EventEmitter<number>();
}
