'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';

type Props = {
  imageUrl: string;
  onClose: () => void;
  onSave: (imageUrl: string) => void;
};

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image: HTMLImageElement = document.createElement('img');
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // avoid CORS issues
    image.src = url;
  });
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Failed to get canvas 2D context');
  }

  const radians = (rotation * Math.PI) / 180;

  // Calculate bounding box of the rotated image
  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const width = image.width;
  const height = image.height;
  const rotatedWidth = width * cos + height * sin;
  const rotatedHeight = width * sin + height * cos;

  // Set canvas to rotated image size
  canvas.width = rotatedWidth;
  canvas.height = rotatedHeight;

  // Move canvas origin to center to rotate around center
  ctx.translate(rotatedWidth / 2, rotatedHeight / 2);
  ctx.rotate(radians);

  // Apply flipping
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);

  // Draw the image offset by half width and height
  ctx.drawImage(image, -width / 2, -height / 2);

  // Get the data of the rotated image from canvas
  const rotatedImageData = ctx.getImageData(0, 0, rotatedWidth, rotatedHeight);

  // Create a new canvas to crop the rotated image
  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = pixelCrop.width;
  cropCanvas.height = pixelCrop.height;
  const cropCtx = cropCanvas.getContext('2d');

  if (!cropCtx) {
    throw new Error('Failed to get crop canvas 2D context');
  }

  // Put rotated image data to crop canvas
  // But we need to put the whole rotated image first
  // So putImageData at (0,0)
  cropCtx.putImageData(rotatedImageData, 0, 0);

  // Now crop the desired area from rotated image
  // Because putImageData does not support cropping directly,
  // Instead, we can draw the rotated canvas onto crop canvas with offset

  // So we redo the approach:
  // Instead of using getImageData and putImageData, just draw rotated image on a canvas and then crop.

  // Let's redo this with a simpler approach:

  // Create a temporary canvas to draw rotated and flipped image
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = rotatedWidth;
  tempCanvas.height = rotatedHeight;
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) {
    throw new Error('Failed to get temp canvas 2D context');
  }

  // Clear and set transform
  tempCtx.clearRect(0, 0, rotatedWidth, rotatedHeight);
  tempCtx.translate(rotatedWidth / 2, rotatedHeight / 2);
  tempCtx.rotate(radians);
  tempCtx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  tempCtx.drawImage(image, -width / 2, -height / 2);

  // Now crop the pixelCrop area from tempCanvas
  // Create final canvas to hold cropped image
  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = pixelCrop.width;
  finalCanvas.height = pixelCrop.height;
  const finalCtx = finalCanvas.getContext('2d');

  if (!finalCtx) {
    throw new Error('Failed to get final canvas 2D context');
  }

  // Draw the cropped area from tempCanvas to finalCanvas
  finalCtx.drawImage(
    tempCanvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    finalCanvas.toBlob((blob) => {
      if (!blob) {
        // fallback to base64 string
        resolve(finalCanvas.toDataURL('image/png'));
        return;
      }
      const fileUrl = URL.createObjectURL(blob);
      resolve(fileUrl);
    }, 'image/png');
  });
}

const RotatingImage = ({ imageUrl, onClose, onSave }: Props) => {
  const [angle, setAngle] = useState(0);
  const [isMirrored, setIsMirrored] = useState(false);
  const [isVerticallyMirrored, setIsVerticallyMirrored] = useState(false);

  // Cropper states
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAngle = Math.min(45, Math.max(-45, Number(e.target.value)));
    setAngle(newAngle);
  };

  const handleReset = () => {
    setAngle(0);
    setIsMirrored(false);
    setIsVerticallyMirrored(false);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setAspectRatio(4 / 3);
  };

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    try {
      const finalUrl = await getCroppedImg(imageUrl, croppedAreaPixels, angle, {
        horizontal: isMirrored,
        vertical: isVerticallyMirrored,
      });
      onSave(finalUrl);
    } catch (error) {
      console.error('Crop failed:', error);
    }
  };

  // Compose CSS transform for mirroring
  const mirrorTransform = `scaleX(${isMirrored ? -1 : 1}) scaleY(${isVerticallyMirrored ? -1 : 1})`;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#0A1A6B] w-full max-w-md mx-auto">
      {/* Cropper Container */}
      <div className="relative w-full h-64 bg-black rounded-md overflow-hidden" style={{ transform: mirrorTransform }}>
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          rotation={angle}
          objectFit="contain"
          cropShape="rect"
          showGrid={false}
        />
      </div>

      {/* Zoom Slider */}
      <div className="w-full mt-4">
        <label htmlFor="zoom" className="block text-white text-sm mb-1">Zoom</label>
        <input
          id="zoom"
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Aspect Ratio Buttons */}
      <div className="flex justify-center space-x-3 mt-4">
        <button
          onClick={() => setAspectRatio(4 / 3)}
          className={`px-4 py-2 rounded-full text-white ${aspectRatio === 4 / 3 ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`}
        >
          4:3
        </button>
        <button
          onClick={() => setAspectRatio(16 / 9)}
          className={`px-4 py-2 rounded-full text-white ${aspectRatio === 16 / 9 ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`}
        >
          16:9
        </button>
        <button
          onClick={() => setAspectRatio(1 / 2)}
          className={`px-4 py-2 rounded-full text-white ${aspectRatio === 1 / 2 ? 'bg-indigo-600' : 'bg-indigo-400 hover:bg-indigo-500'}`}
        >
          1:2
        </button>
      </div>

      {/* Rotation Slider */}
      <div className="w-full mt-6">
        <label htmlFor="rotation" className="block text-white text-sm mb-1">Rotation Angle</label>
        <input
          id="rotation"
          type="range"
          min={-45}
          max={45}
          value={angle}
          onChange={handleAngleChange}
          className="w-full"
        />
        <div className="text-center text-white text-sm mt-1">Angle: {angle}°</div>
      </div>

      {/* Mirror Buttons */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => setIsMirrored(!isMirrored)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {isMirrored ? 'Unmirror Image' : 'Mirror Image'}
        </button>

        <button
          onClick={() => setIsVerticallyMirrored(!isVerticallyMirrored)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {isVerticallyMirrored ? 'Unmirror Vertically' : 'Mirror Vertically'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-6 mt-8 w-full">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition"
        >
          Reset
        </button>
        <button
          onClick={handleCrop}
          className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          Crop
        </button>
      </div>
    </div>
  );
};

export default RotatingImage;