/* eslint-disable react-hooks/exhaustive-deps */
// import config from "../../config/config";
// import "./Verify.css";

// import { useEffect, useState } from 'react';

// const Verify = () => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get query parameters from URL
//   const queryParams = new URLSearchParams(window.location.search);
//   const orderId = queryParams.get('orderId');

//   useEffect(() => {
//     const fetchOrder = async () => {
//       try {
//         const response = await fetch(`${config.url}/api/order/${orderId}`); // Adjust endpoint as needed
//     //     const responseText = await response.text();
//     // console.log('Response:', responseText);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setOrder(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (orderId) {
//       fetchOrder();
//     }
//   }, [orderId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {order ? (
//         <div>
//           <h2>Order Details</h2>
//           <p><strong>Order ID:</strong> {order._id}</p>
//           <p><strong>Status:</strong> {order.status}</p>
//           <h3>Items:</h3>
//           <ul>
//             {order.items.map((item, index) => (
//               <li key={index}>
//                 {item.name} - Quantity: {item.quantity}
//               </li>
//             ))}
//           </ul>
//           <p><strong>Total Price:</strong> {order.amount}</p>
//         </div>
//       ) : (
//         <div>No order found.</div>
//       )}
//     </div>
//   );
// };

// export default Verify;







import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../../config/config";
import "./Verify.css";
import { useEffect } from "react";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference"); 
  const navigate = useNavigate();

 

  const verifyPayment = async () => {
    if (!reference) {
      console.error("No reference found in URL");
      navigate("/"); // Redirect to home or show an error
      return;
    }

    try {
      const response = await axios.post(`${config.url}/api/order/verify`, { reference });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        console.error("Payment verification failed:", response.data.message);
        navigate("/"); // Redirect to home or show an error
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      navigate("/"); // Redirect to home or show an error
    }
  };

  useEffect(() => {
    verifyPayment();
   
  }, []); // Ensure this runs only once on mount

  return (
    <div className="verify">
      <div className="spinner">
        Loading...
      </div>
    </div>
  );
};

export default Verify;
