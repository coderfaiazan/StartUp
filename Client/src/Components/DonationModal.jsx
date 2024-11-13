import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createTransaction } from "../service/transaction";

const DonationModal = ({ project, onClose, onDonate }) => {
  const [amount, setAmount] = useState("");
  const [selectedReward, setSelectedReward] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const onPayment = async (amount, itemname) => {
    // create order
    try {
      const options = {
        userId: userData._id,
        projectId: project._id,
        amount: Number(amount),
      };

      const res = await axios.post(
        "http://localhost:7000/api/v1/payment/createorder",
        options
      );
      const data = res.data;

      console.log(data);

      const paymentObject = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.id,
        ...data,
        handler: function (response) {
          console.log(response);

          const option2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };

          axios
            .post("http://localhost:7000/api/v1/payment/verify", option2)
            .then(() => {
              if (res?.data?.success) {
                alert("Payment Successful");
              } else {
                alert("Payment Failed");
              }
            })
            .catch((error) => {
              console.log("RazorPay Verification Error: ", error);
            });
        },
      });
      paymentObject.open();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleDonate = () => {
    if (amount <= 0) {
      alert("Invalid Amount!");
    } else if (amount >= project.fundingGoal - project.amountRaised) {
      alert("Amount is very large!");
    } else {
      try {
        // onPayment(amount, project.title);
        // dispatch(
        //   updateProject({
        //     id: project._id,
        //     amountRaised: amount,
        //     ...project,
        //   })
        // );
        createTransaction({
          userId: userData._id,
          projectId: project._id,
          amount,
        });
        setTimeout(() => {
          onDonate({
            success: true,
            amount: parseFloat(amount),
            rewardId: selectedReward ? selectedReward._id : null,
            isAnonymous,
          });
        }, 3000);
      } catch (error) {
        onDonate({
          success: false,
          amount: parseFloat(amount),
          rewardId: selectedReward ? selectedReward._id : null,
          isAnonymous,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">Back This Project</h2>
        <p className="mb-4">You're supporting: {project.title}</p>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Donation Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Select a Reward</h3>
          {project.rewards.map((reward) => (
            <div
              key={reward._id}
              className={`p-3 border rounded-md mb-2 cursor-pointer ${
                selectedReward && selectedReward._id === reward._id
                  ? "border-indigo-500"
                  : "border-gray-200"
              }`}
              onClick={() => {
                setSelectedReward(reward);
                if (amount < reward.minContribution)
                  setAmount(reward.minContribution);
              }}
            >
              <h4 className="font-medium">{reward.title}</h4>
              <p className="text-sm text-gray-600">
                Minimum pledge: ₹{reward.minContribution}
              </p>
              <p className="text-sm">{reward.description}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-600">
              Make my donation anonymous
            </span>
          </label>
        </div>

        <button
          onClick={handleDonate}
          className="w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Confirm Donation
        </button>
      </div>
    </div>
  );
};

export default DonationModal;
