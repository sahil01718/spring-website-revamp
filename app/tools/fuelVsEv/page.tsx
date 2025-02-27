"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// -----------------------
// Utility: Number to Words (Indian system)
// -----------------------
function numberToWords(num: number): string {
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = [
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
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  if (num === 0) return "Zero";
  
  function convert(n: number): string {
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + units[n % 10] : "");
    }
    if (n < 1000) {
      return (
        units[Math.floor(n / 100)] +
        " Hundred" +
        (n % 100 !== 0 ? " " + convert(n % 100) : "")
      );
    }
    if (n < 100000) {
      return (
        convert(Math.floor(n / 1000)) +
        " Thousand" +
        (n % 1000 !== 0 ? " " + convert(n % 1000) : "")
      );
    }
    if (n < 10000000) {
      return (
        convert(Math.floor(n / 100000)) +
        " Lakh" +
        (n % 100000 !== 0 ? " " + convert(n % 100000) : "")
      );
    }
    return (
      convert(Math.floor(n / 10000000)) +
      " Crore" +
      (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "")
    );
  }
  
  return convert(Math.abs(Math.round(num)));
}

// -----------------------
// Interface: Calculator Inputs and Results
// -----------------------
interface CalculatorInputs {
  evPrice: string;             // EV Price (INR)
  fuelVehiclePrice: string;    // Fuel Vehicle Price (INR)
  evRange: string;             // EV Range (km/charge)
  fuelMileage: string;         // Fuel Mileage (km/L)
  electricityPrice: string;    // Electricity Price (INR/kWh)
  fuelPrice: string;           // Fuel Price (INR/L)
  dailyDriving: string;        // Daily Driving Distance (km)
  annualEVMaintenance: string; // Annual EV Maintenance (INR)
  annualFuelMaintenance: string; // Annual Fuel Maintenance (INR)
  evIncentives?: string;       // EV Purchase Incentives (Optional, INR)
}

interface YearlyCost {
  year: number;
  evCumulative: number;
  fuelCumulative: number;
}

interface Results {
  cumulativeEVCost: number;     // EV TCO after 5 years
  cumulativeFuelCost: number;   // Fuel TCO after 5 years
  breakEvenYear: number | null; // First year where EV becomes cheaper than Fuel
  savings: number;              // Total difference (Fuel - EV)
  co2Savings: number;           // Annual CO₂ saved (kg/year)
  yearWise: YearlyCost[];       // Year-by-year cost breakdown
}

// -----------------------
// Updated TooltipIcon Component
// Uses primary colour (#108e66) with white text
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
// Utility: Number to Words Percent Converter
// -----------------------
const numberToWordsPercent = (value: number): string => {
  if (value === undefined || value === null) return "";
  if (Number.isInteger(value)) return numberToWords(value) + " percent";
  const intPart = Math.floor(value);
  const decimalPart = Math.round((value - intPart) * 10);
  return `${numberToWords(intPart)} point ${numberToWords(decimalPart)} percent`;
};

// -----------------------
// Main Fuel vs. Electric Vehicle Calculator Component
// -----------------------
const FuelvsElectricCalculator: React.FC = () => {
  // Separate input states for 2 Wheeler and 4 Wheeler; default to 4 Wheeler
  const initialInputs: CalculatorInputs = {
    evPrice: "",
    fuelVehiclePrice: "",
    evRange: "",
    fuelMileage: "",
    electricityPrice: "",
    fuelPrice: "",
    dailyDriving: "",
    annualEVMaintenance: "",
    annualFuelMaintenance: "",
    evIncentives: "",
  };

  const [inputs2Wheeler, setInputs2Wheeler] = useState<CalculatorInputs>(initialInputs);
  const [inputs4Wheeler, setInputs4Wheeler] = useState<CalculatorInputs>(initialInputs);
  const [vehicleType, setVehicleType] = useState<"2 Wheeler" | "4 Wheeler">("4 Wheeler");
  const [currentInputs, setCurrentInputs] = useState<CalculatorInputs>(inputs4Wheeler);
  const [errors, setErrors] = useState<Partial<CalculatorInputs>>({});
  const [results, setResults] = useState<Results | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Analysis period fixed at 5 years
  const analysisYears = 5;
  // Battery capacity: 2.5 kWh for 2 Wheeler, 50 kWh for 4 Wheeler
  const batteryCapacity = vehicleType === "2 Wheeler" ? 2.5 : 50;
  // Environmental Impact container ref (if needed)
  const envImpactRef = useRef<HTMLDivElement>(null);

  // -----------------------
  // Toggle between 2 Wheeler and 4 Wheeler
  // -----------------------
  const handleVehicleTypeToggle = (newType: "2 Wheeler" | "4 Wheeler") => {
    if (vehicleType !== newType) {
      // Save current inputs to appropriate state
      if (vehicleType === "2 Wheeler") {
        setInputs2Wheeler(currentInputs);
      } else {
        setInputs4Wheeler(currentInputs);
      }
      // Switch vehicle type and load stored inputs for new type
      setVehicleType(newType);
      setResults(null); // reset previous results
      setCurrentInputs(newType === "2 Wheeler" ? inputs2Wheeler : inputs4Wheeler);
    }
  };

  // -----------------------
  // Handle input changes
  // -----------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInputs((prev) => ({ ...prev, [name]: value }));
  };

  // -----------------------
  // Validate required fields
  // -----------------------
  const validateInputs = (): boolean => {
    const newErrors: Partial<CalculatorInputs> = {};
    const required: (keyof CalculatorInputs)[] = [
      "evPrice",
      "fuelVehiclePrice",
      "evRange",
      "fuelMileage",
      "electricityPrice",
      "fuelPrice",
      "dailyDriving",
      "annualEVMaintenance",
      "annualFuelMaintenance",
    ];
    required.forEach((field) => {
      const val = currentInputs[field];
      if (!val || isNaN(Number(val)) || Number(val) < 0) {
        newErrors[field] = "Please enter a valid number";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -----------------------
  // Main Calculation Logic (unchanged)
  // -----------------------
  const calculateResults = () => {
    if (!validateInputs()) return;
    setIsCalculating(true);

    const evPrice = parseFloat(currentInputs.evPrice);
    const fuelVehiclePrice = parseFloat(currentInputs.fuelVehiclePrice);
    const evRange = parseFloat(currentInputs.evRange);
    const fuelMileage = parseFloat(currentInputs.fuelMileage);
    const electricityPrice = parseFloat(currentInputs.electricityPrice);
    const fuelPrice = parseFloat(currentInputs.fuelPrice);
    const dailyDriving = parseFloat(currentInputs.dailyDriving);
    const annualEVMaintenance = parseFloat(currentInputs.annualEVMaintenance);
    const annualFuelMaintenance = parseFloat(currentInputs.annualFuelMaintenance);
    const evIncentives = currentInputs.evIncentives ? parseFloat(currentInputs.evIncentives) : 0;

    // Calculate annual and total driving distance
    const annualDistance = dailyDriving * 365;
    const totalDistance = annualDistance * analysisYears;

    // Total fuel cost and electricity cost over 5 years
    const totalFuelCost = (annualDistance / fuelMileage) * fuelPrice * analysisYears;
    const totalElectricityCost = (annualDistance / evRange) * batteryCapacity * electricityPrice * analysisYears;

    // Maintenance cost over 5 years
    const totalEVMaintenance = annualEVMaintenance * analysisYears;
    const totalFuelMaintenance = annualFuelMaintenance * analysisYears;

    // Total Cost of Ownership (TCO) calculations
    const tcoEV = (evPrice - evIncentives) + totalElectricityCost + totalEVMaintenance;
    const tcoFuel = fuelVehiclePrice + totalFuelCost + totalFuelMaintenance;

    // Compute cumulative costs year by year
    let cumulativeEVCost = evPrice - evIncentives;
    let cumulativeFuelCost = fuelVehiclePrice;
    let breakEvenYear: number | null = null;
    const yearWise: YearlyCost[] = [];
    const annualFuelCost = (annualDistance / fuelMileage) * fuelPrice + annualFuelMaintenance;
    const annualEVCost = (annualDistance / evRange) * batteryCapacity * electricityPrice + annualEVMaintenance;

    for (let i = 1; i <= analysisYears; i++) {
      cumulativeEVCost += annualEVCost;
      cumulativeFuelCost += annualFuelCost;
      yearWise.push({
        year: i,
        evCumulative: parseFloat(cumulativeEVCost.toFixed(2)),
        fuelCumulative: parseFloat(cumulativeFuelCost.toFixed(2)),
      });
      if (breakEvenYear === null && cumulativeEVCost < cumulativeFuelCost) {
        breakEvenYear = i;
      }
    }

    const savings = cumulativeFuelCost - cumulativeEVCost;

    // Environmental Impact: approximate CO₂ savings (assume 2.3 kg CO₂ per liter)
    const litersPerYear = annualDistance / fuelMileage;
    const co2Savings = litersPerYear * 2.3;

    setResults({
      cumulativeEVCost: parseFloat(cumulativeEVCost.toFixed(2)),
      cumulativeFuelCost: parseFloat(cumulativeFuelCost.toFixed(2)),
      breakEvenYear,
      savings: parseFloat(savings.toFixed(2)),
      co2Savings: parseFloat(co2Savings.toFixed(2)),
      yearWise,
    });
    setIsCalculating(false);
  };

  // -----------------------
  // Prepare Chart Data
  // -----------------------
  const lineChartData =
    results &&
    results.yearWise.map((item) => ({
      year: item.year,
      "EV TCO": item.evCumulative,
      "Fuel TCO": item.fuelCumulative,
    }));

  // -----------------------
  // Recommendation based on savings
  // -----------------------
  const recommendation =
    results && results.savings > 0
      ? `Over 5 years, the EV is cheaper by about ₹${results.savings.toLocaleString("en-IN")}.`
      : results && results.savings < 0
      ? `Over 5 years, the fuel vehicle is cheaper by about ₹${Math.abs(results.savings).toLocaleString("en-IN")}.`
      : "";

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

      <h1 className="title">Fuel vs. Electric Vehicle Calculator</h1>
      <p className="description">
        Compare the 5-year total cost of ownership for a 2 Wheeler or 4 Wheeler EV versus a fuel-based vehicle.
      </p>

      {/* -----------------------
          Toggle for Vehicle Type
      ----------------------- */}
      <div className="toggle-container">
        <button
          onClick={() => handleVehicleTypeToggle("2 Wheeler")}
          className={vehicleType === "2 Wheeler" ? "toggle-button active" : "toggle-button"}
        >
          2 Wheeler
        </button>
        <button
          onClick={() => handleVehicleTypeToggle("4 Wheeler")}
          className={vehicleType === "4 Wheeler" ? "toggle-button active" : "toggle-button"}
        >
          4 Wheeler
        </button>
      </div>

      {/* -----------------------
          Input Form
      ----------------------- */}
      <div className="form-container">
        <h2 className="section-title">Vehicle & Running Cost Details ({vehicleType})</h2>
        <div className="input-group">
          <label>
            <span className="input-label">
              EV Price (INR)
              <TooltipIcon text="Purchase price of the electric vehicle" />
            </span>
            <input
              type="number"
              name="evPrice"
              value={currentInputs.evPrice}
              onChange={handleInputChange}
              placeholder="e.g., 150000 (2W) / 1200000 (4W)"
            />
            {currentInputs.evPrice && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.evPrice))} Rupees</p>
            )}
            {errors.evPrice && <span className="error">{errors.evPrice}</span>}
          </label>
          <label>
            <span className="input-label">
              Fuel Vehicle Price (INR)
              <TooltipIcon text="Purchase price of the petrol/diesel vehicle" />
            </span>
            <input
              type="number"
              name="fuelVehiclePrice"
              value={currentInputs.fuelVehiclePrice}
              onChange={handleInputChange}
              placeholder="e.g., 100000 (2W) / 1000000 (4W)"
            />
            {currentInputs.fuelVehiclePrice && (
              <p className="converter">
                {numberToWords(parseFloat(currentInputs.fuelVehiclePrice))} Rupees
              </p>
            )}
            {errors.fuelVehiclePrice && <span className="error">{errors.fuelVehiclePrice}</span>}
          </label>
          <label>
            <span className="input-label">
              EV Range (km/charge)
              <TooltipIcon text="Distance the EV can travel on a full charge" />
            </span>
            <input
              type="number"
              name="evRange"
              value={currentInputs.evRange}
              onChange={handleInputChange}
              placeholder="e.g., 75 (2W) / 300 (4W)"
            />
            {currentInputs.evRange && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.evRange))} Kilometers</p>
            )}
            {errors.evRange && <span className="error">{errors.evRange}</span>}
          </label>
          <label>
            <span className="input-label">
              Fuel Mileage (km/L)
              <TooltipIcon text="Fuel mileage in km per liter" />
            </span>
            <input
              type="number"
              name="fuelMileage"
              value={currentInputs.fuelMileage}
              onChange={handleInputChange}
              placeholder="e.g., 40 (2W) / 15 (4W)"
            />
            {currentInputs.fuelMileage && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.fuelMileage))} km/L</p>
            )}
            {errors.fuelMileage && <span className="error">{errors.fuelMileage}</span>}
          </label>
          <label>
            <span className="input-label">
              Electricity Price (INR/kWh)
              <TooltipIcon text="Cost of electricity per kWh" />
            </span>
            <input
              type="number"
              name="electricityPrice"
              value={currentInputs.electricityPrice}
              onChange={handleInputChange}
              placeholder="e.g., 8"
            />
            {currentInputs.electricityPrice && (
              <p className="converter">
                {numberToWords(parseFloat(currentInputs.electricityPrice))} Rupees/kWh
              </p>
            )}
            {errors.electricityPrice && <span className="error">{errors.electricityPrice}</span>}
          </label>
          <label>
            <span className="input-label">
              Fuel Price (INR/L)
              <TooltipIcon text="Fuel price per liter" />
            </span>
            <input
              type="number"
              name="fuelPrice"
              value={currentInputs.fuelPrice}
              onChange={handleInputChange}
              placeholder="e.g., 100"
            />
            {currentInputs.fuelPrice && (
              <p className="converter">
                {numberToWords(parseFloat(currentInputs.fuelPrice))} Rupees/L
              </p>
            )}
            {errors.fuelPrice && <span className="error">{errors.fuelPrice}</span>}
          </label>
          <label>
            <span className="input-label">
              Daily Driving Distance (km)
              <TooltipIcon text="Average daily driving distance" />
            </span>
            <input
              type="number"
              name="dailyDriving"
              value={currentInputs.dailyDriving}
              onChange={handleInputChange}
              placeholder="e.g., 40"
            />
            {currentInputs.dailyDriving && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.dailyDriving))} Kilometers</p>
            )}
            {errors.dailyDriving && <span className="error">{errors.dailyDriving}</span>}
          </label>
          <label>
            <span className="input-label">
              Annual EV Maintenance (INR)
              <TooltipIcon text="Estimated annual maintenance cost for the EV" />
            </span>
            <input
              type="number"
              name="annualEVMaintenance"
              value={currentInputs.annualEVMaintenance}
              onChange={handleInputChange}
              placeholder="e.g., 2000 (2W) / 5000 (4W)"
            />
            {currentInputs.annualEVMaintenance && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.annualEVMaintenance))} Rupees/year</p>
            )}
            {errors.annualEVMaintenance && <span className="error">{errors.annualEVMaintenance}</span>}
          </label>
          <label>
            <span className="input-label">
              Annual Fuel Maintenance (INR)
              <TooltipIcon text="Estimated annual maintenance cost for the fuel vehicle" />
            </span>
            <input
              type="number"
              name="annualFuelMaintenance"
              value={currentInputs.annualFuelMaintenance}
              onChange={handleInputChange}
              placeholder="e.g., 1000 (2W) / 15000 (4W)"
            />
            {currentInputs.annualFuelMaintenance && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.annualFuelMaintenance))} Rupees/year</p>
            )}
            {errors.annualFuelMaintenance && <span className="error">{errors.annualFuelMaintenance}</span>}
          </label>
          <label>
            <span className="input-label">
              EV Purchase Incentives (Optional)
              <TooltipIcon text="Any subsidy or discount for EV purchase" />
            </span>
            <input
              type="number"
              name="evIncentives"
              value={currentInputs.evIncentives}
              onChange={handleInputChange}
              placeholder="e.g., 20000"
            />
            {currentInputs.evIncentives && (
              <p className="converter">{numberToWords(parseFloat(currentInputs.evIncentives))} Rupees</p>
            )}
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
          <h2 className="results-title">5-Year TCO Comparison</h2>
          <div className="summary-card">
            <div className="summary-item">
              <strong>EV Total Cost (5 Years):</strong> ₹{results.cumulativeEVCost.toLocaleString("en-IN")}
            </div>
            <div className="summary-item">
              <strong>Fuel Vehicle Total Cost (5 Years):</strong> ₹{results.cumulativeFuelCost.toLocaleString("en-IN")}
            </div>
            <div className="summary-item">
              <strong>Break-even Year:</strong> {results.breakEvenYear ? results.breakEvenYear : "Not reached"}
            </div>
            <div className="summary-item">
              <strong>Total Difference:</strong> ₹{results.savings.toLocaleString("en-IN")}
            </div>
            <div className="summary-item">
              <strong>Recommendation:</strong> {recommendation}
            </div>
          </div>

          <h2 className="results-title">Year-wise Cost Projection</h2>
          <div className="chart-explanation">
            <p>
              The chart below shows the cumulative total cost for both EV and fuel vehicles over 5 years.
              Hover over the chart for detailed values.
            </p>
          </div>
          <div className="chart-toggle">
            <button onClick={() => setChartType("line")} className={chartType === "line" ? "active" : ""}>
              Line Chart
            </button>
            <button onClick={() => setChartType("bar")} className={chartType === "bar" ? "active" : ""}>
              Bar Chart
            </button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="90%" height={300}>
              {chartType === "line" ? (
                <LineChart
                  data={lineChartData}
                  margin={{ left: 50, right: 30, top: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: "Year", position: "insideBottom", offset: -5 }} />
                  <YAxis tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                  <RechartsTooltip formatter={(value: number) => "₹" + Math.round(value).toLocaleString("en-IN")} />
                  <Legend />
                  {/* Use green for EV and purple for Fuel */}
                  <Line type="monotone" dataKey="EV TCO" stroke="#108e66" strokeWidth={2} name="EV Total Cost" />
                  <Line type="monotone" dataKey="Fuel TCO" stroke="#525ECC" strokeWidth={2} name="Fuel Vehicle Total Cost" />
                </LineChart>
              ) : (
                <BarChart
                  data={results.yearWise.map((y) => ({
                    year: y.year,
                    "EV TCO": y.evCumulative,
                    "Fuel TCO": y.fuelCumulative,
                  }))}
                  margin={{ left: 50, right: 30, top: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis tickFormatter={(val) => "₹" + val.toLocaleString("en-IN")} />
                  <RechartsTooltip formatter={(value: number) => "₹" + Math.round(value).toLocaleString("en-IN")} />
                  <Legend />
                  <Bar dataKey="EV TCO" fill="#108e66" name="EV Total Cost" />
                  <Bar dataKey="Fuel TCO" fill="#525ECC" name="Fuel Vehicle Total Cost" />
                </BarChart>
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
              This calculator assumes a 5-year usage period. Resale values or financing costs are not included.
            </li>
            <li>
              Maintenance costs, battery capacity, and other inputs are estimates—adjust them to match your actual usage.
            </li>
            <li>
              Environmental impact only accounts for direct CO₂ savings from not burning fuel. Electricity generation sources may vary.
            </li>
            <li>
              Results are for reference only; consult a financial advisor before making major vehicle purchase decisions.
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
        .toggle-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .toggle-button {
          background: transparent;
          border: 1px solid #272b2a;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 4px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        .toggle-button.active {
          background: #108e66;
          color: #fcfffe;
          border-color: #108e66;
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
        .input-group input {
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
          font-size: 0.85rem;
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
        .env-impact-container {
          background: #fff;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid #3E4799;
          margin-bottom: 2rem;
        }
        .env-impact-content {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: space-between;
          align-items: center;
        }
        .env-impact-value {
          flex: 1;
          text-align: center;
        }
        .env-impact-number {
          font-size: 2rem;
          font-weight: bold;
          color: #108e66;
        }
        .env-impact-details {
          flex: 2;
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
          .env-impact-content {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default FuelvsElectricCalculator;
