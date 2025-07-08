import Footer from "../components/footer"
import bannerImage from "../assets/bannerInnovaModa.jpg"
import carImage from "../assets/pants.jpg"
import suits from "../assets/suitBanner.jpg"

export default function Envios() {
    return (
        <div className="w-full">
             {/**Mini banner ontop  */}
                <div className="w-full mb-6 rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-3">
                    <img src={carImage} alt="Car image" className="w-full h-30 object-cover " />
                    <img src={bannerImage} alt="banner Image" className="w-full h-30 object-cover " />
                    <img src={suits} alt="Car image" className="w-full h-30 object-cover " />
                </div>
            {/* Content container with max-width for readability */}
            <div className="max-w-4xl mx-auto p-6">
               

                <h1 className="text-3xl font-playfair font-semibold mb-4 text-center">Politica de Envios</h1>
                <p className="text-gray-700 mb-4">
                    En Innova Shop, tienda oficial de Tijuana Innovamoda, nos comprometemos a que tu experiencia de compra sea clara, confiable y satisfactoria desde el momento en que realizas tu pedido hasta que recibes tu producto.
                </p>
                <p className="text-gray-700 mb-4">
                    <strong>🚚 Envíos Nacionales (México)</strong><br />
                    Envío gratuito en toda la República Mexicana en compras superiores a $1,499.00 MXN.

                    Para compras menores, el cliente deberá cubrir un costo de logística de $150.00 MXN.

                    Las órdenes son procesadas en un tiempo estimado de 48 horas hábiles.

                    Pedidos realizados después de las 12:00 p.m., en viernes o días festivos, serán procesados el siguiente día hábil.

                    La entrega se realiza en un periodo de hasta 6 días hábiles posteriores al procesamiento del pedido.

                    En caso de retrasos por parte de la paquetería, el tiempo de entrega podría extenderse hasta 15 días hábiles.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🌍 Envíos Internacionales</strong><br />
                    Los envíos fuera de México tienen un costo variable, dependiendo del país de destino, peso del paquete y proveedor de mensajería.

                    Antes de finalizar tu compra, podrás ver un estimado del costo de envío internacional.

                    Tiempos de entrega internacionales pueden variar entre 7 a 21 días hábiles, según la región y servicio de paquetería.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>📦 Proceso y Confirmación</strong><br />
                    Recibirás una confirmación por correo electrónico una vez que tu pedido haya sido procesado y esté en camino.
                    Podrás realizar el seguimiento de tu envío a través de la guía o número de rastreo proporcionado.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>🚨 Importante</strong><br />
                    Innova Shop no se hace responsable por retrasos causados por:

                    Condiciones climáticas adversas

                    Festividades nacionales

                    Problemas logísticos con el proveedor de paquetería

                    Asegúrate de proporcionar una dirección completa y correcta. En caso de error en los datos del envío por parte del cliente, los gastos de reenvío correrán por su cuenta.

                    Si el paquete es rechazado o no reclamado, se podrá reenviar una sola vez cubriendo los costos adicionales de envío.
                </p>

                <p className="text-gray-700 mb-4">
                    <strong>❓¿Tienes dudas?</strong><br />
                    Para cualquier consulta sobre el estado de tu envío, puedes escribirnos a:
                    📩 contacto@innovashop.mx

                    Estaremos encantados de ayudarte.
                </p>
            </div>
            
            {/* Footer outside the content container so it spans full width */}
            <Footer />
        </div>
    )
}