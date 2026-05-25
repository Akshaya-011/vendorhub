import React from 'react';

export default function CheckoutModal({
  cartTotal = 0
}) {

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const handlePayment = () => {

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: cartTotal * 100,

      currency: 'INR',

      name: 'VendorHub',

      description: 'Purchase Payment',

      handler: function (response) {
        alert('Payment Successful');
        console.log(response);
      },

      theme: {
        color: '#000000',
      },

    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">

      <h2 className="text-2xl font-bold mb-5">
        Checkout
      </h2>

      <div className="text-lg font-semibold mb-6">
        Total: {formatINR(cartTotal)}
      </div>

      <button
        onClick={handlePayment}
        className="bg-black text-white px-5 py-3 rounded-xl"
      >
        Pay Now
      </button>

    </div>
  );
}