import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ngModel][phone]',
  host: {
    '(ngModelChange)': 'onInputChange($event)'
  }
})
export class PhoneMaskDirective {

  constructor(public model: NgControl) { }

  onInputChange(value: string) {
    let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (x !== null) {
      value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    }

    this.model.valueAccessor?.writeValue(value);
  }

}