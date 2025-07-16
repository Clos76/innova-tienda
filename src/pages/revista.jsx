import PageLayout from "../components/pageLayout" //page layout css for all pages
import Footer from "../components/footer"
import VideoSection from "../components/videoSection"

export default function Revista() {

    return (

        <div>
            <h1 className="text-2xl font-semibold mb-4">Nuestra Revista</h1>
            <p>Conoce a nuestra Revista Online...</p>
            

            <VideoSection
               videoUrl="https://www.youtube.com/embed/26i4laXphbw"
            />

            <Footer/>

        </div>
           
        )
}