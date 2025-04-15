import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import stripe from "stripe";

// Place Order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { items, address } = req.body;

    if (!address || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Address and items are required",
      });
    }

    // Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge(2%)
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};

// Place Order COD: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId } = req.userId;
    const { items, address } = req.body;
    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Address and items are required",
      });
    }

    let productData = [];

    // Calculate Amount Using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    // Add Tax Charge(2%)
    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // Stripe Generate Initialize
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    // create line items for stripe
    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create session
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        order_id: order._id.toString(),
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      // message: "Order placed successfully",
      url: session.url,
    });
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};

// Stripe Webhooks to Verify Payments Action: /stripe
export const stripeWebhooks = async (req, res) => {
  // Stripe Gateway Initialize
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }

  // Handle the Event
  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { order_id, userId } = session.data[0].metadata;
      // Mark Payment As Paid
      await Order.findByIdAndUpdate(order_id, { isPaid: true });
      // Clear user cart
      await User.findByIdAndUpdate(userId, { cartItems: {} });
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      // Getting Session Metadata
      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { order_id } = session.data[0].metadata;
      await Order.findByIdAndDelete(order_id);
      break;
    }

    default:
      console.error(`Unhandled event type: ${event.type}`);
      break;
  }
  res.json({ received: true });
};

// Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      // message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};

// Get All Orders ( for seller / admin ): /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      // message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    process.env.NODE_ENV === "development" && console.log(error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : error.message,
    });
  }
};
