'use client';

import React, { useRef } from 'react';
import Header from '../(components)/Header';
import BusinessFooter from '../(components)/BasicFooter';
import BusinessHeader from '../(components)/BusinessHeader';
import BusinessNoHeader from '../(components)/BusinessNoHeader';

const BusinessLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  const handleNav = (item: string) => {
    switch (item) {
      case '':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '#home':
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '#about':
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '#features':
        featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '#getStarted':
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '#blogs':
        blogsRef.current?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        homeRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <BusinessNoHeader />
      {/* <Header handleNav={handleNav} /> */}
      {children}
    </>
  );
};

export default BusinessLayout;
