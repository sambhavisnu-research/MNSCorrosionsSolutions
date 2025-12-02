/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const cardsRef = useRef([]);
    const iconsRef = useRef([]);
    const whatsappRef = useRef(null);
    const badgeRefs = useRef([]);
    const glowRefs = useRef([]);

    cardsRef.current = [];
    iconsRef.current = [];
    badgeRefs.current = [];
    glowRefs.current = [];

    useEffect(() => {
        const anime = window?.anime; // Use global anime from CDN
        if (!anime) return;
        // Animate contact cards
        cardsRef.current.forEach((card, index) => {
            if (card) {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: -50,
                        scale: 0.9
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 0.6,
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

        // Animate icons with pulse
        iconsRef.current.forEach((icon, index) => {
            if (icon) {
                ScrollTrigger.create({
                    trigger: icon,
                    start: 'top 85%',
                    onEnter: () => {
                        anime({
                            targets: icon,
                            scale: [0, 1.2, 1],
                            rotate: [0, 360],
                            duration: 800,
                            easing: 'easeOutElastic(1, .6)',
                            delay: index * 150
                        });
                    }
                });
            }
        });

        ScrollTrigger.batch(badgeRefs.current, {
            start: 'top 85%',
            onEnter: (batch) => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(100)
                });
            }
        });

        glowRefs.current.forEach((glow, index) => {
            if (!glow) return;
            anime({
                targets: glow,
                translateY: index % 2 === 0 ? [-12, 12] : [12, -12],
                translateX: index % 2 === 0 ? [10, -10] : [-10, 10],
                opacity: [0.25, 0.5],
                duration: 7000 + index * 400,
                easing: 'easeInOutSine',
                direction: 'alternate',
                loop: true
            });
        });

        // WhatsApp button animation
        if (whatsappRef.current) {
            gsap.fromTo(whatsappRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    y: 30
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'back.out(1.4)',
                    scrollTrigger: {
                        trigger: whatsappRef.current,
                        start: 'top 90%',
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
                scale: 1.15,
                duration: 300,
                easing: 'easeOutQuad'
            });
        } else {
            window.anime({
                targets: icon,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        }
    };

    return (
        <section id="contact" className="relative py-12 md:py-24 bg-gray-900 text-white overflow-hidden">
            {/* <div ref={(el) => el && (glowRefs.current[0] = el)} className="absolute -top-10 right-16 w-80 h-80 bg-primary/30 blur-[140px]" /> */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }} />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-emerald-200 text-3xl md:text-4xl font-bold mb-3">Get in Touch</h2>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {['Response < 12 hrs', 'Pan-India Dispatch', 'Dedicated Tech Team'].map((badge, index) => (
                                <span
                                    key={badge}
                                    ref={(el) => el && (badgeRefs.current[index] = el)}
                                    className="opacity-0 px-3 py-1.5 rounded-full border border-white/20 bg-white/10 text-sm"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-400 text-lg mb-8">
                            Have questions about our products or need a quote? Reach out to us today!
                        </p>

                        <div className="space-y-6">
                            <Card
                                ref={el => cardsRef.current[0] = el}
                                className="bg-gray-800 border-gray-700"
                                style={{ opacity: 0 }}
                            >
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div
                                        ref={el => iconsRef.current[0] = el}
                                        className="bg-primary/20 p-3 rounded-full cursor-pointer"
                                        onMouseEnter={(e) => handleIconHover(e, true)}
                                        onMouseLeave={(e) => handleIconHover(e, false)}
                                    >
                                        <Phone className="h-6 w-6 !text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Call Us</p>
                                        <a href="tel:+919080781191" className="text-lg font-semibold text-white hover:text-emerald-200">+91 90807 81191</a>
                                        <br />
                                        <a href="tel:+919443130850" className="text-lg font-semibold text-white hover:text-emerald-200">+91 94431 30850</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                ref={el => cardsRef.current[1] = el}
                                className="bg-gray-800 border-gray-700"
                                style={{ opacity: 0 }}
                            >
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div
                                        ref={el => iconsRef.current[1] = el}
                                        className="bg-primary/20 p-3 rounded-full cursor-pointer"
                                        onMouseEnter={(e) => handleIconHover(e, true)}
                                        onMouseLeave={(e) => handleIconHover(e, false)}
                                    >
                                        <Mail className="h-6 w-6 !text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Email Us</p>
                                        <a href="mailto:malathibrickindustry@gmail.com" className="text-lg font-semibold text-white hover:text-emerald-200">malathibrickindustry@gmail.com</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card
                                ref={el => cardsRef.current[2] = el}
                                className="bg-gray-800 border-gray-700"
                                style={{ opacity: 0 }}
                            >
                                <CardContent className="flex items-center gap-4 p-6">
                                    <div
                                        ref={el => iconsRef.current[2] = el}
                                        className="bg-primary/20 p-3 rounded-full cursor-pointer"
                                        onMouseEnter={(e) => handleIconHover(e, true)}
                                        onMouseLeave={(e) => handleIconHover(e, false)}
                                    >
                                        <MapPin className="h-6 w-6 !text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Visit Us</p>
                                        <p className="text-lg font-semibold text-white">394/4 BHARATHIYAR ROAD, THALATHERU, <br />KARAIKAL 609605, <br /> TAMIL NADU, INDIA</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                ref={whatsappRef}
                                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg"
                                asChild
                                style={{ opacity: 0 }}
                            >
                                <a href="https://wa.me/919080781191" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="h-[400px] lg:h-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.263587278836!2d79.8281853!3d10.943450700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a551735c2640dd3%3A0x3ee55cffbc488d8c!2sSri%20Ram%20AAC%20Blocks%20and%20Tiles!5e0!3m2!1sen!2sin!4v1764345673315!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Google Map"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
