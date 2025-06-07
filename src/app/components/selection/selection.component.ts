import { Component } from '@angular/core';
import { DatamodeService } from '../../services/datamode.service';
import { Router, RouterModule } from '@angular/router';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-selection',
  imports: [RouterModule],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
})
export class SelectionComponent {
  constructor(private dataMode: DatamodeService, private router: Router) {}

  chooseMode(useMock: boolean) {
    this.dataMode.setMockMode(useMock);

    this.router.navigate(['/dashboard', 'today']);
  }
}
