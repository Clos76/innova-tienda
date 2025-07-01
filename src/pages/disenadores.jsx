import PageLayout from "../components/pageLayout" //page layout css for all pages
import Footer from "../components/footer"
import FavoriteGallery from "../components/favoriteGallary"
import ImageTextOnRight from "../components/textOnRight"
import ImageTextSection from "../components/flexboxImageText"
import TeamPage from "../components/contributorCard"
import dresses from "../assets/dresses.jpg"
import group from "../assets/group.png"



export default function Diseñadores() {

    return (
        <PageLayout>


            <h1 className="text-2xl font-semibold mb-4"></h1>
            <p></p>
            <TeamPage />

            <FavoriteGallery />

            <ImageTextOnRight

                imageSrc={dresses}
                imageAlt="Dresses"
                title1="Objetivo Casting de Diseñadores"
                text1="Plataforma Tijuanense dedicada a desarrollar y promover al nuevo talento de la industria de la moda creando un espacio donde pueden demostrar su creatividad."
                title2="Objetivo Encuentro"
                text2="Espacio que reúne a los diseñadores ganadores de nuestro concurso y a diseñadores internacionales en una misma pasarela, complementado con conferencias magistrales donde expertos de la industria de la moda abordan distintas temáticas conforme a las tendencias del momento."
                reverse
            />

            <ImageTextSection 
            
            imageSrc={group}
            imageAlt="Grupo"
            title1="Memorias"
            text1="InnovaModa desde sus inicios se ha encargado de ser una plataforma dedicada a promover y desarrollar el talento de la industria de la moda, representado a través de sus distintas disciplinas mediante una plataforma profesional que proyecte a Tijuana como una ciudad referente en este rubro y esta 11va edición no ha sido una"
            title2="Encuentros"
            text2="Contamos con la participación de 33 diseñadores locales y nacionales concursantes, culminando con 6 diseñadores ganadores Cynthia Velazquez, Juan Carlos Ruíz, Gerardo Loyola,Jackelyne Zamora, Sonia Arechiga, Greisi González y Valeria Valdes junto a una mención honorífica que fue Jesderit Mixcoatl, además de la participación de diseñadores estelares Lucha Jimenez, Jehsel Lau, Jeannete Toscano y Luis Aviles que con mucho orgullo, talento y creatividad vistieron a nuestra sede Península en una pasarela sobre el agua, logrando impactar a más de 1000 asistentes, patrocinadores y aliados."
            
            />






            <Footer />
        </PageLayout>
    )
}