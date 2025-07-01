import feb from "../assets/feb.png";
import april from "../assets/april.png";
import march from "../assets/march.png";

export default function FavoriteGallery({title="Nuestros Favoritos", images=[]}) {
  return (
    <section className="w-full bg-black py-6 px-4 sm:px-6 md:px-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">
        {title}
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {images.map((img, index)=> (
          <div key={index} className="w-full md:w-1/3 relative overflow-hidden rounded shadow-lg">
            <img
              src={img.src}
              alt={img.alt || `Image ${index + 1 }`}
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover rounded"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
