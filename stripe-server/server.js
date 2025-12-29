// Minimal Stripe Checkout example (replace with your Stripe secret key)
const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const STRIPE_SECRET = process.env.STRIPE_SECRET || 'sk_test_your_secret_key_here';
const stripe = Stripe(STRIPE_SECRET);

app.post('/create-checkout-session', async (req, res) => {
  const { items } = req.body;
  try {
    const line_items = (items || []).map(i => ({
      price_data: {
        currency: 'usd',
        product_data: { name: i.title },
        unit_amount: Math.round((i.price||0) * 1)
      },
      quantity: i.qty || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: req.headers.origin + '/cohee.html?checkout=success',
      cancel_url: req.headers.origin + '/cohee.html?checkout=cancel'
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, ()=> console.log('Stripe server listening on http://localhost:4242'));
