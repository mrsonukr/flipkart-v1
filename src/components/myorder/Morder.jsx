import React from "react";
import { ChevronRight } from "lucide-react";

const orders = [
  {
    id: 1,
    name: "Bodyguard Jacket Black",
    deliveredOn: "Jul 03",
    image: "/assets/images/product/bodyguard-jacket_0.jpg",
  },
  {
    id: 2,
    name: "Campus Men's Running Shoes",
    deliveredOn: "Jun 28",
    image: "/assets/images/product/bodyguard-jacket_0.jpg",
  },
  {
    id: 3,
    name: "Boat Rockerz 255 Neckband",
    deliveredOn: "Jul 10",
    image: "/assets/images/product/bodyguard-jacket_0.jpg",
  },
  {
    id: 4,
    name: "Samsung 25W Charger Adapter",
    deliveredOn: "Jun 20",
    image: "/assets/images/product/iphone-16-pro-max_0.jpg",
  },
  {
    id: 5,
    name: "Wildcraft Backpack 32L",
    deliveredOn: "Jul 01",
    image: "/assets/images/product/bodyguard-jacket_0.jpg",
  },
];

const Morder = () => {
  return (
    <div className="divide-y divide-gray-300">
      {orders.length === 0 ? (
        <div className="text-center text-gray-500 py-8 text-sm">
          No orders found
        </div>
      ) : (
        <>
          {orders.map((order) => (
            <div
              key={order.id}
              className="px-3 py-1 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between rounded-lg px-3 py-3">
                {/* Left: Product Image */}
                <div className="w-16 max-h-24 rounded overflow-hidden mr-4 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="max-h-24 object-contain"
                  />
                </div>

                {/* Middle: Order Details */}
                <div className="flex-1 px-4">
                  <p className="text-sm text-gray-900">
                    Delivery expected by Sat {order.deliveredOn}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{order.name}</p>
                </div>

                {/* Right: Chevron Icon */}
                <ChevronRight className="w-5 h-5 text-black" />
              </div>
            </div>
          ))}

          {/* Last line after orders */}
          <div className="text-center text-gray-400 py-4 text-sm">
            No more orders
          </div>
        </>
      )}
    </div>
  );
};

export default Morder;
