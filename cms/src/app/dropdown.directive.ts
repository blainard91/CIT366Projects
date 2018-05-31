import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  @HostListener ('click') mouseover() {
    this.isOpen = !this.isOpen;
  }

  @HostListener ('mouseleave') mouseleave() {
    this.isOpen = false;
  }
}
