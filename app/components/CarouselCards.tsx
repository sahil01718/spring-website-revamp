import Image from "next/image";
import { useEffect, useState } from "react";
import homeFrame from "../../public/home-frame.svg";
import Link from "next/link";
import { motion } from "framer-motion";

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

const Carousel = ({ children }: { children: React.ReactNode }) => (
  <div className="relative overflow-hidden w-full">
    <div className="flex space-x-4 animate-autoScroll w-max">{children}</div>
  </div>
);

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
    <div className="flex flex-col p-4 md:p-[60px] items-center">
      <p className="text-[40px] font-semibold text-[#108E66] mb-2 text-center">
        Don&apos;t just take our word for it
      </p>
      <p className="text-xl font-medium text-[#108E66] mb-4 text-center">
        Real People, Real Results.
      </p>
      <Carousel>
        {carouselItems.map((item, index) => (
          <motion.div key={index} className="p-4 md:p-8 flex flex-col w-[450px] gap-6 justify-center bg-[#FCFFFE] border border-[#108E66] rounded-lg">
            <div className=" hidden md:block">
              <Image
                src={item.image}
                width={560}
                height={400}
                alt="home frame"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-[#272B2A] text-[32px] font-bold">
                  {item.title}
                </p>
                <p className="text-[#272b2abf] text-2xl font-normal">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-6 py-3 border border-[#108E66] mt-6 rounded"
              >
                <span className="text-[#108E66] text-base font-semibold ">
                  {item.button}
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
}
