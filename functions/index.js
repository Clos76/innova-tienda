//imports for stripe
const functions = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Stripe = require("stripe");
// Firebase secret
const stripeSecret = defineSecret("STRIPE_SECRET_KEY");

//imports for email for resend (forms that are filled)
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { Resend } = require("resend");
const resendApiKey = defineSecret("RESEND_API_KEY");

//email notification for stripe
const stripeWebhookSecret = defineSecret("STRIPE_WEBHOOK_SECRET");

//function to update the db for address in items
const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
// Initialize Firebase Admin SDK (only once)
initializeApp();





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
      const { items, metadata } = req.body; //add metadata for img and sizes(metadata from request)

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

      //payment session to include address
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        metadata: metadata, //added to add imgs and sizes to session save

        // Enable shipping address collection
        shipping_address_collection: {
          allowed_countries: ["MX", "US"], // You can limit to "MX" only
        },

        // Add static shipping cost estimate
        shipping_options: [
          {
            shipping_rate_data: {
              type: "fixed_amount",
              fixed_amount: {
                amount: 15000, // 150.00 MXN in cents
                currency: "mxn",
              },
              display_name: "Envío estándar (3-7 días)",
              delivery_estimate: {
                minimum: { unit: "business_day", value: 3 },
                maximum: { unit: "business_day", value: 7 },
              },
            },
          },
        ],

        // Redirects
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


//email function for version v2 node 20
// form filled alert

exports.sendContactEmail = onDocumentCreated(
  {
    document: "registros/{docId}",
    secrets: [resendApiKey] //v2 requires declared 
  },
  async (event) => {
    const resend = new Resend(resendApiKey.value());

    const data = event.data?.data();

    const name = data?.name || "Sin nombre";
    const email = data?.email || "Sin correo";
    const phone = data?.phone || "Sin teléfono";
    const message = data?.message || "Sin mensaje";
    const participante = data?.participante || "No especificado";
    const subscribe = data?.subscribe ? "Sí" : "No";

    try {
      await resend.emails.send({
        from: "Innova-Tienda <onboarding@resend.dev>",
        to: "rcarlosg2024@gmail.com",
        subject: "Nuevo registro de contacto",
        html: `
        <h2>Nuevo registro de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Tipo de participación:</strong> ${participante}</p>
        <p><strong>Suscripción al boletín:</strong> ${subscribe}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
      });
      console.log("Correo de contacto enviado con éxito");
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  });


// webhook for stripe orders to send emails --when checkout session completed

exports.stripeWebhook = onRequest(
  { secrets: [stripeSecret, resendApiKey, stripeWebhookSecret], cors: true },
  async (req, res) => {
    const stripe = Stripe(stripeSecret.value());
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      //POST sent to see if request legit signed by stripe
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        stripeWebhookSecret.value()
      );
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      //extract metadata
      const cartMetadata = session.metadata || {};
      const cartCount = parseInt(cartMetadata.cart_count || '0');

      // Reconstruct cart items with detailed info
      const detailedCartItems = [];
      for (let i = 0; i < cartCount; i++) {
        const item = {
          id: cartMetadata[`item_${i}_id`] || '',
          talla: cartMetadata[`item_${i}_size`] || '',
          color: cartMetadata[`item_${i}_color`] || '',
          imagen: cartMetadata[`item_${i}_image`] || '',
          // Get price and quantity from line items
          nombre: lineItems.data[i]?.description || '',
          cantidad: lineItems.data[i]?.quantity || 1,
          precio: lineItems.data[i]?.amount_total / 100 || 0,
        };
        detailedCartItems.push(item);
        console.log(`Item ${i}:`, item) //debug
      }

      const resend = new Resend(resendApiKey.value());

      // Enhanced product HTML with sizes and images
      const productosHTML = detailedCartItems
        .map(item => {
          const tallaInfo = item.talla ? ` (Talla: ${item.talla})` : '';
          const colorInfo = item.color ? ` (Color: ${item.color})` : '';
          const imageHTML = item.imagen ? `<br/><img src="${item.imagen}" alt="${item.nombre}" style="width: 100px; height: 100px; object-fit: cover;">` : '';

          return `<li>
            ${item.cantidad} × ${item.nombre}${tallaInfo}${colorInfo} - $${item.precio.toFixed(2)} MXN
            ${imageHTML}
          </li>`;
        })
        .join("");

      // Dirección si existe
      const direccion = session.customer_details?.address;
      const direccionHTML = direccion
        ? `
          <p><strong>Dirección:</strong><br/>
          ${direccion.line1 || ""} ${direccion.line2 || ""}<br/>
          ${direccion.postal_code || ""} ${direccion.city || ""}, ${direccion.state || ""}<br/>
          ${direccion.country || ""}</p>
        `
        : "<p><em>No se proporcionó dirección.</em></p>";

      // Correo común
      const htmlContent = (cliente = "") => `
        <h2>🧾 Confirmación de pedido ${cliente ? "para " + cliente : ""}</h2>
        <p><strong>Nombre:</strong> ${session.customer_details.name}</p>
        <p><strong>Email:</strong> ${session.customer_details.email}</p>
        <p><strong>Monto total:</strong> $${(session.amount_total / 100).toFixed(2)} MXN</p>
        <p><strong>ID de orden:</strong> ${session.id}</p>
        ${direccionHTML}
        <h3>Productos:</h3>
        <ul>${productosHTML}</ul>
      `;

      // 1. Email al administrador
      await resend.emails.send({
        from: "Innova-Tienda <onboarding@resend.dev>",
        to: "rcarlosg2024@gmail.com",
        subject: "🛍️ Nuevo pedido recibido",
        html: htmlContent(),
      });


      //  2. Email al comprador
      if (session.customer_details.email) {
        try {
          await resend.emails.send({
            from: "Innova-Tienda <onboarding@resend.dev>",
            to: session.customer_details.email,
            subject: "🎉 ¡Gracias por tu compra en Innova-Tienda!",
            html: `
        <p>Hola ${session.customer_details.name},</p>
        <p>Gracias por tu compra. Aquí tienes la confirmación de tu pedido:</p>
        ${htmlContent(session.customer_details.name)}
        <p>Nos pondremos en contacto contigo pronto. ¡Gracias por tu preferencia!</p>
      `,
          });

          console.log(`✅ Correo enviado a cliente: ${session.customer_details.email}`);
        } catch (error) {
          console.error("❌ Error al enviar correo al cliente:", error);
        }
      }

      //save data to firestore --address
      const db = getFirestore();
      await db.collection("ordenes").add({
        sessionId: session.id,
        nombre: session.customer_details.name,
        email: session.customer_details.email,
        direccion: session.customer_details.address || null,
        montoTotal: session.amount_total / 100,
        productos: detailedCartItems, //add rest of detailed cart items, metadata
        creado: new Date(),
        
      }).catch(err => {
        console.error("Error al guardar la orden en Firestore:", err);
      });



      return res.send({ received: true });
    }
  }
);