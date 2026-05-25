import React, { useState } from 'react';

export default function Products() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: 2999,
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 4999,
    },
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const addProduct = () => {

    if (!name || !price) return;

    const newProduct = {
      id: Date.now(),
      name,
      price,
    };

    setProducts([...products, newProduct]);

    setName('');
    setPrice('');
  };

  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Products
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your products here.
        </p>

      </div>

      {/* Add Product */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-6">
          Add Product
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <button
            onClick={addProduct}
            className="bg-black text-white rounded-xl px-5 py-3 font-semibold"
          >
            Add Product
          </button>

        </div>

      </div>

      {/* Product List */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">

        <h2 className="text-2xl font-bold mb-6">
          Product List
        </h2>

        <div className="space-y-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="flex items-center justify-between border rounded-xl p-4"
            >

              <div>

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <p className="text-gray-500">
                  {formatINR(product.price)}
                </p>

              </div>

              <button
                onClick={() =>
                  setProducts(
                    products.filter((p) => p.id !== product.id)
                  )
                }
                className="text-red-500 font-semibold"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}