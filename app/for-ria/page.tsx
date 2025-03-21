"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sub } from "framer-motion/client";
import RiaFaqAccordion from "../components/RiaFaqAccordion";

interface InfoCardProps {
  imageSrc?: string;
  alt?: string;
  title: string;
  description: string;
}

interface FinancialAdvisorInfoProps {
  heading: string;
  subHeading1: string;
  subHeading2: string;
  subHeading3: string;
}

interface WhatYouGetInfoProps {
  heading: string;
  subHeading: string;
}

const faqs = [
  {
    question: "How do I start my financial planning journey with Spring Money?",
    answer:
      "Connect with us on WhatsApp, and our SEBI-registered experts will assess your needs and guide you toward the right plan.",
  },
  {
    question:
      "What makes Spring Money different from other financial advisory platforms?",
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
    answer:
      "Yes. We follow strict data protection policies to keep your financial information safe.",
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

const InfoCard: React.FC<InfoCardProps> = ({
  imageSrc,
  alt,
  title,
  description,
}) => {
  return (
    <div className="p-4 bg-[#FCFFFE] flex flex-col items-center gap-4 border border-[#525ECC] rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {imageSrc && (
        <div className="mb-4">
          <Image
            src={imageSrc}
            alt={alt || title}
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-40"
          />
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <h3 className="text-xl font-medium  text-[#272B2A]">{title}</h3>
        <p className="text-[#272b2abf] font-normal text-sm text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

const InfoCardSolution: React.FC<InfoCardProps> = ({
  imageSrc,
  alt,
  title,
  description,
}) => {
  return (
    <div className="p-4 bg-[#FCFFFE] flex flex-col-reverse items-center gap-4 border border-[#525ECC] rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
      {imageSrc && (
        <div className="mb-4">
          <Image
            src={imageSrc}
            alt={alt || title}
            width={400}
            height={250}
            className="rounded-md object-cover w-full h-40"
          />
        </div>
      )}
      <div className="flex flex-col items-start gap-1">
        <h3 className="text-xl font-medium  text-[#272B2A]">{title}</h3>
        <p className="text-[#272b2abf] font-normal text-sm ">{description}</p>
      </div>
    </div>
  );
};

const FinancialAdvisorInfo: React.FC<FinancialAdvisorInfoProps> = ({
  heading,
  subHeading1,
  subHeading2,
  subHeading3,
}) => {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-[#FCFFFE] border border-[#525ECC]">
      <p className="text-[#272B2A] text-xl font-medium mb-8 text-center">
        {heading}
      </p>
      <div className="rounded-[4px] border border-[#525ecccc] bg-[#EBECFA] py-2 mb-6">
        <p className="text-[#525ECC] text-base font-semibold text-center">
          {subHeading1}
        </p>
      </div>
      <div className="rounded-[4px] border border-[#525ecccc] bg-[#EBECFA] py-2 mb-6">
        <p className="text-[#525ECC] text-base font-semibold text-center">
          {subHeading2}
        </p>
      </div>
      <div className="rounded-[4px] border border-[#525ecccc] bg-[#EBECFA] py-2 mb-6">
        <p className="text-[#525ECC] text-base font-semibold text-center">
          {subHeading3}
        </p>
      </div>
    </div>
  );
};

const WhatYouGetInfo: React.FC<WhatYouGetInfoProps> = ({
  heading,
  subHeading,
}) => {
  return (
    <div className="p-4 rounded-lg bg-[#FCFFFE] border border-[#525ECC] text-center flex flex-col gap-2">
      <p className="text-[#272B2A] text-xl font-medium">{heading}</p>
      <p className="text-[#272b2abf] text-sm font-normal">{subHeading}</p>
    </div>
  );
};

export default function ForRiaPage() {
  const [open, setOpen] = useState(false);
  return (
    <div
      className=""
      style={{ backgroundColor: "#fcfffe", color: "#272B2A" }}
    >
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-[#EBECFA]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#525ECC]">
          The Digital Office for Financial Advisors
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#525ECC]">
          Reduce operational inefficiencies, automate workflows, and enhance
          compliance—all in one seamless platform.
        </p>
        <div className="mt-8">
          <Link
            href="https://wa.me/+918668484607"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#525ECC] text-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#FCFFFE] hover:text-[#525ECC] transition"
          >
            Schedule a Demo
          </Link>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="mx-auto py-16 flex flex-col items-center bg-linearGradient1">
        <p className="text-4xl font-bold text-center mb-2">The Problem</p>
        <h2 className="text-xl font-normal text-center mb-8">
          Challenges Faced by Financial Advisors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:max-xl:px-[60px]  max-w-screen-xl">
          <InfoCard
            imageSrc="/for-ria/rafiki.svg"
            title="Fragmented Systems"
            description="Disjointed tools and systems create operational inefficiencies and drive up costs."
          />
          <InfoCard
            imageSrc="/for-ria/rafiki.svg"
            title="Manual Processes"
            description="Time-consuming, error-prone tasks that drain valuable resources."
          />
          <InfoCard
            imageSrc="/for-ria/computer.svg"
            title="Lack of Integration"
            description="Siloed systems hinder unified decision-making and effective client service."
          />
          <InfoCard
            imageSrc="/for-ria/bro.svg"
            title="Compliance Burdens"
            description="Increasing regulatory demands add complexity and risk to daily operations."
          />
        </div>
      </section>

      <section className="mx-auto py-8 flex flex-col items-center bg-[#FCFFFE] w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#525ECC] text-center">
          A Complete Ecosystem for RIAs
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
          <FinancialAdvisorInfo
            heading="TRANSFORMATION"
            subHeading1="Data Processing Excellence"
            subHeading2="Continuous Improvement"
            subHeading3="Value Generation"
          />
          <FinancialAdvisorInfo
            heading="INTELLIGENCE"
            subHeading1="Smart Analytics"
            subHeading2="Predictive Insights"
            subHeading3="Research-Driven Decisions"
          />
          <FinancialAdvisorInfo
            heading="INTEGRATION"
            subHeading1="Seamless Connectivity"
            subHeading2="Unified Platform"
            subHeading3="Harmonized Operations"
          />
          <FinancialAdvisorInfo
            heading="TRUST"
            subHeading1="Security"
            subHeading2="Compliance"
            subHeading3="Reliability"
          />
        </div>
        <div className="flex justify-center">
          <Link
            href="https://wa.me/+918668484607"
            target="_blank"
            rel="noopener noreferrer"
            className=" items-center text-[#525ECC] border border-[#525ECC] bg-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#525ECC] hover:text-[#FCFFFE] transition"
          >
            Get in touch to learn more
          </Link>
        </div>
      </section>

      {/* Solution Section */}
      <section className="mx-auto py-16 flex flex-col items-center w-full bg-linearGradient2">
        <p className="text-4xl font-bold text-center mb-2">
          Why Spring Money ?
        </p>
        <h2 className="text-xl font-normal text-center mb-8">
          A Unique Value Proposition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:max-xl:px-[60px] max-w-screen-xl w-full">
          <InfoCardSolution
            imageSrc="/for-ria/rafiki1.svg"
            title="End-to-End Coverage"
            description="Manage everything from onboarding to transactions in one place."
          />
          <InfoCardSolution
            imageSrc="/for-ria/amico.svg"
            title="Modular & Scalable"
            description="A flexible system that grows with your business."
          />
          <InfoCardSolution
            imageSrc="/for-ria/bro1.svg"
            title="Security & Compliance"
            description="Robust encryption and built-in regulatory tracking."
          />
          <InfoCardSolution
            imageSrc="/for-ria/bro2.svg"
            title="Integrated Intelligence"
            description="AI-powered insights for smarter decision-making."
          />
        </div>
      </section>

      <section className="mx-auto py-16 bg-[#EBECFA] flex flex-col items-center w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-[#272B2A] text-center">
          What you get
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-[#272B2A] text-center mb-4">
          Reduce operational inefficiencies, automate workflows, and enhance
          compliance—all in one seamless platform.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
          <WhatYouGetInfo
            heading="Acquisition Toolkit"
            subHeading="Turn First Impresssions into Lasting Relationships"
          />
          <WhatYouGetInfo
            heading="Engagement Toolkit"
            subHeading="Engage Customers, Generate Leads"
          />
          <WhatYouGetInfo
            heading="Knowledge Toolkit"
            subHeading="Educate, Empower & Build Trust Effortlessly"
          />
          <WhatYouGetInfo
            heading="AI-Future Toolkit"
            subHeading="Automated, Cutting-Edge, Conversational"
          />
          <WhatYouGetInfo
            heading="Customer Journeys Toolkit"
            subHeading="UX-First, Consent-led & Efficient"
          />
          <WhatYouGetInfo
            heading="Analytics Toolkit"
            subHeading="Accurate Real-time & Insightful"
          />
        </div>
      </section>

      <div className="flex flex-col items-center py-14 md:py-28 bg-linearGradient1">
        <h1 className="text-4xl md:text-5xl font-bold mb-1 text-[#525ECC] px-4 md:max-xl:px-[60px] w-full max-w-screen-xl text-center">
          Request a Demo and Explore Partnership Opportunities
        </h1>
        <p className="text-lg md:text-xl  mx-auto text-[#525ECC] px-4 md:max-xl:px-[60px] w-full max-w-screen-xl text-center">
          Schedule a free demo to learn how the Spring Money platform can
          transform your RIA experience.
        </p>
        <div className="flex justify-center mt-4">
          <Link
            href="https://wa.me/+918668484607"
            target="_blank"
            rel="noopener noreferrer"
            className=" items-center text-[#525ECC] border border-[#525ECC] bg-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#525ECC] hover:text-[#FCFFFE] transition"
          >
            Get in touch now
          </Link>
        </div>
      </div>

      <RiaFaqAccordion faqs={faqs} />
    </div>
  );
}
