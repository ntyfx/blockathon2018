import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Art } from '../core/models/art.model';
import { ArtService } from '../core/services/art.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  data$: Observable<Array<Art>>;

  constructor(
    private route: ActivatedRoute,
    private service: ArtService,
  ) { }

  ngOnInit() {
    this.data$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.myArtList(params.get('address'));
      }));
  }

}
