import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { axiosPublic } from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const CheckoutForm = () => {
    const [error, setError] = useState();
    const { user } = useAuth();
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [transactionId, setTransactionId] = useState();
    const [clientSecret, setClientSecret] = useState('')

    //-------------------payment gateway--------------->

    // custom hooks-->
    const [cart, refetch] = useCart();
    const axiosSecure = useAxiosSecure()

    //cart এর প্রতিটি ডাটা থেকে price টা নিয়ে reduce কে apply করে যোগ ফল বের করতে হবে । যেখানে reduce এর ভিতরে (পূর্বের মান , বর্তমান মান) কে প্যারামিটার হিসাবে পাঠিয়ে পরে তাদের যোগ করা হয়, 

    // const sum = numbers.reduce((পূর্বের মান , বর্তমান মান)=>{ return পূর্বের মান + বর্তমান মান},  ইনিসিয়াল মান শুন্য )  

    // console.log(sum);


    // এখানে টোটাল যোগ করার জন্য reduce এর ভিতরে পূর্বের মান + বর্তমান এর পাশাপাশি ইনিসিয়াল মান শুন্য রাখতে হবে। এটা reduce দিয়ে যোগ করার রুলস।


    // --------reduce code processing--->
    // const numbers = [1, 2, 3, 4, 5];
    // const sum = numbers.reduce((accumulator, currentValue) => {
    //     return accumulator + currentValue;
    // }, 0);
    // console.log(sum); // Output: 15


    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    // console.log(totalPrice);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);

                    //taken from server---> সার্ভার থেকে clientSecret কে এনে  console.log(res.data.clientSecret); এবং setClientSecret() এর ভিতরে সেট করা হয়ছে।  এবং ঐ সার্ভারের clientSecret এর মান  const [clientSecret, setClientSecret] = useState('') এর clientSecret এর ভিতরে মান হিসাবে সেট হবে। যদিও useState('')  এর clientSecret এর নাম এবং সার্ভারের clientSecret এর নাম একই , কিন্তু সার্ভার থেকে clientSecret এনে  setClientSecret() এর ভিতরে সেট করলে useState('')  এর clientSecret ভিতরে মান সেট হবে।

                    setClientSecret(res.data.clientSecret)

                })
        }
    }, [totalPrice])











    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
            // যদি stripe/elements না পায় তাহলে return  করে দিবে।
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
        }


        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
            // if (!card) or if (card === null)-->যদি card না পায় তাহলেও return  করে দিবে।
        }


        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error)
            setError(error.message);
        } if (paymentMethod) {
            console.log('payment method', paymentMethod)
            setError(' ');
        }


        //taken from ---->Custom payment flow-->
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card, billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                //inspect > console > paymentIntent > id and status : succeeded  -->
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
            }
        }

        // save the payment info in to the database ---->
        const payment = {
            email: user.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            data: new Date(), // have to convert in utc time (use moment js)
            cartIds: cart.map(item => item._id), // _id is present db id--> order লিষ্ট হতে my cart এ add করার id
            menuItemIds: cart.map(item => item.menuId), // order লিষ্ট/ফুড লিস্টে নতুন item add করার সময় db তে যে _id তৈরী হয়েছিলো ঐ _id দিয়ে item কে যখন my cart এ add করা হয় তখন আগের _id কে menuId হিসাবে db তে post করা হয়, এবং নতুন করে অঅরো একটি _id তৈরী হয় ।
            status: 'pending'
        }

        const res = await axiosSecure.post('/payments', payment)
        console.log('Payment Saved', res.data);
        refetch();
        if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thanks For Payment Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/paymentHistory');
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
            />
            <button className="bg-amber-600 my-4 text-white font-semibold px-12 py-1 " type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500 font-bold">{error}</p>
            {
                transactionId && <p>Your Transaction Id: {transactionId}  </p>
            }

        </form>
    );
};

export default CheckoutForm;