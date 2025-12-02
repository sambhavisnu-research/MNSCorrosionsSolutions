import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, BrickWall } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '../assets/logo.png';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const logoRef = useRef(null);

    const navItems = [
        { name: 'Who We Are', href: '#who-we-are' },
        { name: 'Why Choose Us', href: '#why-choose-us' },
        { name: 'Products', href: '#products' },
        { name: 'Technical Data', href: '#technical-data' },
    ];

    useEffect(() => {
        // Navbar scroll effect
        const handleScroll = () => {
            if (navRef.current) {
                const scrolled = window.scrollY;
                if (scrolled > 50) {
                    gsap.to(navRef.current, {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        duration: 0.3
                    });
                } else {
                    gsap.to(navRef.current, {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        boxShadow: 'none',
                        duration: 0.3
                    });
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e, href) => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 64
                },
                ease: 'power3.inOut'
            });
        }
        setIsOpen(false);
    };

    const handleLogoHover = (isEntering) => {
        if (logoRef.current) {
            gsap.to(logoRef.current, {
                rotate: isEntering ? 360 : 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    };

    return (
        <nav ref={navRef} className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <a
                            href="#"
                            className="flex items-center gap-2"
                            onClick={(e) => handleSmoothScroll(e, 'body')}
                            onMouseEnter={() => handleLogoHover(true)}
                            onMouseLeave={() => handleLogoHover(false)}
                        >
                            <img src={logo} alt="MNS Corrosions Solutions Logo" className="h-10 w-auto md:h-14" />
                            <span className="font-semibold text-sm md:text-lg">MNS Corrosions Solutions</span>
                        </a>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleSmoothScroll(e, item.href)}
                                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium text-sm"
                            >
                                {item.name}
                            </a>
                        ))}
                        <Button asChild>
                            <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get Quote</a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col space-y-4 mt-8">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="text-lg font-medium text-gray-900 hover:text-primary"
                                            onClick={(e) => handleSmoothScroll(e, item.href)}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                    <Button asChild className="w-full">
                                        <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Get Quote</a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
