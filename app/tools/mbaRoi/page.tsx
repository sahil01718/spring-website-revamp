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
  currentSalary: string;            // Current annual salary (INR)
  expectedSalaryGrowth: string;     // Expected annual salary growth (%) without MBA
  mbaCost: string;                  // Total cost of MBA (INR)
  mbaDuration: string;              // Duration of MBA (Years)
  postMbaSalary: string;            // Expected starting salary after MBA (INR)
  postMbaGrowth: string;            // Expected annual salary growth after MBA (%)
}

interface YearlyData {
  year: number;
  age: number;
  salaryWithoutMBA: number;
  cumulativeWithoutMBA: number;
  salaryWithMBA: number;
  cumulativeWithMBA: number;
}

interface Results {
  breakEvenYear: number | null;
  totalEarningsWithoutMBA: number;
  totalEarningsWithMBA: number;
  netBenefit: number;
  yearWise: YearlyData[];
}

// -----------------------
// Updated Tooltip Component
// -----------------------
const TooltipIcon: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      className="tooltipIcon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="info-icon">i</span>
      {isHovered && <span className="tooltiptext">{text}</span>}
      <style jsx>{`
        .tooltipIcon {
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
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
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
// Custom Tooltip for Line Chart
// -----------------------
const CustomLineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Year: {label}</p>
        <p className="intro">
          Without MBA: ₹{payload[0]?.value?.toLocaleString("en-IN")}
        </p>
        <p className="intro">
          With MBA: ₹{payload[1]?.value?.toLocaleString("en-IN")}
        </p>
        <p className="desc">
          This chart compares your cumulative earnings over time for both scenarios.
        </p>
        <style jsx>{`
          .custom-tooltip {
            background: #108e66;
            border: 1px solid #272b2a;
            padding: 8px;
            border-radius: 4px;
            color: #fcfffe;
          }
          .label {
            font-weight: bold;
            margin-bottom: 4px;
          }
          .intro {
            margin: 0;
          }
          .desc {
            font-size: 0.8rem;
            color: #fcfffe;
            margin-top: 4px;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

// -----------------------
// Custom Tooltip for Area Chart
// -----------------------
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">Year: {label}</p>
        <p className="intro">
          Net Benefit: ₹{payload[0]?.value?.toLocaleString("en-IN")}
        </p>
        <p className="desc">
          The shaded area represents the extra earnings gained from pursuing an MBA.
        </p>
        <style jsx>{`
          .custom-tooltip {
            background: #108e66;
            border: 1px solid #272b2a;
            padding: 8px;
            border-radius: 4px;
            color: #fcfffe;
          }
          .label {
            font-weight: bold;
            margin-bottom: 4px;
          }
          .intro {
            margin: 0;
          }
          .desc {
            font-size: 0.8rem;
            color: #fcfffe;
            margin-top: 4px;
          }
        `}</style>
      </div>
    );
  }
  return null;
};

// -----------------------
// Main MBA ROI Calculator Component
// -----------------------
const MBACalculator: React.FC = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    currentSalary: "",
    expectedSalaryGrowth: "",
    mbaCost: "",
    mbaDuration: "",
    postMbaSalary: "",
    postMbaGrowth: "",
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
    const requiredFields = [
      "currentSalary",
      "expectedSalaryGrowth",
      "mbaCost",
      "mbaDuration",
      "postMbaSalary",
      "postMbaGrowth",
    ];
    requiredFields.forEach((field) => {
      const value = inputs[field as keyof CalculatorInputs];
      if (!value || isNaN(Number(value)) || Number(value) < 0) {
        newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculation Logic (comparison period fixed at 50 years)
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const currentSalary = parseFloat(inputs.currentSalary);
    const expectedGrowth = parseFloat(inputs.expectedSalaryGrowth) / 100;
    const mbaCost = parseFloat(inputs.mbaCost);
    const mbaDuration = parseFloat(inputs.mbaDuration);
    const postMbaSalary = parseFloat(inputs.postMbaSalary);
    const postMbaGrowth = parseFloat(inputs.postMbaGrowth) / 100;
    const comparisonYears = 50;

    let cumulativeWithoutMBA = 0;
    let cumulativeWithMBA = -mbaCost; // MBA cost deducted upfront
    let salaryWithoutMBA = currentSalary;
    let salaryWithMBA = 0; // No earnings during MBA
    const yearWise: YearlyData[] = [];

    for (let year = 1; year <= comparisonYears; year++) {
      // Without MBA: accumulate salary
      cumulativeWithoutMBA += salaryWithoutMBA;
      const currentSalaryWithoutMBA = salaryWithoutMBA;
      salaryWithoutMBA = salaryWithoutMBA * (1 + expectedGrowth);

      // With MBA:
      if (year <= mbaDuration) {
        cumulativeWithMBA += 0;
      } else if (year === mbaDuration + 1) {
        salaryWithMBA = postMbaSalary;
        cumulativeWithMBA += salaryWithMBA;
      } else {
        salaryWithMBA = salaryWithMBA * (1 + postMbaGrowth);
        cumulativeWithMBA += salaryWithMBA;
      }

      yearWise.push({
        year,
        // For age, we simply add years to a dummy starting age (not provided in inputs)
        age: year + 22, // assuming starting age is 22
        salaryWithoutMBA: currentSalaryWithoutMBA,
        cumulativeWithoutMBA,
        salaryWithMBA: year <= mbaDuration ? 0 : salaryWithMBA,
        cumulativeWithMBA,
      });
    }

    const breakEvenYear =
      yearWise.find((data) => data.cumulativeWithMBA >= data.cumulativeWithoutMBA)?.year || null;

    setResults({
      breakEvenYear,
      totalEarningsWithoutMBA: cumulativeWithoutMBA,
      totalEarningsWithMBA: cumulativeWithMBA,
      netBenefit: cumulativeWithMBA - cumulativeWithoutMBA,
      yearWise,
    });
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // Prepare chart data for visualization
  const lineChartData =
    results &&
    results.yearWise.map((data) => ({
      year: data.year,
      "Without MBA": data.cumulativeWithoutMBA,
      "With MBA": data.cumulativeWithMBA,
    }));

  const areaChartData =
    results &&
    results.yearWise.map((data) => ({
      year: data.year,
      NetBenefit: data.cumulativeWithMBA - data.cumulativeWithoutMBA,
    }));

  return (
    <div className="container">
      {/* Top Navigation */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      <h1 className="title">MBA Opportunity Cost Calculator</h1>
      <p className="description">
        Assess the financial impact of pursuing an MBA by comparing your cumulative earnings over 50 years with and without it.
      </p>

      <div className="form-container">
        <h2 className="section-title">Your Career & Education Details</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              Current Salary (INR)
              <TooltipIcon text="Enter your current annual salary." />
            </span>
            <input
              type="number"
              name="currentSalary"
              value={inputs.currentSalary}
              onChange={handleInputChange}
              placeholder="e.g., 600000"
            />
            <span className="converter">
              {inputs.currentSalary && numberToWords(parseFloat(inputs.currentSalary))} Rupees
            </span>
            {errors.currentSalary && <span className="error">{errors.currentSalary}</span>}
          </label>
          <label>
            <span className="input-label">
              Expected Salary Growth (%) Without MBA
              <TooltipIcon text="Enter the expected annual percentage increase in your salary if you do not pursue an MBA." />
            </span>
            <input
              type="number"
              name="expectedSalaryGrowth"
              value={inputs.expectedSalaryGrowth}
              onChange={handleInputChange}
              placeholder="e.g., 10"
            />
            <span className="converter">
              {inputs.expectedSalaryGrowth && numberToWordsPercent(parseFloat(inputs.expectedSalaryGrowth))}
            </span>
            {errors.expectedSalaryGrowth && <span className="error">{errors.expectedSalaryGrowth}</span>}
          </label>
          <label>
            <span className="input-label">
              MBA Cost (INR)
              <TooltipIcon text="Enter the total cost of your MBA (tuition, living expenses, etc.)." />
            </span>
            <input
              type="number"
              name="mbaCost"
              value={inputs.mbaCost}
              onChange={handleInputChange}
              placeholder="e.g., 2000000"
            />
            <span className="converter">
              {inputs.mbaCost && numberToWords(parseFloat(inputs.mbaCost))} Rupees
            </span>
            {errors.mbaCost && <span className="error">{errors.mbaCost}</span>}
          </label>
          <label>
            <span className="input-label">
              MBA Duration (Years)
              <TooltipIcon text="Enter the number of years you will take to complete your MBA." />
            </span>
            <input
              type="number"
              name="mbaDuration"
              value={inputs.mbaDuration}
              onChange={handleInputChange}
              placeholder="e.g., 2"
            />
            <span className="converter">
              {inputs.mbaDuration && numberToWords(parseFloat(inputs.mbaDuration))} Years
            </span>
            {errors.mbaDuration && <span className="error">{errors.mbaDuration}</span>}
          </label>
          <label>
            <span className="input-label">
              Post-MBA Salary (INR)
              <TooltipIcon text="Enter the expected starting salary after your MBA." />
            </span>
            <input
              type="number"
              name="postMbaSalary"
              value={inputs.postMbaSalary}
              onChange={handleInputChange}
              placeholder="e.g., 1500000"
            />
            <span className="converter">
              {inputs.postMbaSalary && numberToWords(parseFloat(inputs.postMbaSalary))} Rupees
            </span>
            {errors.postMbaSalary && <span className="error">{errors.postMbaSalary}</span>}
          </label>
          <label>
            <span className="input-label">
              Post-MBA Growth (%)
              <TooltipIcon text="Enter the expected annual salary growth rate after your MBA." />
            </span>
            <input
              type="number"
              name="postMbaGrowth"
              value={inputs.postMbaGrowth}
              onChange={handleInputChange}
              placeholder="e.g., 15"
            />
            <span className="converter">
              {inputs.postMbaGrowth && numberToWordsPercent(parseFloat(inputs.postMbaGrowth))}
            </span>
            {errors.postMbaGrowth && <span className="error">{errors.postMbaGrowth}</span>}
          </label>
        </div>
        <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
          {isCalculating ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {results && (
        <div className="results-container">
          <h2 className="results-title">MBA ROI Projection</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>Break-even Year:</strong>{" "}
              {results.breakEvenYear !== null
                ? `${results.breakEvenYear} (${numberToWords(results.breakEvenYear)} years)`
                : "Not reached within 50 years"}
            </div>
            <div className="summary-item">
              <strong>Total Earnings Without MBA:</strong> ₹
              {results.totalEarningsWithoutMBA.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalEarningsWithoutMBA))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Total Earnings With MBA:</strong> ₹
              {results.totalEarningsWithMBA.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.totalEarningsWithMBA))} Rupees)
            </div>
            <div className="summary-item">
              <strong>Net Financial Benefit:</strong> ₹
              {results.netBenefit.toLocaleString("en-IN")} (
              {numberToWords(Math.round(results.netBenefit))} Rupees)
            </div>
          </div>

          <h2 className="results-title">Cumulative Earnings Comparison (50 Years)</h2>
          <div className="chart-explanation">
            <p>
              The charts below compare your cumulative earnings over a 50‑year period for both scenarios:
              <br />
              <strong>Without MBA:</strong> Your salary grows at your current rate.
              <br />
              <strong>With MBA:</strong> After a pause during studies and an upfront MBA cost, your salary starts higher and grows faster.
              <br />
              Hover over the graphs for detailed values.
            </p>
            {chartType === "line" && (
              <p>
                <strong>Line Chart:</strong> A smooth trend line showing cumulative earnings over time.
              </p>
            )}
            {chartType === "area" && (
              <p>
                <strong>Area Chart:</strong> Emphasizes the gap between the two scenarios with a shaded area.
              </p>
            )}
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
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                  <RechartsTooltip content={CustomLineTooltip} />
                  <Legend />
                  <Line type="monotone" dataKey="Without MBA" stroke="#525ECC" strokeWidth={2} name="Without MBA" />
                  <Line type="monotone" dataKey="With MBA" stroke="#108e66" strokeWidth={2} name="With MBA" />
                </LineChart>
              ) : chartType === "area" && areaChartData ? (
                <AreaChart data={areaChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                  <RechartsTooltip content={CustomAreaTooltip} />
                  <Legend />
                  <Area type="monotone" dataKey="NetBenefit" stroke="#1B1F13" fill="#1B1F13" name="Net Benefit" />
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
              className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272b2a] transition-colors"
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
              This calculator estimates your cumulative earnings over a 50‑year period for both scenarios – with and without an MBA.
            </li>
            <li>
              It factors in the MBA cost and lost earnings during the MBA period, as well as different salary growth rates before and after the MBA.
            </li>
            <li>
              Actual results may vary due to market conditions, salary changes, and other factors.
            </li>
          </ul>
          <p>Please consult with a financial advisor before making any major career or financial decisions.</p>
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
          background: #272b2a;
          color: #fcfffe;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-family: "Poppins", sans-serif;
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

export default MBACalculator;
