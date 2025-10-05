import { useStripe } from '@stripe/react-stripe-js';
import { useElements } from '@stripe/react-stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useCarts from '../Hooks/useCarts';
import useAuth from '../Hooks/useAuth';

const CheckOutFrom = () => {
  const [error, setError] = useState('')
  const [clientSecret, setclientSecret] = useState('')
  const [tranactionId, settranactionId] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const [cart] = useCarts()
    const totalPrice = cart.reduce((total, item)=> total+item.price, 0)

    useEffect(()=>{
       axiosSecure.post('/create-payment-intent', {price: totalPrice})
       .then(res=>{
        console.log(res.data.clientSecret)
        setclientSecret(res.data.clientSecret)
       })

    }, [axiosSecure, totalPrice])


    const handleSubmit = async(event) =>{
        event.preventDefault()

        if (!stripe || !elements) {
 
      return;
    }

    const card = elements.getElement(CardElement)
     if (card === null) {
      return;
    }

    const {error, paymentMethod}= await stripe.createPaymentMethod({
      type: 'card',
       card: card, 
    })

    if(error){
      console.log('payment error', error)
      setError(error.message)
    }
    else{
      console.log('Payment Method', paymentMethod)
      setError('')
    }

    // confrim payment

    const { paymentIntent, error: confrimError }= await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous'

        }
      }
    })

    if(confrimError){
      console.log('Confrim Error')
    }
    else{
      console.log('paymentIntent', paymentIntent)
      if(paymentIntent.status === 'succeeded'){
        console.log('tranaction id', paymentIntent.id)
        settranactionId(paymentIntent.id)

        const payment = {
          email: user.email,
          price: totalPrice,
          tranactionId: paymentIntent.id,
          date: new Date(), //utc time
          cartIds: cart.map(item => item._id),
          menuItemIds: cart.map(item =>item.menuId),
          status: 'send pending'

        }

        const res = await axiosSecure.post('/payments', payment)
        console.log('payment saved', res.data)
        



      }
    }




    }
    return (
      <form onSubmit={handleSubmit}>
        <CardElement

       options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
                
              },
           
              
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
        
        ></CardElement>

        <button type='submit' disabled={!stripe || !clientSecret}>Pay</button>

        <p className='text-red'>{error}</p>
        {
        tranactionId && <p className='text-green-500'>Transaction ID: {tranactionId}</p>
        }

      </form>
    );
};

export default CheckOutFrom;