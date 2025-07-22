import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Navigation, Autoplay } from "swiper/modules"
import { Link } from "react-router-dom"

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ContributorCard({ title, contributors = [] }) {
    return (
        <section className="w-full py-8 bg-[#647B85] relative">
            <h2 className="text-3xl font-bold text-center text-black mb-6">{title}</h2>

            {/* Nav */}
            <div className="swiper-button-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 text-2xl bg-white p-2 rounded-full shadow hover:bg-gray-200 cursor-pointer">
                <ChevronLeft />
            </div>
            <div className="swiper-button-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 text-2xl bg-white p-2 rounded-full shadow hover:bg-gray-200 cursor-pointer">
                <ChevronRight />
            </div>

            <Swiper

                spaceBetween={20}
                slidesPerView={1}
                modules={[Navigation, Autoplay]}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                autoplay={{ delay: 5000 }}
                breakpoints={{
                    375: { slidesPerView: 1 },
                    425: { slidesPerView: 2 },
                    600: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1040: { slidesPerView: 5 },
                    1440: { slidesPerView: 5 }
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
                                to="#"
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
        <div className="flex flex-col items-start p-6 rounded-md h-[300px] justify-between hover:shadow-2xl  hover:rounded-lg hover:bg-[#D4BDA9] ">
            <div className="w-full flex justify-center ">
                <img
                    src={person.image}
                    alt={person.name}
                    className="h-40 w-40 rounded-full object-cover mb-4"
                />
            </div>
            <div className="text-left flex flex-col flex-grow justify-center items-center w-full pt-5">
                <h4 className="text-md text-black  leading-tight text-center">{person.name}</h4>
                <p className="text-black font-bold pt-5 leading-tight text-center">{person.role}</p>
            </div>
        </div>
    )
}
