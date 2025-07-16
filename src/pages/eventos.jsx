import PageLayout from "../components/pageLayout" //page layout css for all pages
import Footer from "../components/footer"
import VideoSection from "../components/videoSection"

export default function Eventos() {
    return (
        <PageLayout>
            <h1 className="text-2xl font-semibold mb-4">Nuestros Eventos</h1>
            <p>Conoce nuestros eventos...</p> 
            
            
            <VideoSection
               videoUrl="https://www.youtube.com/embed/BAbGLXPUWsM"
            />

        <Footer />
        </PageLayout>
    )
}

