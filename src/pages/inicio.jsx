import VideoSection from "../components/videoSection"
import Footer from "../components/footer"
import TeamPage from "../components/contributorCard"
import InicioPic from "../assets/InnovaModaInicio.png"
import ImageTextSection from "../components/flexboxImageText"
import Logo from "../assets/logo1.png"
import ImageTextOnRight from "../components/textOnRight"
import ganador2 from "../assets/ganador2.png"
import ganador from "../assets/ganador1.png"
import ganadores2024 from "../assets/ganadores2024.png"
import reporte from "../assets/reporte.png"
import concurso from "../assets/concurso.png"
import Medios from "../assets/InicioMedios.png"
import Modelos from "../assets/InicioModels.png"
import BannerCarousel from "../components/carrousel"
import talleres from "../assets/InicioTalleres.png"
import Signup from "../components/signup"
import ImageSection from "../components/ImageSection"
import assistentes from "../assets/eventos/assistentes.png"
import stats from "../assets/eventos/stats.png"
import nov from "../assets/eventos/Nov.png"

//images for carousel
const images = [
    { src: talleres, alt: "Banner principal" },
    { src: reporte, alt: "reporte" },
    { src: Medios, alt: "Medios" },
    { src: Modelos, alt: "Marcas" }
]

  //array of all images for ImageSection at bottom
  const images3 = [
    { src: assistentes, alt: "Assistentes - Participantes de Evento" },
    { src: stats, alt: "Statisticas de Alcanse" },
    { src: nov, alt: "Alcanse Mundial" }

  ];


export default function Inicio() {

    return (

        <div>

            {/**Banner Carousel using Swiper */}
            <div className="w-screen overflow-hidden"> {/* Optional: to stretch the carousel to screen edges */}


                <BannerCarousel images={images} />
            </div>


            <ImageTextOnRight

                imageSrc={ganador2}
                imageAlt="Dresses"
                title1="InnovaModa"
                titleClassName="text-center"
                text1="Somos una plataforma encargada de promover y desarrollar el talento de la industria de la moda en Baja California, representado a través de sus distintas disciplinas mediante una plataforma profesional que proyecte al estado como un referente en este rubro. InnovaModa, nace en el año 2012 del movimiento Tijuana Innovadora A.C como respuesta a la necesidad de crear
oportunidades para los jóvenes creativos de la industria"

            />

            <TeamPage />

            <ImageTextSection

                imageSrc={reporte}
                imageAlt="Pink "
                title1="Concepto"
                titleClassName="text-center"
                text1="Durante mucho tiempo se ha minimizado la importancia que tiene Tijuana y Baja California en general con el interior del país, resaltando únicamente la delincuencia, migración y la “falta de identidad” que tenemos, dirigiéndose a la moda se dice que en nuestra zona, no hay un estilo definido. 
                Como respuesta a esta problemática, es tomar una postura de orgullo y apropiación de la cultura que hay en el estado, con ello resaltar los diferentes estilos de cada diseñador."
                title2="Mision"
                text2="Ser una plataforma dedicada a promover y desarrollar oportunidades para los jóvenes dedicados a la industria de la moda en México"
                title3="Vision"
                text3="Posicionar a Tijuana como un referente de la moda en México"

            />

            <ImageTextOnRight

                imageSrc={concurso}
                imageAlt="Pink "
                title1="Objetivo Casting de Diseñadores"
                titleClassName="text-center"
                text1="Plataforma Tijuanense dedicada a desarrollar y promover al nuevo talento de la industria de la moda creando un espacio donde pueden demostrar su creatividad"
                title2="Objetivo Encuentro"
                text2="Espacio que reúne a los diseñadores ganadores de nuestro concurso y a diseñadores internacionales en una misma pasarela, complementado con conferencias magistrales donde expertos de la industria de la moda abordan distintas temáticas conforme a las tendencias del momento"
            />

           
           <ImageSection images={images3}/>


            <Signup />



            <Footer />

            

        </div>

    )
}


//  <VideoSection
//                 videoUrl="https://www.youtube.com/embed/26i4laXphbw"
//             />