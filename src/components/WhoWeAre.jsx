/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from 'react';
import { Target, History, ShieldCheck, Sparkles, Building2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import missionImage from "../assets/IMG-20250804-WA0004.png";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
    const sectionRef = useRef(null);
    const storyRefs = useRef([]);
    const statRefs = useRef([]);
    const missionRefs = useRef([]);

    storyRefs.current = [];
    statRefs.current = [];
    missionRefs.current = [];

    useEffect(() => {
        const anime = window?.anime;
        if (!anime) return;

        const ctx = gsap.context(() => {
            if (sectionRef.current) {
                gsap.fromTo(
                    sectionRef.current.querySelector('.section-badge'),
                    { opacity: 0, y: 20, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            }

            ScrollTrigger.batch(storyRefs.current, {
                start: 'top 85%',
                onEnter: (batch) => {
                    anime({
                        targets: batch,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        scale: [0.95, 1],
                        easing: 'easeOutExpo',
                        duration: 900,
                        delay: anime.stagger(100)
                    });
                }
            });

            ScrollTrigger.batch(statRefs.current, {
                start: 'top 85%',
                onEnter: (batch) => {
                    anime({
                        targets: batch,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        scale: [0.9, 1],
                        easing: 'easeOutBack',
                        delay: anime.stagger(120)
                    });
                }
            });

            ScrollTrigger.batch(missionRefs.current, {
                start: 'top 85%',
                onEnter: (batch) => {
                    anime({
                        targets: batch,
                        opacity: [0, 1],
                        translateX: [20, 0],
                        easing: 'easeOutQuad',
                        delay: anime.stagger(80)
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const milestones = [
        {
            year: '2000',
            title: 'Origins',
            description: 'Launched Sri Ram AAC Blocks with a promise of honest quality.'
        },
        {
            year: '2012',
            title: 'Innovation',
            description: 'Integrated steel-slag composites for corrosion-proof mixes.'
        },
        {
            year: '2024',
            title: 'Sambhavisnu RC Era',
            description: 'Expanded as MNS Corrosions Solutions under Sambhavisnu Research Centers to scale sustainable manufacturing.'
        }
    ];

    const stats = [
        { label: 'Years of Trust', value: '24+', accent: 'bg-primary/20 text-primary' },
        { label: 'Sq.ft Built', value: '3.5M', accent: 'bg-emerald-100 text-emerald-700' },
        { label: 'Partner Projects', value: '480+', accent: 'bg-amber-100 text-amber-600' }
    ];

    return (
        <section ref={sectionRef} id="who-we-are" className="relative py-12 md:py-24 bg-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-emerald-50 pointer-events-none" />
            <div className="absolute top-16 -right-24 w-64 h-64 bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-10 -left-20 w-72 h-72 bg-emerald-100 blur-[120px] rounded-full" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="section-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-white/80 text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-6 opacity-0">
                        <Sparkles className="h-4 w-4" />
                        Legacy In Motion
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who We Are</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Engineering materials that stay resilient—from foundation to finish.
                    </p>
                </div>

                {/* Goals */}
                <div className="bg-gray-900 text-white p-8 rounded-[32px] relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }} />
                    <div className="relative flex items-center gap-3 mb-6">
                        <Target className="h-8 w-8 text-white" />
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-emerald-200">Mission Control</p>
                            <h3 className="text-2xl font-semibold">Our Goals & Promise</h3>
                        </div>
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'Innovative Solutions',
                                description: 'Deliver steel-slag engineered mixes that resist corrosion, chemicals, and time.'
                            },
                            {
                                icon: History,
                                title: 'Long-Lasting Performance',
                                description: 'Every batch is tested for structural integrity across humidity, salinity, and stress.'
                            },
                            {
                                icon: Building2,
                                title: 'Sustainable Future',
                                description: 'Closed-loop manufacturing reduces waste while boosting thermal efficiency onsite.'
                            }
                        ].map((item, index) => (
                            <li key={item.title} className="flex flex-col gap-3">
                                <div
                                    ref={(el) => el && (missionRefs.current[index] = el)}
                                    className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-lg opacity-0"
                                >
                                    <item.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                                    <p className="text-white/80 text-sm">{item.description}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-start mt-12">
                    {/* Background & Values */}
                    <div className="space-y-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-lg p-8 relative overflow-hidden">
                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <History className="h-8 w-8 text-primary" />
                                <h3 className="text-2xl font-semibold text-gray-900">Background & Values</h3>
                            </div>
                            <p className="text-lg text-gray-600 mb-6">
                                Since 2000, we’ve purpose-built materials that outlast harsh climates without compromising on speed or sustainability. Sri Ram AAC Blocks evolved into MNS Corrosions Solutions with the same obsession for detail—only scaled with better tech and cleaner production cycles.
                            </p>
                            <div className="space-y-6">
                                {milestones.map((milestone, index) => (
                                    <div
                                        key={milestone.year}
                                        ref={(el) => el && (storyRefs.current[index] = el)}
                                        className="flex items-start gap-4 opacity-0"
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-sm font-semibold text-primary">{milestone.year}</span>
                                            <span className="w-px h-12 bg-primary/30" />
                                        </div>
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.2em] text-primary mb-1">{milestone.title}</p>
                                            <p className="text-gray-700">{milestone.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.label}
                                    ref={(el) => el && (statRefs.current[index] = el)}
                                    className="opacity-0 rounded-2xl border border-white shadow-md bg-white/90 p-4 text-center"
                                >
                                    <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${stat.accent}`}>{stat.label}</div>
                                    <p className="text-3xl font-bold text-gray-900 mt-3">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex justify-center mt-8">
                        <img
                            src={missionImage}
                            alt="Mission Control Goals"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
