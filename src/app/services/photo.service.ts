import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions: {
  headers: any;
  observe: any;
  params: any;
  responseType: any;
} = {
  headers: new HttpHeaders({
    Authorization: 'Client-ID ' + environment.unsplash.UNSPLASH_API_KEY,
    'Content-Type': 'application/json',
  }),
  observe: 'response',
  params: 'HttpParams',
  responseType: 'json',
};

@Injectable({
  providedIn: 'root',
})
export class PhotoService {


  customChangeDetector = new Subject<string>();
  customChangeDetector$ = this.customChangeDetector.asObservable();



 topicName: any;

  readonly baseUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {

  }


  photoQuery(): Observable<any> {



if(this.topicName==null){
  this.topicName = 'people';
}else{
  this.customChangeDetector$.subscribe((data: any) => {
    this.topicName = data;
    console.log(this.topicName);
  });
}

    return this.http
      .get(
        `${this.baseUrl}/topics/${this.topicName}/photos`,
        httpOptions
      )
      .pipe(
        take(1),
        catchError((err) => {
          return throwError(() =>
            console.log(
              'There was a problem fetching data from the Unsplash API: ',
              err.error.errors.toString()
            )
          );
        })
      );
  }
}
