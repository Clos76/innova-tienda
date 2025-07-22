import PageLayout from "../components/pageLayout" //page layout css for all pages
import ImageTextSection from "../components/flexboxImageText";
import dresses from "../assets/dresses.jpg"
import ImageTextOnRight from "../components/textOnRight";
import FavoriteGallery from "../components/favoriteGallary";
import BannerCarousel from "../components/carrousel"
import VideoSection from "../components/videoSection";
import TeamPage from "../components/contributorCard";
import Signup from "../components/signup";
import Footer from "../components/footer.jsx";
import red from "../assets/red.png"
import { Link } from 'react-router-dom';
import Categorias from "../components/categorias.jsx";
import DesignersCarousel from "./disenadores.jsx";

//carousel imgs
import bannerImage from "../assets/bannerInnovaModa.jpg";
import car from "../assets/girlBanner.jpg";
import group from "../assets/guysBanner.jpg";
import girl from "../assets/girlShowBanner.jpg"


//fav section
import feb from "../assets/feb.png";
import april from "../assets/april.png";
import march from "../assets/march.png";

const favoriteImages =[
    {src: feb, alt:"Frebrero"},
    {src: april, alt:"Abril"}, 
    {src: march, alt: "Marzo"},
    {src: group, alt:"Grupo"}
]

const images = [
    {src: bannerImage, alt: "Banner principal"},
    {src:car, alt: "Chica en carro"}, 
    {src: group, alt: "Grupo de modelos"},
    {src: girl, alt: "Pasarela"}
]


export default function Innovamoda() {

    return (


        <PageLayout>


            {/**Image Container */}


            {/**Banner Carousel using Swiper */}
            <div className="w-screen overflow-hidden"> {/* Optional: to stretch the carousel to screen edges */}
            

                <BannerCarousel images={images} />
            </div>




            <DesignersCarousel/>




            <ImageTextOnRight

                imageSrc={dresses}
                imageAlt="Dresses"
                title1="Objetivo Casting de Diseñadores"
                text1="Plataforma Tijuanense dedicada a desarrollar y promover al nuevo talento de la industria de la moda creando un espacio donde pueden demostrar su creatividad."
                title2="Objetivo Encuentro"
                text2="Espacio que reúne a los diseñadores ganadores de nuestro concurso y a diseñadores internacionales en una misma pasarela, complementado con conferencias magistrales donde expertos de la industria de la moda abordan distintas temáticas conforme a las tendencias del momento."

            />

            <FavoriteGallery images={favoriteImages}/>

            <ImageTextSection
                imageSrc={red}
                imageAlt="Pink "
                title1="Acerca de InnovaModa"
                text1="Plataforma que promueve y desarrolla oportunidades para los jóvenes dedicados a la industria de la moda y al mismo tiempo posicionar a Tijuana como un referente de la moda en México"
                title2="Misión"
                text2="Ser una plataforma dedicada a promover y desarrollar oportunidades para los jóvenes dedicados a la industria de la moda en México"
                title3="Visión"
                text3="Posicionar a Tijuana como un referente de la moda en México"

            />


            <VideoSection
                title="Primer Video"
                videoUrl="https://www.youtube.com/embed/rBSCpbOUHx8"
            />
            <TeamPage />

            <Signup />

            <Footer />


        </PageLayout>

    )

}