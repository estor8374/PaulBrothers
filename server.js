// Example Node.js backend verification
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: 'rzp_live_SBFRjqhpikBmjf',
  key_secret: 'lmcFoqSifoBUfTiM9sqbHS6Y'
});

app.post('/verify-payment', (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256', 'lmcFoqSifoBUfTiM9sqbHS6Y')
    .update(body.toString())
    .digest('hex');
    
  if (expectedSignature === razorpay_signature) {
    // Payment verified - grant access
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});
