const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async(req,res) =>{
    const {purchase,total_amount,shipping_fee} = req.body;

    const calculateOrderAmount =() =>{
        return total_amount + shipping_fee // aici fac un demo, in mod normal trebuie comunicat cu DB si verificat preturile si totalul deoarece aceste sume si obiecte pot fi usor influentate in front-end
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd',
    });
    console.log(paymentIntent);
    res.json({clientSecret:paymentIntent.client_secret})
}

module.exports = stripeController