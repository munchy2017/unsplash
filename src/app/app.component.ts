import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {NavItem} from "./nav-item";
import {CategoryService} from "./services/category.service";
import {Observable} from "rxjs";
import {IUnsplashResponse} from "./models/unsplash";
import {PhotoService} from "./services/photo.service";

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  navItems: NavItem[] = [
    {
      id:'1',
      displayName: 'DevFestFL',
      iconName: 'close',

    },
    {
      id:'2',
      displayName: 'Prosper',
      iconName: 'close',

    }

  ];

  topics:any =[] ;

  public topicName: any;
  myNum = 0;



  constructor(private observer: BreakpointObserver,
              private router: Router,
              private getCategories: CategoryService,
              private photoService: PhotoService) {

    this.getData();

  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  getData() {
    this.getCategories.getData().subscribe(
      (data) => {

        this.topics = Array.from(Object.values(data));

       // console.log(this.topics[6][2]);


      }
    );


  }
  getTopic(displayName: string) {
    this.photoService.photoQuery(displayName);
     alert(displayName);
  }


}
