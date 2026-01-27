'use client';

import { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from './About';
import BlogPost from './BlogPost';
import Features from './Features';
import Footer from './Footer';
import GetStarted from './GetStarted';
import Header from './Header';
import Home from './Home';
import Faq from './Faq';

export default function Client() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div ref={homeRef} data-aos='fade-up'>
        <Home />
      </div>
      <div ref={aboutRef} data-aos='fade-up' data-aos-delay='100'>
        <About />
      </div>
      <div ref={featuresRef} data-aos='fade-up' data-aos-delay='200'>
        <Features />
      </div>
      {/* <div ref={blogsRef} data-aos="fade-up" data-aos-delay="300">
        <BlogPost />
      </div> */}
      <div ref={faqRef} data-aos='fade-up' data-aos-delay='300'>
        <Faq />
      </div>
      <div ref={pricingRef} data-aos='fade-up' data-aos-delay='400'>
        <GetStarted />
      </div>
    </>
  );
}
