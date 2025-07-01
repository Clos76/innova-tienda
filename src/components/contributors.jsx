import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Navigation, Autoplay } from "swiper/modules"
import { Link } from "react-router-dom"

export default function ContributorCard({ title, contributors = [] }) {
    return (
        <section className="w-full py-8 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-black mb-6">{title}</h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    375: { slidesPerView: 1 },
                    425: { slidesPerView: 2 },
                    600: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1040: { slidesPerView: 6 },
                    1440: { slidesPerView: 8 }
                }}
            >
                {contributors.map((person, index) => (
                    <SwiperSlide key={index}>
                        {person.link?.startsWith("http") ? (
                            <a
                                href={person.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block transform transition duration-300 hover:scale-105"
                            >
                                <CardContent person={person} />
                            </a>
                        ) : (
                            <Link
                                to={person.link}
                                className="block transform transition duration-300 hover:scale-105"
                            >
                                <CardContent person={person} />
                            </Link>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

// Extracted card content for reuse
function CardContent({ person }) {
    return (
        <div className="flex flex-col items-start p-6 rounded h-[300px] justify-between hover:shadow-lg hover:bg-[#fefae0]">
            <div className="w-full flex justify-center">
                <img
                    src={person.image}
                    alt={person.name}
                    className="h-24 w-24 rounded-full object-cover mb-4"
                />
            </div>
            <div className="text-left flex flex-col flex-grow justify-center items-center w-full pt-5">
                <h4 className="text-md text-black font-semibold leading-tight">{person.name}</h4>
                <p className="text-gray-500 pt-5 leading-tight">{person.role}</p>
            </div>
        </div>
    )
}
