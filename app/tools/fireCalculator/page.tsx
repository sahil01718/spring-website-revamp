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
// Interfaces for FIRE Calculator
// -----------------------
interface CalculatorInputs {
  annualExpenses: string;  // Annual expenses (INR)
  expectedReturn: string;  // Expected annual return (%)
  inflationRate: string;   // Expected annual inflation rate (%)
}

interface YearlyData {
  year: number;
  expense: number;
  corpus: number;
}

interface Results {
  yearsSustainable: number;
  finalCorpus: number;
  yearWise: YearlyData[];
}

// -----------------------
// Updated TooltipIcon Component
// Uses our primary brand colour (#108e66) with white text
// -----------------------
const TooltipIcon: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      className="TooltipIcon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="info-icon">i</span>
      {isHovered && <span className="tooltiptext">{text}</span>}
      <style jsx>{`
        .TooltipIcon {
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
          width: 220px;
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
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen",
  ];
  const tens = [
    "", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety",
  ];
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

const numberToWordsPercent = (value: number): string => {
  if (value === undefined || value === null) return "";
  if (Number.isInteger(value)) return numberToWords(value) + " percent";
  const intPart = Math.floor(value);
  const decimalPart = Math.round((value - intPart) * 10);
  return `${numberToWords(intPart)} point ${numberToWords(decimalPart)} percent`;
};

// -----------------------
// Custom Tooltip for Line Chart
// Updated to use white background and dark text (#272B2A)
const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Year: {label}</p>
        <p className="intro">Corpus: ₹{payload[0]?.value?.toLocaleString("en-IN")}</p>
        <p className="desc">This line chart displays the evolution of your FIRE corpus over time.</p>
        <style jsx>{`
          .custom-tooltip {
            background: #fcfffe;
            border: 1px solid #272b2a;
            padding: 8px;
            border-radius: 4px;
          }
          .label {
            font-weight: bold;
            margin-bottom: 4px;
            color: #272b2a;
          }
          .intro {
            margin: 0;
            color: #272b2a;
          }
          .desc {
            font-size: 0.8rem;
            color: #272b2a;
            margin-top: 4px;
          }
        `}</style>
      </div>
    );
  }
  return <></>;
};

// -----------------------
// Custom Tooltip for Area Chart
// Updated to use white background and dark text (#272B2A)
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Year: {label}</p>
        <p className="intro">Gap: ₹{payload[0]?.value?.toLocaleString("en-IN")}</p>
        <p className="desc">
          The area represents the gap between your corpus and the required FIRE corpus (25× annual expenses).
        </p>
        <style jsx>{`
          .custom-tooltip {
            background: #fcfffe;
            border: 1px solid #272b2a;
            padding: 8px;
            border-radius: 4px;
          }
          .label {
            font-weight: bold;
            margin-bottom: 4px;
            color: #272b2a;
          }
          .intro {
            margin: 0;
            color: #272b2a;
          }
          .desc {
            font-size: 0.8rem;
            color: #272b2a;
            margin-top: 4px;
          }
        `}</style>
      </div>
    );
  }
  return <></>;
};

// -----------------------
// Main FIRE Calculator Component
// -----------------------
const FIRECalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    annualExpenses: "",
    expectedReturn: "",
    inflationRate: "",
  });
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [chartType, setChartType] = useState<"line" | "area">("line");

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Validate required inputs
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    const requiredFields = ["annualExpenses", "expectedReturn", "inflationRate"];
    requiredFields.forEach((field) => {
      const value = inputs[field as keyof CalculatorInputs];
      if (!value || isNaN(Number(value)) || Number(value) < 0) {
        newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculation logic:
  // - Required FIRE corpus = 25× annual expenses
  // - Each year, the corpus grows by the expected return, then the current year's expenses (which grow with inflation) are withdrawn.
  // - Simulation runs for 50 years or until the corpus is depleted.
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const annualExpenses = parseFloat(inputs.annualExpenses);
    const expectedReturn = parseFloat(inputs.expectedReturn) / 100;
    const inflationRate = parseFloat(inputs.inflationRate) / 100;

    const requiredCorpus = annualExpenses * 25;
    let corpus = requiredCorpus;
    let expense = annualExpenses;
    const yearWise: YearlyData[] = [];
    let yearsSustainable = 0;
    const maxYears = 50;

    for (let year = 1; year <= maxYears; year++) {
      yearsSustainable = year;
      // Corpus grows by expected return
      corpus = corpus * (1 + expectedReturn);
      // Then withdraw this year's expenses
      corpus = corpus - expense;

      if (corpus < 0) {
        corpus = 0;
        yearWise.push({
          year,
          expense: parseFloat(expense.toFixed(2)),
          corpus,
        });
        break;
      }
      yearWise.push({
        year,
        expense: parseFloat(expense.toFixed(2)),
        corpus: parseFloat(corpus.toFixed(2)),
      });
      // Increase expense for next year with inflation
      expense = expense * (1 + inflationRate);
    }

    setResults({
      yearsSustainable,
      finalCorpus: corpus,
      yearWise,
    });
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // Prepare chart data for line and area charts
  const lineChartData =
    results &&
    results.yearWise.map((data) => ({
      year: data.year,
      Corpus: data.corpus,
    }));

  const areaChartData =
    results &&
    results.yearWise.map((data) => ({
      year: data.year,
      NetGap: data.corpus - parseFloat(inputs.annualExpenses) * 25,
    }));

  return (
    <div className="container">
      {/* -----------------------
          Top Navigation: Back to Dashboard
      ----------------------- */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      <h1 className="title">FIRE 25x Calculator</h1>
      <p className="description">
        Determine whether a corpus equal to <strong>25× your annual expenses</strong> will sustain your retirement over 50 years, given your expected return and inflation rate.
      </p>

      {/* Explanation Box */}
      <div className="explanation">
        <p>
          <strong>FIRE (Financial Independence, Retire Early):</strong> The <strong>25× rule</strong> suggests you need a corpus of <em>25 times</em> your annual expenses to retire early. This simulation models your corpus growth against annual withdrawals that rise with inflation.
        </p>
        <p>
          If your corpus depletes before 50 years, you may need to adjust your savings or spending habits.
        </p>
      </div>

      {/* Input Form */}
      <div className="form-container">
        <h2 className="section-title">Retirement Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Annual Expenses (INR)
              <TooltipIcon text="Enter your current total annual expenses in retirement." />
            </span>
            <input
              type="number"
              name="annualExpenses"
              value={inputs.annualExpenses}
              onChange={handleInputChange}
              placeholder="e.g., 600000"
            />
            <span className="converter">
              {inputs.annualExpenses && numberToWords(parseFloat(inputs.annualExpenses))} Rupees
            </span>
            {errors.annualExpenses && <span className="error">{errors.annualExpenses}</span>}
          </label>
          <label>
            <span className="input-label">
              Expected Investment Return (%)
              <TooltipIcon text="Enter the annual return you expect from your investments." />
            </span>
            <input
              type="number"
              name="expectedReturn"
              value={inputs.expectedReturn}
              onChange={handleInputChange}
              placeholder="e.g., 8"
            />
            <span className="converter">
              {inputs.expectedReturn && numberToWordsPercent(parseFloat(inputs.expectedReturn))}
            </span>
            {errors.expectedReturn && <span className="error">{errors.expectedReturn}</span>}
          </label>
          <label>
            <span className="input-label">
              Inflation Rate (%)
              <TooltipIcon text="Enter the expected annual inflation rate affecting your expenses." />
            </span>
            <input
              type="number"
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handleInputChange}
              placeholder="e.g., 3"
            />
            <span className="converter">
              {inputs.inflationRate && numberToWordsPercent(parseFloat(inputs.inflationRate))}
            </span>
            {errors.inflationRate && <span className="error">{errors.inflationRate}</span>}
          </label>
        </div>
        <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="results-container">
          <h2 className="results-title">FIRE Corpus Sustainability</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Years Corpus Lasts:</strong> {results.yearsSustainable}{" "}
              {results.yearsSustainable > 0 && `(${numberToWords(results.yearsSustainable)} years)`}
            </div>
            <div className="summary-item">
              <strong>Final Corpus:</strong> ₹{results.finalCorpus.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.finalCorpus))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Required FIRE Corpus (25× Expenses):</strong> ₹
              {(parseFloat(inputs.annualExpenses) * 25).toLocaleString("en-IN")} (
              {numberToWords(Math.round(parseFloat(inputs.annualExpenses) * 25))} Rupees)
            </div>
          </div>

          <h2 className="results-title">Corpus Growth Visualization</h2>
          <div className="chart-explanation">
            <p>
              The <strong>Line Chart</strong> shows your corpus over time, starting at 25× your annual expenses, growing with your expected return and decreasing by inflation-adjusted withdrawals.
            </p>
            <p>
              The <strong>Area Chart</strong> highlights the gap between your corpus and the required FIRE corpus. Hover over the charts for details.
            </p>
          </div>
          <div className="chart-toggle">
            <button onClick={() => setChartType("line")} className={chartType === "line" ? "active" : ""}>
              Line Chart
            </button>
            <button onClick={() => setChartType("area")} className={chartType === "area" ? "active" : ""}>
              Area Chart
            </button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              {chartType === "line" && lineChartData ? (
                <LineChart data={lineChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                  <RechartsTooltip content={CustomLineTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="Corpus" stroke="#CAEF7D" strokeWidth={2} name="Corpus" />
                </LineChart>
              ) : chartType === "area" && areaChartData ? (
                <AreaChart data={areaChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                  <RechartsTooltip content={CustomAreaTooltip} />
                  <Legend />
                  <Area type="monotone" dataKey="NetGap" stroke="#1B1F13" fill="#1B1F13" name="Net Gap" />
                </AreaChart>
              ) : (
                <></>
              )}
            </ResponsiveContainer>
          </div>

          {/* -----------------------
              Get in Touch CTA Section
          ----------------------- */}
          <div className="cta-container mt-8 text-center">
            <Link
              href="https://wa.me/your-phone-number"  // Replace with your actual WhatsApp link
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}

      {results && (
        <div className="disclaimer">
          <h4>Important Considerations</h4>
          <ul>
            <li>
              This calculator estimates how long your FIRE corpus (25× your annual expenses) will sustain your retirement withdrawals.
            </li>
            <li>
              It assumes a consistent rate of return and inflation, which may vary in reality.
            </li>
            <li>
              Results are based on the provided inputs and are for reference only.
            </li>
            <li>
              Please consult with a financial advisor before making any major retirement decisions.
            </li>
          </ul>
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
        .explanation {
          background: #f0f8e8;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #caef7d;
          font-size: 0.95rem;
        }
        .explanation p {
          margin: 0.5rem 0;
          line-height: 1.5;
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
        .tip-message {
          background: #f0f8e8;
          padding: 1rem;
          border-left: 4px solid #caef7d;
          border-radius: 4px;
          margin-bottom: 1.5rem;
          font-size: 1rem;
          text-align: center;
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
          background: #fcfffe;
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

export default FIRECalculator;
