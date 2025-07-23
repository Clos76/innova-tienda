import ContributorCard from "./contributors";
import { Link } from "react-router-dom";

import Luis from "../assets/equipoInnovaModa/Luis-Avilés_equipo.jpg"
import Carolina from "../assets/equipoInnovaModa/Carolina_Isla_equipo.jpg"
import Alex from "../assets/equipoInnovaModa/Alex-Lara_equipo.jpg"
import Erick from "../assets/equipoInnovaModa/Erick-Puga_equipo.jpg"
import Alejandro from "../assets/equipoInnovaModa/Alejandro-Nájera.jpg"
import Antonio from "../assets/equipoInnovaModa/Antonio-Ruiz_equipo.jpg"
import Diana from "../assets/equipoInnovaModa/Diana-Márquez_equipo.jpg"
import Vanessa from "../assets/equipoInnovaModa/Vanessa-Bañuelos.jpg"
import Jair from "../assets/equipoInnovaModa/Jair-Castro_equipo.jpg"
import Vianney from "../assets/equipoInnovaModa/Vianney-Landa_equipo.jpg"






const contributors = [
    { name: "Luis Avilés", role: "Coordinador de diseñadores", image: Luis, link:"src/assets/equipoInnovaModa/Luis-Avilés_equipo.jpg"},
    { name: "Carolina Isla", role: "Coordinador de diseñadores", image: Carolina, link:"src/assets/equipoInnovaModa/Carolina_Isla_equipo.jpg"},
    { name: "Alex Lara ", role: "Coordinador de moda y cine", image: Alex, link:"src/assets/equipoInnovaModa/Alex-Lara_equipo.jpg" },
    { name:"Erick Puga", role:"Coordinador de fotografía", image: Erick, link:"src/assets/equipoInnovaModa/Erick-Puga_equipo.jpg" },
    { name: "Alejandro Nájera", role: "Coordinador de Video", image: Alejandro, link:"src/equipoInnovaModa/assets/Alejandro-Nájera.jpg" },
    { name: "Antonio Ruiz ", role: "Fotografía Editorial", image: Antonio, link:"src/assets/equipoInnovaModa/Antonio-Ruiz_equipo.jpg" },
    { name: "Diana Márquez", role: "Fotografía Editorial", image: Diana, link:"src/assets/equipoInnovaModa/Diana-Márquez_equipo.jpg" },
    { name: "Vanessa Bañuelos ", role: "Directora Innovamoda", image: Vanessa, link:"src/assets/equipoInnovaModa/Vanessa-Bañuelos.jpg" },
    { name: "Jair Castro", role: "Director Creativo", image: Jair, link:"src/assets/equipoInnovaModa/Jair-Castro_equipo.jpg" },
    { name: "Vianney Landa", role: "Coordinadora Operativa", image: Vianney, link:"src/assets/equipoInnovaModa/Vianney-Landa_equipo.jpg"},
]

export default function TeamPage() {
    return (
        < ContributorCard
            title="Conoce a Nuestro Equipo de Diseño"
            contributors={contributors}

        />
    )
}