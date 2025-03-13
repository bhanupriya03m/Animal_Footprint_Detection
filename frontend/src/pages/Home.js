import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Camera,
  ChevronRight,
  Globe2,
  Leaf,
  LineChart,
  Shield,
  Users,
} from "lucide-react";
import footprintImage from "../assets/footprint.jpg";
import test from "../assets/test.jpg";

/**
 * Color Palette (Retro Vibrant):
 * Teal (Primary)       => #005266
 * Neon Yellow (Accent) => #D7FF00
 * Soft Blue (Secondary)=> #A2C3D6
 * Magenta (Highlight)  => #9D2450
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(45deg, #005266,rgb(111, 77, 143), #A2C3D6, #9D2450)",
            backgroundSize: "400% 400%",
            animation: "gradientShift 10s ease-in-out infinite",
          }}
        />

        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-10 bg-[#005266]/70 backdrop-blur-sm shadow-md">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-[#D7FF00] text-2xl font-bold">
              WildTrack
            </Link>
            <Link
              to="/"
              className="text-white hover:text-[#D7FF00] transition font-semibold"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-[#D7FF00] mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Automated Animal Footprint Classification */}
            <span className="block text-white">
              A Hybrid CNN-PNN Approach for Ecological Research
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-[#D7FF00] mb-8 max-w-2xl mx-auto drop-shadow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our project develops an automated, deployable system that extracts
            robust features using a CNN and classifies species with a PNN,
            streamlining wildlife monitoring and conservation research.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/upload"
              className="bg-[#D7FF00] text-[#005266] px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center hover:bg-white transition transform hover:scale-105 duration-300"
            >
              Explore the Project <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <div className="absolute bottom-10 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { label: "Tested Species", value: "100+" },
                { label: "System Accuracy", value: "85%" },
                { label: "Deployment Ready", value: "Yes" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-lg bg-white/20 backdrop-blur-md shadow-sm"
                >
                  <div className="text-[#D7FF00] text-3xl font-bold">
                    {stat.value}
                  </div>
                  <div className="text-white text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Project Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-[#A2C3D6]/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#005266] mb-4">
              What We Do
            </h2>
            <p className="text-[#005266]/80 text-lg">
              Our research project pioneers an automated system that combines
              deep learning techniques to accurately classify animal footprints.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8" />,
                title: "CNN Feature Extraction",
                description:
                  "Utilize a Convolutional Neural Network to automatically extract robust features from footprint images.",
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "PNN Classification",
                description:
                  "Integrate extracted features with a Probabilistic Neural Network for reliable species classification.",
              },
              {
                icon: <Globe2 className="h-8 w-8" />,
                title: "Automated Analysis",
                description:
                  "Eliminate manual feature engineering with a fully automated footprint analysis pipeline.",
              },
              {
                icon: <LineChart className="h-8 w-8" />,
                title: "Scalable Deployment",
                description:
                  "Design a platform-independent system ensuring scalability across diverse research environments.",
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Wildlife Monitoring",
                description:
                  "Enhance ecological research with accurate data for wildlife tracking and conservation.",
              },
              {
                icon: <Leaf className="h-8 w-8" />,
                title: "Hybrid Approach",
                description:
                  "Combine state-of-the-art AI techniques to achieve superior performance in footprint classification.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-[#9D2450] mb-4 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#005266] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#005266]/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-20 bg-secondary/5">
        <div className="container mx-auto px-8 lg:px-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Section - Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pl-10 lg:pl-16"
            >
              <h2 className="text-4xl font-bold text-primary">
                Project Overview & Methodology
              </h2>
              <p className="text-secondary text-lg">
                Our objective is to develop an automated and deployable system
                for accurate animal footprint classification using a hybrid deep
                learning approach. A Convolutional Neural Network (CNN) automatically
                extracts robust features from footprint images which are then combined
                with a Probabilistic Neural Network (PNN) for probabilistic species classification.
              </p>
              <div className="space-y-4">
                {[
                  "Robust Feature Extraction",
                  "Probabilistic Classification",
                  "Automated Pipeline",
                  "Scalable Deployment",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="text-[#D7FF00] h-5 w-5" />
                    <span className="text-secondary">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/upload"
                className="inline-flex items-center text-primary font-semibold hover:text-primary-accent transition"
              >
                Learn More About the Project{" "}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>

            {/* Right Section - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pr-10 lg:pr-16 flex justify-center"
            >
              <img
                src={footprintImage}
                alt="Footprint analysis"
                className="rounded-2xl shadow-lg hover:shadow-xl transition w-[450px] h-[450px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-[#005266] text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Helps
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:"Achieve reliable species monitoring with our 85% accurate CNN-PNN system, ensuring precise wildlife tracking."
              },
              {
                quote:
                  "Our scalable, platform-independent deployment supports diverse research environments for broad ecological studies."
              },
              {
                quote:
                  "Automated feature extraction streamlines data collection and accelerates conservation research, reducing manual work."
                
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-[#A2C3D6]/10 p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex items-center space-x-4 mb-6">
                  {/* <img
                    src={test}
                    alt={testimonial.author}
                    width="50"
                    height="50"
                    className="rounded-full"
                  /> */}
                  <div>
                    <div className="font-semibold text-[#005266]">
                      {testimonial.author}
                    </div>
                    <div className="text-[#005266]/70 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-[#005266]/90 italic">
                  "{testimonial.quote}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#005266] via-[#9D2450] to-[#005266]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-[#D7FF00] mb-6 drop-shadow-md">
              Discover Our Research
            </h2>
            <p className="text-xl mb-8 text-white drop-shadow-sm">
              Dive into our innovative approach to automated footprint classification and see how our hybrid deep learning method is reshaping ecological research.
            </p>
            <Link
              to="/upload"
              className="bg-[#D7FF00] text-[#005266] px-8 py-4 rounded-full font-semibold text-lg inline-flex items-center hover:bg-white transition transform hover:scale-105 duration-300"
            >
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-white pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#005266]">WildTrack</h3>
              <p className="text-[#005266]/80">
                A research project demonstrating advanced animal footprint classification using a hybrid CNN-PNN approach, enhancing wildlife monitoring and ecological research.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-[#005266] hover:text-[#9D2450] transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.203c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-[#005266] hover:text-[#9D2450] transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0012 4.797c0 1.71.87 3.213 2.188 4.096-1.318-.043-2.563-.406-3.672-1.018v.06c0 2.388 1.698 4.379 3.946 4.827a4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417c-1.11.87-2.52 1.394-4.05 1.394-.263 0-.522-.015-.78-.046 1.445.927 3.162 1.467 5.013 1.467 6.017 0 9.311-4.99 9.311-9.31 0-.142-.003-.283-.01-.423A6.66 6.66 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-[#005266] hover:text-[#9D2450] transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.371 0 0 5.371 0 12c0 5.301 3.438 9.8 8.205 11.387v-8.051H5.785V12h2.42V9.356c0-2.392 1.432-3.707 3.629-3.707 1.051 0 2.148.186 2.148.186v2.367h-1.212c-1.195 0-1.565.743-1.565 1.504V12h2.66l-.425 3.336h-2.235v8.051C18.562 21.8 22 17.301 22 12c0-6.629-5.371-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-[#005266] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#features"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="#methodology"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Methodology
                  </Link>
                </li>
                <li>
                  <Link
                    to="#feedback"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to="#contact"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#005266] mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-[#005266]/70 hover:text-[#005266] transition"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#005266] mb-4">Contact</h4>
              <ul className="space-y-2 text-[#005266]/70">
                <li>1234 Research Lane</li>
                <li>Innovation City, Lab 101</li>
                <li>info@wildtrack.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#005266]/20 pt-8">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="text-[#005266]/70 text-sm">
                © 2025 WildTrack. All rights reserved.
              </div>
              <div className="md:text-right space-x-4 text-sm">
                <Link
                  to="#"
                  className="text-[#005266]/70 hover:text-[#005266] transition"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="#"
                  className="text-[#005266]/70 hover:text-[#005266] transition"
                >
                  Terms of Service
                </Link>
                <Link
                  to="#"
                  className="text-[#005266]/70 hover:text-[#005266] transition"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
