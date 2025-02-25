// app/tools/page.tsx
import React from 'react';
import Link from 'next/link';

const calculators = [
  {
    id: 1,
    title: 'Should I Buy or Rent a Home?',
    description: "Analyze whether it's more cost-effective to buy a house or continue renting.",
    slug: 'buyVsRent',  // changed from "hreffslug" to "slug"
  },
  {
    id: 2,
    title: 'Buy a Car vs. Commute Calculator',
    description: 'Compare the costs of owning a car versus using alternative commuting options.',
    slug: 'carVsCommute',
  },
  {
    id: 3,
    title: 'EMI Calculator',
    description: 'Estimate monthly loan payments for car, home, or other loans.',
    slug: 'emiCalculator',
  },
  {
    id: 4,
    title: 'Endowment Calculator',
    description: 'Determine whether to continue your endowment policy or surrender it.',
    slug: 'endowmentVsTerm',
  },
  {
    id: 5,
    title: 'FD vs RD Calculator',
    description: 'Project maturity values and growth for Fixed and Recurring Deposits.',
    slug: 'fdRdCalculator',
  },
  {
    id: 6,
    title: 'FD-Based Retirement Calculator',
    description: 'Plan your retirement corpus using FD-based projections.',
    slug: 'fdRetirementCalculator',
  },
  {
    id: 7,
    title: 'FIRE Calculator',
    description: 'Evaluate if 25x your annual expenses is enough for early retirement.',
    slug: 'fireCalculator',
  },
  {
    id: 8,
    title: 'When Will I Make My First Crore?',
    description: 'Find out how long it takes to accumulate ₹1 crore based on your investments.',
    slug: 'firstCrore',
  },
  {
    id: 9,
    title: 'Fuel vs. Electric Vehicle Calculator',
    description: 'Compare long-term costs of fuel-based versus electric vehicles.',
    slug: 'fuelVsEv',
  },
  {
    id: 10,
    title: 'Hourly Wage Calculator',
    description: 'Convert your annual or monthly salary into an hourly wage.',
    slug: 'hourlyWage',
  },
  {
    id: 11,
    title: 'MBA ROI Calculator',
    description: 'Assess lost earnings during an MBA versus potential salary growth post-MBA.',
    slug: 'mbaRoi',
  },
  {
    id: 12,
    title: 'Mutual Fund vs. NPS Tier I Calculator',
    description: 'Compare market-driven Mutual Funds with government-backed NPS Tier I investments.',
    slug: 'npsVsMf',
  },
  {
    id: 13,
    title: 'CTC vs. In-Hand Salary Calculator',
    description: 'Break down your Cost-to-Company into net monthly take-home pay.',
    slug: 'salaryCalculator',
  },
  {
    id: 14,
    title: 'SIP Calculator',
    description: 'Explore potential returns of Systematic Investment Plans over time.',
    slug: 'sipCalculator',
  },
  {
    id: 15,
    title: 'Sukanya Samriddhi Yojana Calculator',
    description: 'Compute maturity amounts and benefits of the SSY savings scheme.',
    slug: 'sukanyaSamruddhi',
  },
];

export default function ToolsPage() {
  return (
    <div className="space-y-16">
      {/* Hero / Intro */}
      <section className="bg-gradient-to-r from-[#CAEF7D] to-[#FCFFEE] py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B1F13] mb-4">
          Tools Dashboard
        </h1>
        <p className="text-lg md:text-xl text-[#1B1F13] max-w-2xl mx-auto">
          Explore our suite of financial calculators designed to help you plan, track, and optimize your finances.
        </p>
      </section>

      {/* Tools Navigation */}
      <nav className="container mx-auto px-4">
        <ul className="flex justify-center space-x-6">
          <li>
            <Link href="/tools" className="text-[#1B1F13] hover:text-[#CAEF7D] font-medium">
              All Calculators
            </Link>
          </li>
          <li>
            <Link href="/tools/popular" className="text-[#1B1F13] hover:text-[#CAEF7D] font-medium">
              Popular
            </Link>
          </li>
          <li>
            <Link href="/tools/new" className="text-[#1B1F13] hover:text-[#CAEF7D] font-medium">
              New
            </Link>
          </li>
        </ul>
      </nav>

      {/* Calculators Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculators.map((calc) => (
            <div
              key={calc.id}
              className="bg-white rounded-md p-6 shadow hover:shadow-xl transition flex flex-col"
            >
              <h2 className="text-2xl font-bold text-[#1B1F13] mb-3">{calc.title}</h2>
              <p className="text-[#1B1F13] mb-6 flex-grow">{calc.description}</p>
              <Link
                href={`/tools/${calc.slug}`}
                className="inline-block bg-[#1B1F13] text-[#FCFFEE] px-4 py-2 rounded-md hover:bg-[#CAEF7D] transition text-center"
              >
                Calculate
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
