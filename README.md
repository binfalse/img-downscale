# Image Downscale for web projects

A small library to downscale an image to a maximum size while maintaining aspect ratio.
The `downscaleImage` function takes an image data URL and scaling settings as input, and returns a promise resolving to the downscaled image as a data URL.

As a side effect, all (exif etc) meta data will be stripped away.

## Installation

You can install this package using npm:

```bash
npm install @hochleistungslabor/img-downscale
```

## Usage

To use this library in your project, you need to import it and call the downscaleImage function with the image data URL and scaling settings as input. For example:

```js
import { downscaleImage } from "@hochleistungslabor/downscale-image";

const imageDataUrl = "data:image/png;base64...";
const scaleOptions = {
  maxDimensions: { width: 640, height: 400 },
  cropToExactTarget: true,
};

downscaleImage(imageDataUrl, scaleOptions).then((data) => {
  console.log(data); // the downscaled image as a data URL
});
```

The `maxDimensions` object in the scaling settings specifies the maximum width and height of the downscaled image.
The cropToExactTarget boolean determines if the image should be cropped to fit exactly into the max dimensions or if it should be scaled proportionally while maintaining aspect ratio.

## API Reference

The following functions are exported by this library:

### `downscaleImage(imageDataUrl, scaleOptions)`

- `imageDataUrl`: The image provided as a data URL
- `scaleOptions`: Scaling settings object
  - `maxDimensions`: Object containing the maximum width and height of the downscaled image
  - `cropToExactTarget`: Boolean indicating if the image should be cropped to fit exactly into the max dimensions or if it should be scaled proportionally while maintaining aspect ratio
- Returns: A promise resolving to the downscaled image as a data URL

### `computeScaling(imageDimensions, targetDimensions, cropToExactTarget)`

- `imageDimensions`: The dimensions of the original image
- `targetDimensions`: The desired maximum width and height of the downscaled image
- `cropToExactTarget`: Boolean indicating if the image should be cropped to fit exactly into the max dimensions or if it should be scaled proportionally while maintaining aspect ratio
- Returns: An object containing the scaling factor and the dimensions of the downscaled image

## Examples

### Downscaling an image with default options

```js
import { downscaleImage } from "@hochleistungslabor/img-downscale";

const imageDataUrl = "data:image/png;base64...";

downscaleImage(imageDataUrl, {}).then((data) => {
  console.log(data); // the downscaled image as a data URL
});
```

### Downscaling an image with custom options

```js
import { downscaleImage } from "@hochleistungslabor/img-downscale";

const imageDataUrl = "data:image/png;base64...";
const scaleOptions = {
  maxDimensions: { width: 640, height: 400 },
  cropToExactTarget: true,
};

downscaleImage(imageDataUrl, scaleOptions).then((data) => {
  console.log(data); // the downscaled image as a data URL
});
```
