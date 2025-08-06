import React from 'react';

const ResponsiveImage = ({ 
  src, 
  alt, 
  className = "",
  maxWidth = "max-w-7xl", // Default to xl, can be overridden
  width= "w-3/4" //make default to 75%
}) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className={`w-full ${maxWidth} px-4 sm:px-6 lg:px-8`}>
        <img 
          src={src} 
          alt={alt}
          className={`${width} h-auto object-contain rounded-lg shadow-sm mx-auto`}
        />
      </div>
    </div>
  );
};

// Demo component showing usage examples
const ImageSection = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto space-y-5">

       <ResponsiveImage 
          src="src/assets/eventos/Assistentes.png" 
          alt="Impact Statistics Dashboard"
          maxWidth="max-w-7xl" // Custom max width
        />

        <ResponsiveImage 
          src="src/assets/eventos/stats.png" 
          alt="Impact Statistics Dashboard"
          maxWidth="max-w-7xl" // Custom max width
        />

        {/* Different max width example */}
        <ResponsiveImage 
          src="src/assets/eventos/Nov.png" 
          alt="Volunteer Activities"
          maxWidth="max-w-7xl" // Smaller max width
        />

        
      </div>
    </div>
  );
};

export default ImageSection;