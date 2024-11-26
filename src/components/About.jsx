import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";
import { BackgroundBeams } from './background-beams';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to Zentry
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world <br /> of the <b>C</b>reater"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>The Game of Games begins—your life, now an epic MMORPG</p>
          <p className="text-gray-500">
            Zentry unites every player from countless games and platforms, both
            digital and physical, into a unified Play Economy
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">

          <div className="absolute left-0 top-0 size-full object-cover  bg-[#000000]">
            <img src="/public/img/k-2.jpg" alt=" b"
              className=' w-screen h-dvh   lg:object-fill bg-transparent   inset-1/4  object-cover'

            />

            <p className="mb-5 max-w-64 font-robert-regular absolute top-10 right-5 text-blue-100">
              Enter the Gods Layer <br /> Unleash the Yourself
            </p>
            <BackgroundBeams />
          </div>




          <h1 className="special-font absolute top-5 left-5    text-black">
            <b>surrender </b>
          </h1>


          <h1 className="special-font text-3xl   absolute bottom-5 right-5 ">
            <b> कृष्णा सदा सहायते</b>
          </h1>
        </div>
      </div >

    </div >
  );
};

export default About;