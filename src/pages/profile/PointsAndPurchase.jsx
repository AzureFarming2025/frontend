// components/profile/PointsAndPurchase.tsx
import React, { useState } from "react";
import { Card, Dropdown, Button, Table, Pagination, Badge, Divider, Select } from "react-daisyui";
import { BiChevronDown } from "react-icons/bi";
import { FaTrophy } from "react-icons/fa";
import DoughnutChart from "@components/charts/DoughnutChart";
import BarChart from "@components/charts/BarChart01";
import MenuDropDown from "@components/selector/MenuDropDown";
// import PurchaseHistoryStats from "./PurchaseHistoryStats";

export default function PointsAndPurchase({ form, pointsHistory, purchaseHistory }) {
  const [currentPurchasePage, setCurrentPurchasePage] = useState(1);
  const [currentPointsPage, setCurrentPointsPage] = useState(1);
  const [purchaseView, setPurchaseView] = useState("table");
  const [pointsView, setPointsView] = useState("table");
  const [timeFilter, setTimeFilter] = useState("monthly");

  const pointsPerPage = 5;
  const purchasePerPage = 5;
  const paginatedPoints = pointsHistory.slice((currentPointsPage - 1) * pointsPerPage, currentPointsPage * pointsPerPage);
  const paginatedPurchases = purchaseHistory.slice((currentPurchasePage - 1) * purchasePerPage, currentPurchasePage * purchasePerPage);

  const totalPoints = pointsHistory.reduce((sum, item) => sum + Math.abs(item.points), 0);
  const redeemedPoints = pointsHistory.filter((item) => item.points < 0).reduce((sum, item) => sum + Math.abs(item.points), 0);

  const barChartData = {
    labels: pointsHistory.map((item) => item.date),
    datasets: [
      {
        label: "Points",
        data: pointsHistory.map((item) => item.points),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 shadow-md border border-gray-200 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-subheading text-primary-800/80 flex items-center gap-2">
                    <FaTrophy /> Points
                </h2>
                <MenuDropDown
                    options={[
                        { value: "table", label: "Table View" },
                        { value: "analysis", label: "Analysis View" },
                    ]}
                    onChange={(value) => setPointsView(value)}
                />
            </div>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <span className="text-gray-700">Current Points:</span>
                    <Badge color="primary">{form.points}P</Badge>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Collected:</span>
                    <Badge color="success">+ {totalPoints}P</Badge>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-700">Used:</span>
                    <Badge color="error">- {redeemedPoints}P</Badge>
                </div>
            </div>
            <Divider />
            {pointsView === "table" ? (
                <>
                    <Pagination className="mb-4">
                        <Button className="join-item" onClick={() => setCurrentPointsPage((prev) => Math.max(prev - 1, 1))}>
                            «
                        </Button>
                        <Button className="join-item">Page {currentPointsPage}</Button>
                        <Button className="join-item" onClick={() => setCurrentPointsPage((prev) => prev + 1)}>
                            »
                        </Button>
                    </Pagination>
                    <Table className="table-auto w-full">
                        <Table.Head>
                            <span>Date</span>
                            <span>Action</span>
                            <span>Points</span>
                        </Table.Head>
                        <Table.Body>
                            {paginatedPoints.map((item, index) => (
                                <Table.Row key={index}>
                                    <span>{item.date}</span>
                                    <span>{item.action}</span>
                                    <span>{item.points > 0 ? `+${item.points}` : item.points}P</span>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </>
            ) : (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold">Points Analysis</h3>
                        <Select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter(e.target.value)}
                            className="select select-bordered select-sm"
                        >
                            <option value="monthly">Monthly</option>
                            <option value="weekly">Weekly</option>
                        </Select>
                    </div>
                    <BarChart data={barChartData} width={595} height={248} />
                </div>
            )}
        </Card>

        <Card className="p-8 shadow-md border border-gray-200 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-subheading text-primary-800/80">Purchase History</h2>
                <MenuDropDown
                    options={[
                        { value: "table", label: "Table View" },
                        { value: "chart", label: "Chart View" },
                    ]}
                    onChange={(value) => setPurchaseView(value)}
                />
            </div>
            <Divider />
            {purchaseView === "table" ? (
                <>
                    <Pagination className="mb-4">
                        <Button className="join-item" onClick={() => setCurrentPurchasePage((prev) => Math.max(prev - 1, 1))}>
                            «
                        </Button>
                        <Button className="join-item">Page {currentPurchasePage}</Button>
                        <Button className="join-item" onClick={() => setCurrentPurchasePage((prev) => prev + 1)}>
                            »
                        </Button>
                    </Pagination>
                    <Table className="table-auto w-full">
                        <Table.Head>
                            <span>Date</span>
                            <span>Item</span>
                            <span>Amount</span>
                        </Table.Head>
                        <Table.Body>
                            {paginatedPurchases.map((item, index) => (
                                <Table.Row key={index}>
                                    <span>{item.date}</span>
                                    <span>{item.item}</span>
                                    <span>${item.amount}</span>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </>
            ) : (
                <DoughnutChart
                    data={{
                        labels: purchaseHistory.map((item) => item.item),
                        datasets: [
                            {
                                data: purchaseHistory.map((item) => item.amount),
                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                            },
                        ],
                    }}
                    width={300}
                    height={300}
                />
            )}
        </Card>
    </div>
);
}