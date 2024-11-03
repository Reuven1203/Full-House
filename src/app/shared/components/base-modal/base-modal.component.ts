import { EventEmitter, Output, Directive } from '@angular/core';

@Directive()
export abstract class BaseModalComponent {
  @Output() oncancel = new EventEmitter<void>();

  onCancelClick() {
    this.oncancel.emit();
  }
}
