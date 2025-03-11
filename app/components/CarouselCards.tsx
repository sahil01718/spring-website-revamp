import Image from "next/image";
import { useEffect, useState } from "react";
import homeFrame from "../../public/home-frame.svg";

const carouselItems = [
    {
      title: "See Your Financial Health Clearly",
      description:
        "Uncover hidden opportunities and gain control of your finances with our comprehensive Financial X-Ray. Get a personalized report in minutes.",
      button: "Get Your Free X-Ray Today!",
      image: "/images/xray1.png",
      link: "/academy/tools/financial-x-ray", // Link added
    },
    {
      title: "File with Confidence. Estimate Your Taxes Now.",
      description:
        "Avoid surprises and plan ahead with our user-friendly Income Tax Calculator. Get a free, personalized estimate in seconds.",
      button: "Coming Soon!",
      image: "/images/incometax1.png",
      link: "/", // Link added
    },
    {
      title: "Plan Your Dream Retirement",
      description:
        "Chart your course to financial security. Our Retirement Calculator helps you estimate how much you need to save for a comfortable retirement lifestyle.",
      button: "Plan Your Retirement Today!",
      image: "/images/retirement1.png",
      link: "/academy/tools/retirement-goal-calculator", // Link added
    },
    {
      title: "Find Your Perfect Loan",
      description:
        "Get matched with the right loan for your needs. Simplify the loan selection process with Loan Assist.",
      button: "Sign Up to Be Notified!",
      image: "/images/loan1.png",
      link: "/", // Link added
    },
  ];

export default function CarouselCards() {
     const [activeIndex, setActiveIndex] = useState<number>(0);
      useEffect(() => {
        const timer = setTimeout(() => {
          const nextIndex = (activeIndex + 1) % carouselItems.length;
          setActiveIndex(nextIndex);
        }, 3000);
    
        return () => clearTimeout(timer);
      }, [activeIndex, carouselItems.length]);
  return (
    <div className="flex flex-col p-[60px] bg-[#108E66]">
      <p className="text-[40px] font-semibold text-[#FCFFFE] mb-2 text-center">
        Don&apos;t just take our word for it
      </p>
      <p className="text-xl font-medium text-[#FCFFFE] mb-4 text-center">
        Real People, Real Results.
      </p>
      <div className="p-8 flex gap-8 w-full justify-center bg-[#FCFFFE]">
        <div className="w-[45%]">
          <Image src={homeFrame} width={1032} height={400} alt="home frame" />
        </div>
        <div className="flex flex-col justify-between w-[55%]">
          <div className="flex flex-col gap-2">
            <p className="text-[#272B2A] text-[32px] font-bold">
              {carouselItems[activeIndex].title}
            </p>
            <p className="text-[#272b2abf] text-2xl font-normal">
              {carouselItems[activeIndex].description}
            </p>
          </div>
          <div className="w-fit px-6 py-3 border border-[#108E66] rounded">
            <span className="text-[#108E66] text-base font-semibold ">
              Watch full Video on Youtube
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        {carouselItems.map((item, index) => (
          <button
            key={index}
            className={`mx-2 h-[1rem] text-sm  rounded-lg w-8 ${
              activeIndex === index ? "bg-[#ffffff]" : "bg-gray-300 "
            }`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
}
