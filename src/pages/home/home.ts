import { Component } from '@angular/core';
import { NavController, Platform, AlertController, ModalController } from 'ionic-angular';
import { Globalization } from '@ionic-native/globalization';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: new Date(),
    locale: 'en-GB'
  };

  constructor(
    public navCtrl: NavController,
    private plt: Platform,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private globalization: Globalization,
    private translate: TranslateService

  ) {
    this.globalization.getPreferredLanguage()
      .then(res => console.log(res))
      .catch(e => console.log(e));

      this.translate.get("SEPTEMBER").subscribe( value => {
        console.log(value);
      });
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;

        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}

