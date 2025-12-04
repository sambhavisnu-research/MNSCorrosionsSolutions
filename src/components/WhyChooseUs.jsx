/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Award, Globe, Droplets, Factory, Shield, Globe2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
    {
        title: "NIT Joint Innovated",
        description: "Product mix innovated in collaboration with NIT, ensuring technical superiority.",
        icon: Factory,
    },
    {
        title: "Indian Patent Approved",
        description: "Recognized and approved product with Indian Patent, validating our innovation.",
        icon: Award,
    },
    {
        title: "World's 1st Corrosion Resistant",
        description: "First solution made of sustainable material offering exceptional corrosion resistance.",
        icon: Globe,
    },
    {
        title: "Best for Coastal Areas",
        description: "Ideal solution for sea shore areas and sulphur-rich lands due to high resistance.",
        icon: Droplets,
    },
    {
        title: "Export Quality",
        description: "Manufacturing standards meeting international export quality requirements.",
        icon: Shield,
    },
    {
        title: "Chemical Resistance",
        description: "Superior resistance to chemical attacks, ensuring longevity of structures.",
        icon: CheckCircle2,
    },
];

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const iconsRef = useRef([]);
    const badgeRefs = useRef([]);
    const orbitRefs = useRef([]);

    cardsRef.current = [];
    iconsRef.current = [];
    badgeRefs.current = [];
    orbitRefs.current = [];

    useEffect(() => {
        const anime = window?.anime; // Use global anime from CDN
        if (!anime) return;
        // GSAP ScrollTrigger for cards with stagger
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 60,
                        scale: 0.8
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.15
                    }
                );
            }
        });

        ScrollTrigger.batch(badgeRefs.current, {
            start: 'top 85%',
            onEnter: (batch) => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.9, 1],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(80)
                });
            }
        });

        orbitRefs.current.forEach((orbit, index) => {
            if (!orbit) return;
            anime({
                targets: orbit,
                translateY: index % 2 === 0 ? [-10, 10] : [10, -10],
                translateX: index % 2 === 0 ? [6, -6] : [-6, 6],
                opacity: [0.2, 0.6],
                duration: 6000 + index * 400,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        });

        // Animate icons with anime.js when they come into view
        iconsRef.current.forEach((icon, index) => {
            if (icon) {
                ScrollTrigger.create({
                    trigger: icon,
                    start: 'top 80%',
                    onEnter: () => {
                        anime({
                            targets: icon,
                            scale: [0, 1],
                            rotate: [0, 360],
                            opacity: [0, 1],
                            duration: 800,
                            easing: 'easeOutQuad',
                            delay: index * 100
                        });
                    }
                });
            }
        });

        // Animate section header
        const header = sectionRef.current?.querySelector('.section-header');
        if (header) {
            gsap.fromTo(header,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: header,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    }, []);

    const handleIconHover = (e, isEntering) => {
        const icon = e.currentTarget;

        if (isEntering) {
            window.anime({
                targets: icon,
                scale: 1.2,
                rotate: 15,
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            window.anime({
                targets: icon,
                scale: 1,
                rotate: 0,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    return (
        <section ref={sectionRef} id="why-choose-us" className="relative py-12 md:py-24 bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
            <div className="absolute inset-0 pointer-events-none">
                <div ref={(el) => el && (orbitRefs.current[0] = el)} className="absolute top-16 left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                <div ref={(el) => el && (orbitRefs.current[1] = el)} className="absolute bottom-10 right-16 w-72 h-72 rounded-full bg-emerald-200/40 blur-3xl" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="section-header text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white shadow-sm text-sm font-semibold uppercase tracking-[0.3em] text-primary mb-6">
                        <Globe2 className="h-4 w-4" aria-hidden="true" />
                        Dual-Core Promise
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We bring innovation and sustainability together to provide the best construction solutions.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {['Patent Approved Tech', 'Coastal Grade Durability', 'Export Ready Quality Check'].map((label, index) => (
                            <span
                                key={label}
                                ref={(el) => el && (badgeRefs.current[index] = el)}
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }}
                                className="text-emerald-200 opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-slate-950/90 text-xs font-semibold uppercase tracking-[0.35em] shadow-2xl"
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="relative border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white/90 backdrop-blur"
                            style={{ opacity: 0 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <CardHeader className="flex flex-col items-center text-center pb-2">
                                <div
                                    ref={el => iconsRef.current[index] = el}
                                    className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary cursor-pointer shadow-inner"
                                    onMouseEnter={(e) => handleIconHover(e, true)}
                                    onMouseLeave={(e) => handleIconHover(e, false)}
                                    style={{ opacity: 0 }}
                                >
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-xl font-bold text-gray-900">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-gray-600">
                                <p>{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
