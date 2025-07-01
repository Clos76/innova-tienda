import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/cartContext";

// Importa Firestore
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getApp } from "firebase/app";

function SuccessPage() {
  const location = useLocation();
  const { cart, dispatch } = useCart();
  const [sessionId, setSessionId] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [error, setError] = useState(null);

  // Inicializar Firestore
  const app = getApp();
  const db = getFirestore(app);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const session = query.get("session_id");
    setSessionId(session);

    if (session && cart.items.length > 0) {
      setSavingOrder(true);
      addDoc(collection(db, "ordenes"), {
        sessionId: session,
        items: cart.items,
        createdAt: serverTimestamp(),
      })
        .then(() => {
          // Limpiar carrito después de guardar
          dispatch({ type: "CLEAR_CART" });
          setSavingOrder(false);
        })
        .catch((err) => {
          console.error("Error guardando orden:", err);
          setError("No se pudo guardar la orden. Intenta más tarde.");
          setSavingOrder(false);
        });
    } else {
      // En caso no haya sesión o items
      dispatch({ type: "CLEAR_CART" });
    }
  }, [location, cart.items, db, dispatch]);

  if (!sessionId) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-500">Sesión inválida</h1>
        <p className="mt-4">No pudimos verificar tu orden.</p>
        <a
          href="/"
          className="mt-6 inline-block bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Volver a la tienda
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold text-green-600">¡Gracias por tu compra! 🎉</h1>
      {savingOrder ? (
        <p className="mt-4">Guardando tu orden...</p>
      ) : error ? (
        <p className="mt-4 text-red-600">{error}</p>
      ) : (
        <>
          <p className="mt-4">Tu orden fue procesada exitosamente.</p>
          <p className="mt-2 text-sm text-gray-500">ID de sesión: {sessionId}</p>
        </>
      )}
      <a
        href="/"
        className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver a la tienda
      </a>
    </div>
  );
}

export default SuccessPage;
