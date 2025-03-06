// app/for-ria/page.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sub } from "framer-motion/client";

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
    <div className="flex flex-col p-4 rounded-lg bg-[#FCFFFE] border border-[#272b2a26]">
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

export default function ForRiaPage() {
  return (
    <div
      className="space-y-16"
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
            href="/get-started"
            className="inline-block bg-[#525ECC] text-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#FCFFFE] hover:text-[#525ECC] transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="container mx-auto px-4 py-16">
        <p className="text-4xl font-bold text-center mb-2">The Problem</p>
        <h2 className="text-xl font-normal text-center mb-8">
          Challenges Faced by Financial Advisors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

      <section className="bg-[#EBECFA]">
        <section className="container mx-auto py-8 ">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-[#525ECC] text-center">
            A Complete Ecosystem for RIAs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
            href="/"
            className=" items-center text-[#525ECC] bg-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#525ECC] hover:text-[#FCFFFE] transition"
          >
            Get in touch to learn more
          </Link>
          </div>
        </section>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-16">
        <p className="text-4xl font-bold text-center mb-2">
          Why Spring Money ?
        </p>
        <h2 className="text-xl font-normal text-center mb-8">
          A Unique Value Proposition
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

      {/* ROI Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Transforming Businesses &amp; Driving ROI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <InfoCard
            imageSrc="/images/roi1.jpg"
            title="40% Time Savings"
            description="Reduce administrative hours, letting you focus on strategy."
          />
          <InfoCard
            imageSrc="/images/roi2.jpg"
            title="30% Cost Efficiency"
            description="Lower operational expenses through streamlined, automated processes."
          />
          <InfoCard
            imageSrc="/images/roi3.jpg"
            title="50% Enhanced Trust"
            description="Improve client retention with secure, real-time insights and transparency."
          />
          <InfoCard
            imageSrc="/images/roi4.jpg"
            title="Scalable Growth"
            description="A flexible platform designed to adapt to your evolving business needs."
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#108e66] py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-white">
          Ready to Transform Your Advisory Business?
        </h2>
        <p className="text-lg max-w-3xl mx-auto mb-8 text-white">
          Experience the power of an integrated digital office designed
          exclusively for financial advisors.
        </p>
        <Link
          href="https://wa.me/your-phone-number"
          className="inline-block bg-white text-[#108e66] px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
