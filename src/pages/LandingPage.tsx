import React from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Layout, Palette, Settings2, Star, Download, Users } from 'lucide-react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Templates } from '../components/landing/Templates';
import { Benefits } from '../components/landing/Benefits';
import { Testimonials } from '../components/landing/Testimonials';
import { Pricing } from '../components/landing/Pricing';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';

const ScrollReveal = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 75 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 75 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Easy Content Management',
    description: 'Effortlessly manage your resume sections with our intuitive drag-and-drop interface.'
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: 'Professional Templates',
    description: 'Choose from a variety of professionally designed templates to make your resume stand out.'
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Customizable Design',
    description: 'Personalize colors, fonts, and layouts to match your style and industry standards.'
  },
  {
    icon: <Settings2 className="w-6 h-6" />,
    title: 'Smart Features',
    description: 'Real-time preview, progress tracking, and section management to streamline your resume creation.'
  }
];

const stats = [
  { icon: <Users />, value: '50K+', label: 'Users' },
  { icon: <Download />, value: '100K+', label: 'Downloads' },
  { icon: <Star />, value: '4.9', label: 'Rating' },
];

export function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <motion.div
          className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <motion.h1
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Create Your Professional
              <span className="text-indigo-600"> Resume</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Build a stunning resume that stands out with our easy-to-use builder.
              Professional templates, smart features, and instant preview.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                to="/resume-builder"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors group text-lg"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Background Decoration */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        </motion.div>
      </div>

      {/* Stats Section */}
      <ScrollReveal>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm text-center"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-12 h-12 mx-auto mb-4 text-indigo-600">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Powerful Features for Your Resume
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <ScrollReveal key={index}>
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <ScrollReveal>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Build Your Resume?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals who have created successful resumes with our builder.
            </p>
            <Link
              to="/resume-builder"
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors group text-lg"
            >
              Start Building Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      <Header />
      <Hero />
      <Features />
      <Templates />
      <Benefits />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}