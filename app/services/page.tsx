"use client";
import React from "react";
import Link from "next/link";

// Data for core financial services
const financialServices = [
  {
    id: 1,
    title: "Personalized Wealth Planning",
    description:
      "Customized plans that align with your income and lifestyle for long-term financial success.",
  },
  {
    id: 2,
    title: "Tax Optimization & Salary Structuring",
    description:
      "Smart strategies to minimize your tax burden while optimizing your salary components.",
  },
  {
    id: 3,
    title: "Investment & Portfolio Diversification",
    description:
      "Maximize returns through diversified investments across various asset classes.",
  },
];

// Data for professional solutions
const professionalSolutions = [
  {
    id: 1,
    title: "Young Professionals",
    tagline: "Start Strong, Stay Ahead!",
    description:
      "Tailored financial strategies for early career growth and smart investments.",
  },
  {
    id: 2,
    title: "MBA Graduates",
    tagline: "Smart Money Moves for Smart MBAs!",
    description:
      "Optimize your high-income potential with strategic planning and tax-efficient investments.",
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
      "Structured roadmaps for managing student loans, optimizing taxes, and planning retirement.",
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
      "Focused on pension maximization, tax-efficient investments, and real estate advisory.",
  },
  {
    id: 7,
    title: "Professional Athletes",
    tagline: "Short Careers, Lifelong Wealth!",
    description:
      "Wealth preservation, passive income, and tax-efficient plans to secure your future beyond your career.",
  },
  {
    id: 8,
    title: "Startup Founders & Entrepreneurs",
    tagline: "Scale Your Startup, Scale Your Wealth!",
    description:
      "Structured wealth-building plans that balance reinvestment with long-term financial planning.",
  },
  {
    id: 9,
    title: "Engineers & Architects",
    tagline: "Design the Future, Build Your Wealth!",
    description:
      "Optimizing tax strategies and planning for early retirement with tailored investment structures.",
  },
  {
    id: 10,
    title: "Teachers & Professors",
    tagline: "Shape Minds, Secure Your Future!",
    description:
      "Structured savings, side-income strategies, and pension planning for educators.",
  },
  {
    id: 11,
    title: "Media & Creative Professionals",
    tagline: "Transform Creativity into Wealth!",
    description:
      "Managing irregular income with smart tax planning and secure long-term financial strategies.",
  },
  {
    id: 12,
    title: "Freelancers & Consultants",
    tagline: "From Irregular Income to Consistent Wealth!",
    description:
      "Income stabilization, tax-efficient savings, and comprehensive financial roadmaps for independent professionals.",
  },
  {
    id: 13,
    title: "Business Owners & SME Operators",
    tagline: "Run Your Business, Let Us Manage Your Wealth!",
    description:
      "Cash flow optimization, tax-saving strategies, and long-term investment plans for entrepreneurs.",
  },
];

// A simple carousel for professional solutions
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 animate-autoScroll">
      {children}
    </div>
  </div>
);

export default function ServicesPage() {
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="bg-[#108e66] py-20 px-4 text-center border-b border-[#272B2A]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FCFFFE] mb-4">
          Personalized Financial Planning, Simplified
        </h1>
        <p className="text-lg md:text-xl text-[#FCFFFE] max-w-3xl mx-auto">
          Let’s create your perfect financial plan with our SEBI‑registered advisors.
        </p>
      </section>

      {/* CORE FINANCIAL SERVICES SECTION */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-8">
          Our Core Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {financialServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FCFFFE] p-6 rounded-md shadow hover:shadow-xl transition transform hover:scale-105 border border-[#272B2A]"
            >
              <h3 className="text-2xl font-semibold text-[#272B2A] mb-2">
                {service.title}
              </h3>
              <p className="text-[#272B2A]">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROFESSIONAL SOLUTIONS CAROUSEL */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-8">
          Our Solutions by Profession
        </h2>
        <div className="relative overflow-hidden">
          <div className="flex space-x-4 animate-autoScroll">
            {professionalSolutions.concat(professionalSolutions).map((profile, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-[#FCFFFE] p-6 rounded-md shadow mx-2 w-64 border border-[#272B2A]"
              >
                <h3 className="text-xl font-semibold text-[#272B2A]">{profile.title}</h3>
                <p className="text-sm text-[#272B2A] font-medium mt-1">{profile.tagline}</p>
                <p className="text-[#272B2A] mt-2 break-words">{profile.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO DO WE HELP SECTION */}
      <section className="bg-[#FCFFFE] py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-8">
            Who Do We Help?
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto text-lg text-[#272B2A]">
            <p>
              We serve a diverse range of professionals—from young earners and IT experts to medical professionals, legal advisors, government officials, athletes, entrepreneurs, educators, creatives, and more.
              Our tailored solutions ensure that every financial plan is as unique as your career.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SPRING MONEY SECTION */}
      <section className="bg-[#108e66] py-16 px-4 text-center border-t border-[#272B2A]">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-[#FCFFFE] mb-8">Why Choose Spring Money?</h2>
          <p className="text-lg text-[#FCFFFE] max-w-3xl mx-auto mb-8">
            Experience expert, tax-efficient financial planning tailored for you.
            We simplify complex financial decisions with clear, personalized strategies designed to build long-term wealth.
          </p>
          <a
            href="https://wa.me/your-phone-number" // Replace with your actual WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FCFFFE] text-[#108e66] px-8 py-3 rounded-md hover:bg-[#108e66] transition"
          >
            Get in touch Now
          </a>
        </div>
      </section>
    </div>
  );
}
