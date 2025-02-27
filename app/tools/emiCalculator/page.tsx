"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

// -----------------------
// Interfaces for Input & Results
// -----------------------
interface CalculatorInputs {
  // Required Inputs
  loanAmount: string;
  loanTenure: string;
  annualInterestRate: string;
  // Optional Inputs
  loanType: string;
  processingFee: string;
}

interface AmortizationRow {
  month: number;
  emi: number;
  interest: number;
  principal: number;
  remaining: number;
}

interface Results {
  emi: number;
  totalRepayment: number;
  totalInterest: number;
  processingFeeAmount: number;
  amortizationSchedule: AmortizationRow[];
}

// -----------------------
// Tooltip Component
// Updated to use primary color (#108e66) with white text for consistency
// -----------------------
const Tooltip: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      className="tooltip"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="info-icon">i</span>
      {isHovered && <span className="tooltiptext">{text}</span>}
      <style jsx>{`
        .tooltip {
          position: relative;
          display: inline-block;
          margin-left: 5px;
          cursor: pointer;
          vertical-align: middle;
        }
        .info-icon {
          display: inline-block;
          background: #108e66;
          color: #fcfffe;
          border-radius: 50%;
          font-size: 0.6rem;
          width: 14px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          font-weight: bold;
        }
        .tooltiptext {
          visibility: visible;
          width: 200px;
          background-color: #108e66;
          color: #fcfffe;
          text-align: left;
          border-radius: 4px;
          padding: 6px 8px;
          position: absolute;
          z-index: 1000;
          bottom: 130%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          line-height: 1.2;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          opacity: 1;
        }
        .tooltiptext::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -4px;
          border-width: 4px;
          border-style: solid;
          border-color: #108e66 transparent transparent transparent;
        }
      `}</style>
    </span>
  );
};

// -----------------------
// Simple Number to Words Converter (for basic amounts)
// -----------------------
const numberToWords = (num: number): string => {
  if (num === undefined || num === null) return "";
  num = Math.abs(Math.round(num));
  if (num === 0) return "Zero";
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  if (num < 20) return ones[num];
  if (num < 100)
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
  if (num < 1000)
    return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " " + numberToWords(num % 100) : "");
  if (num < 100000)
    return numberToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 !== 0 ? " " + numberToWords(num % 1000) : "");
  if (num < 10000000)
    return numberToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 !== 0 ? " " + numberToWords(num % 100000) : "");
  return numberToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 !== 0 ? " " + numberToWords(num % 10000000) : "");
};

// -----------------------
// Number to Words for Percent Values
// -----------------------
const numberToWordsPercent = (value: number): string => {
  if (value === undefined || value === null) return "";
  if (Number.isInteger(value)) return numberToWords(value) + " percent";
  const intPart = Math.floor(value);
  const decimalPart = Math.round((value - intPart) * 10);
  return `${numberToWords(intPart)} point ${numberToWords(decimalPart)} percent`;
};

// -----------------------
// Main EMI Calculator Component
// -----------------------
const EmiCalculator: React.FC = () => {
  // State hooks for inputs, errors, results, loading indicator, and chart type
  const [inputs, setInputs] = useState<CalculatorInputs>({
    loanAmount: "",
    loanTenure: "",
    annualInterestRate: "",
    loanType: "Home Loan",
    processingFee: "",
  });
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [chartType, setChartType] = useState<"line" | "pie">("pie");

  // -----------------------
  // Handle input changes for both input and select elements
  // -----------------------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------
  // Validate required inputs
  // -----------------------
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    ["loanAmount", "loanTenure", "annualInterestRate"].forEach((field) => {
      const value = inputs[field as keyof CalculatorInputs];
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------
  // Calculate EMI and Amortization Schedule
  // -----------------------
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const principal = parseFloat(inputs.loanAmount);
    const tenureYears = parseFloat(inputs.loanTenure);
    const annualRate = parseFloat(inputs.annualInterestRate);
    const processingFeePercent = inputs.processingFee ? parseFloat(inputs.processingFee) : 0;

    const effectivePrincipal = principal;
    const processingFeeAmount = principal * (processingFeePercent / 100);

    const monthlyRate = annualRate / 12 / 100;
    const numberOfPayments = tenureYears * 12;

    // EMI formula
    const emi =
      (effectivePrincipal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalRepayment = emi * numberOfPayments + processingFeeAmount;
    const totalInterest = totalRepayment - effectivePrincipal;

    // Build amortization schedule
    const amortizationSchedule: AmortizationRow[] = [];
    let balance = effectivePrincipal;
    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = emi - interestPortion;
      balance = balance - principalPortion;
      if (balance < 0) balance = 0;
      amortizationSchedule.push({
        month,
        emi: parseFloat(emi.toFixed(2)),
        interest: parseFloat(interestPortion.toFixed(2)),
        principal: parseFloat(principalPortion.toFixed(2)),
        remaining: parseFloat(balance.toFixed(2)),
      });
    }

    setResults({
      emi: parseFloat(emi.toFixed(2)),
      totalRepayment: parseFloat(totalRepayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      processingFeeAmount: parseFloat(processingFeeAmount.toFixed(2)),
      amortizationSchedule,
    });

    // Simulate calculation delay
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // -----------------------
  // Prepare chart data for visualization
  // Line Chart: Remaining Balance over Months
  // Pie Chart: Breakdown of Principal vs Total Interest
  // -----------------------
  const lineChartData =
    results &&
    results.amortizationSchedule.map((row) => ({
      month: row.month,
      remaining: row.remaining,
    }));

  const pieChartData = [
    { name: "Principal", value: parseFloat(inputs.loanAmount || "0"), fill: "#108e66" },
    { name: "Total Interest", value: results ? results.totalInterest : 0, fill: "#525ECC" },
  ];

  return (
    <div className="container">
      {/* -----------------------
          Top Navigation: Back to Tools Dashboard
      ----------------------- */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      {/* -----------------------
          Page Title & Description
      ----------------------- */}
      <h1 className="title">How Much is My EMI?</h1>
      <p className="description">
        Compute your Equated Monthly Installment (EMI) for a loan. Enter the loan amount, tenure, and annual
        interest rate to see your fixed monthly payment, total interest, and repayment summary.
      </p>

      {/* -----------------------
          Input Form for Loan Details
      ----------------------- */}
      <div className="form-container">
        <h2 className="section-title">Loan Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Loan Amount (INR)
              <Tooltip text="Enter the total principal amount you wish to borrow." />
            </span>
            <input
              type="number"
              name="loanAmount"
              value={inputs.loanAmount}
              onChange={handleInputChange}
              placeholder="e.g., 500000"
            />
            <span className="converter">
              {inputs.loanAmount && numberToWords(parseFloat(inputs.loanAmount))} Rupees
            </span>
            {errors.loanAmount && <span className="error">{errors.loanAmount}</span>}
          </label>
          <label>
            <span className="input-label">
              Loan Tenure (Years)
              <Tooltip text="Enter the duration of the loan in years." />
            </span>
            <input
              type="number"
              name="loanTenure"
              value={inputs.loanTenure}
              onChange={handleInputChange}
              placeholder="e.g., 5"
            />
            <span className="converter">
              {inputs.loanTenure && numberToWords(parseFloat(inputs.loanTenure))} Years
            </span>
            {errors.loanTenure && <span className="error">{errors.loanTenure}</span>}
          </label>
          <label>
            <span className="input-label">
              Annual Interest Rate (%)
              <Tooltip text="Enter the fixed annual interest rate (e.g., 9.5)." />
            </span>
            <input
              type="number"
              name="annualInterestRate"
              value={inputs.annualInterestRate}
              onChange={handleInputChange}
              placeholder="e.g., 9.5"
            />
            <span className="converter">
              {inputs.annualInterestRate &&
                numberToWordsPercent(parseFloat(inputs.annualInterestRate))}
            </span>
            {errors.annualInterestRate && (
              <span className="error">{errors.annualInterestRate}</span>
            )}
          </label>
        </div>

        <h2 className="section-title">Optional Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Loan Type
              <Tooltip text="Select the type of loan you're taking." />
            </span>
            <select
              name="loanType"
              value={inputs.loanType}
              onChange={handleInputChange}
              className="select-input"
            >
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Education Loan">Education Loan</option>
              <option value="Business Loan">Business Loan</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            <span className="input-label">
              Processing Fee (%)
              <Tooltip text="Enter the processing fee percentage on the loan amount (if any)." />
            </span>
            <input
              type="number"
              name="processingFee"
              value={inputs.processingFee}
              onChange={handleInputChange}
              placeholder="e.g., 1.5"
            />
            <span className="converter">
              {inputs.processingFee &&
                numberToWordsPercent(parseFloat(inputs.processingFee))}
            </span>
          </label>
        </div>

        <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* -----------------------
          Results Section
      ----------------------- */}
      {results && (
        <div className="results-container">
          <h2 className="results-title">Loan Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Monthly EMI:</strong> ₹{results.emi.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.emi))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Total Loan Repayment:</strong> ₹
              {results.totalRepayment.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalRepayment))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Total Interest Paid:</strong> ₹
              {results.totalInterest.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalInterest))} Rupees)
            </div>
            {results.processingFeeAmount > 0 && (
              <div className="summary-item">
                <strong>Processing Fee:</strong> ₹
                {results.processingFeeAmount.toLocaleString("en-IN")} (
                {numberToWords(Math.round(results.processingFeeAmount))} Rupees)
              </div>
            )}
          </div>

          {/* Chart Explanation & Toggle */}
          {chartType === "pie" && (
            <div className="chart-explanation">
              <p>
                This pie chart breaks down your total repayment into the principal amount (green) and the total interest (purple) you&apos;ll pay.
              </p>
            </div>
          )}
          {chartType === "line" && (
            <div className="chart-explanation">
              <p>
                This line chart shows how your loan balance decreases over time. The vertical axis shows the remaining balance, while the horizontal axis shows the months.
              </p>
            </div>
          )}
          <div className="chart-toggle">
            <button onClick={() => setChartType("line")} className={chartType === "line" ? "active" : ""}>
              Balance Chart
            </button>
            <button onClick={() => setChartType("pie")} className={chartType === "pie" ? "active" : ""}>
              Loan Breakdown
            </button>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              {chartType === "line" && lineChartData ? (
                <LineChart data={lineChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
                  <YAxis tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                  <RechartsTooltip formatter={(value: number) => "₹" + Math.round(value).toLocaleString("en-IN")} />
                  <Legend />
                  <Line type="monotone" dataKey="remaining" stroke="#108e66" strokeWidth={2} name="Remaining Balance" />
                </LineChart>
              ) : (
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  />
                  <RechartsTooltip formatter={(value: number) => "₹" + value.toLocaleString("en-IN")} />
                  <Legend />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Amortization Schedule */}
          <h2 className="results-title">Amortization Schedule</h2>
          <div className="amortization-table">
            <table>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>EMI (₹)</th>
                  <th>Interest (₹)</th>
                  <th>Principal (₹)</th>
                  <th>Remaining (₹)</th>
                </tr>
              </thead>
              <tbody>
                {results.amortizationSchedule.map((row) => (
                  <tr key={row.month}>
                    <td>{row.month}</td>
                    <td>{row.emi.toLocaleString("en-IN")}</td>
                    <td>{row.interest.toLocaleString("en-IN")}</td>
                    <td>{row.principal.toLocaleString("en-IN")}</td>
                    <td>{row.remaining.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* -----------------------
              Get in Touch CTA Section
          ----------------------- */}
          <div className="cta-container mt-8 text-center">
            <Link
              href="https://wa.me/your-phone-number" // Replace with your actual WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}

      {/* Disclaimer Section */}
      {results && (
        <div className="disclaimer">
          <h4>Important Considerations</h4>
          <ul>
            <li>This calculator provides an overview based on standard EMI formulas and may not reflect all fees or variations in interest rates.</li>
            <li>Processing fees and other charges are considered separately.</li>
            <li>The charts and amortization schedule are for illustration purposes only.</li>
            <li>Please consult a financial advisor before making major financial decisions.</li>
          </ul>
        </div>
      )}

      {/* -----------------------
          Inline Styles for the EMI Calculator Component
      ----------------------- */}
      <style jsx>{`
        .container {
          padding: 2rem;
          font-family: "Poppins", sans-serif;
          background: #fcfffe;
          color: #272b2a;
        }
        .top-nav {
          margin-bottom: 1rem;
        }
        .back-button {
          background: #108e66;
          color: #fcfffe;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }
        .title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .description {
          text-align: center;
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .form-container {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1rem 0;
        }
        .input-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .input-group label {
          display: flex;
          flex-direction: column;
          font-size: 1rem;
          position: relative;
        }
        .input-label {
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        }
        .input-group input,
        .select-input {
          padding: 0.5rem;
          margin-top: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          height: 38px;
          width: 100%;
          box-sizing: border-box;
          font-size: 1rem;
        }
        .converter {
          font-size: 0.9rem;
          color: #777;
          margin-top: 0.25rem;
        }
        .error {
          color: red;
          font-size: 0.8rem;
        }
        .calculate-button {
          background: #108e66;
          color: #fcfffe;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          width: 100%;
        }
        .calculate-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .results-container {
          background: #fff;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
        }
        .results-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
        }
        .summary-card {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          display: grid;
          gap: 0.75rem;
        }
        .summary-item {
          font-size: 1rem;
          margin: 0.25rem 0;
        }
        .chart-explanation {
          background: #f0f8e8;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 4px solid #108e66;
        }
        .chart-explanation p {
          margin: 0;
          line-height: 1.5;
        }
        .chart-toggle {
          display: flex;
          justify-content: center;
          margin: 1rem 0;
          gap: 1rem;
        }
        .chart-toggle button {
          background: transparent;
          border: 1px solid #272b2a;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .chart-toggle button.active {
          background: #108e66;
          color: #fcfffe;
          border-color: #108e66;
        }
        .chart-container {
          margin: 1rem 0 2rem;
          display: flex;
          justify-content: center;
        }
        .amortization-table {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
          border-radius: 8px;
          border: 1px solid #eee;
        }
        .amortization-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .amortization-table th,
        .amortization-table td {
          border: 1px solid #eee;
          padding: 0.5rem;
          text-align: center;
        }
        .amortization-table th {
          background: #f0f8e8;
          position: sticky;
          top: 0;
        }
        .cta-container {
          margin-top: 2rem;
        }
        .disclaimer {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #555;
          border: 1px solid #ddd;
          margin-top: 2rem;
        }
        .disclaimer h4 {
          margin-top: 0;
          color: #272b2a;
          margin-bottom: 0.5rem;
        }
        .disclaimer ul {
          margin: 0;
          padding-left: 1.5rem;
        }
        .disclaimer li {
          margin-bottom: 0.5rem;
        }
        @media (max-width: 768px) {
          .input-group {
            grid-template-columns: 1fr;
          }
          .chart-container {
            margin: 1.5rem 0;
          }
          .summary-card {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default EmiCalculator;
