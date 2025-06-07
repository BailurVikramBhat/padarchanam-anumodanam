import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipComponent } from '../tooltip/tooltip.component';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, TooltipComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  @Input()
  searchTerm!: string;

  get tooltipMessage() {
    return 'Search returns realtime results for search by name, gotra or phone. Please search by name to get unique results';
  }

  @Output() search = new EventEmitter<string>();

  onSearchChange() {
    this.search.emit(this.searchTerm.trim());
  }
}
