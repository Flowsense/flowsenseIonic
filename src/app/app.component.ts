import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var Flowsense;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let flowsense = new Flowsense("b9f3bd67e0694426a441e6528c2c8c91");

      flowsense.startSDK();
      flowsense.requestAlwaysAuthorization();
      flowsense.startMonitoringLocation();
      flowsense.updatePartnerUserId("testeionic0803");
      flowsense.pushNotificationsEnabled(true);
      flowsense.smsEnabled(false);
      flowsense.emailEnabled(true);
      flowsense.createNotificationChannel("fs_ionic_channel");
      if (this.platform.is('ios')) {
        flowsense.requestPushToken();
      }

      const map = {
        "nomeBotaoClicado": "Botao Enviar",
        "dataClique": new Date()
      };

      flowsense.inAppEvent("clique_de_botao", map);
      flowsense.inAppEventLocalized("clique_de_botao_ios", map);


      flowsense.onNotification((jsonData) => {
        console.log(jsonData);
      });

      const notificationOpenedCallback = (jsonData) => {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      // window["plugins"].OneSignal
      //   .startInit("4f07869f-ea3c-4c60-b42e-0707d4e9e9dd", "895702690058")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .endInit();

    });
  }
}
