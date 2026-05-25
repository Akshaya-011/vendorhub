import React from 'react';

export default function CartDrawer({
  cartItems = [],
  removeFromCart
}) {

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-5 bg-white h-full shadow-xl overflow-y-auto">

      <h2 className="text-2xl font-bold mb-5">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>

          {cartItems.map((item) => (
            <div
              key={item._id || item.id}
              className="flex justify-between items-center border-b py-4"
            >

              <div>
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p>
                  {formatINR(item.price)}
                </p>

                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <button
                onClick={() =>
                  removeFromCart &&
                  removeFromCart(item._id || item.id)
                }
                className="text-red-500"
              >
                Remove
              </button>

            </div>
          ))}

          <div className="mt-6 text-xl font-bold">
            Total: {formatINR(total)}
          </div>

        </div>
      )}

    </div>
  );
}