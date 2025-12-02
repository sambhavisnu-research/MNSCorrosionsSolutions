/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Shield, Thermometer, Droplets, Sparkles, Lightbulb } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TechnicalData = () => {
    const sectionRef = useRef(null);
    const rowRefs = useRef([]);
    const badgeRefs = useRef([]);

    rowRefs.current = [];
    badgeRefs.current = [];

    useEffect(() => {
        const anime = window?.anime;
        if (!anime) return;

        ScrollTrigger.batch(rowRefs.current, {
            start: 'top 90%',
            onEnter: (batch) => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateX: [-30, 0],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(80)
                });
            }
        });

        ScrollTrigger.batch(badgeRefs.current, {
            start: 'top 90%',
            onEnter: (batch) => {
                anime({
                    targets: batch,
                    opacity: [0, 1],
                    translateY: [20, 0],
                    scale: [0.95, 1],
                    easing: 'easeOutBack',
                    delay: anime.stagger(100)
                });
            }
        });
    }, []);

    const quickFacts = [
        {
            icon: Shield,
            title: 'Compressive Strength',
            value: '16.8 / 38.38 N/mm²',
            sub: 'Tested @ M10 / M35'
        },
        {
            icon: Thermometer,
            title: 'Thermal Conductivity',
            value: '0.12 W/mK',
            sub: 'Keeps interiors cooler'
        },
        {
            icon: Droplets,
            title: 'Water Absorption',
            value: '3.95% avg',
            sub: 'Ultra low porosity'
        }
    ];

    const tableData = [
        {
            property: 'COMPRESSIVE STRENGTH',
            method: 'M10/M35',
            result: '16.8 / 38.38 (N/MM²)'
        },
        {
            property: 'DURABILITY CHECKING / ENHANCEMENT',
            method: 'ACID TEST (M35)',
            result: '25.5 (14 DAYS) / 41.3 (60 DAYS)'
        },
        {
            property: 'SEA WATER ATTACK TEST',
            method: 'M35',
            result: '23.5 (14D) / 25 (60D)'
        },
        {
            property: 'WATER ABSORPTION TEST',
            method: 'M35',
            result: '3.95 AVG'
        }
    ];

    return (
        <section ref={sectionRef} id="technical-data" className="relative py-12 md:py-24 bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white text-gray-700 text-sm font-semibold uppercase tracking-[0.3em] mb-6">
                        <Lightbulb className="h-4 w-4" aria-hidden="true" />
                        Lab Certified
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Technical Data</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Our products are tested rigorously to meet and exceed industry standards.
                    </p>
                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {quickFacts.map((fact, index) => (
                            <div
                                key={fact.title}
                                ref={(el) => el && (badgeRefs.current[index] = el)}
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.05) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 25%)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0' }}
                                className="opacity-0 rounded-3xl border border-white/10 shadow-2xl p-6 text-left bg-slate-950/95 text-white"
                            >
                                <fact.icon className="h-10 w-10 text-white mb-4" />
                                <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">{fact.title}</p>
                                <p className="text-2xl font-bold text-white mt-2">{fact.value}</p>
                                <p className="text-sm text-slate-300 mt-1">{fact.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white w-full rounded-3xl shadow border border-gray-100 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100 hover:bg-gray-100">
                                <TableHead className="font-bold text-gray-900 text-lg py-5 pl-6">
                                    Property
                                </TableHead>
                                <TableHead className="font-bold text-gray-900 text-lg py-5">
                                    Test Method
                                </TableHead>
                                <TableHead className="font-bold text-gray-900 text-lg py-5">
                                    Result
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {tableData.map((row, index) => (
                                <TableRow
                                    key={row.property}
                                    ref={(el) => el && (rowRefs.current[index] = el)}
                                    className={`
                                        opacity-0
                                        transition-all duration-200
                                        hover:bg-gray-50
                                        border-l-4 border-transparent hover:border-emerald-200
                                        ${index % 2 === 0 ? "bg-gray-50/40" : "bg-white"}
                                    `}
                                >
                                    <TableCell className="font-medium text-base py-5 pl-6">
                                        {row.property}
                                    </TableCell>

                                    <TableCell className="text-base py-5">
                                        {row.method}
                                    </TableCell>

                                    <TableCell className="text-base py-5">
                                        {row.result}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

            </div>
        </section>
    );
};

export default TechnicalData;
