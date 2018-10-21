import { Component, HostBinding, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  details: string;
  message: string;
  sending = false;
  username = '';
  password = '123456';

  @ViewChild('loginTemplate') loginTemplate: TemplateRef<any>;

  config = {
    disableClose: false,
    panelClass: 'shop-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '80%',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: '480px',
    maxHeight: '',
    position: {
      top: '64px',
      bottom: '',
      left: '',
      right: ''
    },
    data: {
    }
  };
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private service: UserService,
  ) { }

  ngOnInit(): void {
    this.dialog.open(this.loginTemplate, this.config);
  }

  send() {
    this.sending = true;
    this.details = 'Sending Message...';

    setTimeout(() => {
      this.sending = false;
      this.closePopup();
    }, 1000);
  }

  doLogin() {
    this.service.autoLogin().then(res => {
      this.service.setLoginUser(res.data);
      this.cancel();
    });
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  cancel() {
    this.closeDialog();
    this.closePopup();
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null } }]);
  }
}
