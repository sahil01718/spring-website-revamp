"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import homeFrame from "../../public/home-frame.svg";
import { desc } from "framer-motion/client";
import CarouselCards from "../components/CarouselCards";
import FAQAccordion from "../components/FAQAccordion";

// Data for core financial services
const financialServices = [
  {
    id: 1,
    title: "Wealth & Retirement Planning",
    description:
      "Achieve financial freedom with customized strategies that grow and protect your wealth, ensuring a secure retirement.",
    image: "/services/pana.svg",
  },
  {
    id: 2,
    title: "Optimized Tax & Investment Strategies",
    description:
      "Minimize tax liabilities and maximize returns with expertly curated investment diversification across multiple asset classes.",
    image: "/services/bro.svg",
  },
  {
    id: 3,
    title: "Comprehensive Risk & Insurance Planning",
    description:
      "Safeguard your financial future with tailored insurance solutions that provide the right coverage for you and your loved ones.",
    image: "/services/amico.svg",
  },
  {
    id: 4,
    title: "Legacy & Estate Planning",
    description:
      "Ensure seamless wealth transfer and secure your family's future with structured estate and will planning.",
    image: "/services/legacy.svg",
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

const carouselComponents = [
  {
    title: "Introducing EMPOWER",
    description:
      "Empower Your Team, Enhance Productivity Boost your employees’ financial confidence with expert guidance, personalized tools, and actionable insights.",
    btnUrl: "https://www.spring.money/programs/empower",
  },
  {
    title: "Introducing NRICH",
    description:
      "Empowering NRIs to Manage Finances Seamlessly Across Countries Equipping you with tools and guidance to manage financial complexities and achieve stability in India and abroad.",
    btnUrl: "https://www.spring.money/programs/nrich",
  },
  {
    title: "Introducing POWER PLAY",
    description:
      "Building a Strong Financial Foundation for India's Youth Your Partner in Conquering Finances—Start Smart Today!",
    btnUrl: "https://www.spring.money/programs/power-play",
  },
];

const ourPartners = [
  {
    title: "NS Wealth Financial Planners",
    description:
      "The team at NS Wealth has a vision to empower its clients through quality unbiased financial advice, latest technology that helps clients with their personal financial management & also assisting them in realizing all their dreams and converting them into realistic achievable goals.",
    image: "/services/ns-wealth.svg",
    btnUrl: "https://nswealth.in/",
  },
  {
    title: "Artha FinPlan",
    description:
      "ARTHA FinPlan provides personalized, professional and unbiased services in the area of Personal Financial Planning and Investment Advisory. Our aim is to help our clients to achieve their realistic goals with holistic approach, educate them about personal finance management and be a reliable partner in adding value to their journey in personal finance.",
    image: "/services/artha.svg",
    btnUrl: "https://arthafinplan.com/",
  },
  {
    title: "FinSharpe Investment Advisors",
    description:
      "FinSharpe came into existence to enable investors to reduce psychological biases from investment decisions by providing data driven insights. As fiduciaries, we offer investment advice with full transparency and without any conflict of interest. We follow a thorough research process that comprises of - Ranking, Allocation and Risk Management.",
    image: "/services/finsharp.svg",
    btnUrl: "https://finsharpe.com/",
  },
];

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

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % carouselComponents.length;
      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeIndex, carouselComponents.length]);
  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section className="bg-[#108e66] py-20 px-4 text-center border-b border-[#272B2A]">
        <h1 className="text-4xl md:text-5xl font-bold text-[#FCFFFE] mb-4">
          Personalized Financial Planning, Simplified
        </h1>
        <p className="text-lg md:text-xl text-[#FCFFFE] max-w-3xl mx-auto">
          Let&apos;s create your perfect financial plan with our SEBI-registered
          advisors.
        </p>
        <Link
          href="https://wa.me/+918668484607"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-[#fcfffe] text-[#108e66] px-8 py-3 rounded-md font-medium border border-[#108e66] hover:bg-[#272B2A] transition-colors"
        >
          Get Started Now
        </Link>
      </section>

      {/* CORE FINANCIAL SERVICES SECTION */}
      <section className="mx-auto py-16 flex flex-col items-center w-full">
        <h2 className="text-[40px] font-semibold text-center text-[#272B2A] mb-2">
          Our Core Services
        </h2>
        <p className="text-[#272B2A] text-xl font-normal text-center mb-4">
          Challenges Faced by Financial Advisors
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:max-xl:px-[60px] max-w-screen-xl">
          {financialServices.map((service) => (
            <div
              key={service.id}
              className="bg-[#FCFFFE] flex flex-col justify-center items-center w-full p-6 rounded-md shadow hover:shadow-xl transition transform hover:scale-105 border border-[#108E66]"
            >
              <Image
                width={240}
                height={158}
                src={service.image}
                alt="Financial Planning"
                className="w-[240px] h-[158px]"
              />
              <h3 className="text-xl font-medium text-[#272B2A] mt-4 mb-2">
                {service.title}
              </h3>
              <p className="text-[#272B2A] text-sm font-normal">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto flex flex-col gap-4 items-center px-4 md:max-xl:px-[60px]">
        <p className="text-[#108E66] text-[40px] font-semibold text-center">
          How it works ?
        </p>
        <div className="p-4 md:p-8 flex gap-8 w-full justify-center bg-[#FCFFFE] border rounded border-[#108E66]  max-w-screen-xl">
          <div className="hidden md:block md:w-[45%]">
            <Image src={homeFrame} width={1032} height={400} alt="home frame" />
          </div>
          <div className="flex flex-col justify-between w-full md:w-[55%]">
            <div className="flex flex-col gap-2">
              <p className="text-[#272B2A] text-[32px] font-bold">
                Nikhil&apos;s Explaination
              </p>
              <p className="text-[#272b2abf] text-2xl font-normal">
                Some description about the video breaking the process down into
                easy words for people to understand how financial planning works
                and how it has helped people across domains
              </p>
            </div>
            <div className="w-fit px-6 py-3 border border-[#108E66] rounded">
              <span className="text-[#108E66] text-base font-semibold ">
                Start Your Journey Now !
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PROFESSIONAL SOLUTIONS CAROUSEL */}
      <section className="mx-auto px-4 py-16 flex flex-col items-center">
        <h2 className="text-[40px] font-semibold text-center text-[#272B2A] mb-2">
          Our Solutions by Profession
        </h2>
        <p className="text-[#272B2A] text-xl font-normal text-center mb-2">
          We specialize in providing customized financial solutions for a
          diverse range of professionals.
        </p>
        <div className="relative overflow-hidden  max-w-screen-xl w-full">
          <div className="flex space-x-4 animate-autoScroll w-max">
            {professionalSolutions
              .concat(professionalSolutions)
              .map((profile, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-[#FCFFFE] p-4 rounded-md shadow mx-2 w-64 border border-[#108E66]"
                >
                  <h3 className="text-xl font-semibold text-[#272B2A]">
                    {profile.title}
                  </h3>
                  <p className="text-sm text-[#272B2A] font-medium mt-1">
                    {profile.tagline}
                  </p>
                  <p className="text-[#272B2A] mt-2 break-words">
                    {profile.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-8 px-[60px] py-8 bg-[#F0FAF7]">
        <p className="text-[#108E66] text-[40px] font-bold text-center">
          {carouselComponents[activeIndex].title}
        </p>
        <p className="text-[#108E66] text-center text-2xl font-medium  max-w-screen-xl">
          {carouselComponents[activeIndex].description}
        </p>
        <Link
          href={carouselComponents[activeIndex].btnUrl}
          className="text-[#108E66] text-base font-semibold px-6 py-3 border border-[#108E66] rounded"
        >
          Learn More
        </Link>
        <div className="flex justify-center">
          {carouselComponents.map((item, index) => (
            <button
              key={index}
              className={`mx-2 h-[1rem] text-sm  rounded-lg w-8 ${
                activeIndex === index ? "bg-[#108E66]" : "bg-[#108e668a] "
              }`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex flex-col items-center">
        <h2 className="text-[40px] font-semibold text-center text-[#272B2A] mb-2">
          Our Partners
        </h2>
        <p className="text-[#272B2A] text-xl font-normal text-center mb-4">
          We specialize in providing customized financial solutions for a
          diverse range of professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center px-4 md:max-xl:px-[60px]  max-w-screen-xl">
          {ourPartners.map((partner, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col items-center border border-[#108E66] rounded-lg bg-[#FCFFFE]"
            >
              <Image
                src={partner.image}
                width={50}
                height={50}
                alt="partner image"
                className="w-[290px] h-[100px] mb-4"
              />
              <p className="text-[#272B2A] text-xl font-medium mb-1">
                {partner.title}
              </p>
              <p className="text-[#272b2abf] text-base font-normal mb-2">
                {partner.description}
              </p>
              <Link
                href={partner.btnUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#108E66] rounded w-full py-3 flex justify-center text-[#FFF] text-sm font-semibold mt-auto"
              >
                Visit Website
              </Link>
            </div>
          ))}
        </div>
      </div>

      <CarouselCards />

      <FAQAccordion faqs={faqs} />
    </div>
  );
}
