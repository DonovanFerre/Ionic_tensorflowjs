Si erreur OffScreenCanvas:

For the time being, you'll need to modify your lib.dom.d.ts or similar.

```
In node_modules/typescript/lib/lib.dom.d.ts, find interface HTMLCanvasElement extends HTMLElement and append the lines

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

And finally, edit the Transferable definitions in lib.dom.d.ts and lib.webworker.d.ts:

```
type Transferable = ArrayBuffer | MessagePort | ImageBitmap | OffscreenCanvas;
```

Si erreur Long:
hash_util.d.ts

```
/// <amd-module name="@tensorflow/tfjs-core/dist/hash_util" />
/// <reference types="long" />
export declare function hexToLong(hex: string): Long;
export declare function fingerPrint64(s: Uint8Array, len?: number): Long;
```