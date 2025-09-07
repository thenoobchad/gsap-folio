import { useEffect, useRef, useState } from "react"
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";


export const Navbar = () => {

    const navRef = useRef(null);
    const linksRef = useRef([]);
    const contactRef = useRef(null);
    const toplineRef = useRef(null);
    const bottomlineRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showBurger, setShowBurger] = useState(true);

    const tl = useRef(null);
    const iconTl = useRef(null);

    useGSAP(() => {
        gsap.set(navRef.current, { xPercent: 100 });
        gsap.set([linksRef.current, contactRef.current], {
            autoAlpha: 0,
            x: -20,
        });


        tl.current = gsap.timeline({ paused: true })
            .to(navRef.current, {
                xPercent: 0,
                duration: 1,
                ease: "power3.out"
            })
            .to(linksRef.current, {
                autoAlpha: 1,
                x: 0,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out"
            }, "<")
            .to(contactRef.current, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "+0.2");
        
       iconTl.current = gsap.timeline({ paused: true }).to(toplineRef.current, {
            rotate: 45,
            y: 3.3,
            duration: 0.3,
            ease: "power2.inOut",
        }).to(bottomlineRef.current, {
            rotate: -45,
            y: -3.3,
            duration: 0.3,
            ease: "power2.inOut",
        }, "<");
    }, [])

    useEffect(() => {

        let lastScrollY = window.scrollY;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setShowBurger(currentScrollY < lastScrollY || currentScrollY < 10)

            lastScrollY = currentScrollY
          }
        window.addEventListener("scroll", handleScroll, {
            passive: true
        })

        return () => window.removeEventListener("scroll", handleScroll)
    },[])

    const toggleMenu = () => {
        console.log("toggling menu");
        if (isOpen) {
            
            iconTl.current.reverse();
            tl.current.reverse();
        } else {
            iconTl.current.play();
            tl.current.play();
        }
        setIsOpen(!isOpen);
    }    

    return (
      <>
      <nav ref={navRef} className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/80 py-18 gap-y-10 md:w-1/2 md:left-1/2"><div className="flex flex-col text-4xl gap-y-2 md:text-5xl lg:text-7xl">
          {["home", "services", "about", "work", "contact"].map((section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                  <Link className="transition-all duration-300 cursor-pointer hover:text-white" to={`${section}`} smooth offset duration={1000}>
                      {section}
                  </Link>
              </div>
            
      ))}
      </div>
          <div ref={contactRef} className="flex flex-col flex-wrap justify-between gap-8 md:flex-row">
              <div className="font-light">
                  <p className="tracking-wider text-white/50">E-mail</p>
                  <p className="text-xl tracking-widest lowercase text-pretty">chidielueme@gmail.com</p>
              </div>
              <div className="font-light">
                  <p className="tracking-wider text-white/50">Social media</p>
                  <div className="flex flex-col flex-wrap md:flex-row gap-x-2">{socials.map((social, index) => (
                      <a key={index} href={social.href} className="text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300">
                          {"["}
                          {social.name}
                          {"]"}
                      </a>
                  ))}</div>
                </div>
          </div>
          
            </nav>
            
            <div onClick={toggleMenu}
                style={showBurger ? { clipPath : "circle(50.0% at 50% 50%)"} : {clipPath: "circle(0% at 50% 50%)"} }
                className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-10 h-10 md:w-15 md:h-15 top-4 right-10"> 
                <span ref={toplineRef} className="block w-6 h-0.5 bg-white rounded-full origin-center"></span>
                 <span ref={bottomlineRef} className="block w-6 h-0.5 bg-white rounded-full origin-center"></span>
            </div>
        </>
  )
}
