import { Component, HostBinding, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('style.z-index') zIndex = '100';
  @HostBinding('class') class = 'mat-elevation-z6';
  @Output() sidenav = new EventEmitter<null>();

  click(btn: string) {
    switch (btn) {
      case ('sidenav'):
        this.sidenav.emit(null);
        break;
      default:
        break;
    }
  }
}
