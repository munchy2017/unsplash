import {
  Component,
  ElementRef, Input,
  OnInit,
  VERSION,
  ViewChild,
} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {IUnsplashResponse} from "../../models/unsplash";
import {PhotoService} from "../../services/photo.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gridColumns = 3;

  public topicName = 'nature';
  photos: any = [];
  photosData: any = [];
  p: string | number | undefined;

  notifierSubscription: Subscription = this.photoService.subjectNotifier.subscribe(async notified => {

    this.topicName = notified;
    await this.getPhoto(this.topicName);
  });
  constructor(private photoService: PhotoService) {

  }

  async ngOnInit(): Promise<void> {
    await this.getPhoto(this.topicName);
  }

  async getPhoto(topicName: string): Promise<void> {
    this.photoService.photoQuery(this.topicName).subscribe(
      (data) => {
        this.photos = Array.from(Object.values(data));
        this.photosData = this.photos[6];
        console.log(this.photosData);
      }
    );


  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }


}
