import bannerImage from "../assets/bannerInnovaModa.jpg"
import carImage from "../assets/pants.jpg"
import suits from "../assets/suitBanner.jpg"
import Footer from "../components/footer"

export default function Privacidad() {
    
    return (
        <div className="w-full">

            {/**Mini banner ontop  */}
                            <div className="w-full mb-6 rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-3">
                                <img src={carImage} alt="Car image" className="w-full h-30 object-cover " />
                                <img src={bannerImage} alt="banner Image" className="w-full h-30 object-cover " />
                                <img src={suits} alt="Car image" className="w-full h-30 object-cover " />
                            </div>
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-playfair font-semibold mb-4 text-center">🛡️ Aviso de Privacidad – Innova Shop</h1>
                <p className="text-gray-700 mb-4">
                    En Innova Shop, tienda oficial de Tijuana Innovamoda, nos comprometemos a que tu experiencia de compra sea clara, confiable y satisfactoria desde el momento en que realizas tu pedido hasta que recibes tu producto.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🚚 Envíos Nacionales (México)</strong><br />
                    Este aviso de privacidad forma parte del uso del sitio web www.innovashop.mx, tienda oficial de Tijuana Innovamoda, subplataforma de Tijuana Innovadora.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>📌 Responsable del tratamiento de datos personales</strong><br />
                    En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, informamos que Innova Shop, con sede en Tijuana, Baja California, es responsable del tratamiento de sus datos personales.

                    Puedes contactarnos en cualquier momento al correo:
                    📩 contacto@innovashop.mx

                    Nos comprometemos a proteger sus datos personales, evitando su daño, pérdida, destrucción, robo, alteración o tratamiento no autorizado.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>📄 Datos personales que recopilamos</strong><br />
                    Los datos que podemos solicitar al usar nuestro sitio incluyen:

                    Nombre completo

                    Dirección de envío y facturación

                    Correo electrónico

                    Número telefónico

                    Información fiscal (en caso de facturación)

                    Información de pago

                    Estos datos serán tratados con los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🍪 Uso de cookies</strong><br />
                    Utilizamos cookies para mejorar su experiencia en nuestro sitio. Estas cookies permiten:

                    Recordar tu sesión o carrito de compra

                    Reducir el tiempo de navegación

                    Personalizar tu experiencia de usuario

                    No utilizamos cookies para recopilar información personal sensible ni con fines publicitarios de terceros. Puedes desactivarlas desde la configuración de tu navegador, aunque algunas funciones del sitio podrían no operar correctamente.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🎯 Uso de la información</strong><br />
                    Utilizamos la información recabada para:

                    Confirmar y procesar tus compras

                    Atender dudas o aclaraciones

                    Informarte sobre productos, cambios o promociones (si aceptaste recibir comunicaciones)

                    Mejorar la experiencia del usuario y el servicio al cliente
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>📧 Límites de uso y divulgación</strong><br />
                    Solo Innova Shop tiene acceso a los datos recopilados. No compartiremos tu información con terceros sin tu consentimiento, salvo:

                    Por requerimiento judicial o legal

                    Para cumplir obligaciones adquiridas contigo

                    En colaboración con proveedores logísticos o de pago bajo estrictos acuerdos de confidencialidad
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🔓 Derechos ARCO</strong><br />
                    Tienes derecho a:

                    Acceder a tus datos

                    Rectificarlos si son incorrectos

                    Cancelarlos si ya no deseas que sean tratados

                    Oponerte a su uso para ciertos fines

                    Puedes ejercer estos derechos escribiendo a:
                    📩 privacidad@innovashop.mx

                    Tu solicitud deberá incluir:

                    Nombre completo y datos de contacto

                    Identificación oficial o poder legal

                    Especificación del derecho ARCO que deseas ejercer

                    Justificación clara de la solicitud

                    Te responderemos en un plazo no mayor a 20 días hábiles.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🔐 Protección y seguridad</strong><br />
                    Los datos bancarios y personales están protegidos mediante protocolo SSL (Secure Socket Layer), garantizando una transmisión segura y cifrada. Verifica que tu navegador muestre el icono de candado 🔒 y la URL comience con https://.

                    Aunque aplicamos medidas de seguridad robustas, ninguna transmisión por Internet es 100% segura. Haremos todo lo posible para mantener protegida tu información una vez recibida.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🔁 Modificaciones al aviso de privacidad</strong><br />
                    Innova Shop se reserva el derecho de realizar modificaciones a este aviso en cualquier momento. Cualquier cambio será publicado en:
                    🌐 www.innovashop.mx, sección Aviso de Privacidad.

                    Te recomendamos revisar periódicamente esta sección para mantenerte informado.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>✅ Aceptación de los términos</strong><br />
                    Al utilizar nuestro sitio, aceptas los términos de este aviso de privacidad. Si no estás de acuerdo, te pedimos no utilizar los servicios de Innova Shop.
                </p>
            </div>

            <Footer></Footer>
        </div>
    )
}