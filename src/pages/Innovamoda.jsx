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

            


        

            <FavoriteGallery images={favoriteImages}/>

       


             
           

            <Signup />

            <Footer />


        </PageLayout>

    )

}