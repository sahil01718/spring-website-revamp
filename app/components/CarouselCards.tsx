import Image from "next/image";
import { useEffect, useState } from "react";
import homeFrame from "../../public/home-frame.svg";
import Link from "next/link";

const carouselItems = [
  {
    title: "“The Financial Advice That Changed My Life”",
    description:
      "I used to invest based on influencer tips, and it cost me thousands. Now, I let the experts handle my finances, and I finally have peace of mind.",
    button: "Watch Full Video on Youtube",
    image: "/carousel-cards/carousel1.svg",
    link: "https://youtu.be/2YlOxs78WPc?si=QIZELFCXGXWebmct",
    guest: "~ Harshal Patil",
  },
  {
    title: "“A Smarter Approach to Wealth Building”",
    description:
      "I used to check my portfolio every day, worrying about losses. Now, I focus on my career while my money works for me.",
    button: "Watch Full Video on Youtube",
    image: "/carousel-cards/carousel2.svg",
    link: "https://youtu.be/nXjwXqpnBPI",
    guest: "~ Vijit Neema",
  },
  {
    title: "“Breaking Free from Financial Mistakes”",
    description:
      "I learned the hard way that impulsive decisions and short-term thinking don’t work. With expert guidance, I finally have a structured plan.",
    button: "Watch Full Video on Youtube",
    image: "/carousel-cards/carousel3.svg",
    link: "https://www.youtube.com/watch?v=5m5Qigm2j7w",
    guest: "~ Sandeep Mahajan",
  },
  {
    title: "“From Financial Anxiety to Confidence”",
    description:
      "Financial planning isn’t just about investments. It’s about confidence, security, and achieving life’s goals without stress.",
    button: "Watch Full Video on Youtube",
    image: "/carousel-cards/carousel4.svg",
    link: "https://youtu.be/xJA4zt2hcJE",
    guest: "~ Anjali Deshpande",
  },
  {
    title: "“Making Smarter, Goal-Based Investments”",
    description:
      "Financial planning is beyond just investments. It’s about achieving life goals, from a family vacation to a secure retirement.",
    button: "Watch Full Video on Youtube",
    image: "/carousel-cards/carousel5.svg",
    link: "https://www.youtube.com/watch?v=jx_6soC3wuM",
    guest: "~ Abhi Kasturi",
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
    <div className="flex flex-col p-4 md:p-[60px] bg-[#108E66] items-center">
      <p className="text-[40px] font-semibold text-[#FCFFFE] mb-2 text-center">
        Don&apos;t just take our word for it
      </p>
      <p className="text-xl font-medium text-[#FCFFFE] mb-4 text-center">
        Real People, Real Results.
      </p>
      <div className="p-4 md:p-8 flex gap-8 w-full justify-center bg-[#FCFFFE]  max-w-screen-xl">
        <div className="md:w-[45%] hidden md:block">
          <Image
            src={carouselItems[activeIndex].image}
            width={1032}
            height={400}
            alt="home frame"
          />
        </div>
        <div className="flex flex-col justify-between w-full md:w-[55%]">
          <div className="flex flex-col gap-2">
            <p className="text-[#272B2A] text-[32px] font-bold">
              {carouselItems[activeIndex].title}
            </p>
            <p className="text-[#272b2abf] text-2xl font-normal">
              {carouselItems[activeIndex].description}
            </p>
            <p className="text-[#272B2A] text-[32px] font-bold">
              {carouselItems[activeIndex].guest}
            </p>
          </div>
          <Link
            href={carouselItems[activeIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit px-6 py-3 border border-[#108E66] rounded"
          >
            <span className="text-[#108E66] text-base font-semibold ">
              {carouselItems[activeIndex].button}
            </span>
          </Link>
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
