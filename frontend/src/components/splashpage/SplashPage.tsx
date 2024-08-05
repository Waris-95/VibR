import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const SplashPage: React.FC = () => {
  const developerSectionRef = useRef<HTMLDivElement>(null);
  const featuresSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInLeft');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    const observerRight = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInRight');
            observerRight.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (developerSectionRef.current) {
      observer.observe(developerSectionRef.current);
    }

    if (featuresSectionRef.current) {
      observerRight.observe(featuresSectionRef.current);
    }

    return () => {
      observer.disconnect();
      observerRight.disconnect();
    };
  }, []);

  return (
    <div className="text-white">
      <Parallax
        bgImage="https://wallpapercave.com/wp/wp10486491.jpg"
        strength={500}
        bgImageStyle={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-black bg-opacity-60">
          <h1 className="text-lg font-medium md:text-5xl animate-fadeIn text-gradient typing-effect">Welcome To Vibr</h1>
          <p className="text-sm font-light md:text-sm animate-fadeIn delay-1s">Connect with your friends and the world around you.</p>
          <div className="space-x-4 animate-fadeIn delay-2s flex flex-col md:flex-row">
            <Link to="/login" className="btn btn-primary px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-300 to-purple-700 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-500 transform hover:scale-105 mb-4 md:mb-0">Login</Link>
            <Link to="/signup" className="btn btn-secondary px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-gray-500 to-transparent rounded-lg shadow-lg hover:from-purple-700 hover:to-gray-900 transition duration-500 transform hover:scale-105">Sign Up</Link>
          </div>
        </div>
      </Parallax>

      <section ref={developerSectionRef} className="py-20 bg-black bg-opacity-90 mt-10">
        <div className="container mx-auto text-left px-4">
          <h2 className="text-3xl font-bold md:text-5xl text-gradient">Meet The Developer</h2>
          <div className="mt-8 flex flex-col md:flex-row items-center md:items-start">
            <div className="md:w-1/4 mb-8 md:mb-0 flex justify-center md:justify-start">
              <img src="https://ipfs.io/ipfs/QmYzDRpR8q2Pf6tjfRht5kav5EDChXWHwq6hv5JxAvq5HJ/nft.gif" alt="Developer Profile" className="rounded-full shadow-lg w-32 h-32 md:w-48 md:h-48" />
            </div>
            <div className="md:w-3/4 md:ml-8 text-center md:text-left">
              <p className="mt-4 text-lg md:text-xl">Hi, I'm Abdul, known as the Vibr guy. I'm a full-stack developer with a keen interest in backend development, although I also enjoy working on the frontend. Please feel free to reach out to me from any links below!</p>
              <div className="mt-8 flex flex-col md:flex-row items-center md:items-start">
                <a href="https://github.com/Waris-95" className="btn btn-primary px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-100 to-purple-900 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-500 transform hover:scale-105 m-2">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/abdul-waris-aa1234aw/" className="btn btn-primary px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-100 to-purple-900 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-500 transform hover:scale-105 m-2">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a href="https://abduls-portfolio-orpin.vercel.app" className="btn btn-primary px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-purple-100 to-purple-900 rounded-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-500 transform hover:scale-105 m-2">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* 
      <section ref={featuresSectionRef} className="py-20 bg-black text-white mt-10">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold md:text-5xl text-gradient mb-8">Features</h2>
          <div className="text-left md:text-center space-y-6 text-lg md:text-xl leading-relaxed">
            <div className="flex items-start md:justify-center">
              <span className="mr-2">🌟</span>
              <p>Stack: + TypeScript + Socket.io + Prisma + PostgreSQL + TailwindCSS</p>
            </div>
            <div className="flex items-start md:justify-center">
              <span className="mr-2">🎃</span>
              <p>Authentication && Authorization with JWT</p>
            </div>
            <div className="flex items-start md:justify-center">
              <span className="mr-2">👾</span>
              <p>Real-time messaging with Socket.io</p>
            </div>
            <div className="flex items-start md:justify-center">
              <span className="mr-2">🚀</span>
              <p>Online user status (Socket.io and React Context)</p>
            </div>
            <div className="flex items-start md:justify-center">
              <span className="mr-2">👌</span>
              <p>Global state management with Zustand</p>
            </div>
            <div className="flex items-start md:justify-center">
              <span className="mr-2">🐞</span>
              <p>Error handling both on the server and on the client</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default SplashPage;
