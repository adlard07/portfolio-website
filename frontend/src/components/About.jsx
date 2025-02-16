import React from 'react';
import SelfImage from '../assets/self/sheesh.jpg';
import { FaFutbol } from "react-icons/fa";
import { Zap, Code, Cpu, Brain } from 'lucide-react';

const HighlightedText = ({ children }) => (
  <span className="italic font-medium text-emerald-700 transition-colors duration-300 hover:text-emerald-900">
    {children}
  </span>
);

const IconBadge = ({ Icon, text }) => (
  <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full">
    <Icon className="w-4 h-4 text-emerald-600" />
    <span className="text-sm text-emerald-700">{text}</span>
  </div>
);

const AboutCard = () => {
  return (
    <div className="bg-white relative flex flex-col items-stretch gap-8 p-10 w-[65rem] mx-auto rounded-2xl border border-gray-100 shadow-xl transition-all hover:shadow-2xl hover:border-emerald-100">

      {/* Title with enhanced styling */}
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl font-bold text-center relative pb-3">
          <span className="text-green-900 relative inline-block">
            About Me
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#4A5D46]"></div>
          </span>
        </h2>
        <div className="flex gap-3 mt-2">
          <IconBadge Icon={Brain} text="AI/ML" />
          <IconBadge Icon={Code} text="Software Developer" />
          <IconBadge Icon={Cpu} text="Electronics Enthusiast" />
          <IconBadge Icon={FaFutbol} text="Football" />
          <IconBadge Icon={Zap} text="Badminton" />
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-10">
        <div className="flex-1 flex flex-col justify-between w-auto h-full">
          
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 left-0 w-2 h-24 bg-emerald-600 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-2 h-24 bg-emerald-600 rounded-br-2xl" />

          <div className="flex flex-col justify-between h-full gap-6">
            <p className="text-justify text-lg text-gray-800 leading-relaxed">
              In 2024, I emerged as a <HighlightedText>"mad scientist"</HighlightedText> in the tech realm,
              orchestrating a fascinating dance between <HighlightedText>AI sorcery</HighlightedText> and
              <HighlightedText> hardware wizardry</HighlightedText>. My days are spent crafting neural networks
              that push boundaries, while my nights transform into adventures in electronic alchemy. This
              <HighlightedText> digital renaissance</HighlightedText> approach unexpectedly caught the attention
              of an online community, teaching me that true innovation thrives at the intersection of diverse disciplines.
            </p>

            <div className="w-24 h-1 bg-emerald-600 rounded-full mx-auto transform transition-all duration-300 hover:scale-x-110" />

            <p className="text-justify text-lg text-gray-800 leading-relaxed">
              My journey resembles a <HighlightedText>"quantum superposition"</HighlightedText> of skills – simultaneously
              exploring multiple dimensions of technology. From crafting <HighlightedText>data-driven solutions</HighlightedText>
              for ambitious startups to engineering <HighlightedText>quirky IoT contraptions</HighlightedText>, each project
              adds a new layer to my technological arsenal. I navigate through challenges like a
              <HighlightedText> "digital polymath"</HighlightedText>, wielding mathematics as my compass while embracing
              the beautiful uncertainty of innovation – much like <HighlightedText>Schrödinger's engineer</HighlightedText>,
              existing in a state of perpetual learning and mastery.
            </p>
          </div>
        </div>

        <div className="w-[28rem] h-[34rem] flex-shrink-0 relative group">
          <div className="absolute inset-0 bg-emerald-600 rounded-2xl transform rotate-3 opacity-10 group-hover:rotate-6 transition-all duration-300" />
          <img
            src={SelfImage}
            alt="Your Picture"
            className="object-cover w-full h-full rounded-2xl shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] group-hover:-rotate-2"
          />
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Zap className="w-6 h-6 text-emerald-600 animate-pulse" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutCard;