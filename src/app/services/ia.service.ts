import { Injectable } from '@angular/core';
import { Photo } from '@capacitor/camera';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})

export class IaService {

  public model: tf.LayersModel
  public predictions: number[]
  constructor() { }

  async loadModel() {
    tf.loadLayersModel('../../assets/tfjs_model/model.json')
      .then(model => {
        this.model = model
      })
      .catch(er => alert(er))
  }

  public format_image(b64/*photo: Photo*/) {
    return new Promise(function (resolve, reject) {
      try {
        const im = new Image()
        im.crossOrigin = 'anonymous'
       // im.src = "data:image/jpeg;base64," + photo.base64String
        im.src = b64
        im.onload = () => {
          resolve(im)
        }
      } catch (err) {
        alert(err)
      }
   })
  }

  public predict(img) {
    return tf.tidy(() => {
      try {
        img = tf.browser.fromPixels(img);
        //alert(img.shape)
        img = tf.image.resizeBilinear(img, [150, 150])
        img = img.reshape([1, img.shape[0], img.shape[1], 3]);
        //alert(img.shape)
        img = tf.cast(img, 'float32');
        // Make and format the predications
        const output = this.model.predict(img) as any;

        // Save predictions on the component
        this.predictions = Array.from(output.dataSync());
        for (let i = 0; i < this.predictions.length; i++) {
          this.predictions[i] = Math.floor(this.predictions[i] * 100) / 100
        }
      } catch (err) {
        alert(err)
      }
      return this.predictions
    });
  }
}
