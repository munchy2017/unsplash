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

  topicName = '';
  photos:any =[] ;
  photosData:any =[] ;
  p: string | number | undefined;

  @Input() childMessage: {} | undefined;
  constructor(private photoService: PhotoService) {

  }

  ngOnInit(): void {
    this.getPhoto();


  }

  getPhoto() {
    this.photoService.customChangeDetector$.subscribe((data: any) => {
      this.topicName = data;
      console.log(this.topicName);
    });
    this.photoService.photoQuery().subscribe(
      (data) => {

        this.photos = Array.from(Object.values(data));


       this.photosData = this.photos[6];



      }
    );



  }




}
