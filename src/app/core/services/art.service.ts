import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ApiService } from './api.service';
import { Art } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ArtService {
  constructor(
    private apiService: ApiService
  ) { }

  get(username: string): Observable<Art> {
    return this.apiService.get('/art/' + username)
      .pipe(map((data: { Art: Art }) => data.Art));
  }

  indexList(): Promise<Array<Art>> {
    return this.apiService.get('/art').toPromise().then(res => res.data);
  }

  buy(token: string): Observable<any> {
    return this.apiService.get(`/art/buy?token_id=${token}`);
  }



  sell(token: string, price: number): Observable<any> {
    return this.apiService.get(`/art/buy?token_id=${token}&price=${price}`);
  }

  getArtById(id: string): Observable<any> {
    return this.apiService.get(`/art/detail?assetid=${id}`).pipe(map(res => res.data));
  }

  myArtList(address: string): Observable<Array<Art>> {
    return this.apiService.get(`/user/art?address=${address}`).pipe(map(res => res.data));
  }

  unfollow(username: string): Observable<Art> {
    return this.apiService.delete('/art/' + username + '/follow');
  }

}
