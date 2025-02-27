"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ---------------------------------
   Carousel Component with Auto-Scrolling Animation
--------------------------------- */
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 animate-autoScroll">{children}</div>
  </div>
);

/* ---------------------------------
   Who We Serve Section Data
--------------------------------- */
const professionalSolutions = [
  { id: 1, title: "Young Professionals", tagline: "Start Strong, Stay Ahead!", description: "Tailored strategies for early career growth and smart investments." },
  { id: 2, title: "MBA Graduates", tagline: "Smart Money Moves for Smart MBAs!", description: "Optimize high-income potential with strategic planning and tax-efficient investments." },
  { id: 3, title: "IT Professionals", tagline: "Maximize Earnings, Build Wealth Like a Pro!", description: "Diversified investment strategies and ESOP planning to secure financial independence." },
  { id: 4, title: "Doctors & Medical Professionals", tagline: "You Care for Patients, We Care for Your Wealth!", description: "Structured roadmaps for managing loans, optimizing taxes, and planning retirement." },
  { id: 5, title: "Lawyers & Legal Professionals", tagline: "Win in Court, Win with Your Money!", description: "Manage irregular income and tax liabilities with strategic investment plans." },
  { id: 6, title: "Armed Forces & Government Officials", tagline: "Secure Your Future While Serving the Nation!", description: "Pension maximization, tax-efficient investments, and real estate advisory." },
  { id: 7, title: "Professional Athletes", tagline: "Short Careers, Lifelong Wealth!", description: "Wealth preservation, passive income, and tax-efficient plans for long-term security." },
  { id: 8, title: "Startup Founders & Entrepreneurs", tagline: "Scale Your Startup, Scale Your Wealth!", description: "Structured wealth-building plans balancing reinvestment and long-term planning." },
  { id: 9, title: "Engineers & Architects", tagline: "Design the Future, Build Your Wealth!", description: "Optimizing tax strategies and planning for early retirement with tailored investments." },
  { id: 10, title: "Teachers & Professors", tagline: "Shape Minds, Secure Your Future!", description: "Smart savings, side-income strategies, and pension planning for educators." },
  { id: 11, title: "Media & Creative Professionals", tagline: "Transform Creativity into Wealth!", description: "Manage irregular income with smart tax planning and secure investment strategies." },
  { id: 12, title: "Freelancers & Consultants", tagline: "From Irregular Income to Consistent Wealth!", description: "Income stabilization and tax-efficient financial roadmaps for independent professionals." },
  { id: 13, title: "Real Estate Agents & Investors", tagline: "Build Properties, Build Your Empire!", description: "Optimize commissions and create diversified portfolios for sustained wealth." },
  { id: 14, title: "Finance Experts", tagline: "Optimize Your Finances!", description: "Customized strategies for financial professionals to manage and grow wealth." },
  { id: 15, title: "Government Officials", tagline: "Secure Your Future!", description: "Tailored plans focusing on pension maximization and secure investments." },
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
  { id: 1, title: "Should I Buy or Rent a Home?", description: "Analyze whether it's more cost-effective to buy a house or continue renting.", slug: "buyVsRent" },
  { id: 2, title: "Buy a Car vs. Commute Calculator", description: "Compare the costs of owning a car versus using alternative commuting options.", slug: "carVsCommute" },
  { id: 3, title: "EMI Calculator", description: "Estimate monthly loan payments for car, home, or other loans.", slug: "emiCalculator" },
  { id: 4, title: "Endowment Calculator", description: "Determine whether to continue your endowment policy or surrender it.", slug: "endowmentVsTerm" },
  { id: 5, title: "FD vs RD Calculator", description: "Project maturity values and growth for Fixed and Recurring Deposits.", slug: "fdRdCalculator" },
  { id: 6, title: "FD-Based Retirement Calculator", description: "Plan your retirement corpus using FD-based projections.", slug: "fdRetirementCalculator" },
  { id: 7, title: "FIRE Calculator", description: "Evaluate if 25x your annual expenses is enough for early retirement.", slug: "fireCalculator" },
  { id: 8, title: "When Will I Make My First Crore?", description: "Find out how long it takes to accumulate ₹1 crore based on your investments.", slug: "firstCrore" },
  { id: 9, title: "Fuel vs. Electric Vehicle Calculator", description: "Compare long-term costs of fuel-based versus electric vehicles.", slug: "fuelVsEv" },
  { id: 10, title: "Hourly Wage Calculator", description: "Convert your annual or monthly salary into an hourly wage.", slug: "hourlyWage" },
  { id: 11, title: "MBA ROI Calculator", description: "Assess lost earnings during an MBA versus potential salary growth post-MBA.", slug: "mbaRoi" },
  { id: 12, title: "Mutual Fund vs. NPS Tier I Calculator", description: "Compare market-driven Mutual Funds with government-backed NPS Tier I investments.", slug: "npsVsMf" },
  { id: 13, title: "CTC vs. In-Hand Salary Calculator", description: "Break down your Cost-to-Company into net monthly take-home pay.", slug: "salaryCalculator" },
  { id: 14, title: "SIP Calculator", description: "Explore potential returns of Systematic Investment Plans over time.", slug: "sipCalculator" },
  { id: 15, title: "Sukanya Samriddhi Yojana Calculator", description: "Compute maturity amounts and benefits of the SSY savings scheme.", slug: "sukanyaSamruddhi" },
];
const calculators = [...additionalCalculators, ...baseCalculators];

/* ---------------------------------
   Testimonial Videos Data
--------------------------------- */
const testimonialVideos = [
  { videoId: "CSVJa2PK7M8", quote: '"Spring Money transformed my financial future."' },
  { videoId: "5m5Qigm2j7w", quote: '"Expert advice that makes a real difference."' },
  { videoId: "jx_6soC3wuM", quote: '"Innovative insights for lasting impact."' },
  { videoId: "2YlOxs78WPc", quote: '"Trusted and reliable financial guidance."' },
  { videoId: "abc123XYZ", quote: '"Their personalized approach is unmatched."' },
];

/* ---------------------------------
   Mission & Vision Data
--------------------------------- */
const missionVisionCards = [
  { id: 1, title: "Expert Guidance", image: "/images/mission1.jpg" },
  { id: 2, title: "Innovative Solutions", image: "/images/mission2.jpg" },
  { id: 3, title: "Long-Term Planning", image: "/images/mission3.jpg" },
  { id: 4, title: "Personalized Advice", image: "/images/mission4.jpg" },
  { id: 5, title: "Sustainable Growth", image: "/images/mission5.jpg" },
];

/* ---------------------------------
   TestimonialCard Component
--------------------------------- */
const TestimonialCard = ({
  videoId,
  quote,
  isActive,
  onPlay,
}: {
  videoId: string;
  quote: string;
  isActive: boolean;
  onPlay: () => void;
}) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return (
    <motion.div
      onClick={onPlay}
      whileHover={{ scale: 1.05 }}
      className="bg-[#fcfffe] rounded-2xl p-6 shadow-lg transition cursor-pointer"
    >
      <div className="relative pb-[56.25%] mb-4">
        {isActive ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Testimonial Video"
            className="absolute top-0 left-0 w-full h-full rounded-md"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <img
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="absolute top-0 left-0 w-full h-full rounded-md object-cover"
          />
        )}
      </div>
      <p className="text-center text-[#272B2A] text-base font-semibold">{quote}</p>
    </motion.div>
  );
};

/* ---------------------------------
   HomePage Component
--------------------------------- */
export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState<string | null>(null);

  return (
    <div className="font-sans space-y-16">
      {/* HERO SECTION (Solid Background, No Gradient) */}
      <section className="bg-[#108e66] text-white py-16 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center md:justify-between">
          <div className="md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Smart, Simple, and Transparent Financial Planning
            </h1>
            <p className="text-lg md:text-xl">
              Experience innovative, tailored, and comprehensive financial planning for every stage of your life.
            </p>
            <Link
              href="/services"
              className="inline-block bg-[#fcfffe] text-[#108e66] px-8 py-3 rounded-md font-medium border border-[#108e66] hover:bg-[#272B2A] transition-colors"
            >
              Get Started Now
            </Link>
          </div>
          <div className="hidden md:block md:w-1/2">
            <img src="/images/fintech-hero.png" alt="Fintech Hero Illustration" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* WHO WE SERVE SECTION (Carousel with Auto-Scrolling) */}
      <section className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-4">Who We Serve</h2>
        <p className="text-center text-[#272B2A] mb-10 max-w-2xl mx-auto">
          We specialize in providing customized financial solutions for a diverse range of professionals.
        </p>
        <Carousel>
          {professionalSolutions.concat(professionalSolutions).map((profile, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-[#fcfffe] border border-gray-200 p-6 rounded-2xl shadow-md mx-2 w-64 hover:shadow-xl transition-shadow flex flex-col"
            >
              <h3 className="text-xl font-semibold text-[#272B2A] mb-1">{profile.title}</h3>
              <p className="text-sm text-[#272B2A] font-medium mb-2">{profile.tagline}</p>
              <p className="text-sm text-[#272B2A]">{profile.description}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#272B2A] mb-2">Testimonial</h2>
        <p className="text-lg text-center text-[#272B2A] mb-8">Some Heading for the testimonial video</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {testimonialVideos.map((item, index) => (
            <TestimonialCard
              key={index}
              videoId={item.videoId}
              quote={item.quote}
              isActive={activeTestimonial === item.videoId}
              onPlay={() => setActiveTestimonial(item.videoId)}
            />
          ))}
        </div>
      </section>

      {/* TOOLS SECTION (Carousel with Auto-Scrolling) */}
      <section className="py-20 px-4 text-center bg-[#fcfffe] text-[#272B2A]">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Financial Tools</h1>
          <p className="text-lg md:text-xl mb-8">
            Plan, Calculate &amp; Succeed – your suite of financial tools for effective planning.
          </p>
          <Link
            href="/tools"
            className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
          >
            Explore All Tools
          </Link>
        </div>
        <Carousel>
          {calculators.map((calc) => (
            <motion.div
              key={calc.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 bg-[#fcfffe] border border-gray-200 p-6 rounded-2xl shadow-md w-64 hover:shadow-xl transition-shadow flex flex-col"
            >
              <h2 className="text-2xl font-bold mb-3">{calc.title}</h2>
              <p className="mb-6 flex-grow break-words">{calc.description}</p>
              <Link
                href={`/tools/${calc.slug}`}
                className="inline-block bg-[#272B2A] text-[#fcfffe] px-4 py-2 rounded-md hover:bg-[#108e66] transition text-center"
              >
                Calculate
              </Link>
            </motion.div>
          ))}
        </Carousel>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="container mx-auto px-4 py-16 max-w-screen-xl">
        <div className="flex justify-center">
          <Link
            href="/financial-planning"
            className="inline-block bg-[#108e66] text-[#fcfffe] px-8 py-3 rounded-md font-medium hover:bg-[#272B2A] transition-colors"
          >
            Learn More About Our Financial Planning
          </Link>
        </div>
        <p className="text-center text-[#272B2A] text-lg mt-4">
          Our vision is to help bring about a world that confidently makes smart financial decisions.
        </p>
      </section>
    </div>
  );
}
