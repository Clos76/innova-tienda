import PageLayout from "../components/pageLayout" //page layout css for all pages
import Footer from "../components/footer"
import VideoSection from "../components/videoSection"
import MagazineSection from "../components/revista/MagazineColumns"
import MagazineReader from "../components/revista/MagazineReader"

export default function Revista() {

    return (

        <div className="bg-black">
            <h1 className="text-2xl font-semibold mb-4">Nuestra Revista</h1>
            <p>Conoce a nuestra Revista Online...</p>
            

            <VideoSection
               videoUrl="https://www.youtube.com/embed/26i4laXphbw"
            />

            
            <MagazineSection/>

        
            
            

            <Footer/>

        </div>
           
        )
}