import React, { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
    const quoteRef = useRef(null);
    const cardRef = useRef(null);
    const starsRef = useRef([]);

    useEffect(() => {
        const anime = window.anime; // Use global anime from CDN
        // Animate card entrance
        if (cardRef.current) {
            gsap.fromTo(cardRef.current,
                {
                    opacity: 0,
                    y: 100,
                    scale: 0.9
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Animate quote icon with pulse
        if (quoteRef.current) {
            ScrollTrigger.create({
                trigger: quoteRef.current,
                start: 'top 80%',
                onEnter: () => {
                    anime({
                        targets: quoteRef.current,
                        scale: [0, 1],
                        rotate: [0, 360],
                        opacity: [0, 1],
                        duration: 1000,
                        easing: 'easeOutElastic(1, .6)',
                        complete: () => {
                            // Continuous pulse animation
                            anime({
                                targets: quoteRef.current,
                                scale: [1, 1.1, 1],
                                duration: 2000,
                                easing: 'easeInOutQuad',
                                loop: true
                            });
                        }
                    });
                }
            });
        }

        // Animate stars sequentially
        if (starsRef.current.length > 0) {
            ScrollTrigger.create({
                trigger: cardRef.current,
                start: 'top 75%',
                onEnter: () => {
                    anime({
                        targets: starsRef.current,
                        scale: [0, 1.3, 1],
                        opacity: [0, 1],
                        rotate: [0, 360],
                        duration: 600,
                        delay: anime.stagger(100, { start: 400 }),
                        easing: 'easeOutElastic(1, .8)'
                    });
                }
            });
        }
    }, []);

    return (
        <section id="testimonials" className="py-12 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
                    <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        See what our satisfied customers have to say about our products.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <Card
                        ref={cardRef}
                        className="bg-gray-50 border-none shadow-lg relative overflow-visible"
                        style={{ opacity: 0 }}
                    >
                        <div className="absolute -top-6 ">
                            <div
                                ref={quoteRef}
                                className="bg-primary text-emerald-200 p-4 rounded-full shadow-lg"

                            >
                                <Quote className="h-8 w-8 fill-current" />
                            </div>
                        </div>
                        <CardContent className="pt-16 pb-10 px-8 text-center">
                            <div className="flex justify-center mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        ref={el => starsRef.current[i] = el}
                                        className="h-5 w-5 text-yellow-400 fill-current"
                                        style={{ opacity: 0 }}
                                    />
                                ))}
                            </div>
                            <blockquote className="text-lg md:text-2xl text-gray-800 font-medium leading-relaxed mb-8 italic">
                                "I recently used the BRICS joint motor. The quality of this motor is really excellent.
                                The writing and application is also good. It fills the gaps between the walls well.
                                So, there is no crack or damage. The color of the paint is also beautiful.
                                In particular, the water resistance and adhesion strength are good."
                            </blockquote>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full mb-3 overflow-hidden">
                                    <img src="https://api.dicebear.com/9.x/micah/svg?seed=Destiny" alt="Bala Murugan" className="w-full h-full object-cover" />
                                </div>
                                <cite className="not-italic font-bold text-lg text-gray-900">Bala Murugan</cite>
                                <span className="text-gray-500 text-sm">Satisfied Customer</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
