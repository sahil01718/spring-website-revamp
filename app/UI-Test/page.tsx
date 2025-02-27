"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

/*
  Carousel Component:
  A container that auto-scrolls its children horizontally using a CSS animation.
  Make sure the "animate-autoScroll" class is defined in your globals.css.
*/
const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden">
    <div className="flex space-x-4 animate-autoScroll">{children}</div>
  </div>
);

/*
  Professional Solutions Array:
  Contains data for the "Who We Serve" section.
*/
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

/*
  Calculators Array:
  15 placeholder calculators for the Tools slideshow.
*/
const calculators = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `Calculator ${i + 1}`,
}));

/*
  Testimonial Videos Array:
  8 testimonial video entries.
*/
const testimonialVideos = [
  {
    videoId: "CSVJa2PK7M8",
    quote: '"Spring Money transformed my financial future."',
  },
  {
    videoId: "5m5Qigm2j7w",
    quote: '"Expert advice that makes a real difference."',
  },
  {
    videoId: "jx_6soC3wuM",
    quote: '"Innovative insights for lasting impact."',
  },
  {
    videoId: "2YlOxs78WPc",
    quote: '"Trusted and reliable financial guidance."',
  },
  {
    videoId: "CSVJa2PK7M8",
    quote: '"Clear and actionable financial strategies."',
  },
  { videoId: "5m5Qigm2j7w", quote: '"Game-changing financial planning."' },
  { videoId: "jx_6soC3wuM", quote: '"Professional and insightful advice."' },
  { videoId: "2YlOxs78WPc", quote: '"Empowered my financial decisions."' },
];

/*
  TestimonialCard Component:
  Displays a clickable thumbnail for a YouTube video.
  Enlarged and improved for a better impact.
*/
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
      className={`inline-block bg-white rounded-2xl p-4 shadow-md mx-2 transition cursor-pointer ${
        isActive ? "w-[400px] scale-105" : "w-[360px] scale-95"
      }`}
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
          <Image
            src={thumbnailUrl}
            alt="Video Thumbnail"
            className="absolute top-0 left-0 w-full h-full rounded-md object-cover"
            fill
          />
        )}
      </div>
      <p className="text-center text-black text-sm font-medium break-words">
        {quote}
      </p>
    </motion.div>
  );
};

/*
  Our Team Array:
  Contains data for team members.
*/
const teamMembers = [
  {
    id: 1,
    name: "Alice Johnson",
    designation: "CEO",
    image: "/images/team1.jpg",
  },
  { id: 2, name: "Bob Smith", designation: "CFO", image: "/images/team2.jpg" },
  {
    id: 3,
    name: "Carol Davis",
    designation: "COO",
    image: "/images/team3.jpg",
  },
  { id: 4, name: "David Lee", designation: "CTO", image: "/images/team4.jpg" },
  { id: 5, name: "Eva Green", designation: "CMO", image: "/images/team5.jpg" },
];

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState<string | null>(
    null
  );

  return (
    <div className="font-sans space-y-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[#2BB90A] to-[#07301E] text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
        />
        <div className="relative z-10 py-16 px-4 md:px-8 flex flex-col items-center md:items-start md:flex-row md:justify-between max-w-screen-xl mx-auto">
          <div className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Smart, Simple, and Transparent Financial Planning
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Experience innovative, tailored, and comprehensive financial
              planning for every stage of your life.
            </p>
            <Link
              href="/services"
              className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-[#2BB90A] hover:text-black transition-colors"
            >
              Get Started
            </Link>
          </div>
          <div className="hidden md:block md:w-1/2">
            <Image
              src="/images/fintech-hero.png"
              alt="Fintech Hero Illustration"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* WHO WE SERVE SECTION */}
      <section className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#07301E] mb-4">
          Who We Serve
        </h2>
        <p className="text-center text-black mb-10 max-w-2xl mx-auto">
          We specialize in providing customized financial solutions for a
          diverse range of professionals.
        </p>
        <Carousel>
          {professionalSolutions
            .concat(professionalSolutions)
            .map((profile, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white p-6 rounded-2xl shadow-md mx-2 w-64 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-[#07301E] mb-1">
                  {profile.title}
                </h3>
                <p className="text-sm text-black font-medium mb-2">
                  {profile.tagline}
                </p>
                <p className="text-black text-sm break-words">
                  {profile.description}
                </p>
              </div>
            ))}
        </Carousel>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="container mx-auto px-4 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#07301E] mb-4">
          Real People. Real Results.
        </h2>
        <p className="text-lg md:text-xl text-center text-black mb-8">
          Don&apos;t just take our word for it – see the success stories from
          our clients.
        </p>
        <Carousel>
          {testimonialVideos.map((item, index) => (
            <TestimonialCard
              key={index}
              videoId={item.videoId}
              quote={item.quote}
              isActive={activeTestimonial === item.videoId}
              onPlay={() => setActiveTestimonial(item.videoId)}
            />
          ))}
        </Carousel>
      </section>

      {/* TOOLS SECTION */}
      <section className="relative py-20 px-4 text-center bg-[#2BB90A] text-white overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Smart Financial Tools
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Unlock powerful financial calculators designed to simplify
            investment, tax, and retirement planning.
          </p>
          <Link
            href="/tools"
            className="inline-block bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-[#07301E] transition-colors"
          >
            Explore Financial Tools
          </Link>
        </div>
        {/* Calculators Slideshow */}
        <Carousel>
          {calculators.map((calc) => (
            <motion.div
              key={calc.id}
              whileHover={{ scale: 1.05 }}
              className="flex-shrink-0 bg-white text-black p-6 rounded-2xl shadow-md mx-2 w-64 hover:shadow-lg transition-shadow"
            >
              <div className="h-32 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                <span className="text-xl font-bold">{calc.name}</span>
              </div>
              <p className="text-sm">Placeholder for financial calculator.</p>
            </motion.div>
          ))}
        </Carousel>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="container mx-auto px-4 py-16 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#07301E] mb-4">
          Our Mission & Vision
        </h2>
        <p className="text-lg text-center text-black max-w-2xl mx-auto mb-10">
          Spring Money is built on the belief that expert financial advice
          should be accessible to everyone. We bridge the gap between you and
          SEBI-registered advisors, ensuring that financial planning is simple,
          transparent, and effective.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Image
              src="/images/mission1.jpg"
              alt="Expert Guidance"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center text-sm text-black font-medium">
              Expert Guidance
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Image
              src="/images/mission2.jpg"
              alt="Innovative Solutions"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center text-sm text-black font-medium">
              Innovative Solutions
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Image
              src="/images/mission3.jpg"
              alt="Long-Term Planning"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center text-sm text-black font-medium">
              Long-Term Planning
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Image
              src="/images/mission4.jpg"
              alt="Strategic Growth"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center text-sm text-black font-medium">
              Strategic Growth
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <Image
              src="/images/mission5.jpg"
              alt="Empowered Decisions"
              className="w-full h-40 object-cover rounded-md mb-2"
            />
            <p className="text-center text-sm text-black font-medium">
              Empowered Decisions
            </p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/financial-planning"
            className="inline-block bg-[#07301E] text-white px-8 py-3 rounded-md font-medium hover:bg-black transition-colors"
          >
            Learn More About Financial Planning
          </Link>
        </div>
      </section>

      {/* OUR TEAM SECTION */}
      <section className="container mx-auto px-4 py-16 max-w-screen-xl">
        <h2 className="text-3xl font-bold text-center text-[#07301E] mb-4">
          Our Team
        </h2>
        <p className="text-lg text-center text-black max-w-2xl mx-auto mb-10">
          Meet the experts behind Spring Money, dedicated to providing clear,
          unbiased financial guidance.
        </p>
        <div className="overflow-x-hidden">
          <div className="flex space-x-4">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="inline-block bg-white rounded-2xl shadow-md mx-2 w-64 p-6 hover:shadow-lg transition-shadow"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-center text-[#07301E]">
                  {member.name}
                </h3>
                <p className="text-center text-sm text-black">
                  {member.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
