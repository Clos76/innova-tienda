import ContributorCard from "./contributors";
import { Link } from "react-router-dom";

import Luis from "../assets/Luis-Avilés_equipo.jpg"
import Carolina from "../assets/Carolina_Isla_equipo.jpg"
import Alex from "../assets/Alex-Lara_equipo.jpg"
import Erick from "../assets/Erick-Puga_equipo.jpg"
import Alejandro from "../assets/Alejandro-Nájera.jpg"
import Antonio from "../assets/Antonio-Ruiz_equipo.jpg"
import Diana from "../assets/Diana-Márquez_equipo.jpg"
import Vanessa from "../assets/Vanessa-Bañuelos.jpg"
import Jair from "../assets/Jair-Castro_equipo.jpg"
import Vianney from "../assets/Vianney-Landa_equipo.jpg"






const contributors = [
    { name: "Luis Avilés", role: "Coordinador de diseñadores", image: Luis, link:"src/assets/Luis-Avilés_equipo.jpg"},
    { name: "Carolina Isla", role: "Coordinador de diseñadores", image: Carolina, link:"src/assets/Carolina_Isla_equipo.jpg"},
    { name: "Alex Lara ", role: "Coordinador de moda y cine", image: Alex, link:"src/assets/Alex-Lara_equipo.jpg" },
    { name:"Erick Puga", role:"Coordinador de fotografía", image: Erick, link:"src/assets/Erick-Puga_equipo.jpg" },
    { name: "Alejandro Nájera", role: "Coordinador de Video", image: Alejandro, link:"src/assets/Alejandro-Nájera.jpg" },
    { name: "Antonio Ruiz ", role: "Fotografía Editorial", image: Antonio, link:"src/assets/Antonio-Ruiz_equipo.jpg" },
    { name: "Diana Márquez", role: "Fotografía Editorial", image: Diana, link:"src/assets/Diana-Márquez_equipo.jpg" },
    { name: "Vanessa Bañuelos ", role: "Directora Innovamoda", image: Vanessa, link:"src/assets/Vanessa-Bañuelos.jpg" },
    { name: "Jair Castro", role: "Director Creativo", image: Jair, link:"src/assets/Jair-Castro_equipo.jpg" },
    { name: "Vianney Landa", role: "Coordinadora Operativa", image: Vianney, link:"src/assets/Vianney-Landa_equipo.jpg"},
]

export default function TeamPage() {
    return (
        < ContributorCard
            title="Conoce a Nuestro Equipo de Diseño"
            contributors={contributors}

        />
    )
}