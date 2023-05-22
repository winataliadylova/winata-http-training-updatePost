import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 

  loadedPosts = [];
  showLoading = false;
  id: string;
  title: string;
  content: string;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {}

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndPost(postData);
    
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts() {
    // Send Http request
  }

  viewPost(postData:  Post){
    this.id = postData.id;
    this.title = postData.title;
    this.content = postData.content;
  }

  onUpdatePost(){
    const data = {
      [this.id!]: {
        title: this.title,
        content: this.content
      },
    };
    console.log(data);
    this.postService.updatePost(data).subscribe((post) =>{
        
        console.log(post);
      }
    );
  }



  private fetchPost(){
    this.showLoading = true;
    this.postService.fetchPost().subscribe(
      (data) =>{
        this.showLoading = false;
        this.loadedPosts = data;
      }
    )
  }
}
