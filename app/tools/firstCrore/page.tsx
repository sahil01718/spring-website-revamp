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
// Interfaces for Inputs, Yearly Data & Results
// -----------------------
interface CalculatorInputs {
  currentAge: string;
  currentSavings: string;
  currentAnnualIncome: string;
  annualSalaryIncrease: string; // in percent
  investmentProportion: string; // percent of salary saved annually
  expectedReturn: string;       // annual return (in percent)
  lumpsum?: string;             // optional one-time additional investment
  retirementAge?: string;       // optional retirement age limit
}

interface YearlyData {
  year: number;
  age: number;
  salary: number;
  annualInvestment: number;
  corpus: number;
  totalInvested: number;
}

interface Results {
  yearsRequired: number;
  finalCorpus: number;
  totalInvested: number;
  totalInterest: number;
  yearWise: YearlyData[];
}

// -----------------------
// TooltipIcon Component (Updated to use theme Primary color)
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
// Custom Tooltip Components for Charts
// -----------------------
const CustomLineTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`Year: ${label}`}</p>
        <p>{`Corpus: ₹${payload[0].value.toLocaleString("en-IN")}`}</p>
      </div>
    );
  }
  return null;
};

const CustomAreaTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="custom-tooltip"
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{`Year: ${label}`}</p>
        <p>{`Gap: ₹${payload[0].value.toLocaleString("en-IN")}`}</p>
      </div>
    );
  }
  return null;
};

// -----------------------
// Main First Crore Calculator Component
// -----------------------
const FirstCroreCalculator: React.FC = () => {
  // State for inputs, errors, results, calculation loading state and chart type toggle
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentAge: "",
    currentSavings: "",
    currentAnnualIncome: "",
    annualSalaryIncrease: "",
    investmentProportion: "",
    expectedReturn: "",
    lumpsum: "",
    retirementAge: "",
  });
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [chartType, setChartType] = useState<"line" | "area">("line");

  // -----------------------
  // Handle input changes for each field
  // -----------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------
  // Validate required inputs and ensure retirementAge (if provided) > currentAge
  // -----------------------
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    const requiredFields = [
      "currentAge",
      "currentSavings",
      "currentAnnualIncome",
      "annualSalaryIncrease",
      "investmentProportion",
      "expectedReturn",
    ];
    requiredFields.forEach((field) => {
      const value = inputs[field as keyof CalculatorInputs];
      if (!value || isNaN(Number(value)) || Number(value) < 0) {
        newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
      }
    });
    if (inputs.retirementAge && Number(inputs.retirementAge) <= Number(inputs.currentAge)) {
      newErrors.retirementAge = "Retirement age must be greater than current age";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------
  // Calculation Logic: Compound growth until corpus reaches ₹1 crore or retirement age is reached
  // -----------------------
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const currentAge = parseFloat(inputs.currentAge);
    const currentSavings = parseFloat(inputs.currentSavings);
    const annualIncome = parseFloat(inputs.currentAnnualIncome);
    const salaryIncrease = parseFloat(inputs.annualSalaryIncrease) / 100;
    const investProp = parseFloat(inputs.investmentProportion) / 100;
    const expectedReturn = parseFloat(inputs.expectedReturn) / 100;
    const lumpsum = inputs.lumpsum ? parseFloat(inputs.lumpsum) : 0;
    const retirementAge = inputs.retirementAge ? parseFloat(inputs.retirementAge) : Infinity;

    let age = currentAge;
    let corpus = currentSavings + lumpsum;
    let salary = annualIncome;
    let totalInvested = currentSavings + lumpsum;
    const yearWise: YearlyData[] = [];
    let yearsRequired = 0;
    const target = 10000000; // 1 Crore = ₹1,00,00,000

    // Compound growth simulation until corpus reaches target or retirement age
    while (corpus < target && age < retirementAge) {
      yearsRequired++;
      age++;
      const annualInvestment = salary * investProp;
      totalInvested += annualInvestment;
      corpus = corpus * (1 + expectedReturn) + annualInvestment;
      yearWise.push({
        year: yearsRequired,
        age: age,
        salary: parseFloat(salary.toFixed(2)),
        annualInvestment: parseFloat(annualInvestment.toFixed(2)),
        corpus: parseFloat(corpus.toFixed(2)),
        totalInvested: parseFloat(totalInvested.toFixed(2)),
      });
      salary = salary * (1 + salaryIncrease);
    }

    const totalInterest = corpus - totalInvested;

    setResults({
      yearsRequired,
      finalCorpus: parseFloat(corpus.toFixed(2)),
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      yearWise,
    });
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // -----------------------
  // Prepare chart data for Line and Area charts
  // -----------------------
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
      Gap: data.corpus - (parseFloat(inputs.currentAnnualIncome) * parseFloat(inputs.investmentProportion) * 25),
    }));

  // -----------------------
  // Render Component
  // -----------------------
  return (
    <div className="container">
      {/* Back to Dashboard */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      <h1 className="title">When Will I Make My First Crore?</h1>
      <p className="description">
        Estimate how long it will take you to accumulate ₹1 crore based on your current savings, income, and investment strategy.
      </p>

      {/* Input Form */}
      <div className="form-container">
        <h2 className="section-title">Your Financial Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Current Age (Years)
              <TooltipIcon text="Enter your current age." />
            </span>
            <input
              type="number"
              name="currentAge"
              value={inputs.currentAge}
              onChange={handleInputChange}
              placeholder="e.g., 25"
            />
            <span className="converter">
              {inputs.currentAge && numberToWords(parseFloat(inputs.currentAge))} Years
            </span>
            {errors.currentAge && <span className="error">{errors.currentAge}</span>}
          </label>
          <label>
            <span className="input-label">
              Current Savings (INR)
              <TooltipIcon text="Enter your total savings so far." />
            </span>
            <input
              type="number"
              name="currentSavings"
              value={inputs.currentSavings}
              onChange={handleInputChange}
              placeholder="e.g., 200000"
            />
            <span className="converter">
              {inputs.currentSavings && numberToWords(parseFloat(inputs.currentSavings))} Rupees
            </span>
            {errors.currentSavings && <span className="error">{errors.currentSavings}</span>}
          </label>
          <label>
            <span className="input-label">
              Current Annual Income (INR)
              <TooltipIcon text="Enter your total annual income." />
            </span>
            <input
              type="number"
              name="currentAnnualIncome"
              value={inputs.currentAnnualIncome}
              onChange={handleInputChange}
              placeholder="e.g., 600000"
            />
            <span className="converter">
              {inputs.currentAnnualIncome && numberToWords(parseFloat(inputs.currentAnnualIncome))} Rupees
            </span>
            {errors.currentAnnualIncome && <span className="error">{errors.currentAnnualIncome}</span>}
          </label>
          <label>
            <span className="input-label">
              Annual Increase in Salary (%)
              <TooltipIcon text="Enter the expected annual percentage increase in your salary." />
            </span>
            <input
              type="number"
              name="annualSalaryIncrease"
              value={inputs.annualSalaryIncrease}
              onChange={handleInputChange}
              placeholder="e.g., 5"
            />
            <span className="converter">
              {inputs.annualSalaryIncrease && numberToWordsPercent(parseFloat(inputs.annualSalaryIncrease))}
            </span>
            {errors.annualSalaryIncrease && <span className="error">{errors.annualSalaryIncrease}</span>}
          </label>
          <label>
            <span className="input-label">
              Investment Proportion (%)
              <TooltipIcon text="Enter the percentage of your salary that you save and invest annually." />
            </span>
            <input
              type="number"
              name="investmentProportion"
              value={inputs.investmentProportion}
              onChange={handleInputChange}
              placeholder="e.g., 20"
            />
            <span className="converter">
              {inputs.investmentProportion && numberToWordsPercent(parseFloat(inputs.investmentProportion))}
            </span>
            {errors.investmentProportion && <span className="error">{errors.investmentProportion}</span>}
          </label>
          <label>
            <span className="input-label">
              Expected Return on Investment (%)
              <TooltipIcon text="Enter your expected annual return on investments." />
            </span>
            <input
              type="number"
              name="expectedReturn"
              value={inputs.expectedReturn}
              onChange={handleInputChange}
              placeholder="e.g., 10"
            />
            <span className="converter">
              {inputs.expectedReturn && numberToWordsPercent(parseFloat(inputs.expectedReturn))}
            </span>
            {errors.expectedReturn && <span className="error">{errors.expectedReturn}</span>}
          </label>
          <label>
            <span className="input-label">
              Lumpsum Investment (Optional, INR)
              <TooltipIcon text="Enter any one-time investment you plan to make." />
            </span>
            <input
              type="number"
              name="lumpsum"
              value={inputs.lumpsum || ""}
              onChange={handleInputChange}
              placeholder="e.g., 50000"
            />
            <span className="converter">
              {inputs.lumpsum && numberToWords(parseFloat(inputs.lumpsum))} Rupees
            </span>
          </label>
          <label>
            <span className="input-label">
              Retirement Age (Optional)
              <TooltipIcon text="Enter your planned retirement age to cap the investment period." />
            </span>
            <input
              type="number"
              name="retirementAge"
              value={inputs.retirementAge || ""}
              onChange={handleInputChange}
              placeholder="e.g., 60"
            />
            <span className="converter">
              {inputs.retirementAge && numberToWords(parseFloat(inputs.retirementAge))} Years
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
          <h2 className="results-title">Projection Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Years Required:</strong> {results.yearsRequired}{" "}
              {results.yearsRequired > 0 && `(${numberToWords(results.yearsRequired)} years)`}
            </div>
            <div className="summary-item">
              <strong>Total Invested:</strong> ₹{results.totalInvested.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalInvested))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Final Corpus:</strong> ₹{results.finalCorpus.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.finalCorpus))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Total Interest Earned:</strong> ₹{results.totalInterest.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalInterest))} Rupees)
            </div>
            {results.yearWise.length > 0 && (
              <div className="summary-item">
                <strong>You will reach ₹1 crore at age:</strong>{" "}
                {results.yearWise[results.yearWise.length - 1].age} (
                {numberToWords(results.yearWise[results.yearWise.length - 1].age)} years)
              </div>
            )}
          </div>

          {/* Savings Tip Section */}
          <div className="tip-message">
            {parseFloat(inputs.investmentProportion) < 20
              ? "Tip: Your investment proportion is on the lower side. Consider increasing the percentage of your salary you save and invest to reach your goal faster."
              : "Tip: Great job on saving a good portion of your salary! Keep up the consistent investing to build your wealth even quicker."}
          </div>

          <h2 className="results-title">Corpus Growth Visualization</h2>
          <div className="chart-explanation">
            <p>
              {chartType === "line"
                ? "The Line Chart shows your corpus growth over time with compound interest."
                : "The Area Chart highlights the gap between your corpus and the target corpus."}
              <br />Hover over the charts for detailed figures.
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
                  <Line type="monotone" dataKey="Corpus" stroke="#CAEF7D" strokeWidth={2} name="Corpus Growth" />
                </LineChart>
              ) : chartType === "area" && areaChartData ? (
              <AreaChart data={areaChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis domain={["auto", "auto"]} tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                <RechartsTooltip content={CustomAreaTooltip} />
                <Legend />
                <Area type="monotone" dataKey="Gap" stroke="#1B1F13" fill="#1B1F13" name="Wealth Gained" />
                <Line type="monotone" dataKey="Corpus" stroke="#CAEF7D" strokeWidth={2} name="Corpus Growth" />
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
              This calculator estimates the time required to accumulate ₹1 crore based on your current savings, income growth, and investment returns.
            </li>
            <li>
              It assumes a consistent rate of return and salary growth, which may vary in reality.
            </li>
            <li>
              Optional inputs (lumpsum and retirement age) are factored in if provided.
            </li>
            <li>
              Please consult a financial advisor before making major financial decisions.
            </li>
          </ul>
        </div>
      )}

      {/* -----------------------
          Inline Styles for the Component
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

export default FirstCroreCalculator;
