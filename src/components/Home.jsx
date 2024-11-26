import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Howl } from 'howler';
import { VolumeIcon as VolumeUp, VolumeX } from 'lucide-react';
import { Spotlight } from './Sport';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const imageRefs = useRef([]);
  const textRefs = useRef([]);
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const images = [
    '/public/img/k.jpg',
    '/public/img/k.jpg',
    '/public/img/k.jpg',

  ];

  const texts = [
    { title: 'Sambhavami ', subtitle: 'Im the past' },
    { title: 'Yuge', subtitle: ' IM THE PRESENT' },
    { title: 'Yuge', subtitle: 'IM THE FUTURE' },

  ];

  useEffect(() => {
    audioRef.current = new Howl({
      src: ['/public/audio/k.mp3'], // Replace with your audio file
      loop: true,
      volume: 0.5,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const newIndex = Math.floor(self.progress * images.length);
          if (newIndex !== currentIndex && newIndex < images.length) {
            setCurrentIndex(newIndex);
            if (isAudioPlaying) audioRef.current.play();
          }
        },
      },
    });

    imageRefs.current.forEach((img, index) => {
      gsap.set(img, {
        clipPath: 'inset(0% 100% 0% 0%)',
        scale: 1.2,
        opacity: 1,
      });

      tl.to(img, {
        clipPath: 'inset(60% 0% 1% 30%)',
        scale: 1,
        duration: 2,
        ease: 'power2.inOut',
      }, index * 2);

      if (index < images.length - 1) {
        tl.to(img, {
          clipPath: 'inset(0% 0% 0% 100%)',
          scale: 1.1,
          duration: 2,
          ease: 'power2.inOut',
        }, (index + 1) * 2 - 0.5);
      }
    });

    textRefs.current.forEach((text, index) => {
      const title = text.querySelector('h1');
      const subtitle = text.querySelector('p');

      gsap.set([title, subtitle], {
        x: 100,
        opacity: 0,
      });

      tl.to([title, subtitle], {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
      }, index * 2 + 0.5);

      if (index < texts.length - 1) {
        tl.to([title, subtitle], {
          x: -100,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.in',
        }, (index + 1) * 2 - 0.75);
      }
    });

    return () => {
      audioRef.current.unload();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const toggleAudio = () => {
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });
  return (




    <div id='video-frame' ref={containerRef} className="relative h-screen w-full overflow-hidden  bg-zinc-950">
      <Spotlight
        className="-top-10 left-0 md:left-60 md:-top-20"
        fill="blue"
        duration={10}
        delay={0.9}
      />


      {images.map((src, index) => (
        <div
          key={index}
          ref={(el) => (imageRefs.current[index] = el)}
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: images.length - index }}
        >
          <img
            src={src}
            alt={`Scene ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black opacity-75"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        {texts.map((text, index) => (
          <div
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className="absolute text-center "
          >
            <h1 className="mb-4 text-7xl special-font hero-heading text-yellow-50 uppercase tracking-wider text-transparent">
              <br />{text.title} <br />
            </h1>
            <p className="text-3xl font-light special-font  text-slate-50 tracking-wide uppercase">{text.subtitle}</p>
          </div>
        ))}

        {/* "Ray of Hope" Text with Spotlight */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 50,
            duration: 1.5,
          }}
        >
          <h1
            className="lg:text-[201px] max-sm:text-[150px] special-font hero-heading text-sky-100
            shadow-lg tracking-widest opacity-5"
          >
            <b>
              RAY OF HOPE

            </b>
          </h1>

          <motion.img
            src="/public/img/f.png"
            alt="Decoration"
            className="lg:w-[350px] lg:h-[350px] max-sm:w-[250px] max-sm:h-[250px] max-sm:absolute max-sm:top-[50%] max-sm:left-[70%] opacity-30 mt-10  inset-100 lg:absolute lg:top-[20%] lg:left-[85%] transform -translate-x-1/2 -translate-y-1/2"

            transition={{
              type: "spring",
              stiffness: 300,
              damping: 50,
              duration: 2,
            }}
          />
        </motion.div>
      </div>

      <button
        onClick={toggleAudio}
        className="absolute bottom-10 right-10 rounded-full bg-white bg-opacity-20 p-3 text-white transition-all hover:bg-opacity-30 hover:scale-110"
        aria-label={isAudioPlaying ? 'Mute audio' : 'Unmute audio'}
      >
        {isAudioPlaying ? <VolumeUp size={24} /> : <VolumeX size={24} />}
      </button>
    </div>


  );
};

export default Hero;
