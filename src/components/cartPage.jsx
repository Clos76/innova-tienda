import { useCart } from "../context/cartContext";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";
import TeamPage from "./contributorCard";
import { functions } from "../firebase"
import { httpsCallable } from "firebase/functions";
import paymentMethods from "../assets/paymentMethods.png"

// Firebase
// Stripe
import { loadStripe } from '@stripe/stripe-js';

function CartPage() {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  //checkout emulator
const createCheckoutSession = httpsCallable(functions, "createCheckoutSession")


  const handleCheckout = async () => {
    try {
      // Protección: si cart o cart.items no está listo
      const items = Array.isArray(cart?.items) ? cart.items : [];
      
      if (items.length === 0) {
        alert("Tu carrito está vacío");
        return;
      }

      console.log("Sending items to checkout:", items);
      
      // Use direct HTTP request instead of callable function
      const response = await fetch('https://us-central1-innovamoda-tienda.cloudfunctions.net/createCheckoutSessionHTTP', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const sessionId = data.sessionId;
      
      if (!sessionId) {
        throw new Error("No session ID received from server");
      }

      console.log("Received session ID:", sessionId);

      // Load Stripe and redirect to checkout
      const stripeJs = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      if (!stripeJs) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripeJs.redirectToCheckout({ sessionId });
      
      if (error) {
        console.error("Stripe redirect error:", error);
        alert("Error al redirigir al checkout: " + error.message);
      }
      
    } catch (error) {
      console.error("Error en checkout:", error);
      alert("Error al procesar el checkout. Por favor intenta de nuevo.");
    }
  };

  // Protección: si cart o cart.items no está listo
  const items = Array.isArray(cart?.items) ? cart.items : [];

  const handleRemoveItem = (item) => {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  };

  const handleIncrease = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, cantidad: 1 },
    });
  };

  const handleDecrease = (item) => {
    if (item.cantidad > 1) {
      dispatch({
        type: "ADD_ITEM",
        payload: { ...item, cantidad: -1 },
      });
    } else {
      handleRemoveItem(item);
    }
  };

  const subTotal = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const totalItems = items.reduce((acc, item) => acc + item.cantidad, 0);

  const tax = subTotal * 0.16;
  const totalWithTax = subTotal + tax;




  return (
    <div className="p-6 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>

      {items.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl mb-4">🛒 Tu carrito está vacío.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Columna izquierda: artículos */}
            <div className="md:col-span-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="mb-4 p-4 rounded border bg-gray-100 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-auto md:w-40 h-auto object-cover rounded"
                  />

                  <div className="flex flex-col gap-2 flex-grow">
                    <p className="font-semibold text-lg">{item.nombre}</p>
                    {item.talla && <p>Talla: {item.talla}</p>}
                  </div>

                  <div className="flex flex-col gap-2 w-full md:flex-row md:justify-between md:items-start">
                    <div className="flex items-center gap-2">
                      <span>Cantidad:</span>
                      <button
                        onClick={() => handleDecrease(item)}
                        className="px-2 py-1 bg-gray-200 hover:bg-red-300 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => handleIncrease(item)}
                        className="px-2 py-1 bg-gray-200 hover:bg-green-200 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <p>Precio: ${item.precio}</p>

                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Columna derecha: resumen del pedido */}
            <div className="w-full lg:w-80 flex-shrink-0 border rounded p-4 bg-gray-50 shadow-md self-start">
              <h3 className="text-lg font-bold mb-4">Resumen del pedido</h3>

              <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Envio:</span>
                  <span>-</span>
                </div>

                <div className="flex justify-between">
                  <span>IVA (16%): </span>
                  <span>${tax.toFixed(2)}</span>
                  
                </div>

                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span>${totalWithTax.toFixed(2)}</span>
                </div>
                <p className="text-green-600">
                  Ahoraste en total!
                </p>
                <button 
                  onClick={handleCheckout} 
                  className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  disabled={items.length === 0}
                >
                  Completar Pedido
                </button>

                <p className="text-center mt-2 text-xs text-gray-500">
                  O paga a plazos con Apple Pay, Klarna, Paypal...
                </p>

                <div className="mt-6 border-t pt-4 text-sm text-gray-700 space-y-2">
                  <p><strong>Devoluciones gratuitas</strong> (excepto en productos personalizados)</p>
                  <p>Usamos cajas recicladas certificadas</p>
                  <p>Opciones de pago:</p>
                  <img
                    src={paymentMethods}
                    alt="Métodos de pago"
                    className="inline w-full mt-2 centered border-t py-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* return home button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaArrowLeft className="inline-block mr-2" />
          Volver a la tienda
        </button>
      </div>
      
      <div className="mt-10">
        <TeamPage />
      </div>

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default CartPage;