import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import firebase from "firebase";
import axios from "axios";

const shopItems = [
  {
    productName: "Water powered clock",
    productImage:
      "https://images-na.ssl-images-amazon.com/images/I/41lmrfCg0JL.jpg",
    productDescLine1: "Elegant Enterprise Plastic Water Powered",
    productDescLine2: "Table/Desk Clock (Biodegradable)",
    stars: [1, 1, 1, 1],
    productPrice: 3,
  },
  {
    productName: "Solar Charger Power Bank",
    productImage:
      "https://images-na.ssl-images-amazon.com/images/I/81qO64vEUXL._AC_SL1500_.jpg",
    productDescLine1: "Qi Wireless Charger 10,000mAh",
    productDescLine2: " Solar Panel Charging (Black)",
    stars: [1, 1, 1, 1, 1],
    productPrice: 5,
  },
  {
    productName: "Organic Cotton carry Bag",
    productImage:
      "https://images-na.ssl-images-amazon.com/images/I/715cBz4e24L._SL1500_.jpg",
    productDescLine1: "The best in Eco-Friendlyness",
    productDescLine2: "Biodegradable ❤",
    stars: [1, 1, 1, 1],
    productPrice: 1,
  },
];

function Products({ coin }) {
  const user = useSelector(selectUser);
  const buy = (e, price) => {
    if (coin >= price) {
      e.preventDefault();
      db.collection("users")
        .doc(user?.id)
        .update({
          coin: firebase.firestore.FieldValue.increment(-price),
        })
        .then(() => {
          axios
            .post("http://localhost:8000/api/blockchain/append", {
              transaction: {
                sender: user?.id,
                receiver: "Admin",
                amount: price,
              },
              timestamp: Date(Date.now()),
            })
            .then((response) => {
              alert("Transaction successful");
              console.log(response);
            });
        });
    } else {
      alert("Insufficient coins");
    }
  };
  return (
    <div className="flex flex-row bg-gray-600 bg-opacity-40 h-screen items-center justify-center">
      {shopItems.map((item, index) => (
        <div className="flex flex-col bg-white items-center rounded-lg p-7 mx-3 shadow-lg">
          <img src={item.productImage} alt="" className="h-20 w-20" />
          <h3 className="text-lg  pt-5 pb-2">{item.productName}</h3>
          <span className="flex pb-5">
            {item.stars.map((star, i) => (
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="#fcca03">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <p className="text-xs text-gray-600">{item.productDescLine1}</p>
          <p className="text-xs text-gray-600">{item.productDescLine2}</p>
          <span className="flex items-center mt-3">
            <svg
              className="h-6 w-6 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>{item.productPrice} RC</p>
          </span>
          <button
            onClick={(e) => buy(e, item.productPrice)}
            className="mt-5 bg-yellow-500 bg-opacity-70 py-2 rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-100 focus:ring-yellow-300 hover:opacity-80"
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
