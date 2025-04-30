/**
 * API service for image processing operations
 * Integrates with the backend API for upscaling and outpainting images
 */

/**
 * Upscales an image using the backend API
 * @param imageFile - The image file or data URL to upscale
 * @param options - Configuration options for upscaling
 */
export async function upscaleImage(imageData: string, options: {
  scaleFactor: '2' | '4';
  outscale?: string;
  faceEnhance?: boolean;
}) {
  const {
    scaleFactor = '4',
    outscale = scaleFactor === '2' ? '2.0' : '4.0',
    faceEnhance = false
  } = options;

  // Convert data URL to File object
  const imageFile = dataURLtoFile(imageData, 'image.png');
  
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('scale_factor', scaleFactor);
  formData.append('outscale', outscale);
  formData.append('face_enhance', faceEnhance.toString());
  
  try {
    const response = await fetch('http://localhost:5000/upscale', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        imageData: `data:image/png;base64,${data.image}`,
        message: data.message
      };
    } else {
      return {
        success: false,
        error: data.error || 'Unknown error occurred'
      };
    }
  } catch (error: any) {
    console.error('Error upscaling image:', error);
    return {
      success: false,
      error: error.message || 'Failed to connect to the server'
    };
  }
}

/**
 * Outpaints an image using the backend API
 * @param imageFile - The image file or data URL to outpaint
 * @param options - Configuration options for outpainting
 */
export async function outpaintImage(imageData: string, options: {
  scaleFactor: '2' | '4';
  outscale?: string;
  padding?: string;
}) {
  const {
    scaleFactor = '4',
    outscale = '1.0',
    padding = '64'
  } = options;

  // Convert data URL to File object
  const imageFile = dataURLtoFile(imageData, 'image.png');
  
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('scale_factor', scaleFactor);
  formData.append('outscale', outscale);
  formData.append('padding', padding);
  
  try {
    const response = await fetch('http://localhost:5000/outpaint', {
      method: 'POST',
      body: formData,
    });
    
    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        imageData: `data:image/png;base64,${data.image}`,
        message: data.message
      };
    } else {
      return {
        success: false,
        error: data.error || 'Unknown error occurred'
      };
    }
  } catch (error: any) {
    console.error('Error outpainting image:', error);
    return {
      success: false,
      error: error.message || 'Failed to connect to the server'
    };
  }
}

/**
 * Converts a data URL to a File object
 * @param dataUrl - The data URL to convert
 * @param filename - The filename to use for the File object
 */
function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
}