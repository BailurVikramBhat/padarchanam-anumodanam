import {
  Component,
  OnInit,
  signal,
  WritableSignal,
  input,
  Input,
  Signal,
  computed,
} from '@angular/core';
import { VisitListComponent } from '../../components/visit-list/visit-list.component';
import { DateSelectorComponent } from '../../components/date-selector/date-selector.component';
import { AddVisitFormComponent } from '../../components/add-visit-form/add-visit-form.component';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { IVisit, EVisitStatus } from '../../services/visit.service';
import { visits } from '../../components/visit-list/visit-list.component';
import { DatamodeService } from '../../services/datamode.service';
import { delay } from 'rxjs';
import { AlertNotificationComponent } from '../../components/alert-notification/alert-notification.component';
export function getIsoToday(): string {
  const t = new Date();
  const yyyy = t.getFullYear();
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const dd = String(t.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
@Component({
  selector: 'app-dashboard',
  imports: [
    VisitListComponent,
    DateSelectorComponent,
    AddVisitFormComponent,
    SearchBarComponent,
    AlertNotificationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private _visits: WritableSignal<IVisit[]> = signal([]);
  public visits = this._visits.asReadonly();
  showErrorNotif: WritableSignal<boolean> = signal(false);

  today: WritableSignal<string> = signal(getIsoToday());

  search: WritableSignal<string> = signal('');
  public loading: WritableSignal<boolean> = signal(false);

  constructor(private dataMode: DatamodeService) {}
  ngOnInit(): void {
    this.loadDate(this.today());
  }

  private loadDate(date: string) {
    this.loading.set(true);
    this.dataMode
      .getVisitsForDate(date)
      .pipe(delay(5000))
      .subscribe({
        next: (data) => {
          this._visits.set(data);
          this.loading.set(false);
        },
        error: () => {
          this._visits.set([]);
          this.loading.set(false);
        },
      });
  }

  filtered: Signal<IVisit[]> = computed(() => {
    const date = this.today();
    const term = this.search().trim().toLowerCase();
    let list = this._visits().filter((v) => v.visitDate === date);
    if (term) {
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(term) ||
          v.gotra.toLowerCase().includes(term) ||
          v.phone.includes(term)
      );
    }
    return list;
  });

  onDateChange(newDate: string) {
    this.search.set('');
    const d = newDate || getIsoToday();
    this.today.set(d);
    this.loadDate(d);
  }

  onSearchChange(query: string) {
    this.search.set(query);
  }

  addSeva(visit: IVisit) {
    this.dataMode.saveVisit(visit).subscribe({
      next: () => this.loadDate(this.today()),
      error: (err) => this.showErrorNotif.set(true),
    });
  }
}
