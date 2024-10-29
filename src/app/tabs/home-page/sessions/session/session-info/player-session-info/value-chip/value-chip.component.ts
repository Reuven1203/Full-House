import { Component, ElementRef, ViewChild, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-value-chip',
  templateUrl: './value-chip.component.html',
  styleUrls: ['./value-chip.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ValueChipComponent),
      multi: true
    }
  ]
})
export class ValueChipComponent implements ControlValueAccessor {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number | null>();
  @Output() blurEvent = new EventEmitter<void>();

  @ViewChild('inputField', {static: false}) inputField!: ElementRef<HTMLInputElement>;

  private isFirstChange = true; // Flag to track if it's the first change

  private onChange = (value: number | null) => {};
  private onTouched = () => {};

  writeValue(value: number | null): void {
    this.value = value || 0;
    this.updateInputValue();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Register the function to call when the input is touched (on blur)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optional: Disable the input
  setDisabledState?(isDisabled: boolean): void {
    if (this.inputField) {
      this.inputField.nativeElement.disabled = isDisabled;
    }
  }

  onFocus() {
    this.onTouched();
  }

  onBlur() {
    this.isFirstChange = true;
    this.onTouched();
    this.blurEvent.emit();
  }

  onValueChange(event: any) {
    const inputEl = this.inputField.nativeElement;
    let inputValue;
    if (this.isFirstChange) {
      inputEl.value = event.data;
      this.isFirstChange = false;
      inputValue = parseInt(inputEl.value, 10);
    } else {
      inputValue = parseInt(inputEl.value.slice(1), 10);
    }

    if (inputEl.value.length <= 0 || inputEl.value === '$') {
      inputEl.value = '$0';
      inputValue = 0;
    }

    this.valueChange.emit(inputValue);
    this.onChange(inputValue); // Notify the form control of the change
  }

  private updateInputValue() {
    if (this.inputField) {
      this.inputField.nativeElement.value = `$${this.value}`;
    }
  }
}
