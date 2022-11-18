import {Component, OnInit, ViewChild} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatSidenav} from '@angular/material/sidenav';
import {delay, filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
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
export class AppComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  navItems: NavItem[] = [
    {
      id: '1',
      displayName: 'DevFestFL',
      iconName: 'close',

    },
    {
      id: '2',
      displayName: 'Prosper',
      iconName: 'close',

    }

  ];

  topics: any = [];

  public displayName:any;



  constructor(private observer: BreakpointObserver,
              private router: Router,
              private getCategories: CategoryService,
              private photoService: PhotoService) {


  }


  async ngOnInit(): Promise<void> {
   await this.getData();
    this.notifyForChange(this.displayName);
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

  async getData(): Promise<void> {
    this.getCategories.getData().subscribe(
      (data) => {
        this.topics = Array.from(Object.values(data));
        // console.log(this.topics[6][2])
      }
    );
  }

  notifyForChange(displayName:string) {
    this.photoService.notifyAboutChange(displayName);
  }


}
