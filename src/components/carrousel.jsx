import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';



export default function BannerCarousel({images = []}) {
    return (
        <div className="w-full ">
            <Swiper
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }}
                className="h-[250px] sm:h-[350px] md:h-[550px] lg:h-[650px] xl:h-[750px] w-full" //mobile
            >
                //pictures are : Medium 1280x853
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img.src} alt={img.alt || `slide-${index}`} className='w-full h-full object-cover' />

                </SwiperSlide>
                ))}
                
                
            </Swiper>
        </div>
    );
}
