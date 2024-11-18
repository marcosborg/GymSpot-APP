import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonCard, IonCardContent, IonContent, LoadingController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { PreferencesService } from 'src/app/services/preferences.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fitness-guide',
  templateUrl: './fitness-guide.page.html',
  styleUrls: ['./fitness-guide.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonCard,
    IonCardContent
  ]
})
export class FitnessGuidePage {

  constructor(
    private loadingController: LoadingController,
    private preferences: PreferencesService,
    private api: ApiService
  ) { }

  access_token: any;
  user: any;
  spot_id: any = 9;
  request: string = '';
  items: any;

  ionViewWillEnter() {
    this.inicialize();
  }

  inicialize() {
    this.loadingController.create().then((loading) => {
      loading.present();
      this.preferences.checkName('access_token').then((resp: any) => {
        this.access_token = resp.value;
        if (this.access_token) {
          let data = {
            access_token: this.access_token
          }
          this.api.user(data).subscribe((resp) => {
            this.user = resp;
            this.api.getSpot(this.spot_id).subscribe((resp: any) => {
              let items = resp.data.items;
              let equipment = '';
              items.forEach((element: any, index: number) => {
                equipment += element.name;
                if (index === items.length - 1) {
                  equipment += '.';
                } else {
                  equipment += ', ';
                }
              });
              let html = 'O meu nome é ' + this.user.name + '. Tenho ' + this.user.client.client_data.age + ' de idade. ';
              if (this.user.client.client_data.gender) {
                html += 'Sou do género ' + this.user.client.client_data.gender + '. ';
              } else {
                html += 'Não quero revelar o meu género.';
              }
              html += 'O meu objetivo principal é ' + this.user.client.client_data.primary_objective + ' e o meu nível de experiência com exercícios físicos é ' + this.user.client.client_data.fitness_level + '. ';
              if (this.user.client.client_data.condition || this.user.client.client_data.condition_obs) {
                if (this.user.client.client_data.condition) {
                  html += 'Como condição de saúde tenho ' + this.user.client.client_data.condition + '. ';
                  if (this.user.client.client_data.condition_obs) {
                    html += ' Ainda tenho a segunte condição: ' + this.user.client.client_data.condition_obs + '.';
                  }
                } else {
                  html += 'Como condição de saúde tenho ' + this.user.client.client_data.condition_obs;
                }
              }
              html += 'O spot GymSpot onde me encontro, possui como equipamento: ' + equipment + '. '
              html += 'Com base nestas informações quero que me prepares um treino de fitness para hoje, adequado à minha realidade e objetivos, e com base no quipamento que te passei e que se encontra disponível neste spot.';
              this.request = html;
              console.log(this.request);
              loading.dismiss();
            });
          });
        } else {
          loading.dismiss();
        }
      });
    });
  }

}
