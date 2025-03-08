// app/tools/page.tsx
"use client";
import React from "react";
import Link from "next/link";

// Three additional placeholder tools to appear at the top
const additionalCalculators = [
  {
    id: 16,
    title: "Placeholder Tool 1",
    description: "This is a placeholder tool for future features.",
    slug: "placeholder-tool-1",
  },
  {
    id: 17,
    title: "Placeholder Tool 2",
    description: "This is a placeholder tool for future features.",
    slug: "placeholder-tool-2",
  },
  {
    id: 18,
    title: "Placeholder Tool 3",
    description: "This is a placeholder tool for future features.",
    slug: "placeholder-tool-3",
  },
];

// Existing calculators list
const baseCalculators = [
  {
    id: 1,
    title: "Should I Buy or Rent a Home?",
    description: "Analyze whether it's more cost-effective to buy a house or continue renting.",
    slug: "buyVsRent",
  },
  {
    id: 2,
    title: "Buy a Car vs. Commute Calculator",
    description: "Compare the costs of owning a car versus using alternative commuting options.",
    slug: "carVsCommute",
  },
  {
    id: 3,
    title: "EMI Calculator",
    description: "Estimate monthly loan payments for car, home, or other loans.",
    slug: "emiCalculator",
  },
  {
    id: 4,
    title: "Endowment Calculator",
    description: "Determine whether to continue your endowment policy or surrender it.",
    slug: "endowmentVsTerm",
  },
  {
    id: 5,
    title: "FD vs RD Calculator",
    description: "Project maturity values and growth for Fixed and Recurring Deposits.",
    slug: "fdRdCalculator",
  },
  {
    id: 6,
    title: "FD-Based Retirement Calculator",
    description: "Plan your retirement corpus using FD-based projections.",
    slug: "fdRetirementCalculator",
  },
  {
    id: 7,
    title: "FIRE Calculator",
    description: "Evaluate if 25x your annual expenses is enough for early retirement.",
    slug: "fireCalculator",
  },
  {
    id: 8,
    title: "When Will I Make My First Crore?",
    description: "Find out how long it takes to accumulate ₹1 crore based on your investments.",
    slug: "firstCrore",
  },
  {
    id: 9,
    title: "Fuel vs. Electric Vehicle Calculator",
    description: "Compare long-term costs of fuel-based versus electric vehicles.",
    slug: "fuelVsEv",
  },
  {
    id: 10,
    title: "Hourly Wage Calculator",
    description: "Convert your annual or monthly salary into an hourly wage.",
    slug: "hourlyWage",
  },
  {
    id: 11,
    title: "MBA ROI Calculator",
    description: "Assess lost earnings during an MBA versus potential salary growth post-MBA.",
    slug: "mbaRoi",
  },
  {
    id: 12,
    title: "Mutual Fund vs. NPS Tier I Calculator",
    description: "Compare market-driven Mutual Funds with government-backed NPS Tier I investments.",
    slug: "npsVsMf",
  },
  {
    id: 13,
    title: "CTC vs. In-Hand Salary Calculator",
    description: "Break down your Cost-to-Company into net monthly take-home pay.",
    slug: "salaryCalculator",
  },
  {
    id: 14,
    title: "SIP Calculator",
    description: "Explore potential returns of Systematic Investment Plans over time.",
    slug: "sipCalculator",
  },
  {
    id: 15,
    title: "Sukanya Samriddhi Yojana Calculator",
    description: "Compute maturity amounts and benefits of the SSY savings scheme.",
    slug: "sukanyaSamruddhi",
  },
];

// Merge additional tools on top of the existing calculators
const calculators = [...additionalCalculators, ...baseCalculators];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Hero / Intro Section without gradients */}
      <section className="bg-[#108e66] py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#fcfffe] mb-2">
            Plan, Calculate & Succeed
          </h1>
          <p className="text-lg md:text-xl text-[#fcfffe] mb-8">
            Your trusted suite of financial tools for clear, straightforward planning.
          </p>
        </div>
      </section>

      {/* Calculators Grid Section */}
      <section className="container py-16 px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-[#F0FAF7] flex border border-[#108E66] rounded-md p-6 shadow hover:shadow-2xl transition flex flex-col"
            >
              <h2 className="text-xl text-[#272B2A] font-medium mb-2">{calc.title}</h2>
              <p className="text-[#272B2A] mb-6 flex-grow break-words">{calc.description}</p>
              <Link
                href={`/tools/${calc.slug}`}
                className="flex border border-[#108E66] gap-[6px] px-4 py-2 rounded-md bg-white hover:bg-white transition text-center text-[#108E66] font-medium"
              >
                Check Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
