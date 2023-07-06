"use client";

import { YOUTUBE_URL } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
import MobileView from "./MobileView";
import NavbarItem from "./NavbarItem";

const OFFSET = 66;

const Navbar = () => {
  const [showBackground, setShowBackground] = useState(false);
  const [showMobileMenu, setShowmobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= OFFSET) {
        setShowBackground(true);
      } else setShowBackground(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowmobileMenu((current) => !current);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-40 m-auto w-screen px-2 py-4 lg:max-w-[1920px] lg:px-6 ${
        showBackground ? "backdrop-blur-md" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/mscNewLogo.png"
              alt="MLSA Logo"
              width={400}
              height={400}
              loading="eager"
              className="h-[35px] w-[140px] md:h-[50px] md:w-[197px]"
            />
          </Link>
          {/* <span className="bg-gradient-to-r from-[#0070C5] to-[#3BABCF] bg-clip-text text-[20px] font-semibold text-transparent lg:text-[1.7vw]">
            MLSA <span className="hidden md:inline-block">KIIT</span>
          </span> */}
        </div>
        <div onClick={toggleMobileMenu} className="md:hidden ml-2">
          {!showMobileMenu ? <AiOutlineMenu /> : <VscChromeClose />}
          <MobileView visible={showMobileMenu} />
        </div>
        <div className="hidden gap-6 text-white md:flex md:items-center lg:gap-8">
          <NavbarItem href="/events">Events</NavbarItem>
          <NavbarItem href="/projects">Projects</NavbarItem>
          <NavbarItem href="/blogs">Blog</NavbarItem>
          <NavbarItem href="/gallerys">Gallery</NavbarItem>
          <NavbarItem href="/members">Members</NavbarItem>
          <NavbarItem href={YOUTUBE_URL}>Youtube</NavbarItem>
          <NavbarItem href="/contact" type="button">
            Contact
          </NavbarItem>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
