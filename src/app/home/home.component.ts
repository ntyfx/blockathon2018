import { Component, OnInit } from '@angular/core';

import { Art } from '../core/models/art.model';
import { ArtService } from '../core/services/art.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: Array<any>;
  constructor(
    private service: ArtService,
  ) { }

  ngOnInit() {
    this.service.indexList().then((data: Array<Art>) => {
      this.data = data;
    });
  }
}
