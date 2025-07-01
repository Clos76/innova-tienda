import PageLayout from "../components/pageLayout" //page layout css for all pages
import VideoSection from "../components/videoSection"
import Footer from "../components/footer"
import TeamPage from "../components/contributorCard"


export default function Patrocinadores() {

    return (
        <PageLayout>
            

            <VideoSection
                videoUrl="https://www.youtube.com/embed/26i4laXphbw"
            />

            
            

            <TeamPage />
            <Footer />
        </PageLayout>
    )
}