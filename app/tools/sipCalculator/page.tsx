"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// -----------------------
// Interfaces
// -----------------------
interface CalculatorInputs {
  monthlyInvestment: string;         // Fixed monthly investment (INR)
  investmentDuration: string;          // Investment Tenure (Years)
  expectedAnnualReturn: string;
}

interface YearlyData {
  year: number;
  totalInvested: number;
  futureValue: number;
  wealthGained: number;
}

interface Results {
  totalInvested: number;
  futureValue: number;
  wealthGained: number;
  yearWise: YearlyData[];
}

// -----------------------
// Utility: Tooltip Component
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
// Utility: Number to Words Converters
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
  const tens = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  if (num < 20) return ones[num];
  if (num < 100)
    return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + ones[num % 10] : "");
  if (num < 1000)
    return (
      ones[Math.floor(num / 100)] +
      " Hundred" +
      (num % 100 !== 0 ? " " + numberToWords(num % 100) : "")
    );
  if (num < 100000)
    return (
      numberToWords(Math.floor(num / 1000)) +
      " Thousand" +
      (num % 1000 !== 0 ? " " + numberToWords(num % 1000) : "")
    );
  if (num < 10000000)
    return (
      numberToWords(Math.floor(num / 100000)) +
      " Lakh" +
      (num % 100000 !== 0 ? " " + numberToWords(num % 100000) : "")
    );
  return (
    numberToWords(Math.floor(num / 10000000)) +
    " Crore" +
    (num % 10000000 !== 0 ? " " + numberToWords(num % 10000000) : "")
  );
};

const numberToWordsPercent = (value: number): string => {
  if (value === undefined || value === null) return "";
  if (Number.isInteger(value)) return numberToWords(value) + " percent";
  const intPart = Math.floor(value);
  const decimalPart = Math.round((value - intPart) * 10);
  return `${numberToWords(intPart)} point ${numberToWords(decimalPart)} percent`;
};

// -----------------------
// Main SIP Calculator Component
// -----------------------
const SipCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    monthlyInvestment: "",
    investmentDuration: "",
    expectedAnnualReturn: "",
  });
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [chartType, setChartType] = useState<"line" | "area">("line");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Validate required inputs
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    ["monthlyInvestment", "investmentDuration", "expectedAnnualReturn"].forEach((field) => {
      const value = inputs[field as keyof CalculatorInputs];
      if (!value || isNaN(Number(value)) || Number(value) <= 0) {
        newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculate results using the SIP formula
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const monthlyInvestment = parseFloat(inputs.monthlyInvestment);
    const durationYears = parseFloat(inputs.investmentDuration);
    const annualReturn = parseFloat(inputs.expectedAnnualReturn);
    const n = durationYears * 12;
    const monthlyRate = annualReturn / 12 / 100;
    // SIP formula: FV = P * [((1+r)^n - 1)/r] * (1+r)
    const futureValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) *
      (1 + monthlyRate);
    const totalInvested = monthlyInvestment * n;
    const wealthGained = futureValue - totalInvested;

    // Build year-wise breakdown
    const yearWise = [];
    for (let year = 1; year <= durationYears; year++) {
      const n_year = year * 12;
      const fv_year =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, n_year) - 1) / monthlyRate) *
        (1 + monthlyRate);
      const invested_year = monthlyInvestment * n_year;
      const wealth_year = fv_year - invested_year;
      yearWise.push({
        year,
        totalInvested: parseFloat(invested_year.toFixed(2)),
        futureValue: parseFloat(fv_year.toFixed(2)),
        wealthGained: parseFloat(wealth_year.toFixed(2)),
      });
    }

    setResults({
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      futureValue: parseFloat(futureValue.toFixed(2)),
      wealthGained: parseFloat(wealthGained.toFixed(2)),
      yearWise,
    });
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // Prepare chart data from year-wise breakdown
  const chartData =
    results &&
    results.yearWise.map((data) => ({
      year: data.year,
      FutureValue: data.futureValue,
      WealthGained: data.wealthGained,
    }));

  return (
    <div className="container">
      {/* Top Navigation */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      <h1 className="title">What Will Be My SIP Corpus?</h1>
      <p className="description">
        Calculate the future value of your Systematic Investment Plan (SIP) based on your monthly investment, expected annual return, and investment duration.
      </p>

      <div className="form-container">
        <h2 className="section-title">SIP Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Monthly Investment (INR)
              <Tooltip text="Enter the amount you plan to invest every month." />
            </span>
            <input
              type="number"
              name="monthlyInvestment"
              value={inputs.monthlyInvestment}
              onChange={handleInputChange}
              placeholder="e.g., 5000"
            />
            <span className="converter">
              {inputs.monthlyInvestment && numberToWords(parseFloat(inputs.monthlyInvestment))} Rupees
            </span>
            {errors.monthlyInvestment && <span className="error">{errors.monthlyInvestment}</span>}
          </label>
          <label>
            <span className="input-label">
              Investment Duration (Years)
              <Tooltip text="Enter how many years you plan to invest through SIP." />
            </span>
            <input
              type="number"
              name="investmentDuration"
              value={inputs.investmentDuration}
              onChange={handleInputChange}
              placeholder="e.g., 10"
            />
            <span className="converter">
              {inputs.investmentDuration && numberToWords(parseFloat(inputs.investmentDuration))} Years
            </span>
            {errors.investmentDuration && <span className="error">{errors.investmentDuration}</span>}
          </label>
          <label>
            <span className="input-label">
              Expected Annual Return (%)
              <Tooltip text="Enter the expected annual return (in percent) on your investments." />
            </span>
            <input
              type="number"
              name="expectedAnnualReturn"
              value={inputs.expectedAnnualReturn}
              onChange={handleInputChange}
              placeholder="e.g., 12"
            />
            <span className="converter">
              {inputs.expectedAnnualReturn && numberToWordsPercent(parseFloat(inputs.expectedAnnualReturn))}
            </span>
            {errors.expectedAnnualReturn && <span className="error">{errors.expectedAnnualReturn}</span>}
          </label>
        </div>

        <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {results && (
        <div className="results-container">
          <h2 className="results-title">SIP Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Total Invested:</strong> ₹{results.totalInvested.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalInvested))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Future Value (Corpus):</strong> ₹{results.futureValue.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.futureValue))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Wealth Gained:</strong> ₹{results.wealthGained.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.wealthGained))} Rupees)
            </div>
          </div>

          <h2 className="results-title">Investment Growth Visualization</h2>
          <div className="chart-explanation">
            {chartType === "line" ? (
              <p>
                The Growth Chart shows the total future value of your SIP investment over time. It illustrates how your monthly investment grows to form your corpus.
              </p>
            ) : (
              <p>
                The Wealth Chart highlights the profit component of your investment over time – the extra wealth gained beyond your principal.
              </p>
            )}
          </div>
          <div className="chart-toggle">
            <button onClick={() => setChartType("line")} className={chartType === "line" ? "active" : ""}>
              Growth Chart
            </button>
            <button onClick={() => setChartType("area")} className={chartType === "area" ? "active" : ""}>
              Wealth Chart
            </button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              {chartType === "line" ? (
                <LineChart data={chartData || []} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                  <RechartsTooltip formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Future Value"]} />
                  <Legend />
                  <Line type="monotone" dataKey="FutureValue" stroke="#CAEF7D" strokeWidth={2} name="Future Value" />
                </LineChart>
              ) : (
                <LineChart data={chartData || []} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                  <RechartsTooltip formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Wealth Gained"]} />
                  <Legend />
                  <Line type="monotone" dataKey="WealthGained" stroke="#1B1F13" strokeWidth={2} name="Wealth Gained" />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Get in Touch CTA */}
          <div className="cta-container mt-8 text-center">
            <Link
              href="https://wa.me/your-phone-number"  // Replace with your actual WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}

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
          background: #000000;
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
          text-align: center;
          font-size: 0.95rem;
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
        .cta-button {
          background: #108e66;
          color: #fcfffe;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s ease;
        }
        .cta-button:hover {
          background: #272b2a;
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

export default SipCalculator;
