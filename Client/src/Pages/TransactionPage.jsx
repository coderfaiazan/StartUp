import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/20/solid";

// Mock data for transactions
const mockTransactions = [
  {
    id: "T001",
    date: "2024-03-15",
    amount: 100,
    paymentMethod: "Credit Card",
    projectTitle: "Eco-Friendly Water Bottle",
    projectId: "P001",
    status: "Completed",
    fees: 5,
    rewardTier: "Early Bird",
  },
  {
    id: "T002",
    date: "2024-03-14",
    amount: 50,
    paymentMethod: "PayPal",
    projectTitle: "Revolutionary AI Assistant",
    projectId: "P002",
    status: "Pending",
    fees: 2.5,
    rewardTier: "Basic Supporter",
  },
  {
    id: "T003",
    date: "2024-03-13",
    amount: 200,
    paymentMethod: "Bank Transfer",
    projectTitle: "Community Art Installation",
    projectId: "P003",
    status: "Completed",
    fees: 10,
    rewardTier: "Premium Backer",
  },
  {
    id: "T004",
    date: "2024-03-12",
    amount: 75,
    paymentMethod: "Credit Card",
    projectTitle: "Innovative Board Game",
    projectId: "P004",
    status: "Failed",
    fees: 3.75,
    rewardTier: "Game Enthusiast",
  },
];

const TransactionPage = () => {
  const [expandedTransaction, setExpandedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const navigate = useNavigate();

  const filteredTransactions = mockTransactions.filter(
    (transaction) =>
      (transaction.projectTitle
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || transaction.status === filterStatus)
  );

  const handleExpandTransaction = (id) => {
    setExpandedTransaction(expandedTransaction === id ? null : id);
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCloseDetails = () => {
    setSelectedTransaction(null);
  };

  const handleInitiateRefund = (transactionId) => {
    alert(`Refund initiated for transaction ${transactionId}`);
    // In a real application, you would call an API to initiate the refund process
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
          Back to Dashboard
        </Link>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
        <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-center">
          <FunnelIcon className="h-5 w-5 text-gray-500 mr-2" />
          <select
            className="border rounded-lg px-3 py-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/project/${transaction.projectId}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {transaction.projectTitle}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleExpandTransaction(transaction.id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      {expandedTransaction === transaction.id
                        ? "Hide Details"
                        : "Show Details"}
                      {expandedTransaction === transaction.id ? (
                        <ChevronUpIcon className="h-4 w-4 inline-block ml-1" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 inline-block ml-1" />
                      )}
                    </button>
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Full Details
                    </button>
                  </td>
                </tr>
                {expandedTransaction === transaction.id && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 bg-gray-50">
                      <div className="text-sm text-gray-900">
                        <p>
                          <strong>Payment Method:</strong>{" "}
                          {transaction.paymentMethod}
                        </p>
                        <p>
                          <strong>Fees:</strong> ${transaction.fees.toFixed(2)}
                        </p>
                        <p>
                          <strong>Total Contribution:</strong> $
                          {(transaction.amount + transaction.fees).toFixed(2)}
                        </p>
                        <p>
                          <strong>Reward Tier:</strong> {transaction.rewardTier}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTransaction && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Transaction Details
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  <strong>Transaction ID:</strong> {selectedTransaction.id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong> {selectedTransaction.date}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Amount:</strong> $
                  {selectedTransaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Project:</strong>{" "}
                  <Link
                    to={`/project/${selectedTransaction.projectId}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {selectedTransaction.projectTitle}
                  </Link>
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Status:</strong> {selectedTransaction.status}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Payment Method:</strong>{" "}
                  {selectedTransaction.paymentMethod}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Fees:</strong> ${selectedTransaction.fees.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Total Contribution:</strong> $
                  {(
                    selectedTransaction.amount + selectedTransaction.fees
                  ).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Reward Tier:</strong> {selectedTransaction.rewardTier}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  id="ok-btn"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={handleCloseDetails}
                >
                  Close
                </button>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center justify-center"
                  onClick={() => {
                    /* Implement download functionality */
                  }}
                >
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Download Receipt
                </button>
              </div>
              {selectedTransaction.status === "Completed" && (
                <div className="items-center px-4 py-3">
                  <button
                    className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                    onClick={() => handleInitiateRefund(selectedTransaction.id)}
                  >
                    Initiate Refund
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>All payment information is securely handled and encrypted.</p>
      </div>
    </div>
  );
};

export default TransactionPage;
