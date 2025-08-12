import React, { useState } from 'react';



const ImageGallery = ({images}) => {

  //state to track which image is currently being displayed as main
  const [mainImageIndex, setMainImageIndex] = useState(0);

  //get current main image
  const mainImage = images[mainImageIndex]; 

  //get other img for thumbnail colum
  const thumbnailImages = images.filter((_, index) => index != mainImageIndex);

  //handle thumb click
  const handleThumbnailClick = (clickedImage) => {
    const newMainIndex = images.findIndex(img => img.src === clickedImage.src);
    setMainImageIndex(newMainIndex);
  };

  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        {/* Main Gallery Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Desktop Layout */}
          <div className="hidden md:flex h-[600px] lg:h-[900px]">
            {/* Main Image - Left Side */}
            <div className="flex-1 relative">
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-lg text-sm">
                {mainImage.alt}
              </div>
            </div>

            {/* Thumbnail Column - Right Side */}
            <div className="w-80 flex flex-col gap-2 p-2">
              {thumbnailImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => handleThumbnailClick(image)}
                  className="flex-1 relative group cursor-pointer hover:opacity-70 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                  {/* Image label */}
                  <div className="absolute bottom-2 left-2 bg-[#CBB15E] bg-opacity-70 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Click para ver
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Main Image */}
            <div className="relative">
              <img
                src={mainImage.src}
                alt={mainImage.alt}
                className="w-full h-84 sm:h-70 object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-clear bg-opacity-70 text-white px-3 py-2 rounded-lg text-sm">
                
              </div>
            </div>

            {/* Mobile Thumbnails - Horizontal Row */}
            <div className="flex p-4 gap-3">
              {thumbnailImages.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => handleThumbnailClick(image)}
                  className="flex-1 relative group cursor-pointer hover:opacity-90 transition-opacity duration-200 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-40 sm:h-24 object-cover"
                  />
                  {/* Mobile hover overlay */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Optional: Image Counter 
        <div className="mt-4 text-center text-gray-600 text-sm">
          Image {mainImageIndex + 1} of {images.length}
        </div>
         */}
      </div>
    </div>
  );

};

export default ImageGallery;