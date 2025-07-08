import Footer from "../components/footer"
import bannerImage from "../assets/bannerInnovaModa.jpg"
import carImage from "../assets/pants.jpg"
import suits from "../assets/suitBanner.jpg"

export default function Devoluciones() {
    return (
        <div className="w-full">
             {/**Mini banner ontop  */}
                <div className="w-full mb-6 rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-3">
                    <img src={carImage} alt="Car image" className="w-full h-30 object-cover " />
                    <img src={bannerImage} alt="banner Image" className="w-full h-30 object-cover " />
                    <img src={suits} alt="Car image" className="w-full h-30 object-cover " />
                </div>
            <div className="max-w-4xl mx-auto p-6">
               
                <h1 className="text-3xl font-playfair font-semibold mb-4 text-center">Política de Cambios, Devoluciones y Envíos – Innova Shop</h1>
                <p className="text-gray-700 mb-4">
                    <strong>NO HAY REEMBOLSOS EN EFECTIVO. SOLO CAMBIOS O CRÉDITO DE LA TIENDA.</strong>
                    <br /> En Innova Shop, tienda oficial de Tijuana Innovamoda, nos esforzamos por ofrecer productos de calidad y una experiencia confiable para nuestros clientes. Contamos con una política de devolución de 30 días exclusivamente en caso de que el producto presente fallas de fábrica.            </p>
                <p className="text-gray-700 mb-4">
                    <strong>🛍️ Devoluciones</strong><br />
                    Para poder solicitar una devolución, deben cumplirse las siguientes condiciones:

                    El artículo debe estar en las mismas condiciones en que lo recibió: sin uso, con etiquetas originales y en su empaque original.

                    Solo se aceptarán devoluciones por defectos de fabricación.

                    Las devoluciones no aplican a artículos con descuento ni tarjetas de regalo.

                    Para iniciar una solicitud de devolución, escríbenos a:
                    📩 contacto@innovashop.mx
                    (Si aún estás utilizando otro correo, indícalo y lo actualizamos)

                    Una vez aprobada tu solicitud, te enviaremos instrucciones para realizar el envío de regreso a través de la paquetería de tu elección.
                    ⚠️ Los gastos de envío por devolución no están cubiertos por la tienda en este momento. Lamentamos cualquier inconveniente que esto pueda causar.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🔁 Cambios y Créditos</strong><br />
                    Tras recibir e inspeccionar tu devolución, te notificaremos si fue aprobada.

                    Si procede, te enviaremos un cupón con crédito de tienda por el mismo monto para que puedas utilizarlo en futuras compras.

                    No realizamos reembolsos en efectivo ni a tarjetas bancarias.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🔍 Daños y Problemas</strong><br />
                    Por favor, revisa tu pedido en cuanto lo recibas. Si notas que el artículo está dañado, defectuoso o si recibiste un producto incorrecto, contáctanos de inmediato para ayudarte a resolver el problema lo antes posible.

                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🚫 Artículos No Retornables</strong><br />
                    No aceptamos devoluciones de:

                    Productos en oferta

                    Tarjetas de regalo
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>📦 Envíos</strong><br />
                    Envíos gratuitos en México para compras mayores a $1,499.00 MXN

                    Pedidos menores cubrirán un costo de logística de $150.00 MXN

                    Envíos internacionales tendrán un costo variable dependiendo del país de destino
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🕒 Procesamiento y Entrega </strong><br />

                    Las órdenes se procesan en un plazo de 48 horas hábiles

                    Pedidos realizados después de las 12:00 p.m. (hora local), los días viernes o en puentes/vacaciones, serán procesados el siguiente día hábil

                    La entrega se realiza dentro de un máximo de 6 días hábiles, una vez procesado el pedido

                    🔁 En casos excepcionales, el tiempo de entrega puede extenderse hasta 15 días hábiles, debido a retrasos de paquetería externos a Innova Shop.

                </p>
                <p className="text-gray-700 mb-4"><br />
                    Para cualquier duda o consulta, puedes escribirnos a:
                    📩 contacto@innovashop.mx

                    Agradecemos tu confianza y comprensión.
                </p>


            </div>
            <Footer></Footer>
        </div>
    )
}