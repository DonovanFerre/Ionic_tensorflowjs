import { Component } from '@angular/core';
import { IaService } from '../services/ia.service';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { AlertController } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public cameraActive = false

  constructor(public photoService: PhotoService, public iaService: IaService, private router: Router, public alertController: AlertController) {
    this.iaService.loadModel() 
  }

  cameraDirection() {
    this.router.navigate(['/camera'])
  }

  async save_this_photo(photo) {
    const alertP = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Sauvegarder',
      subHeader: '',
      message: 'Voulez-vous sauvegarder cette photo ?',
      buttons: [{
        text: 'CANCEL',
        role: 'CANCEL'
      }, {
          text: 'OK',
          role: 'OK'
        }]
    })
    await alertP.present()
    const { role } = await alertP.onDidDismiss()
    if (role == 'OK') {
      try {
        const fileName = new Date().getTime() + '.jpeg';
        await Filesystem.writeFile({
          path: fileName,
          data: photo.base64,
          directory: Directory.External
        })
      } catch (e) {
        alert( e);
      }
    }
  }

  async information() {
    const finalPhotoUri = await Filesystem.getUri({
      directory: Directory.External,
      path: ""
    });
    let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri)
    const alertP2 = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Informations',
      subHeader: '',
      message: 'Les photos sauvegardées seront stockées ici : '+ photoPath+'/',
      buttons: ['OK']
    })
    await alertP2.present()
    const { role } = await alertP2.onDidDismiss()
  }

  clear_all() {
    this.photoService.photos = []
  }
}
