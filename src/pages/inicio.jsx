import VideoSection from "../components/videoSection"
import Footer from "../components/footer"
import TeamPage from "../components/contributorCard"
import InicioPic from "../assets/InicioPic.png"
import ImageTextSection from "../components/flexboxImageText"
import Logo from "../assets/logo1.png"
import ImageTextOnRight from "../components/textOnRight"
import april from "../assets/april.png"



export default function Inicio() {

    return (

        <div>
            <img className="w-full h-[620px] object-cover " src={InicioPic} alt="Inicio" />

            <ImageTextSection

                imageSrc={Logo}
                imageAlt="Pink "
                title1="InnovaModa"
                titleClassName="text-center"
                text1="Somos una plataforma encargada de promover y desarrollar el talento de
la industria de la moda en Baja California, representado a través de sus
distintas disciplinas mediante una plataforma profesional que proyecte al
estado como un referente en este rubro. InnovaModa, nace en el año 2012 del
movimiento Tijuana Innovadora A.C como respuesta a la necesidad de crear
oportunidades para los jóvenes creativos de la industria"

            />

             <TeamPage />

            <ImageTextOnRight

                imageSrc={april}
                imageAlt="Dresses"
                title1="Misión"
                titleClassName="text-center"
                text1="Ser una plataforma dedicada a promover y desarrollar oportunidades para los jóvenes dedicados a la industria de la moda en México"
                title2="Visión"
                text2="Posicionar a Tijuana como un referente de la moda en México"

            />













           
            <Footer />

        </div>







    )
}


//  <VideoSection
//                 videoUrl="https://www.youtube.com/embed/26i4laXphbw"
//             />