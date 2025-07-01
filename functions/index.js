const functions = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");
const cors = require("cors")({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://tij-innov-e-store.web.app",
    "https://tij-innov-e-store.firebaseapp.com",
    'https://innovamoda-tienda.web.app',
    'https://innovamoda-tienda.firebaseapp.com'
  ],
});

// Firebase secret
const stripeSecret = defineSecret("STRIPE_SECRET_KEY");

// Callable Function (para apps móviles o Firebase SDKs)
exports.createCheckoutSession = onCall({ secrets: [stripeSecret] }, async (request) => {
  try {
    const stripe = Stripe(stripeSecret.value());
    const { items } = request.data;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Items array is required and cannot be empty"
      );
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "mxn",
        product_data: {
          name: item.nombre,
          images: item.imagen ? [item.imagen] : [],
        },
        unit_amount: Math.round(item.precio * 100),
      },
      quantity: item.cantidad,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "https://innovamoda-tienda.web.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://innovamoda-tienda.web.app/cancel",

    });

    return { sessionId: session.id };
  } catch (error) {
    console.error("Error al crear sesión de pago:", error);
    throw new functions.https.HttpsError(
      "internal",
      "No se pudo crear la sesión de pago"
    );
  }
});

// HTTP Function (para uso con fetch)
exports.createCheckoutSessionHTTP = onRequest({ secrets: [stripeSecret] }, (req, res) => {
  return cors(req, res, async () => {
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", req.headers.origin);
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.set("Access-Control-Max-Age", "3600");
      return res.status(204).send("");
    }

    try {
      const stripe = Stripe(stripeSecret.value());
      const { items } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Items array is required and cannot be empty" });
      }

      const lineItems = items.map((item) => ({
        price_data: {
          currency: "mxn",
          product_data: {
            name: item.nombre,
            images: item.imagen ? [item.imagen] : [],
          },
          unit_amount: Math.round(item.precio * 100),
        },
        quantity: item.cantidad,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: "https://innovamoda-tienda.web.app/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "https://innovamoda-tienda.web.app/cancel",
      });

      return res.json({ sessionId: session.id });
    } catch (error) {
      console.error("Detailed error:", error);
      return res.status(500).json({
        error: "No se pudo crear la sesión de pago",
        details: error.message,
      });
    }
  });
});
