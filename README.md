# Version
```
Node.js : v17.6.0
npm : 8.5.1
Ionic CLI : 6.14.2
Capacitor CLI : 3.0.0
```
--------------------------------
# Apk
### Telecharger package
```
npm install
ionic cap add android
ionic cap sync
```
### Configuration 
```
ionic cap open android
```
Sous Android Studio mettre à jour le gradle:
> -> Android Gradle Plugin can be upgraded.
> -> Begin upgraded
> -> Run selected steps

### Lancer l'apk
```
ionic cap run android (-l --external)
```
--------------------------------
# Modification et ajustement
### Ajout Reseau de neuronnes
Ajouter votre réseau de neuronne (tensorflowjs) avec comme nom : "model.json" dans : 
>src\assets\tfjs_model

Configuration de l'ia dans :
>src\app\services\ia.service.ts
```
img = tf.image.resizeBilinear(img, [150, 150])
img = img.reshape([1, img.shape[0], img.shape[1], 3]);
```
### Ajout filigrane pour la photo
Ajouter votre filigrane avec comme nom : "filigrane.png" dans :
>src\assets

Configuration du filigrane dans :
>src\app\camera\camera.page.ts
```
public filigrane: boolean = true //presence ou non d un filigrane
public margin: string = '0px 0px 0px 30px' //positionnement dans l ecran
public rotaVal: number = 90 //rotation du filigrane par rapport à l ecran vertical
```
--------------------------------
# Message d'erreur 
### Error OffscreenCanvas
Dans :
>node_modules\typescript\lib\lib.dom.d.ts

Rechercher :
>interface HTMLCanvasElement extends HTMLElement

Modifier et Ajouter :
```
interface HTMLCanvasElement extends HTMLElement {
    // ...
    transferControlToOffscreen(): OffscreenCanvas;
}

interface OffscreenCanvasRenderingContext2D extends CanvasState, CanvasTransform, CanvasCompositing, CanvasImageSmoothing, CanvasFillStrokeStyles, CanvasShadowStyles, CanvasFilters, CanvasRect, CanvasDrawPath, CanvasUserInterface, CanvasText, CanvasDrawImage, CanvasImageData, CanvasPathDrawingStyles, CanvasTextDrawingStyles, CanvasPath {
    readonly canvas: OffscreenCanvas;
}
declare var OffscreenCanvasRenderingContext2D: {
    prototype: OffscreenCanvasRenderingContext2D;
    new(): OffscreenCanvasRenderingContext2D;
}
interface OffscreenCanvas extends EventTarget {
    width: number;
    height: number;
    getContext(contextId: "2d", contextAttributes?: CanvasRenderingContext2DSettings): OffscreenCanvasRenderingContext2D | null;
}
declare var OffscreenCanvas: {
    prototype: OffscreenCanvas;
    new(width: number, height: number): OffscreenCanvas;
}
```

Editer : 
>Transferable 

Dans :
>node_modules\typescript\lib\lib.dom.d.ts 
>node_modules\typescript\lib\lib.webworker.d.ts

Modifier :
```
type Transferable = ArrayBuffer | MessagePort | ImageBitmap | OffscreenCanvas;
```

### Error Long
Dans: 
>node_modules\@tensorflow\tfjs-core\dist\hash_util.d.ts

Modifier :
```
/// <amd-module name="@tensorflow/tfjs-core/dist/hash_util" />
/// <reference types="long" />
export declare function hexToLong(hex: string): Long;
export declare function fingerPrint64(s: Uint8Array, len?: number): Long;
```
