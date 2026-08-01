import React from 'react';
import './App.css';
import PageLayout from './components/PageLayout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import Press from './pages/Press';
import Contact from './pages/Contact';

function App() {
  return (
    <PageLayout>
      <Home />
      <About />
      <Gallery />
      <Achievements />
      <Press />
      <Contact />
    </PageLayout>
  );
}

export default App;
