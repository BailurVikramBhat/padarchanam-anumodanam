import { Component, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitCardComponent } from '../visit-card/visit-card.component';
import { IVisit, EVisitStatus } from '../../services/visit.service';
export const visits: IVisit[] = [];
@Component({
  selector: 'app-visit-list',
  imports: [CommonModule, VisitCardComponent],
  templateUrl: './visit-list.component.html',
  styleUrl: './visit-list.component.scss',
})
export class VisitListComponent {
  @Input()
  visitList!: IVisit[];
}
