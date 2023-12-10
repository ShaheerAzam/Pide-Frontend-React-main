import React from 'react';

import Header from '../partials/Header';
import HeroHome from '../partials/HeroHome';
import Footer from '../partials/Footer';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      <Header />

      <main className="flex-grow">

        <HeroHome />
        

      </main>


      <Footer />

    </div>
  );
}

export default Home;