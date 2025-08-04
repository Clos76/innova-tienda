import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import ProductCard  from './bestSellerProductCard' //get info for cards from ProductCard



const BestSellerCarrousel = ({ bestSellers, onAddToCart }) => {

    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            loop={true}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
            }}
        >
            {bestSellers.map((product) => (
                <SwiperSlide key={product.id}>
                    <ProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                        className="hover:scale-105 transition-transform duration-200"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default BestSellerCarrousel;

