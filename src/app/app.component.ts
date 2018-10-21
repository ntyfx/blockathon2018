import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import ClipboardJS from 'clipboard';
import { ToastrService } from 'ngx-toastr';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { User } from './core/models/user.model';
import { UserService } from './core/services/user.service';

const clipboard = new ClipboardJS('.copy');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'blockathon';
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 1000;
  addExtraClass = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  inHome = false;

  constructor(
    private router: Router,
    private service: UserService,
    private snackBar: MatSnackBar,
  ) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        if (router.url === '/') {
          this.inHome = true;
        } else {
          this.inHome = false;
        }

        if (router.url.indexOf('/detail') === 0) {
          document.documentElement.style.backgroundColor = '#fff';
        } else {
          document.documentElement.style.backgroundColor = '#fafafa';
        }
      }
    });
  }

  ngOnInit(): void {
  }

  get address() {
    const leg = this.user.address.length;

    return `${this.user.address.substr(0, 8)}…${this.user.address.substr(leg - 8, leg)}`;
  }
  get user() {
    return this.service.getLoginUser();
  }

  onShowMessage(msg) {
    this.message = msg;
    this.open();
  }

  open() {
    const config = this._createConfig();
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 2000);
  }

  private _createConfig() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = this.addExtraClass ? ['demo-party'] : undefined;
    return config;
  }
}
