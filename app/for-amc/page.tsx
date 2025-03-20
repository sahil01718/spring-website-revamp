// app/for-amc/page.tsx
import React from "react";
import Link from "next/link";
import FAQAccordion from "../components/FAQAccordion";
import Image from "next/image";
import experienceFrame from "../../public/Frame-1431.svg";

interface Service {
  id: number;
  title: string;
  description: string;
}

interface EmpowerCardsProps {
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

const investmentSolutions: Service[] = [
  {
    id: 1,
    title: "Stocks",
    description:
      "Seamless integration for efficient stock investments with minimal hassle.",
  },
  {
    id: 2,
    title: "Mutual Funds",
    description:
      "Robust tools to manage mutual fund investments with real-time updates and precision.",
  },
  {
    id: 3,
    title: "Multi AA",
    description:
      "Advanced analytics for comprehensive account aggregation and informed decision-making.",
  },
  {
    id: 4,
    title: "Mutual Funds Trading",
    description:
      "Efficient processing and trading tools designed specifically for NSE mutual fund operations.",
  },
];

const complianceSolutions: Service[] = [
  {
    id: 5,
    title: "KYC Process",
    description:
      "Streamlined KYC processes that expedite onboarding and ensure full regulatory compliance.",
  },
  {
    id: 6,
    title: "KYC Verification",
    description:
      "Secure and compliant digital KYC verification tailored for asset management.",
  },
  {
    id: 7,
    title: "Aadhar & PAN eKYC",
    description:
      "Fast and reliable digital KYC services that simplify customer verification.",
  },
  {
    id: 8,
    title: "Signzy Solutions",
    description:
      "Cutting-edge digital verification tools to modernize your compliance procedures.",
  },
];

const digitalServices: Service[] = [
  {
    id: 9,
    title: "CAMS || CAS",
    description:
      "Real-time insights on portfolio holdings to ensure accurate and timely reporting.",
  },
  {
    id: 10,
    title: "Digital Agreements",
    description:
      "Secure electronic agreements and documentation for streamlined legal processes.",
  },
  {
    id: 11,
    title: "Credit Report Soft Pull",
    description:
      "Comprehensive, non-intrusive credit reporting services to gauge client creditworthiness.",
  },
];

const ServiceCard: React.FC<Service> = ({ title, description }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow hover:shadow-2xl transition transform hover:-translate-y-1">
      <h3 className="text-2xl font-semibold mb-2" style={{ color: "#1B1F13" }}>
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

const EmpowerCards: React.FC<EmpowerCardsProps> = ({ heading, subHeading }) => {
  return (
    <div className="p-4 rounded-lg bg-[#FCFFFE] border border-[#108E66] text-center flex flex-col gap-2">
      <p className="text-[#272B2A] text-xl font-medium">{heading}</p>
      <p className="text-[#272b2abf] text-sm font-normal">{subHeading}</p>
    </div>
  );
};

export default function ForAmcPage() {
  return (
    <div
      className="space-y-16"
      style={{ backgroundColor: "#fcfffe", color: "#1B1F13" }}
    >
      {/* Hero / Intro Section */}
      <section className="py-20 px-4 text-center bg-[#F0FAF7]">
        <h1 className="text-[40px] font-semibold text-[#108E66] mb-2">
          Transform Your Investor Experience with Spring Money.
        </h1>
        <p className="text-lg md:text-xl text-[#108E66] max-w-3xl mx-auto">
          Empower your organization by leveraging our cutting-edge digital
          solutions to drive growth, streamline operations, and enhance brand
          credibility.
        </p>
        <div className="mt-8">
          <Link
            href="https://wa.me/+918668484607"
             target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#108E66] text-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#FCFFFE] hover:text-[#108E66] transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      <div className="flex flex-col items-center">
        <p className="text-[40px] font-semibold text-[#272B2A] mb-2 text-center">
          Empower Your Investors with
        </p>
        <p className="text-lg md:text-xl text-[#272B2A] text-center px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
          Spring Money provides a single, unified platform to manage every
          aspect of your financial advisory business. From client onboarding to
          compliance tracking, task automation, and portfolio
          analytics—streamline operations and deliver superior client outcomes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
          <EmpowerCards
            heading="Robust API Integrations"
            subHeading="Seamlessly integrate our platform with latest fintech applications and infrastructure."
          />
          <EmpowerCards
            heading="Data-Driven Insights"
            subHeading="Gain valuable insights into investor behavior with advanced analytics."
          />
          <EmpowerCards
            heading="Branded Client Portal"
            subHeading="Offer a customized investor portal for secure access to information and services."
          />
          <EmpowerCards
            heading="Personalized Wealth Management Tools"
            subHeading="Offer clients interactive tools for portfolio analysis, goal setting, and performance tracking."
          />
          <EmpowerCards
            heading="Enhanced Client Onboarding"
            subHeading="Streamline onboarding with digital workflows and automated data capture."
          />
        </div>
      </div>

      <section className="py-20 px-4 text-center bg-[#F0FAF7]">
        <h1 className="text-[40px] font-semibold text-[#272B2A] mb-2">
          A Powerful SaaS Platform for the Modern AMC
        </h1>
        <p className="text-lg md:text-xl text-[#272B2A] max-w-3xl mx-auto">
          Spring Money provides AMCs with a comprehensive suite of digital tools
          and robust API integrations to enhance investor engagement, streamline
          operations, and drive growth. Leverage cutting-edge technology.
          Deliver personalized experiences.
        </p>
      </section>

      <div className="flex flex-col items-center">
        <p className="text-[40px] font-semibold text-[#272B2A] mb-2 text-center">
          What you get
        </p>
        <p className="text-lg md:text-xl text-[#272B2A] text-center">
          We specialize in providing customized financial solutions for a
          diverse range of professionals.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-4 md:max-xl:px-[60px] w-full max-w-screen-xl">
          <EmpowerCards
            heading="Acquisition Toolkit"
            subHeading="Turn First Impresssions into Lasting Relationships"
          />
          <EmpowerCards
            heading="Engagement Toolkit"
            subHeading="Engage Customers, Generate Leads"
          />
          <EmpowerCards
            heading="Knowledge Toolkit"
            subHeading="Educate, Empower & Build Trust Effortlessly"
          />
          <EmpowerCards
            heading="AI-Future Toolkit"
            subHeading="Automated, Cutting-Edge, Conversational"
          />
          <EmpowerCards
            heading="Customer Journeys Toolkit"
            subHeading="UX-First, Consent-led & Efficient"
          />
          <EmpowerCards
            heading="Analytics Toolkit"
            subHeading="Accurate Real-time & Insightful"
          />
        </div>
      </div>

      <div className="bg-[#F0FAF7] flex justify-center py-12">
        <Image
          src={experienceFrame}
          width={1000}
          height={800}
          alt="frame image"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-1 text-[#108E66] px-4 md:max-xl:px-[60px] w-full max-w-screen-xl text-center">
          Request a Demo and Explore Partnership Opportunities
        </h1>
        <p className="text-lg md:text-xl  mx-auto text-[#108E66] px-4 md:max-xl:px-[60px] w-full max-w-screen-xl text-center">
          Schedule a free demo to learn how the Spring Money platform can
          transform your RIA experience.
        </p>
        <div className="flex justify-center mt-4">
          <Link
            href="https://wa.me/+918668484607"
            target="_blank"
            rel="noopener noreferrer"
            className=" items-center text-[#108E66] border border-[#108E66] bg-[#FCFFFE] px-8 py-3 rounded-md font-semibold hover:bg-[#108E66] hover:text-[#FCFFFE] transition"
          >
            Get in touch now
          </Link>
        </div>
      </div>

      <FAQAccordion faqs={faqs} />
    </div>
  );
}
