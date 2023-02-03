const asyncHandler = require('express-async-handler');
const userService = require('../services/user.service');

//Calling Stripe Thrid Party CheckOut Session
const stripe = require('stripe')("sk_test_51HEvaHLlNX7wORuBfcF6maeJ60yhJn3E7EWjKO7nAKKpgSoXo0IMUvVS04zQTbuVbHmcuriGxw8ORX1U7wGICybC00eeGtxOih");

 const checkoutSession = asyncHandler(async (req, res) => {

    const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
      });

      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: prices.data[0].id,
            quantity: 1,
            
          },
           
        ],
        subscription_data:{
            metadata:{
            user_id:req.body.email,
            plan:req.body.lookup_key,
        }
        },
        mode: 'subscription',
        success_url: `http://localhost:3000/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:3000/?canceled=true`,
      });
      console.log(session);
      res.redirect(303, session.url);
});

//Calling Stripe Thrid Party Portal Session

const updatePrices = asyncHandler(async (req, res, _) => {
    console.log(req.body.price_tag);
    const price = await stripe.prices.update(
        req.body.price_tag,
        {lookup_key:"standard"}
      );
    if(!price)
        console.log("failed");
    
    return price
});

 const portalSession = asyncHandler(async (req, res, _) => {

    const { session_id } = req.body;
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
  

    const returnUrl = "http://localhost:3000/";
  
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url: returnUrl,
    });
  
    console.log(portalSession);


    res.redirect(303, portalSession.url);
  
});

// Delete Stripe Subscription 
 const deleteSubscription = asyncHandler(async (req, res, _) => {

    const deletedSubscription = await stripe.subscriptions.del(
        req.body.subscription_id
      );
      res.send(deletedSubscription);
  
});

const webhook = asyncHandler(async (req,res)=>{

    let event = req.body;

    let subscription;
    let status;

    // Handle the event
    try{
        switch (event.type) {
            case 'customer.subscription.trial_will_end':
              subscription = event.data.object;
              status = subscription.status;
              console.log(`Subscription status is ${status}.`);
              break;
            case 'customer.subscription.deleted':
              subscription = event.data.object;
              status = subscription.status;
              console.log(`Subscription status is ${status}.`);
              break;
            case 'customer.subscription.created':
      
              subscription = event.data.object;
      
              status = subscription.status;
              console.log(`Subscription status is ${status}.`);
              break;
            case 'customer.subscription.updated':
              subscription = event.data.object;
              status = subscription.status;
              let data ={
                  user_id:subscription.metadata.user_id,
                  subs:subscription.id,
                  type:subscription.metadata.plan
              }
              userService.addUserSubsription(data)
              console.log(`Subscription status is ${status}.`);
              break;
            default:
              break;
          }
          res.send();
    }catch(err){
      console.log(err);
    }
 
  
})

module.exports = {
    portalSession,
    deleteSubscription,
    checkoutSession,
    updatePrices,
    webhook
}