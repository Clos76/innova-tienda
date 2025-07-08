import Footer from "../components/footer"
import bannerImage from "../assets/bannerInnovaModa.jpg"
import carImage from "../assets/pants.jpg"
import suits from "../assets/suitBanner.jpg"

export default function Terminos() {
    return (
        <div className="w-full">
            {/**Mini banner ontop  */}
                <div className="w-full mb-6 rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-3">
                    <img src={carImage} alt="Car image" className="w-full h-30 object-cover " />
                    <img src={bannerImage} alt="banner Image" className="w-full h-30 object-cover " />
                    <img src={suits} alt="Car image" className="w-full h-30 object-cover " />
                </div>
            <div className="max-w-4xl mx-auto p-6">
                
                <h1 className="text-3xl font-playfair font-semibold mb-4 text-center">Terminos y Condiciones</h1>
                <p className="text-gray-700 mb-4">
                    Innova Shop, tienda en línea oficial de Tijuana Innovamoda, subplataforma de Tijuana Innovadora, respeta la privacidad de nuestros usuarios y clientes. Por ello, hemos establecido las políticas que se describen a continuación para asegurar que su información personal sea tratada de manera ética, segura y responsable.

                    Nuestra política de privacidad explica qué tipo de información podemos recopilar cuando visitas nuestro sitio, cómo la usamos y bajo qué circunstancias podría compartirse con terceros. Al utilizar nuestro sitio, aceptas las prácticas descritas en esta política.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong >🔒 Protección de Información Personal <br /></strong>
                    Innova Shop se compromete a proteger la información personal recopilada a través de sus servicios en línea. Invitamos a los usuarios a leer detenidamente esta política para comprender cómo se manejan sus datos.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>📄 Tipo de Información Recopilada <br /></strong>
                    Durante tu visita y/o compra en innovashop.mx, podríamos solicitar la siguiente información:

                    Nombre(s) y apellidos

                    Correo electrónico

                    Dirección física

                    Número telefónico

                    Información fiscal para facturación

                    Estos datos nos permiten contactarte en caso de ser necesario para completar una transacción, resolver dudas o enviarte actualizaciones relacionadas con tu pedido.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🛍️ Uso de la Información</strong><br />
                    La información proporcionada será utilizada para:

                    Confirmar y procesar pedidos

                    Contactarte para temas de servicio al cliente o seguimiento de compras

                    Enviar comunicaciones promocionales (si aceptaste recibirlas)

                    Personalizar tu experiencia de navegación y compra
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🔐 Seguridad de la Información</strong><br />
                    Los datos personales están protegidos por servidores seguros con protocolo SSL (Secure Socket Layer), lo cual garantiza que la información se transmite encriptada. Puedes confirmar que estás navegando en un sitio seguro si ves el candado 🔒 en la barra de direcciones y la URL comienza con https://.

                    Aunque usamos medidas avanzadas de seguridad, ningún sistema en línea es 100% infalible. Una vez que recibimos tu información, haremos todo lo posible por mantenerla segura.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🤝 Confidencialidad</strong><br />
                    Innova Shop no venderá, cederá, alquilará ni compartirá tu información personal con terceros sin tu consentimiento, salvo en los siguientes casos:

                    Por orden legal o judicial

                    Para prevenir fraudes o abusos del sistema

                    Cuando sea necesario para completar un proceso solicitado por el propio usuario
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>👨‍👩‍👧 Protección de Menores</strong><br />
                    La protección de menores es prioritaria. En caso de requerir servicios para personas menores de edad, solicitaremos la menor cantidad posible de datos. Recomendamos a padres y tutores supervisar la actividad en línea de los menores y aprobar cualquier envío de información personal.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong> 🛠️ Modificaciones a esta Política</strong><br />
                    Innova Shop se reserva el derecho de modificar esta política en cualquier momento para adaptarse a cambios legales, tecnológicos o de operación. Recomendamos revisar periódicamente este documento para estar informado sobre cualquier actualización.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>✅ Aceptación de Términos</strong><br />
                    Al utilizar los servicios de Innova Shop, aceptas que has leído, comprendido y estás de acuerdo con esta política de privacidad. Si no estás de acuerdo, te invitamos a no utilizar el sitio.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>⚖️ Legislación y Jurisdicción</strong> <br />
                    Estas condiciones se rigen conforme a las leyes de México. Cualquier controversia será resuelta ante los tribunales competentes de la Ciudad de México (CDMX).
                </p>


            </div>
            <Footer></Footer>
        </div>
    )
}

