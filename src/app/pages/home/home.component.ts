import {
  Component,
  ElementRef, Input,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import {Observable} from "rxjs";
import {IUnsplashResponse} from "../../models/unsplash";
import {PhotoService} from "../../services/photo.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gridColumns = 3;

  topicName: any;
  photos:any =[] ;
  photosData:any =[] ;
  p: string | number | undefined;

  constructor(private photoService: PhotoService) {

  }

  ngOnInit(): void {
    this.getPhoto();


  }

  getPhoto() {

    this.photoService.photoQuery(this.topicName).subscribe(
      (data) => {

        this.photos = Array.from(Object.values(data));


       this.photosData = this.photos[6];

console.log(this.photosData);

      }
    );



  }




}
