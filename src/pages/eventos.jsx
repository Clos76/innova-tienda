import PageLayout from "../components/pageLayout" //page layout css for all pages
import Footer from "../components/footer"
import VideoSection from "../components/videoSection"
import DesignerProfile from "./perfilDisenador"
import CategoriasDesigner from "../components/categoriasDesigner"
import DesignerProductManager from "../components/ProductoIngresoDesigner"
import DesignerProductSelector from "../components/designerProductSelector"

export default function Eventos() {
    return (
        <PageLayout>


            <DesignerProductSelector/>

       


           



            <h1 className="text-2xl font-semibold mb-4">Nuestros Eventos</h1>
            <p>Conoce nuestros eventos...</p> 
            
            
           

        <Footer />
        </PageLayout>
    )
}

 <VideoSection
               videoUrl="https://www.youtube.com/embed/BAbGLXPUWsM"
            />