import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  @Input({
    required: true,
  })
  visible!: boolean;
  @Input({})
  title: string = 'Confirm?';
  @Input()
  description: string = 'Are you sure?';

  @Output() modalResponse = new EventEmitter<boolean>();

  onConfirm() {
    this.modalResponse.emit(true);
    this.visible = false;
  }
  onCancel() {
    this.modalResponse.emit(false);
    this.visible = false;
  }
}
