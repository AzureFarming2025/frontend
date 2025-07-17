// Settings.tsx
import React from "react";
import { Card, Button, Divider } from "react-daisyui";
import { FaCreditCard, FaHistory, FaCrown } from "react-icons/fa";
import Title from "@components/field/Title";
export default function Settings() {
  const billingHistory = [
    { date: "2025-03-01", method: "Visa **** 1234", amount: "$9.99" },
    { date: "2025-02-01", method: "Visa **** 1234", amount: "$9.99" },
  ];

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      <Title text="Settings" />
      <div className="mx-auto space-y-10 my-10">
        {/* Billing Info Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCreditCard className="text-accent" /> Billing Info
          </h2>
          <Card className="p-6 shadow border border-gray-100 space-y-3 my-3">
            <div className="flex justify-between text-sm">
              <span>Plan:</span>
              <span className="font-medium text-primary">Premium</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Next Payment:</span>
              <span>2025-04-01</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Payment Method:</span>
              <span>Visa **** 1234</span>
            </div>
            <div className="pt-2">
              <Button size="sm" color="accent">Change Card</Button>
            </div>
          </Card>

          {/* Billing History */}
          <div className="my-12">
            <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
              <FaHistory className="text-primary" /> Payment History
            </h3>
            <div className="overflow-x-auto">
              <table className="table table-zebra text-sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {billingHistory.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td>{item.method}</td>
                      <td>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Membership Section */}
        <section className="space-y-4 my-8">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FaCrown className="text-yellow-500" /> Membership
          </h2>
          <Card className="p-6 shadow border border-gray-100 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Status:</span>
              <span className="text-green-600 font-medium">Premium</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Valid Until:</span>
              <span>2025-06-01</span>
            </div>
            <Divider className="my-1" />
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>No ads</li>
              <li>+50% bonus points</li>
              <li>Exclusive avatars & themes</li>
            </ul>
            <div>
              <Button size="sm" color="warning">Manage Plan</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
