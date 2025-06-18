import { useEffect, useRef, useState } from 'react';
import { FaTasks, FaSearch, FaLightbulb } from 'react-icons/fa';

const features = [
    {
      icon: <FaTasks size={40} />,
      title: 'Task Planning',
      description: 'Break down research topics into manageable tasks.',
    },
    {
      icon: <FaSearch size={40} />,
      title: 'Smart Research',
      description: 'Gather information using advanced AI algorithms.',
    },
    {
      icon: <FaLightbulb size={40} />,
      title: 'Insight Generation',
      description: 'Analyze data to generate meaningful insights.',
    },
];
const faqs = [
    {
      q: "What is AutoResearcher?",
      a: "It's an AI agent that automates end-to-end research using planning, summarization, and critique.",
    },
    {
      q: "Is it open-source?",
      a: "Yes! The backend and frontend are fully extensible and developer-friendly.",
    },
    {
      q: "Can I use my own datasets?",
      a: "Absolutely. You can integrate your own vector DBs and knowledge sources.",
    },
  ];
const testimonials = [
    {
      name: "Jane Doe",
      role: "AI Researcher",
      quote: "AutoResearcher completely changed how I approach literature reviews. It's like having a personal research assistant 24/7!",
    },
    {
      name: "John Smith",
      role: "PhD Student",
      quote: "This tool saves me hours every week. Highly recommend for anyone in academia.",
    },
];

const LandingPage = ({}) => {
    const [openIndex, setOpenIndex] = useState(null);
    return (
        <div>
            
            {/* Hero Section */}
            <section className = "bg-gradient-to-br from-[#264653] to-[#2a9d8f] text-white py-24 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">AutoResearcher</h1>
                <p className="text-lg md:text-2xl mb-6">Your autonomous research assistant powered by AI.</p>
                <button className="bg-[#f4a261] text-white hover:bg-[#e76f51] font-semibold py-2 px-6 rounded shadow transition duration-300">
                    Get Started
                </button>
            </section>

            <section id = "features" className='bg-white text-gray-800 py-20 px-6'>
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className='bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300'>
                            <div className="mb-4 text-[#f4a261] mx-auto">{feature.icon}</div>
                            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonial Section */}
            <section id="testimonials" className="bg-white py-20 px-6 text-center">
                <h2 className="text-4xl font-bold mb-12 text-[#264653]">What Researchers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow hover:shadow-lg transition-all">
                            <p className="italic text-gray-700 mb-4">“{t.quote}”</p>
                            <h3 className="font-semibold text-indigo-600">{t.name}</h3>
                            <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs section */}
            <section id="faq" className="bg-gray-50 py-20 px-6">
                <h2 className="text-4xl font-bold text-center mb-12 text-[#264653]">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto space-y-6">
                    {faqs.map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm transition hover:shadow-md">
                        <button
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full text-left font-medium text-lg text-gray-800"
                        >
                            {item.q}
                        </button>
                        {openIndex === idx && (
                        <p className="text-gray-600 mt-3">{item.a}</p>
                        )}
                    </div>
                    ))}
                </div>
            </section>

            {/* Contact */}
            <section id="contact" className="bg-indigo-50 py-20 px-6 text-center">
                <h2 className="text-4xl font-bold text-indigo-700 mb-10">Get in Touch</h2>
                <form className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <textarea
                        placeholder="Your Message"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-[#264653] hover:bg-[#1f3a4b] text-white px-6 py-2 rounded-md transition"
                    >
                        Send Message
                    </button>
                </form>
            </section>

            <footer className="bg-white text-center py-6 text-gray-600 border-t mt-10">
            <p>© {new Date().getFullYear()} AutoResearch. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage;