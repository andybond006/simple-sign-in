import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy = new Subject<void>();

  @ViewChild('snav', { static: true }) sidenav: MatSidenav;

  constructor(
    private updates: SwUpdate,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private snackbar: MatSnackBar,
    private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIconSet(this.domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg'));
  }

  ngOnInit() {
    this.router.events.pipe(
      takeUntil(this.destroy)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
    this.updates.available.pipe(
      takeUntil(this.destroy)
    ).subscribe(event => {
      const snack = this.snackbar.open('Update Available', 'Reload', { duration: 10000 });
      snack.onAction().subscribe(() => {
        window.location.reload();
        snack.dismiss();
      });
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
