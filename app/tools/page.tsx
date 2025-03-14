// app/tools/page.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import sideArrow from "../../public/Arrow 1.svg";
import FAQAccordion from "../components/FAQAccordion";

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

const faqs = [
  {
    question: "How do I start my financial planning journey with Spring Money?",
    answer:
      "Connect with us on WhatsApp, and our SEBI-registered experts will assess your needs and guide you toward the right plan.",
  },
  {
    question: "What makes Spring Money different from other financial advisory platforms?",
    answer:
      "We connect you directly with SEBI-registered experts who provide unbiased, personalized guidance with transparency and actionable strategies.",
  },
  {
    question: "Do I need a high income to benefit from financial planning?",
    answer:
      "Not at all. Our strategies are tailored for every stage of your financial journey, whether you're starting out or managing substantial wealth.",
  },
  {
    question: "Is my data secure with Spring Money?",
    answer: "Yes. We follow strict data protection policies to keep your financial information safe.",
  },
  {
    question: "How do I access the free financial calculators?",
    answer:
      "Simply explore our tools on the website. For detailed analysis, we can send a personalized report directly to your WhatsApp.",
  },
  {
    question: "How much does a financial planning consultation cost?",
    answer:
      "We offer both one-time and comprehensive planning options. Pricing depends on your unique needs. Contact us on WhatsApp to discuss the best plan for you.",
  },
];

// Existing calculators list
const baseCalculators = [
  {
    id: 1,
    title: "Should I Buy or Rent a Home?",
    description:
      "Analyze whether it's more cost-effective to buy a house or continue renting.",
    slug: "buyVsRent",
  },
  {
    id: 2,
    title: "Buy a Car vs. Commute Calculator",
    description:
      "Compare the costs of owning a car versus using alternative commuting options.",
    slug: "carVsCommute",
  },
  {
    id: 3,
    title: "EMI Calculator",
    description:
      "Estimate monthly loan payments for car, home, or other loans.",
    slug: "emiCalculator",
  },
  {
    id: 4,
    title: "Endowment Calculator",
    description:
      "Determine whether to continue your endowment policy or surrender it.",
    slug: "endowmentVsTerm",
  },
  {
    id: 5,
    title: "FD vs RD Calculator",
    description:
      "Project maturity values and growth for Fixed and Recurring Deposits.",
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
    description:
      "Evaluate if 25x your annual expenses is enough for early retirement.",
    slug: "fireCalculator",
  },
  {
    id: 8,
    title: "When Will I Make My First Crore?",
    description:
      "Find out how long it takes to accumulate ₹1 crore based on your investments.",
    slug: "firstCrore",
  },
  {
    id: 9,
    title: "Fuel vs. Electric Vehicle Calculator",
    description:
      "Compare long-term costs of fuel-based versus electric vehicles.",
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
    description:
      "Assess lost earnings during an MBA versus potential salary growth post-MBA.",
    slug: "mbaRoi",
  },
  {
    id: 12,
    title: "Mutual Fund vs. NPS Tier I Calculator",
    description:
      "Compare market-driven Mutual Funds with government-backed NPS Tier I investments.",
    slug: "npsVsMf",
  },
  {
    id: 13,
    title: "CTC vs. In-Hand Salary Calculator",
    description:
      "Break down your Cost-to-Company into net monthly take-home pay.",
    slug: "salaryCalculator",
  },
  {
    id: 14,
    title: "SIP Calculator",
    description:
      "Explore potential returns of Systematic Investment Plans over time.",
    slug: "sipCalculator",
  },
  {
    id: 15,
    title: "Sukanya Samriddhi Yojana Calculator",
    description:
      "Compute maturity amounts and benefits of the SSY savings scheme.",
    slug: "sukanyaSamruddhi",
  },
];

// Merge additional tools on top of the existing calculators
const calculators = [...baseCalculators];

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      {/* Hero / Intro Section without gradients */}
      <div className="flex flex-col gap-2 text-center mt-12">
        <p className="text-[#108E66] text-[40px] font-semibold">
          Smart Financial Tools
        </p>
        <p className="text-[#108E66] text-xl font-normal">
          Experience innovative, tailored, and comprehensive financial planning
          for every stage of your life.
        </p>
      </div>

      {/* Calculators Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:px-[60px] pb-12">
        {calculators.map((calc) => (
          <div
            key={calc.id}
            className="bg-[#F0FAF7] border border-[#108e6633] p-4 rounded-2xl shadow-md  items-start hover:shadow-xl transition-shadow flex flex-col"
          >
            <h2 className="text-xl text-[#272B2A] font-medium mb-2">
              {calc.title}
            </h2>
            <p className="mb-6 text-[#272b2ae6] text-base font-normal text-start flex-grow">
              {calc.description}
            </p>
            <Link
              href={`/tools/${calc.slug}`}
              className="flex border border-[#108E66] gap-[6px] px-4 py-2 rounded-md hover:bg-[#108E66] transition text-center"
            >
              <p className="text-base font-semibold text-[#108E66] hover:text-white">
                Check Now
              </p>
              <Image src={sideArrow} width={10} height={10} alt="right arrow" />
            </Link>
          </div>
        ))}
      </div>

      <section className="py-16  bg-[#F0FAF7]">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <p className="text-[#272B2A] text-[40px] font-semibold">
            Our Mission & Vision
          </p>
          <p className="text-[#272B2A] text-xl font-normal">
            Spring Money believes in making expert financial advice accessible.
            Our core values drive us to deliver simple, transparent, and
            effective financial planning.
          </p>
          <Link
            href="/services"
            className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
          >
            Learn More About Our Financial Planning
          </Link>
        </div>
      </section>

      <FAQAccordion faqs={faqs}/>
    </div>
  );
}
