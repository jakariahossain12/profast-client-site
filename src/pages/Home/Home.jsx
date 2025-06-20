import React from 'react';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import OurServices from '../../components/OurServices/OurServices';
import HeroSection from '../../components/HeroSection/HeroSection';
import Marchand from '../../components/Marchand/Marchand';
import Sponsor from '../../components/Sponsor/Sponsor';

const Home = () => {
    return (
      <div>
        <HeroSection></HeroSection>
        <HowItWorks></HowItWorks>
        <Sponsor></Sponsor>
        <OurServices></OurServices>
        <Marchand></Marchand>
      </div>
    );
};

export default Home;