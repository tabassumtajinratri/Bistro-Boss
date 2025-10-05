// import { useStripe } from '@stripe/react-stripe-js';
// import { useElements } from '@stripe/react-stripe-js';
// import { CardElement } from '@stripe/react-stripe-js';
// import React, { useEffect, useState } from 'react';
// import useAxiosSecure from '../Hooks/useAxiosSecure';
// import useCarts from '../Hooks/useCarts';
// import useAuth from '../Hooks/useAuth';

// const CheckOutFrom = () => {
//   const [error, setError] = useState('')
//   const [clientSecret, setclientSecret] = useState('')
//   const [tranactionId, settranactionId] = useState('')
//     const stripe = useStripe()
//     const elements = useElements()
//     const axiosSecure = useAxiosSecure()
//     const {user} = useAuth()
//     const [cart] = useCarts()
//     const totalPrice = cart.reduce((total, item)=> total+item.price, 0)

//     useEffect(()=>{
//        axiosSecure.post('/create-payment-intent', {price: totalPrice})
//        .then(res=>{
//         console.log(res.data.clientSecret)
//         setclientSecret(res.data.clientSecret)
//        })

//     }, [axiosSecure, totalPrice])


//     const handleSubmit = async(event) =>{
//         event.preventDefault()

//         if (!stripe || !elements) {
 
//       return;
//     }

//     const card = elements.getElement(CardElement)
//      if (card === null) {
//       return;
//     }

//     const {error, paymentMethod}= await stripe.createPaymentMethod({
//       type: 'card',
//        card: card, 
//     })

//     if(error){
//       console.log('payment error', error)
//       setError(error.message)
//     }
//     else{
//       console.log('Payment Method', paymentMethod)
//       setError('')
//     }

//     // confrim payment

//     const { paymentIntent, error: confrimError }= await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: card,
//         billing_details: {
//           email: user?.email || 'anonymous',
//           name: user?.displayName || 'anonymous'

//         }
//       }
//     })

//     if(confrimError){
//       console.log('Confrim Error')
//     }
//     else{
//       console.log('paymentIntent', paymentIntent)
//       if(paymentIntent.status === 'succeeded'){
//         console.log('tranaction id', paymentIntent.id)
//         settranactionId(paymentIntent.id)

//         const payment = {
//           email: user.email,
//           price: totalPrice,
//           tranactionId: paymentIntent.id,
//           date: new Date(), //utc time
//           cartIds: cart.map(item => item._id),
//           menuItemIds: cart.map(item =>item.menuId),
//           status: 'send pending'

//         }

//         const res = await axiosSecure.post('/payments', payment)
//         console.log('payment saved', res.data)
        



//       }
//     }




//     }
//     return (
//       <form onSubmit={handleSubmit}>
//         <CardElement

//        options={{
//           style: {
//             base: {
//               fontSize: '16px',
//               color: '#424770',
//               '::placeholder': {
//                 color: '#aab7c4',
                
//               },
           
              
//             },
//             invalid: {
//               color: '#9e2146',
//             },
//           },
//         }}
        
//         ></CardElement>

//         <button type='submit' disabled={!stripe || !clientSecret}>Pay</button>

//         <p className='text-red'>{error}</p>
//         {
//         tranactionId && <p className='text-green-500'>Transaction ID: {tranactionId}</p>
//         }

//       </form>
//     );
// };

// export default CheckOutFrom;



import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useCarts from '../Hooks/useCarts';
import useAuth from '../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cart, refetch] = useCarts();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + Number(item.price || 0), 0);

  // Create PaymentIntent when totalPrice changes
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          console.log('Client Secret:', res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch(err => {
          console.error('Error creating payment intent:', err);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Create payment method
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        email: user?.email || 'anonymous',
        name: user?.displayName || 'anonymous',
      },
    });

    if (createError) {
      console.error('Payment Method Error:', createError);
      setError(createError.message);
      return;
    }
    console.log('Payment Method:', paymentMethod);

    // Confirm card payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          email: user?.email || 'anonymous',
          name: user?.displayName || 'anonymous',
        },
      },
    });

    if (confirmError) {
      console.error('Confirm Payment Error:', confirmError);
      setError(confirmError.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('PaymentIntent:', paymentIntent);
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map(item => item._id),
        menuItemIds: cart.map(item => item.menuId),
        status: 'pending',
      };

      try {
        const res = await axiosSecure.post('/payments', payment);
        console.log('Payment saved:', res.data);
        refetch();
        if(res.data?.paymentResult.insertedId){
          Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your Payment has been successfull",
  showConfirmButton: false,
  timer: 1500
});
navigate('/dashboard/paymentHistory')

        }
      } catch (err) {
        console.error('Error saving payment:', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Pay ${totalPrice.toFixed(2)}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {transactionId && <p className="text-green-500">Transaction ID: {transactionId}</p>}
    </form>
  );
};

export default CheckOutForm;
