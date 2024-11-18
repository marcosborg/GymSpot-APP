import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import {
  IonContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
  ],
})
export class Tab4Page implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

}
