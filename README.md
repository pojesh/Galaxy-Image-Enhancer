# Galaxy Image Enhancer

A Next.js application that enhances images using AI-powered upscaling and outpainting techniques. This application integrates with a Flask backend API for image processing.

## Features

- **Image Upscaling**: Increase image resolution by 2x or 4x with AI enhancement
- **Face Enhancement**: Optionally improve facial details in upscaled images
- **Image Outpainting**: Expand image boundaries in portrait or landscape orientation

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- Backend API server running on http://localhost:5000

### Frontend Setup

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend Integration

This application integrates with a Flask backend API that provides image processing capabilities. The backend API endpoints are:

- `POST /upscale` - For image upscaling with options for scale factor, output scale, and face enhancement
- `POST /outpaint` - For image outpainting with options for scale factor, output scale, and padding

The integration is handled by the API service in `lib/api.ts`, which provides functions for:

- `upscaleImage()` - Sends images to the upscaling endpoint
- `outpaintImage()` - Sends images to the outpainting endpoint

Both functions handle the conversion of data URLs to file objects, form data creation, and error handling.

### Usage

1. Upload an image using drag-and-drop or the file selector
2. Choose processing options:
   - For upscaling: Select 2x or 4x and optionally enable face enhancement
   - For outpainting: Select portrait or landscape orientation
3. Click "Process Image" to send the image to the backend for processing
4. View and download the processed image

### Troubleshooting

- If you encounter connection errors, ensure the backend server is running on port 5000
- For image processing errors, check the backend server logs for more details
- Large images may take longer to process; be patient during the processing stage

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
