import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  endPointUrl: string = 'https://training-angular-project-3aee6-default-rtdb.asia-southeast1.firebasedatabase.app/';
  postURL: string = this.endPointUrl + 'post.json';

  constructor(private http: HttpClient) { }

  createAndPost(postData: Post){
    this.http.post<{name: string}>(this.postURL, postData).subscribe((data)=>{
      console.log(data);
    });
  }

  updatePost(postData: {[key: string]: {title: string, content: string}}){
    console.log(postData);
    return this.http.patch(this.postURL, postData);
  }

  fetchPost(){
    return this.http.get<{[key: string] : Post}>(this.postURL).pipe(
      map( responseData => {
        const postArray: Post[] = [];
        for(const keys in responseData){
          if(responseData.hasOwnProperty(keys)){
            postArray.push({...responseData[keys], id: keys})
          }
        }
        return postArray;
      })
    );
  }
}
