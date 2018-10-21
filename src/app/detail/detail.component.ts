import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';

import { Art, User, ArtService, UserService } from '../core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  data$: Observable<Art>;

  price;
  message = 'Snack Bar opened.';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 1000;
  addExtraClass = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild('videoTemplate') videoTemplate: TemplateRef<any>;
  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;
  @ViewChild('transformTemplate') transformTemplate: TemplateRef<any>;

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

  videoConfig = {
    disableClose: false,
    panelClass: 'video-panel',
    hasBackdrop: true,
    backdropClass: '',
    width: '100%',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: '640px',
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
    private route: ActivatedRoute,
    private service: ArtService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  get user() {
    return this.userService.getLoginUser();
  }

  ngOnInit() {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.getArtById(params.get('id'));
      }));
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  handleShop() {
    this.dialog.open(this.dialogTemplate, this.config);
  }

  handleTransform() {
    this.dialog.open(this.transformTemplate, this.config);
  }

  showVideo() {
    this.dialog.open(this.videoTemplate, this.videoConfig);
  }

  onLogin() {
    this.router.navigate([{ outlets: { popup: ['login'] } }]);
  }

  onShop(token_id) {
    this.service.buy(token_id).subscribe(res => {
      console.log('res', res);
      this.closeDialog();
      this.onShowMessage(res.msg);
    }, err => console.error(err));
  }

  onSell(token_id) {
    this.service.sell(token_id, this.price).subscribe(res => {
      this.closeDialog();
      this.onShowMessage(res.msg);
    }, err => console.error(err));
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
