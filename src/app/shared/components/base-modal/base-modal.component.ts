import { EventEmitter, Output, Directive } from '@angular/core';

@Directive()
export abstract class BaseModalComponent {
  @Output() cancel = new EventEmitter<void>();

  onCancelClick() {
    this.cancel.emit();
  }
}
