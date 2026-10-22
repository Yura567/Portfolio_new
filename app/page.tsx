import CaseDrop from '@/components/CaseDrop';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Payouts from '@/components/Payouts';
import Projects from '@/components/Projects';
import Ticker from '@/components/Ticker';

export default function Home() {
  return (
    <>
      <Nav />
      <Intro />
      <Hero />
      <main>
        <CaseDrop />
        <Ticker />
        <Experience />
        <Projects />
        <Payouts />
        <Contact />
      </main>
      <footer>
        <div className="wrap"><span>© 2026 Yura Svituha</span><span>Fintech × iGaming · Full Stack AI</span></div>
      </footer>
    </>
  );
}
