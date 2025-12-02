/* eslint-disable no-undef */
/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, TestTubeDiagonal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
    {
        name: "Joint Mortar",
        description: "Advanced joint mortar formulated with high-reactive steel slag for superior bonding and durability.",
        features: [
            "Excellent chemical & corrosion resistance",
            "Ideal for harsh/coastal environments",
            "Strong adhesion & minimal shrinkage",
            "Eco-friendly materials"
        ],
        weight: "40KG"
    },
    {
        name: "Tile Adhesive",
        description: "Premium tile adhesive enriched with processed steel slag for exceptional bonding strength.",
        features: [
            "Superior chemical & corrosion resistance",
            "Ideal for wet, saline, or industrial areas",
            "Smooth application & high coverage",
            "Resists cracks & moisture"
        ],
        weight: "20/40KG"
    },
    {
        name: "Concrete Mix",
        description: "High-performance concrete mix blended with refined steel slag for exceptional strength and density.",
        features: [
            "Outstanding resistance to chemicals/seawater",
            "Smooth workability & superior compaction",
            "Eco-friendly & sustainable",
            "Long-lasting structural stability"
        ],
        weight: "50/500/1000KG"
    },
    {
        name: "Stone Adhesive",
        description: "Specialized stone adhesive formulated with activated steel slag for superior bonding on stones.",
        features: [
            "Excellent moisture & corrosion resistance",
            "Firm grip without shrinkage",
            "Perfect for granite, marble, heavy stone",
            "Eco-conscious formulation"
        ],
        weight: "40KG"
    },
    {
        name: "Tile Adhesive Plus",
        description: "Next-generation formulation infused with high-reactive steel slag for Bahubali-level strength.",
        features: [
            "Ultra-fast bonding & setting",
            "Extreme chemical & corrosion resistance",
            "Smooth spread & crack-free finish",
            "Speed, strength, and sustainability"
        ],
        weight: "20/40KG"
    },
    {
        name: "Plaster / Binder",
        description: "Specially formulated construction material used to create smooth, strong, and durable wall and ceiling surfaces with high adhesion.",
        features: [
            "Strong bonding with walls and ceilings",
            "Smooth and fine finish for painting",
            "Reduced shrinkage and cracking",
            "Long-lasting durability in interior & exterior applications",
            "Excellent workability and moisture resistance"
        ],
        weight: "50/500/1000KG"
    }
];

const Products = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);
    const badgeRefs = useRef([]);
    const glowRefs = useRef([]);

    cardsRef.current = [];
    badgeRefs.current = [];
    glowRefs.current = [];

    useEffect(() => {
        const anime = window?.anime; // Use global anime from CDN
        if (!anime) return;
        // GSAP ScrollTrigger for cards
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        y: 80,
                        rotateX: -15,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            end: 'top 60%',
                            toggleActions: 'play none none reverse'
                        },
                        delay: index * 0.1
                    }
                );
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

        ScrollTrigger.batch(badgeRefs.current, {
            start: 'top 85%',
            onEnter: (batch) => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(80)
                });
            }
        });

        glowRefs.current.forEach((glow, index) => {
            if (!glow) return;
            anime({
                targets: glow,
                translateY: index % 2 === 0 ? [-12, 12] : [12, -12],
                translateX: index % 2 === 0 ? [8, -8] : [-8, 8],
                opacity: [0.2, 0.5],
                duration: 6000 + index * 400,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        });
    }, []);

    const handleCardHover = (e, isEntering) => {
        const card = e.currentTarget;
        const features = card.querySelectorAll('.feature-item');

        if (isEntering) {
            anime({
                targets: card,
                scale: 1.05,
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                duration: 400,
                easing: 'easeOutQuad'
            });

            anime({
                targets: features,
                translateX: [20, 0],
                opacity: [0.5, 1],
                duration: 400,
                delay: anime.stagger(50),
                easing: 'easeOutQuad'
            });
        } else {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                duration: 400,
                easing: 'easeOutQuad'
            });

            anime({
                targets: features,
                translateX: 0,
                opacity: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    return (
        <section ref={sectionRef} id="products" className="relative py-12 md:py-24 bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/5 to-emerald-50" />
            <div ref={(el) => el && (glowRefs.current[0] = el)} className="absolute -top-20 right-12 w-72 h-72 bg-primary/10 blur-[140px]" />
            <div ref={(el) => el && (glowRefs.current[1] = el)} className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/40 blur-[160px]" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="section-header text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-white text-primary text-sm font-semibold uppercase tracking-[0.3em] mb-6">
                        <TestTubeDiagonal className="h-4 w-4" aria-hidden="true" />
                        Product Ecosystem
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover our range of high-performance, sustainable building materials designed for durability.
                    </p>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { label: 'Steel Slag Infused', copy: 'Corrosion-proof bonding matrices' },
                            { label: 'Thermal Stable', copy: 'Keeps interiors 4-5°C cooler' },
                            { label: 'Site Ready', copy: 'Consistent batches, zero surprises' }
                        ].map((highlight, index) => (
                            <div
                                key={highlight.label}
                                ref={(el) => el && (badgeRefs.current[index] = el)}
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }}
                                className="opacity-0 rounded-2xl p-5 text-left border border-white/10 bg-slate-950/95 text-slate-50 shadow-2xl"
                            >
                                <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-emerald-200 mb-1 font-semibold">{highlight.label}</p>
                                <p className="text-base text-slate-100/90">{highlight.copy}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <Card
                            key={index}
                            ref={el => cardsRef.current[index] = el}
                            className="flex flex-col h-full relative border border-gray-100 shadow-md hover:shadow-2xl transition-all overflow-hidden group bg-white/90 backdrop-blur"
                            onMouseEnter={(e) => handleCardHover(e, true)}
                            onMouseLeave={(e) => handleCardHover(e, false)}
                            style={{ opacity: 0 }}
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-2xl font-bold text-gray-900">{product.name}</CardTitle>
                                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                        {product.weight}
                                    </Badge>
                                </div>
                                <CardDescription className="text-base mt-2">
                                    {product.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="feature-item flex items-start gap-2 text-sm text-gray-600">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:!bg-black hover:text-emerald-200 hover:border-none w-full border-emerald-200 border !bg-transparent  text-black" asChild>
                                    <a href="#contact">Enquire Now</a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
