"use client"; // This component uses client-side state
import React, { useState } from "react";
import Image from "next/image";
import arrow from "../../public/chevron-down.svg";


export default function FAQAccordion({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <div className="mt-6 px-[60px] pb-[60px]">
      <h3 className="flex justify-center text-[32px] font-semibold text-[#272B2A] mb-6">Commonly Asked Questions</h3>
      <div className="flex flex-col gap-6 ">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#108E66]  bg-[#F0FAF7] rounded-lg">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-lg font-semibold text-[#108E66] focus:outline-none px-6 py-4 flex justify-between"
      >
        {question}
        <Image 
          src={arrow} 
          width={24} 
          height={24} 
          alt="chevron image" 
          className={`transform duration-300 transition-transform ${open ? '' : 'rotate-180'}`}
          style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(95%) saturate(427%) hue-rotate(116deg) brightness(94%) contrast(91%)' }}
        />
      </button>
      {open && (
        <p className="border-t border-[#108E66] text-base text-[#108E66] transition-all duration-300 px-6 py-4">
          {answer}
        </p>
      )}
    </div>
  );
}
