import ContributorCard from "./contributors";
import { Link } from "react-router-dom";

import girl from "../assets/girlShowBanner.jpg"
import eva from "../assets/EvaVilla.jpg"
import group from "../assets/group.png"
import male from "../assets/male.png"
import red from "../assets/red.jpg"
import pants from "../assets/pants.jpg"
import dresses from "../assets/dresses.jpg"
import car from "../assets/car.png"

const contributors = [
    { name: "Girl Girl", role: "Diseñadora de Productos", image: girl, link:"./pages/disenadores"},
    { name: "Eva Grom", role: "Estilista", image: eva, link:"./pages/disenadores"},
    { name: "Group Lest", role: "Party Makeup", image: group, link:"https://innovamoda.org/nosotros/" },
    { name:"Male Hansome", role:"Male Model", image: male, link:"https://innovamoda.org/nosotros/" },
    { name: "Red Riding Hood", role: "Red Little", image: red, link:"https://innovamoda.org/nosotros/" },
    { name: "Panty Marty", role: "Master Design", image: pants, link:"https://innovamoda.org/nosotros/" },
    { name: "Dressing Man", role: "Dress in the West", image: dresses, link:"https://innovamoda.org/nosotros/" },
    { name: "Mustan Sally", role: "Mustangs en el Oeste", image: car, link:"https://innovamoda.org/nosotros/" },
    { name: "Girl Girl", role: "Diseñadora de Productos", image: girl, link:"https://innovamoda.org/nosotros/" },
    { name: "Girl Girl", role: "Diseñadora de Productos", image: girl, link:"./pages/disenadores"},
    { name: "Eva Grom", role: "Estilista", image: eva, link:"./pages/disenadores"},
]

export default function TeamPage() {
    return (
        < ContributorCard
            title="Conoce a Nuestro Equipo de Diseño"
            contributors={contributors}

        />
    )
}