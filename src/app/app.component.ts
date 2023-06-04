import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
 

  loadedPosts = [];
  showLoading = false;
  id: string;
  title: string;
  content: string;
  errorSub: Subscription;
  error = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.errorHandling.subscribe(
      error => {
        this.error = error;
      }
    )
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

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
    this.showLoading = true;
    this.postService.deletePost().subscribe((data) => {
      this.showLoading = false;
      this.loadedPosts = [];
    })
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
      },
      error => {
        console.log(error);
        this.error = error;
      }
    )
  }
}
