"use client"; // This component uses client-side state
import React, { useState } from "react";

const faqs = [
  {
    question: "How do I start my financial planning journey with Spring Money?",
    answer:
      "Connect with us on WhatsApp, and our SEBI-registered experts will assess your needs and guide you toward the right plan.",
  },
  {
    question: "What makes Spring Money different from other financial advisory platforms?",
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
    answer: "Yes. We follow strict data protection policies to keep your financial information safe.",
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

export default function FAQAccordion() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold text-[#FCFFEE] mb-4">FAQs</h3>
      <div>
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
    <div className="border-b border-gray-500 py-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left text-base font-semibold text-[#FCFFEE] focus:outline-none"
      >
        {question}
      </button>
      {open && (
        <p className="mt-2 text-sm text-[#FCFFEE] transition-all duration-300">
          {answer}
        </p>
      )}
    </div>
  );
}
