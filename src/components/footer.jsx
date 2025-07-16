import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full bg-[#023047] text-white text-center py-8 mt-16">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">

                {/* Navigation links */}
                <div className="flex flex-wrap justify-center gap-4 text-xl font-medium">
                    <Link to="/" className="hover:text-blue-400">Inicio</Link>
                    <Link to="/" className="hover:text-blue-400">Innova-Shop</Link>

                    {/* <Link to="/disenadores" className="hover:text-blue-400">Diseñadores</Link>
                    <Link to="/patrocinadores" className="hover:text-blue-400">Patrocinadores</Link> */}
                    <a href="https://innovamoda.org/encuentro/" className="hover:text-blue-400">Eventos</a>
                    <a href="https://innovamoda.org/3d-flip-book/mayo-2025/" className="hover:text-blue-400">Revista Digital</a>

                </div>

                {/**Legal */}
                <div className="flex flex-wrap justify-center gap-4 text-xl font-medium">
                    <Link to="/terminos" className="text-gray-400 hover:underline" >Terminos del Servicio</Link>
                    <Link to="/privacidad" className="text-gray-400 hover:underline">Privacidad</Link>
                    <Link to="/devoluciones" className="text-gray-400 hover:underline">Devoluciones</Link>
                    <Link to="/envios" className="text-gray-400 hover:underline">Envios</Link>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center text-white gap-6 text-2xl">
                    <a href="https://www.facebook.com/profile.php?id=100092431389467&_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com/innovamodamx/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <FaInstagram />
                    </a>
                    <a href="https://x.com/InnovaModa_Mx" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <SiX />
                    </a>
                    <a href="https://www.youtube.com/channel/UCiouhCH8bPNs9XVz0mDqKUQ" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <FaYoutube />
                    </a>
                    <a href="https://mx.pinterest.com/innovamodaoficial/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                        <FaPinterest />
                    </a>
                </div>

                {/* Footer bottom */}
                <div className="text-sm text-gray-400 flex flex-col md:flex-row items-center gap-1 md:gap-2">
                    <span>©</span>
                    <span>Innovamoda</span>
                    <span>Todos los derechos reservados</span>
                    <span>2025</span>
                </div>
            </div>
        </footer>
    );
}
