export interface DownscaleImageDimensions {
  width: number;
  height: number;
}

export interface DownscaleImageInput {
  /** maximal width and height of the downscaled image */
  maxDimensions: DownscaleImageDimensions;
  /** if the image has a different aspect ratio than the desired maxDimension: should it be cropped to fit exactly into  the maxDimensions? */
  crop?: boolean;
}

interface DownscaleImageTarget {
  dimensions: DownscaleImageDimensions;
  scaleFactor: number;
}

/**
 *
 *
 * @param imageDimensions
 * @param targetDimensions
 * @param cropToExactTarget
 * @returns
 */
export function computeScaling(
  imageDimensions: DownscaleImageDimensions,
  targetDimensions: DownscaleImageDimensions,
  cropToExactTarget: boolean,
): DownscaleImageTarget {
  const scaleX = targetDimensions.width / imageDimensions.width;
  const scaleY = targetDimensions.height / imageDimensions.height;

  if (cropToExactTarget) {
    const scaleFactor = Math.min(Math.max(scaleX, scaleY), 1);
    return {
      scaleFactor,
      dimensions: {
        width: Math.min(
          Math.round(imageDimensions.width * scaleFactor),
          targetDimensions.width,
        ),
        height: Math.min(
          Math.round(imageDimensions.height * scaleFactor),
          targetDimensions.height,
        ),
      },
    };
  } else {
    const scaleFactor = Math.min(scaleX, scaleY, 1);
    return {
      scaleFactor,
      dimensions: {
        width: Math.round(imageDimensions.width * scaleFactor),
        height: Math.round(imageDimensions.height * scaleFactor),
      },
    };
  }
}

/**
 * Downscale an image to a maximum size while maintaining aspect ratio.
 *
 * @param imageDataUrl the image provided as data URL
 * @param scaleOptions scaling settings
 */
export async function downscaleImage(
  imageDataUrl: string,
  scaleOptions: DownscaleImageInput,
): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = (): void => {
      const scaling = computeScaling(
        image,
        scaleOptions.maxDimensions,
        !!scaleOptions.crop,
      );
      const canvas = document.createElement('canvas');
      canvas.width = scaling.dimensions.width;
      canvas.height = scaling.dimensions.height;
      const ctx = canvas.getContext('2d');
      if (ctx != null) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      }
      const data = canvas.toDataURL('image/jpeg', 0.5);
      resolve(data);
    };
    image.src = imageDataUrl;
  });
}
