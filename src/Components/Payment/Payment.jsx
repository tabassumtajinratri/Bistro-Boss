import React from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFrom from '../CheckOutFrom/CheckOutFrom';

const Payment = () => {
    const stripPromise = loadStripe(import.meta.env.VITE_PAYMENTgATEwAY)
    return (
        <div>
            <SectionTitle heading='Payment Please. Enjoy the food' subheading='Please pay to eat
            '></SectionTitle>
            <div>
                <Elements stripe={stripPromise}>

                    <CheckOutFrom></CheckOutFrom>


                </Elements>

            </div>
        </div>
    );
};

export default Payment;