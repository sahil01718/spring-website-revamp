"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import FAQAccordion from "./components/FAQAccordion";
import sideArrow from "../public/Arrow 1.svg";
import CarouselCards from "./components/CarouselCards";

/* ---------------------------------
   Carousel Component with Auto-Scrolling Animation
--------------------------------- */
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden w-full">
    <div className="flex space-x-4 animate-autoScroll w-max">{children}</div>
  </div>
);

interface WhoWeServeCardsProps {
  img: string;
  heading: string;
  subHeading: string;
}

/* ---------------------------------
   Who We Serve Section Data
--------------------------------- */
const professionalSolutions = [
  {
    id: 1,
    title: "Young Professionals",
    tagline: "Start Strong, Stay Ahead!",
    description:
      "Tailored strategies for early career growth and smart investments.",
  },
  {
    id: 2,
    title: "MBA Graduates",
    tagline: "Smart Money Moves for Smart MBAs!",
    description:
      "Optimize high-income potential with strategic planning and tax-efficient investments.",
  },
  {
    id: 3,
    title: "IT Professionals",
    tagline: "Maximize Earnings, Build Wealth Like a Pro!",
    description:
      "Diversified investment strategies and ESOP planning to secure financial independence.",
  },
  {
    id: 4,
    title: "Doctors & Medical Professionals",
    tagline: "You Care for Patients, We Care for Your Wealth!",
    description:
      "Structured roadmaps for managing loans, optimizing taxes, and planning retirement.",
  },
  {
    id: 5,
    title: "Lawyers & Legal Professionals",
    tagline: "Win in Court, Win with Your Money!",
    description:
      "Manage irregular income and tax liabilities with strategic investment plans.",
  },
  {
    id: 6,
    title: "Armed Forces & Government Officials",
    tagline: "Secure Your Future While Serving the Nation!",
    description:
      "Pension maximization, tax-efficient investments, and real estate advisory.",
  },
  {
    id: 7,
    title: "Professional Athletes",
    tagline: "Short Careers, Lifelong Wealth!",
    description:
      "Wealth preservation, passive income, and tax-efficient plans for long-term security.",
  },
  {
    id: 8,
    title: "Startup Founders & Entrepreneurs",
    tagline: "Scale Your Startup, Scale Your Wealth!",
    description:
      "Structured wealth-building plans balancing reinvestment and long-term planning.",
  },
  {
    id: 9,
    title: "Engineers & Architects",
    tagline: "Design the Future, Build Your Wealth!",
    description:
      "Optimizing tax strategies and planning for early retirement with tailored investments.",
  },
  {
    id: 10,
    title: "Teachers & Professors",
    tagline: "Shape Minds, Secure Your Future!",
    description:
      "Smart savings, side-income strategies, and pension planning for educators.",
  },
  {
    id: 11,
    title: "Media & Creative Professionals",
    tagline: "Transform Creativity into Wealth!",
    description:
      "Manage irregular income with smart tax planning and secure investment strategies.",
  },
  {
    id: 12,
    title: "Freelancers & Consultants",
    tagline: "From Irregular Income to Consistent Wealth!",
    description:
      "Income stabilization and tax-efficient financial roadmaps for independent professionals.",
  },
  {
    id: 13,
    title: "Real Estate Agents & Investors",
    tagline: "Build Properties, Build Your Empire!",
    description:
      "Optimize commissions and create diversified portfolios for sustained wealth.",
  },
  {
    id: 14,
    title: "Finance Experts",
    tagline: "Optimize Your Finances!",
    description:
      "Customized strategies for financial professionals to manage and grow wealth.",
  },
  {
    id: 15,
    title: "Government Officials",
    tagline: "Secure Your Future!",
    description:
      "Tailored plans focusing on pension maximization and secure investments.",
  },
];

/* ---------------------------------
   Tools (Calculators) Data for Home Page
   (Three new placeholder tools are added on top)
--------------------------------- */
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
const calculators = [...baseCalculators];

/* ---------------------------------
   HomePage Component
--------------------------------- */

const faqs = [
  {
    question: "Who are the financial advisors on Spring Money?",
    answer:
      "Our network consists exclusively of SEBI-registered investment advisors. This ensures that you receive expert financial guidance from professionals who are regulated and held to the highest ethical and professional standards.",
  },
  {
    question:
      "How does Spring Money connect me with an advisor?",
    answer:
      "To begin, simply reach out to us via WhatsApp. We'll initiate a conversation to understand your specific financial goals, current situation, and preferences. Based on this, we'll match you with a suitable advisor from our network. This personalized approach ensures you find an advisor whose expertise aligns with your needs.",
  },
  {
    question: "What types of financial planning do you offer?",
    answer:
      "Our partner advisors provide personalized financial planning services designed to address your unique circumstances. They offer a comprehensive suite of solutions, encompassing everything from holistic financial planning that integrates investments, retirement, insurance, tax optimization, debt management, and budgeting, to focused strategies for building and managing your investment portfolio. Additionally, they specialize in retirement planning to ensure a secure future and goal-based planning to help you achieve specific financial objectives like homeownership or educational funding.",
  },
  {
    question: "Is Spring Money suitable for all income levels?",
    answer:
      "Yes, absolutely. We believe that everyone deserves access to quality financial advice. Our services are designed to be flexible and adaptable, catering to individuals at every stage of their financial journey, from those just starting out to those managing substantial wealth.",
  },
  {
    question: "Are the financial tools on your website free to use?",
    answer:
      "Yes, our financial calculators are completely free to use. They are designed to provide you with valuable insights and help you make informed financial decisions.",
  },
  {
    question: "What are the costs associated with financial planning?",
    answer:
      "You get a range of financial planning options, including one-time consultations and comprehensive, ongoing planning services. Pricing varies depending on the complexity of your financial situation and the services you require. We recommend contacting us via WhatsApp to discuss your specific needs and receive a personalized quote.",
  },
];

const WhoWeServeCards: React.FC<WhoWeServeCardsProps> = ({
  img,
  heading,
  subHeading,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-[#108E66] bg-[#FCFFFE] p-6 items-center">
      <Image src={img} width={441} height={400} alt="who we serve image" />
      <span className="text-[#272B2A] text-[28px] font-semibold text-center">
        {heading}
      </span>
      <span className="text-[#272B2A] text-2xl font-normal text-center">{subHeading}</span>
    </div>
  );
};

export default function HomePage() {
  return (
    <div className="font-sans space-y-16">
      {/* HERO SECTION (Solid Background, No Gradient) */}
      <section className="bg-[#108e66] text-white md:pb-0">
        <div className="mx-auto flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-[70%] text-center md:text-left space-y-4 px-16 py-16 md:py-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart, Simple, and Transparent Financial Planning
            </h1>
            <p className="text-lg md:text-xl">
              Experience innovative, tailored, and comprehensive financial
              planning for every stage of your life.
            </p>
            <Link
              href="/services"
              className="inline-block bg-[#fcfffe] text-[#108e66] px-8 py-3 rounded-md font-medium border border-[#108e66] hover:bg-[#272B2A] transition-colors"
            >
              Get Started
            </Link>
          </div>

          <Image
            src="/dashboard.svg"
            alt="Fintech Hero Illustration"
            className="hidden md:flex md:w-full"
            width={400}
            height={200}
            priority={true}
          />
        </div>
      </section>

      {/* WHO WE SERVE SECTION (Carousel with Auto-Scrolling) */}
      <section className="mx-auto  max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-4">
          Who We Serve
        </h2>
        <p className="text-center text-[#272B2A] mb-10 max-w-2xl mx-auto text-xl font-normal">
          Tailored Financial Strategies for Every Professional Journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:max-xl:px-[60px]  max-w-screen-xl">
          <WhoWeServeCards
            img="/who-we-serve/it.svg"
            heading="IT Professionals"
            subHeading="Maximize IT Earnings: ESOP & Wealth Strategies."
          />
          <WhoWeServeCards
            img="/who-we-serve/mba.svg"
            heading="MBA Graduates"
            subHeading="MBA Financial Edge: Maximize Income, Minimize Taxes."
          />
          <WhoWeServeCards
            img="/who-we-serve/professional.svg"
            heading="Young Professionals"
            subHeading="Young Pro Wealth: Smart Start, Long-Term Growth"
          />
          <WhoWeServeCards
            img="/who-we-serve/forces.svg"
            heading="Armed Forces & Government Officials"
            subHeading="Serve & Secure: Pension & Investment Strategies"
          />
          <WhoWeServeCards
            img="/who-we-serve/doctors.svg"
            heading="Doctors & Medical Professionals"
            subHeading="Secure Your Practice: Loan, Tax & Retirement Planning."
          />
          <WhoWeServeCards
            img="/who-we-serve/lawyer.svg"
            heading="Lawyers & Legal Professionals"
            subHeading="Legal Wealth: Navigate Irregular Income & Taxes."
          />
        </div>
      </section>

      <CarouselCards />

      {/* TOOLS SECTION (Carousel with Auto-Scrolling) */}
      <section className="mx-auto py-20  text-center bg-[#fcfffe] text-[#272B2A] max-w-screen-xl p">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-[40px] font-semibold mb-4 text-[#108E66]">
            Smart Financial Tools
          </h1>
          <p className="text-xl mb-8 text-[#108E66] font-normal">
          Empower Your Financial Decisions with Our Calculators.
          </p>
        </div>
        <Carousel>
          {calculators.map((calc) => (
            <motion.div
              key={calc.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 bg-[#F0FAF7] border border-[#108e6633] p-4 rounded-2xl shadow-md w-96 items-start hover:shadow-xl transition-shadow flex flex-col"
            >
              <h2 className="text-xl text-[#272B2A] font-medium mb-2">
                {calc.title}
              </h2>
              <p className="mb-6 text-[#272b2ae6] text-base font-normal text-start flex-grow">
                {calc.description}
              </p>
              <Link
                href={`/tools/${calc.slug}`}
                className="flex border border-[#108E66] gap-[6px] px-4 py-2 rounded-md hover:bg-white transition text-center"
              >
                <p className="text-base font-semibold text-[#108E66]">
                  Check Now
                </p>
                <Image
                  src={sideArrow}
                  width={10}
                  height={10}
                  alt="right arrow"
                />
              </Link>
            </motion.div>
          ))}
        </Carousel>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="container mx-auto px-4 py-16 max-w-screen-xl">
        <div className="flex flex-col items-center text-center justify-center gap-4">
          <p className="text-[#272B2A] text-[40px] font-semibold">
            Our Mission & Vision
          </p>
          <p className="text-[#272B2A] text-xl font-normal">
          Democratizing Expert Financial Advice: Simple, Transparent, Effective.
          </p>
          <Link
            href="/services"
            className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
          >
            Meet the team
          </Link>
        </div>
      </section>
      {/* FAQ Accordion remains intact */}
      <FAQAccordion faqs={faqs} />
    </div>
  );
}
