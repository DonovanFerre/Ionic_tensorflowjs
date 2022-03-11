import { Injectable } from '@angular/core';
import { UserPhoto } from './UserPhoto';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = []
  public id: number = 0
  public wait: boolean = false

  constructor(public loadingController: LoadingController) { }

  public async addNewToGallery(iaService, capturedPhoto) {
    // Take a photo
    
    /*const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
      width: 200,
      height: 200,
      correctOrientation: false,
      preserveAspectRatio: false
    });*/
    this.wait = true
    let loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Loading...',
      duration: 0
    })
    await loading.present()
    iaService.format_image(capturedPhoto).then(async (HTMLElem) => {
      this.photos.push({
        id: this.id,
        //base64: "data:image/jpeg;base64," + capturedPhoto.base64String,
        base64: capturedPhoto,
        //filepath: "soon...",
        //webviewPath: capturedPhoto.webPath,
        IAResponse: await iaService.predict(HTMLElem)
      })
      this.wait = false
      this.id += 1
      await loading.dismiss()
    })
    
      
  }
}
