import React from 'react';
 import assistentes from "../assets/eventos/assistentes.png"
import stats from "../assets/eventos/stats.png" 
import nov from "../assets/eventos/Nov.png" 

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
          src={assistentes} 
          alt="Impact Statistics Dashboard"
          maxWidth="max-w-7xl" // Custom max width
        />

        <ResponsiveImage 
          src={stats}
          alt="Impact Statistics Dashboard"
          maxWidth="max-w-7xl" // Custom max width
        />

        {/* Different max width example */}
        <ResponsiveImage 
          src={nov}
          alt="Volunteer Activities"
          maxWidth="max-w-7xl" // Smaller max width
        />

        
      </div>
    </div>
  );
};

export default ImageSection;