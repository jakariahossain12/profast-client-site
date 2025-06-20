import React from 'react';
import HowItWorks from '../../components/HowItWorks/HowItWorks';
import OurServices from '../../components/OurServices/OurServices';
import HeroSection from '../../components/HeroSection/HeroSection';
import Marchand from '../../components/Marchand/Marchand';

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <Marchand></Marchand>
        </div>
    );
};

export default Home;