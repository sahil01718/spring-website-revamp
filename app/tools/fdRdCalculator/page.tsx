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
} from "recharts";

// -----------------------
// Interfaces for FD & RD Calculator
// -----------------------
interface CalculatorInputs {
  // FD Inputs
  principal: string;
  fdTenure: string;
  fdInterestRate: string;
  // RD Inputs
  monthlyDeposit: string;
  rdTenure: string;
  rdInterestRate: string;
  stepUp: string;
}

interface FDResults {
  maturityValue: number;
  totalInterest: number;
  chartData: { year: number; MaturityValue: number }[];
}

interface RDResults {
  totalInvested: number;
  maturityValue: number;
  totalInterest: number;
  yearWise: YearlyData[];
}

interface YearlyData {
  year: number;
  totalInvested: number;
  futureValue: number;
  wealthGained: number;
}

// -----------------------
// Tooltip Component (Updated to our theme)
// -----------------------
const TooltipIcon: React.FC<{ text: string }> = ({ text }) => {
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
          background: #108E66;
          color: #FCFFFE;
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
          background-color: #108E66;
          color: #FCFFFE;
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
          border-color: #108E66 transparent transparent transparent;
        }
      `}</style>
    </span>
  );
};

// -----------------------
// Number to Words Converters
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
// Main FD & RD Calculator Component with Toggle
// -----------------------
const FDRDCalculator: React.FC = () => {
  // State for active calculator ("fd" or "rd")
  const [activeCalc, setActiveCalc] = useState<"fd" | "rd">("fd");
  
  // Combined input state (all keys are included; only relevant ones are validated/calculated)
  const [inputs, setInputs] = useState<CalculatorInputs>({
    principal: "",
    fdTenure: "",
    fdInterestRate: "",
    monthlyDeposit: "",
    rdTenure: "",
    rdInterestRate: "",
    stepUp: "",
  });
  
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [fdResults, setFdResults] = useState<FDResults | null>(null);
  const [rdResults, setRdResults] = useState<RDResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle between FD and RD modes
  const handleToggleCalc = (calcType: "fd" | "rd") => {
    setActiveCalc(calcType);
  };

  // Validate inputs based on active calculator
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    if (activeCalc === "fd") {
      // FD: principal, fdTenure, fdInterestRate are required
      ["principal", "fdTenure", "fdInterestRate"].forEach((field) => {
        const value = inputs[field as keyof CalculatorInputs];
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
        }
      });
    } else {
      // RD: monthlyDeposit, rdTenure, rdInterestRate are required; stepUp is optional
      ["monthlyDeposit", "rdTenure", "rdInterestRate"].forEach((field) => {
        const value = inputs[field as keyof CalculatorInputs];
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          newErrors[field as keyof CalculatorInputs] = "Please enter a valid number";
        }
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Calculation Logic for FD & RD
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    if (activeCalc === "fd") {
      // -----------------
      // FD Calculation (Quarterly compounding)
      // -----------------
      const fdPrincipal = parseFloat(inputs.principal);
      const fdTenure = parseFloat(inputs.fdTenure);
      const fdRate = parseFloat(inputs.fdInterestRate);
      const quarterlyRate = fdRate / 400;
      const fdMaturity = fdPrincipal * Math.pow(1 + quarterlyRate, 4 * fdTenure);
      const fdInterest = fdMaturity - fdPrincipal;
      // Generate FD chart data: growth per year
      const fdChartData = [];
      for (let year = 1; year <= fdTenure; year++) {
        const maturityYear = fdPrincipal * Math.pow(1 + quarterlyRate, 4 * year);
        fdChartData.push({ year, MaturityValue: parseFloat(maturityYear.toFixed(2)) });
      }
      setFdResults({
        maturityValue: parseFloat(fdMaturity.toFixed(2)),
        totalInterest: parseFloat(fdInterest.toFixed(2)),
        chartData: fdChartData,
      });
    } else {
      // -----------------
      // RD Calculation (Monthly compounding with optional step-up)
      // -----------------
      const rdMonthly = parseFloat(inputs.monthlyDeposit);
      const rdTenure = parseFloat(inputs.rdTenure);
      const rdRate = parseFloat(inputs.rdInterestRate);
      const monthlyRate = rdRate / 100 / 12;
      const totalMonths = rdTenure * 12;
      const stepUpPercent = inputs.stepUp ? parseFloat(inputs.stepUp) : 0;

      let totalRdInvested = 0;
      let totalRdFV = 0;
      let depositForCalc = rdMonthly;
      // Build year-wise breakdown
      const rdYearWise: YearlyData[] = [];
      for (let y = 1; y <= rdTenure; y++) {
        let cumulativeInvested = 0;
        let yearFV = 0;
        const monthsThisYear = 12;
        for (let m = 1; m <= monthsThisYear; m++) {
          yearFV += depositForCalc * Math.pow(1 + monthlyRate, (totalMonths - ((y - 1) * 12 + m)));
          cumulativeInvested += depositForCalc;
        }
        totalRdInvested += cumulativeInvested;
        totalRdFV += yearFV;
        rdYearWise.push({
          year: y,
          totalInvested: parseFloat(cumulativeInvested.toFixed(2)),
          futureValue: parseFloat(yearFV.toFixed(2)),
          wealthGained: parseFloat((yearFV - cumulativeInvested).toFixed(2)),
        });
        // Step-up the deposit for next year
        depositForCalc *= (1 + stepUpPercent / 100);
      }

      const rdInterest = totalRdFV - totalRdInvested;
      setRdResults({
        totalInvested: parseFloat(totalRdInvested.toFixed(2)),
        maturityValue: parseFloat(totalRdFV.toFixed(2)),
        totalInterest: parseFloat(rdInterest.toFixed(2)),
        yearWise: rdYearWise,
      });
    }
    setTimeout(() => setIsCalculating(false), 1000);
  };

  // -----------------------
  // Prepare chart data based on active calculator
  // -----------------------
  const fdChartData = fdResults?.chartData || [];
  const rdChartData =
    rdResults?.yearWise.map((data) => ({
      year: data.year,
      FutureValue: data.futureValue,
    })) || [];

  return (
    <div className="container">
      {/* Top Navigation: Back to Dashboard */}
      <div className="top-nav">
        <Link href="/tools">
          <button className="back-button">Back to Dashboard</button>
        </Link>
      </div>

      {/* Page Title & Description */}
      <h1 className="title">Endowment Insurance Calculator</h1>
      <p className="description">
        Determine whether to continue your endowment policy or surrender it and invest the amount.
      </p>

      {/* Explanation Section */}
      <div className="explanation">
        <p>
          <strong>Endowment Policy:</strong> A life insurance product that guarantees a lump sum payout (maturity value) at the end of the policy term.
        </p>
        <p>
          <strong>Surrender Value:</strong> The amount you would receive if you cancel your policy today. If invested, this can grow at a compound rate.
        </p>
      </div>

      {/* Toggle between FD and RD */}
      <div className="calc-toggle">
        <button onClick={() => handleToggleCalc("fd")} className={activeCalc === "fd" ? "active" : ""}>
          Fixed Deposit
        </button>
        <button onClick={() => handleToggleCalc("rd")} className={activeCalc === "rd" ? "active" : ""}>
          Recurring Deposit
        </button>
      </div>

      {/* FD Form */}
      {activeCalc === "fd" && (
        <div className="form-container">
          <h2 className="section-title">Fixed Deposit (FD) Details</h2>
          <div className="input-group">
            <label>
              <span className="input-label">
                Initial Investment (INR)
                <TooltipIcon text="Enter the lump-sum amount for FD." />
              </span>
              <input
                type="number"
                name="principal"
                value={inputs.principal}
                onChange={handleInputChange}
                placeholder="e.g., 500000"
              />
              <span className="converter">
                {inputs.principal && numberToWords(parseFloat(inputs.principal))} Rupees
              </span>
              {errors.principal && <span className="error">{errors.principal}</span>}
            </label>
            <label>
              <span className="input-label">
                FD Tenure (Years)
                <TooltipIcon text="Enter the duration for the FD." />
              </span>
              <input
                type="number"
                name="fdTenure"
                value={inputs.fdTenure}
                onChange={handleInputChange}
                placeholder="e.g., 5"
              />
              <span className="converter">
                {inputs.fdTenure && numberToWords(parseFloat(inputs.fdTenure))} Years
              </span>
              {errors.fdTenure && <span className="error">{errors.fdTenure}</span>}
            </label>
            <label>
              <span className="input-label">
                FD Annual Interest Rate (%)
                <TooltipIcon text="Enter the annual FD interest rate (compounded quarterly)." />
              </span>
              <input
                type="number"
                name="fdInterestRate"
                value={inputs.fdInterestRate}
                onChange={handleInputChange}
                placeholder="e.g., 7.5"
              />
              <span className="converter">
                {inputs.fdInterestRate && numberToWordsPercent(parseFloat(inputs.fdInterestRate))}
              </span>
              {errors.fdInterestRate && <span className="error">{errors.fdInterestRate}</span>}
            </label>
          </div>
          <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
            {isCalculating ? "Calculating..." : "Calculate"}
          </button>
        </div>
      )}

      {/* RD Form */}
      {activeCalc === "rd" && (
        <div className="form-container">
          <h2 className="section-title">Recurring Deposit (RD) Details</h2>
          <div className="input-group">
            <label>
              <span className="input-label">
                Monthly Deposit (INR)
                <TooltipIcon text="Enter the amount you plan to deposit every month in RD." />
              </span>
              <input
                type="number"
                name="monthlyDeposit"
                value={inputs.monthlyDeposit}
                onChange={handleInputChange}
                placeholder="e.g., 5000"
              />
              <span className="converter">
                {inputs.monthlyDeposit && numberToWords(parseFloat(inputs.monthlyDeposit))} Rupees
              </span>
              {errors.monthlyDeposit && <span className="error">{errors.monthlyDeposit}</span>}
            </label>
            <label>
              <span className="input-label">
                RD Tenure (Years)
                <TooltipIcon text="Enter the duration for the RD." />
              </span>
              <input
                type="number"
                name="rdTenure"
                value={inputs.rdTenure}
                onChange={handleInputChange}
                placeholder="e.g., 10"
              />
              <span className="converter">
                {inputs.rdTenure && numberToWords(parseFloat(inputs.rdTenure))} Years
              </span>
              {errors.rdTenure && <span className="error">{errors.rdTenure}</span>}
            </label>
            <label>
              <span className="input-label">
                RD Annual Interest Rate (%)
                <TooltipIcon text="Enter the annual RD interest rate (with monthly compounding)." />
              </span>
              <input
                type="number"
                name="rdInterestRate"
                value={inputs.rdInterestRate}
                onChange={handleInputChange}
                placeholder="e.g., 7.0"
              />
              <span className="converter">
                {inputs.rdInterestRate && numberToWordsPercent(parseFloat(inputs.rdInterestRate))}
              </span>
              {errors.rdInterestRate && <span className="error">{errors.rdInterestRate}</span>}
            </label>
            <label>
              <span className="input-label">
                Step-up (%) (Optional)
                <TooltipIcon text="If you plan to increase your RD contribution annually, enter the percentage increase." />
              </span>
              <input
                type="number"
                name="stepUp"
                value={inputs.stepUp}
                onChange={handleInputChange}
                placeholder="e.g., 10"
              />
              <span className="converter">
                {inputs.stepUp && numberToWordsPercent(parseFloat(inputs.stepUp))}
              </span>
              {errors.stepUp && <span className="error">{errors.stepUp}</span>}
            </label>
          </div>
          <button className="calculate-button" onClick={calculateResults} disabled={isCalculating}>
            {isCalculating ? "Calculating..." : "Calculate"}
          </button>
        </div>
      )}

      {/* -----------------------
          Results Section for FD
      ----------------------- */}
      {activeCalc === "fd" && fdResults && (
        <div className="results-container">
          <h2 className="results-title">FD Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>FD Final Maturity Value:</strong> ₹{fdResults.maturityValue.toLocaleString("en-IN")} (
              {numberToWords(Math.round(fdResults.maturityValue))} Rupees)
            </div>
            <div className="summary-item">
              <strong>FD Interest Earned:</strong> ₹{fdResults.totalInterest.toLocaleString("en-IN")} (
              {numberToWords(Math.round(fdResults.totalInterest))} Rupees)
            </div>
          </div>

          <h2 className="results-title">Growth Visualization</h2>
          <div className="chart-explanation">
            <p>
              This growth chart shows how your initial investment of ₹{parseFloat(inputs.principal).toLocaleString("en-IN")} grows over time at an annual rate of {inputs.fdInterestRate}%, compounded quarterly. At maturity after {inputs.fdTenure} years, your investment reaches ₹{fdResults.maturityValue.toLocaleString("en-IN")}.
            </p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              <LineChart data={fdChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                <RechartsTooltip formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Maturity Value"]} />
                <Legend />
                <Line type="monotone" dataKey="MaturityValue" stroke="#108E66" strokeWidth={2} name="Maturity Value" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* -----------------------
              Get in Touch CTA Section for FD
          ----------------------- */}
          <div className="cta-container mt-8 text-center">
            <Link
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#108E66] text-[#FCFFFE] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}

      {/* -----------------------
          Results Section for RD
      ----------------------- */}
      {activeCalc === "rd" && rdResults && (
        <div className="results-container">
          <h2 className="results-title">RD Summary</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>RD Total Invested:</strong> ₹{rdResults.totalInvested.toLocaleString("en-IN")} (
              {numberToWords(Math.round(rdResults.totalInvested))} Rupees)
            </div>
            <div className="summary-item">
              <strong>RD Final Maturity Value:</strong> ₹{rdResults.maturityValue.toLocaleString("en-IN")} (
              {numberToWords(Math.round(rdResults.maturityValue))} Rupees)
            </div>
            <div className="summary-item">
              <strong>RD Interest Earned:</strong> ₹{rdResults.totalInterest.toLocaleString("en-IN")} (
              {numberToWords(Math.round(rdResults.totalInterest))} Rupees)
            </div>
          </div>

          <h2 className="results-title">Growth Visualization</h2>
          <div className="chart-explanation">
            <p>
              This chart shows how your regular monthly deposits grow over time with monthly compounding at an annual rate of {inputs.rdInterestRate}%.{inputs.stepUp && ` Deposits increase by ${inputs.stepUp}% each year.`} After {inputs.rdTenure} years, your investment reaches a total of ₹{rdResults.maturityValue.toLocaleString("en-IN")}.
            </p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              <LineChart data={rdChartData} margin={{ left: 50, right: 30, top: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                <YAxis domain={["auto", "auto"]} tickFormatter={(val) => val.toLocaleString("en-IN")} />
                <RechartsTooltip formatter={(value: number) => "₹" + Math.round(value).toLocaleString("en-IN")} />
                <Legend />
                <Line type="monotone" dataKey="FutureValue" stroke="#525ECC" strokeWidth={2} name="Future Value" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <h2 className="results-title">Year-wise RD Growth</h2>
          <div className="amortization-table">
            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Total Invested (₹)</th>
                  <th>Future Value (₹)</th>
                  <th>Wealth Gained (₹)</th>
                </tr>
              </thead>
              <tbody>
                {rdResults.yearWise.map((data) => (
                  <tr key={data.year}>
                    <td>{data.year}</td>
                    <td>{data.totalInvested.toLocaleString("en-IN")}</td>
                    <td>{data.futureValue.toLocaleString("en-IN")}</td>
                    <td>{data.wealthGained.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* -----------------------
              Get in Touch CTA Section for RD
          ----------------------- */}
          <div className="cta-container mt-8 text-center">
            <Link
              href="https://wa.me/your-phone-number"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#108E66] text-[#FCFFFE] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}

      {/* Disclaimer Section */}
      {(activeCalc === "fd" ? fdResults : rdResults) && (
        <div className="disclaimer">
          <h4>Important Considerations</h4>
          <ul>
            <li>
              This calculator compares the guaranteed maturity value of your endowment policy with the potential returns from investing the surrender value.
            </li>
            <li>
              The policy value is approximated using a linear progression from the current surrender value to the maturity value.
            </li>
            <li>
              Actual returns may vary due to market conditions, fees, and other factors.
            </li>
          </ul>
          <p>Please consult with a financial advisor before making any major decisions.</p>
        </div>
      )}

      {/* -----------------------
          Inline Styles for the Component
      ----------------------- */}
      <style jsx>{`
        .container {
          padding: 2rem;
          font-family: "Poppins", sans-serif;
          background: #FCFFFE;
          color: #272B2A;
        }
        .top-nav {
          margin-bottom: 1rem;
        }
        .back-button {
          background: #108E66;
          color: #FCFFFE;
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
          background: #FCFFFE;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #108E66;
          font-size: 0.95rem;
        }
        .explanation p {
          margin: 0.5rem 0;
          line-height: 1.5;
        }
        .calc-toggle {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .calc-toggle button {
          background: transparent;
          border: 1px solid #272B2A;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .calc-toggle button.active {
          background: #108E66;
          color: #FCFFFE;
          border-color: #108E66;
        }
        .form-container {
          background: #FCFFFE;
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
          background: #108E66;
          color: #FCFFFE;
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
          background: #FCFFFE;
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
          background: #FCFFFE;
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
          background: #FCFFFE;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1rem;
          border-left: 4px solid #108E66;
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
          border: 1px solid #272B2A;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .chart-toggle button.active {
          background: #108E66;
          color: #FCFFFE;
          border-color: #108E66;
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
          background: #FCFFFE;
          color: #272B2A;
          position: sticky;
          top: 0;
        }
        .cta-container {
          margin-top: 2rem;
        }
        .disclaimer {
          background: #FCFFFE;
          padding: 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #272B2A;
          border: 1px solid #ddd;
          margin-top: 2rem;
        }
        .disclaimer h4 {
          margin-top: 0;
          color: #272B2A;
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

export default FDRDCalculator;
