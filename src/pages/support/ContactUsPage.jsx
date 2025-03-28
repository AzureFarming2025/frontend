// ContactUsPage.tsx
import { useState } from "react";
import { Card, Collapse, Avatar } from "react-daisyui";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const CONTACT_INFO = [
  { icon: <FaPhoneAlt />, text: "(610) 945-7986" },
  { icon: <FaEnvelope />, text: "real.danieljackson@hotmail.com" },
  { icon: <FaMapMarkerAlt />, text: "5007 Ocean Avenue, Charlotte" },
];

const FAQS = [
  {
    question: "Can I control the Smart Farm with my phone?",
    answer: "Yes, you can remotely manage it via our mobile app.",
  },
  {
    question: "What data can I monitor?",
    answer: "You can check temperature, humidity, and soil moisture.",
  },
];

export default function ContactUsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-yellow-100 py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold text-yellow-600 mb-2">Contact Us</h2>
        <p className="text-gray-700">We're here to help with your Smart Farm questions.</p>
      </div>

      {/* Contact + Map */}
      <div className="bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Get in Touch</h3>
            {CONTACT_INFO.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg text-primary">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden">
            <Avatar
              src="https://source.unsplash.com/600x400/?map"
              alt="Map preview"
              width={600}
              height={400}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-green-700 text-center">FAQ</h3>
          {FAQS.map((faq, idx) => (
            <Collapse
              key={idx}
              icon="arrow"
              open={openIndex === idx}
              onToggle={() => handleToggle(idx)}
              className="bg-white border border-base-200"
            >
              <Collapse.Title className="text-sm font-medium px-4 py-2">
                {faq.question}
              </Collapse.Title>
              <Collapse.Content className="text-sm text-gray-600 px-4 pb-3">
                {faq.answer}
              </Collapse.Content>
            </Collapse>
          ))}
        </div>
      </div>
    </div>
  );
}