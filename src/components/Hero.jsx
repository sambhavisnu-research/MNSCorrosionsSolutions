/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
    const bgRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const highlightRef = useRef(null);
    const particlesRef = useRef(null);
    const statRefs = useRef([]);
    const dragStateRef = useRef({});
    const [dragOffsets, setDragOffsets] = useState({
        thermal: { x: 0, y: 0 },
        lightweight: { x: 0, y: 0 }
    });

    statRefs.current = [];

    useEffect(() => {
        const anime = window?.anime; // Use global anime from CDN
        if (!anime) return;

        // GSAP Parallax effect on background
        const handleScroll = () => {
            const scrolled = window.scrollY;
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    y: scrolled * 0.5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Anime.js text animations with stagger
        // Anime.js text animations with stagger
        if (titleRef.current) {
            const titleText = titleRef.current.textContent;
            // Split by words first to preserve word integrity during wrapping
            const words = titleText.split(' ');

            titleRef.current.innerHTML = words
                .map(word => {
                    const chars = word
                        .split('')
                        .map(char => `<span class="char inline-block" style="opacity: 0">${char}</span>`)
                        .join('');
                    // Wrap each word in a span that prevents breaking inside the word
                    return `<span class="word inline-block whitespace-nowrap">${chars}</span>`;
                })
                .join(' '); // Add space between words

            anime({
                targets: titleRef.current.querySelectorAll('.char'),
                opacity: [0, 1],
                translateY: [40, 0],
                rotateX: [-90, 0],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: anime.stagger(30, { start: 0 })
            });
        }

        // Subtitle animation
        anime.timeline({ autoplay: true })
            .add({
                targets: highlightRef.current,
                opacity: [0, 1],
                translateY: [-10, 0],
                scale: [0.9, 1],
                easing: 'easeOutExpo',
                duration: 800,
                delay: 400
            })
            .add({
                targets: subtitleRef.current,
                opacity: [0, 1],
                translateY: [30, 0],
                easing: 'easeOutQuad',
                duration: 900
            }, '-=200');

        // Buttons animation
        anime({
            targets: buttonsRef.current.children,
            opacity: [0, 1],
            translateY: [40, 0],
            scale: [0.8, 1],
            easing: 'easeOutElastic(1, .8)',
            duration: 1200,
            delay: anime.stagger(150, { start: 1200 })
        });

        // Floating particles animation
        const createParticles = () => {
            if (!particlesRef.current) return;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    pointer-events: none;
                `;
                particlesRef.current.appendChild(particle);
            }

            anime({
                targets: '.particle',
                translateY: () => anime.random(-100, 100),
                translateX: () => anime.random(-100, 100),
                opacity: [
                    { value: 0.8, duration: 1000 },
                    { value: 0, duration: 1000 }
                ],
                scale: [
                    { value: 1.5, duration: 1000 },
                    { value: 0.5, duration: 1000 }
                ],
                easing: 'easeInOutQuad',
                duration: 3000,
                delay: anime.stagger(100),
                loop: true
            });
        };

        // Stat cards and floating accents
        if (statRefs.current.length) {
            anime({
                targets: statRefs.current,
                opacity: [0, 1],
                translateY: [30, 0],
                scale: [0.95, 1],
                easing: 'easeOutExpo',
                delay: anime.stagger(200, { start: 1500 })
            });
        }

        createParticles();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handlePointerDown = (id) => (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { clientX, clientY } = event;
        dragStateRef.current[id] = {
            pointerId: event.pointerId,
            startX: clientX,
            startY: clientY,
            initialX: dragOffsets[id]?.x || 0,
            initialY: dragOffsets[id]?.y || 0
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (id) => (event) => {
        const dragInfo = dragStateRef.current[id];
        if (!dragInfo) return;
        const deltaX = event.clientX - dragInfo.startX;
        const deltaY = event.clientY - dragInfo.startY;
        setDragOffsets((prev) => ({
            ...prev,
            [id]: {
                x: dragInfo.initialX + deltaX,
                y: dragInfo.initialY + deltaY
            }
        }));
    };

    const handlePointerUp = (id) => (event) => {
        if (dragStateRef.current[id]) {
            delete dragStateRef.current[id];
        }
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex flex-col justify-center pb-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(160,255,232,0.18),_transparent_55%)]" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }} />
            {/* Floating Particles Container */}
            <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-10" />

            {/* Background Image with Parallax */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url("/images/hero-bg.png")' }}
            >
                <div className="absolute inset-0 bg-slate-950/70" /> {/* Overlay */}
            </div>

            {/* Accent cards */}
            <div
                className="hidden xl:block absolute top-96 left-16 z-20 cursor-grab active:cursor-grabbing"
                style={{
                    transform: `translate(${dragOffsets.thermal.x}px, ${dragOffsets.thermal.y}px)`,
                    touchAction: 'none'
                }}
                onPointerDown={handlePointerDown('thermal')}
                onPointerMove={handlePointerMove('thermal')}
                onPointerUp={handlePointerUp('thermal')}
                onPointerLeave={handlePointerUp('thermal')}
            >
                <div className="accent-card accent-card-left backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 w-64 text-left text-white shadow-2xl">
                    <p className="text-sm text-emerald-300 mb-1">Thermal Comfort</p>
                    <p className="text-xl font-semibold">38% better insulation</p>
                    <p className="text-xs text-white/70 mt-2">AAC blocks regulate indoor temperature and reduce HVAC loads.</p>
                </div>
            </div>
            <div
                className="hidden xl:block absolute top-72 right-10 z-20 cursor-grab active:cursor-grabbing"
                style={{
                    transform: `translate(${dragOffsets.lightweight.x}px, ${dragOffsets.lightweight.y}px)`,
                    touchAction: 'none'
                }}
                onPointerDown={handlePointerDown('lightweight')}
                onPointerMove={handlePointerMove('lightweight')}
                onPointerUp={handlePointerUp('lightweight')}
                onPointerLeave={handlePointerUp('lightweight')}
            >
                <div className="accent-card accent-card-right backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 w-72 text-left text-white shadow-2xl">
                    <p className="text-sm text-sky-300 mb-1">Ultra Lightweight</p>
                    <p className="text-xl font-semibold">Up to 4x lighter</p>
                    <p className="text-xs text-white/70 mt-2">Boost structural efficiency and speed up every install crew.</p>
                </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-20 pt-32">
                <div
                    ref={highlightRef}
                    className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 text-white text-sm font-semibold uppercase tracking-[0.2em] shadow-lg backdrop-blur-md mb-6 opacity-0"
                >
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Sri Ram AAC Block Ecosystem
                </div>
                <h1
                    ref={titleRef}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight"
                >
                    Building the Future with Strength & Innovation
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-base sm:text-lg md:text-xl text-gray-200 mb-10 max-w-3xl opacity-0 px-4"
                >
                    Premium quality construction materials from MNS Corrosions Solutions.
                    Sri Ram AAC Blocks & Advanced Joint Mortars for durable, sustainable structures.
                </p>
                <div
                    ref={buttonsRef}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0"
                >
                    <Button size="lg" className="text-lg px-8 py-6 bg-emerald-200 text-black hover:border-white hover:border hover:bg-transparent hover:text-white w-full sm:w-auto" asChild>
                        <a href="#products">Explore Products</a>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-white border-white hover:bg-emerald-200 hover:text-black opacity-0 w-full sm:w-auto" asChild>
                        <a href="#contact">Contact Us <ArrowRight className="ml-2 h-5 w-5" /></a>
                    </Button>
                </div>

                {/* Mobile Features (Visible only on small screens) */}
                <div className="xl:hidden mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4">
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 text-left text-white shadow-lg">
                        <p className="text-sm text-emerald-300 mb-1">Thermal Comfort</p>
                        <p className="text-xl font-semibold">38% better insulation</p>
                    </div>
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4 text-left text-white shadow-lg">
                        <p className="text-sm text-sky-300 mb-1">Ultra Lightweight</p>
                        <p className="text-xl font-semibold">Up to 4x lighter</p>
                    </div>
                </div>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-full">
                    {[
                        { label: 'Projects Delivered', value: '450+' },
                        { label: 'Monthly Production', value: '50 MT' },
                        { label: 'On-time Dispatch', value: '99.2%' }
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            ref={(el) => el && statRefs.current.push(el)}
                            className="opacity-0 bg-white/10 border border-white/10 rounded-3xl px-6 py-5 text-left text-white backdrop-blur-xl shadow-lg"
                        >
                            <p className="text-sm text-white/70">{stat.label}</p>
                            <p className="text-3xl font-bold mt-2">{stat.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
