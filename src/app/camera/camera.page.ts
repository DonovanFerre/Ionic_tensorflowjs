import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@awesome-cordova-plugins/camera-preview/ngx';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { IaService } from '../services/ia.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public cameraOpen: boolean = false
  public pictureIs: boolean = false
  public imageB64: string
  public tmpFili: boolean = false
  public valScale: string

  public filigrane: boolean = true
  public margin: string = '0px 0px 0px 30px'
  public rotaVal: number = 90

  constructor(public cameraPreview: CameraPreview, private router: Router, public photoService: PhotoService, public iaService: IaService) {
    if (this.filigrane)
      this.scale(this.rotaVal)
  }

  ngOnInit() {
  }

  startCamera() {
    if (!this.cameraOpen) {
      this.tmpFili = true
      const cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'back',
        tapPhoto: true,
        previewDrag: false,
        toBack: true,
        storeToFile: false
      }
      // start camera
      this.cameraPreview.startCamera(cameraPreviewOpts)
     
      this.cameraOpen = true
    }
  }

  returnMenu() {
    if (this.cameraOpen) {
      this.cameraPreview.stopCamera()
      this.cameraOpen = false
    }
    this.router.navigate(['/home'])
  }

  scale(rota) {
      const im = new Image()
      im.crossOrigin = 'anonymous'
      im.src = "assets/filigrane.png"
    im.onload = () => {
      if (rota == 90 || rota == -90) {
        this.valScale = 'rotate('+rota+'deg) scale(' + Math.floor(((window.screen.height / im.width + window.screen.width / im.height) / 2) * 100) / 100 + ')'
      } else {
        this.valScale = 'rotate(' + rota + 'deg) scale(' + Math.floor((window.screen.width / im.width) * 100) / 100 + ')'
      }
    }
  }

  takePicture() {
    this.cameraPreview.hide()
    this.cameraPreview.takePicture({
      width: window.screen.width,
      height: window.screen.height,
      quality: 100
    }).then((b64) => {
      this.imageB64 =  'data:image/jpeg;base64,'+ b64
    })
    this.tmpFili = false
    this.pictureIs = true
  }

  supprPicture() {
    this.pictureIs = false
    this.tmpFili = true
    this.cameraPreview.show()
  }

  savePicture() {
    this.pictureIs = false
    this.rotate(this.imageB64, -this.rotaVal, (b64) => {
      this.photoService.addNewToGallery(this.iaService, b64)
    })
    this.imageB64 = ""
    this.returnMenu()
  }

  rotate(srcBase64, degrees, callback) {
    const canvas = document.createElement('canvas')
    let ctx = canvas.getContext("2d")
    let image = new Image()
    image.onload = () => {
      canvas.width = degrees % 180 === 0 ? image.width : image.height
      canvas.height = degrees % 180 === 0 ? image.height : image.width
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(degrees * Math.PI / 180)
      ctx.drawImage(image, image.width / -2, image.height / -2)
      callback(canvas.toDataURL())
    }
    image.src = srcBase64
  }

}
