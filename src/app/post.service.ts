import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPointUrl: string = 'https://training-angular-project-3aee6-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointUrl + 'post.json';
  errorHandling = new Subject<any>();
  


  constructor(private http: HttpClient) { }

  createAndPost(postData: Post){
    this.http.post<{name: string}>(this.postURL, postData, {
      observe: 'response',
      responseType: 'json'
    })
    .subscribe((data)=>{
      console.log(data);
      this.errorHandling.next(null);
    },
    error => {
      this.errorHandling.next(error); 
    }
    );
  }

  updatePost(postData: {[key: string]: {title: string, content: string}}){
    console.log(postData);
    return this.http.patch(this.postURL, postData);
  }

  fetchPost(){
    let customParam = new HttpParams();
    customParam = customParam.append('print', 'pretty');
    customParam = customParam.append('custom-param', 'custom-param-value')

    return this.http.get<{[key: string] : Post}>(this.postURL, {
      headers: new HttpHeaders({
        'custom-header' : 'hello from custom header',
      }),
      params: customParam,
    })
    .pipe(
      map( responseData => {
        const postArray: Post[] = [];
        for(const keys in responseData){
          if(responseData.hasOwnProperty(keys)){
            postArray.push({...responseData[keys], id: keys})
          }
        }
        return postArray;
      }),
      catchError(
        errorRes => {
          return throwError(errorRes);
        }
      )
    );
  }

  deletePost(){
    return this.http.delete(this.postURL, {
      observe: 'events'
    })
    .pipe(
      tap( 
        event=>{
          console.log(event);
          if(event.type === HttpEventType.Sent){

          }
          if(event.type === HttpEventType.Response){
            console.log(event.body);
          }
        }
      )
    );
  }
}

