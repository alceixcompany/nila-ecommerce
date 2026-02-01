'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen font-sans selection:bg-[#C5A059]/30">

            {/* Video Hero Section (Inspired by Homepage) */}
            <section className="relative h-[85vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden bg-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/20 z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070"
                        alt="Jewelry Workshop"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-end pb-32 text-center text-white">
                    <div className="max-w-2xl px-6">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="text-sm md:text-lg font-light tracking-wide mb-8"
                        >
                            Since 1985 • New York City
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-light serif tracking-wide mb-8"
                        >
                            THE ATELIER
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Link
                                href="/collections"
                                className="inline-block bg-[#1a1a1a] text-white px-10 py-4 transition-all duration-300 font-light tracking-[0.2em] uppercase text-xs hover:bg-black border border-transparent hover:border-white/20"
                            >
                                EXPLORE OUR LEGACY
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Split Content Section (Inspired by Homepage Featured Collection) */}
            <section className="w-full bg-white py-24 md:py-40 relative overflow-hidden">
                {/* Decorative background element moved to left for variation */}
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 -z-0 rounded-r-[100px] transform -translate-x-20"></div>

                <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                        {/* Left: Content */}
                        <div className="lg:col-span-5 flex flex-col items-start space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-[1px] bg-cyan-800"></div>
                                    <span className="text-[10px] md:text-xs tracking-[0.4em] font-bold text-cyan-900 uppercase">
                                        Our Philosophy
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-light text-gray-900 serif leading-[1.1]">
                                    Honoring the <br />
                                    <span className="italic relative inline-block">
                                        Art of Hand
                                        <svg className="absolute -bottom-2 left-0 w-full h-2 text-cyan-100 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                            <path d="M0 5 Q 25 0, 50 5 T 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                        </svg>
                                    </span>
                                    <br /> Creation
                                </h2>

                                <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed tracking-wide">
                                    In a world of mass production, Ocean Gem stands as a bastion of traditional craftsmanship. We believe that true luxury lies in the human touch—the slight imperfections that prove a hand was there.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right: Image */}
                        <div className="lg:col-span-7 group">
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?auto=format&fit=crop&q=80&w=1600"
                                    alt="Artisan at work"
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Banner Style History Section (Inspired by HomeBanner) */}
            <section className="w-full flex flex-col gap-[2px]">
                <div className="relative w-full h-[500px] overflow-hidden group">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000"
                            alt="History"
                            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
                    </div>

                    <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-20 flex items-center justify-start">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="max-w-xl text-white text-left"
                        >
                            <h3 className="text-xs md:text-sm tracking-[0.3em] font-medium uppercase mb-4 text-gray-200">
                                1985 - Present
                            </h3>

                            <h2 className="text-4xl md:text-6xl font-light serif mb-8 leading-tight">
                                A Legacy of Excellence
                            </h2>

                            <p className="text-white/80 font-light text-lg mb-10 leading-relaxed">
                                Founded by master jeweler Elena Vance, Ocean Gem began as a small workshop in lower Manhattan. Today, it represents a global standard for ethical luxury and design innovation.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section (Clean Grid) */}
            <section className="py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">Our Commitments</h2>
                        <div className="w-16 h-[1px] bg-gray-300 mx-auto"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "Sustainably Sourced", desc: "100% recycled gold and conflict-free diamonds." },
                            { title: "Master Craftsmanship", desc: "Each piece is touched by at least 10 pairs of expert hands." },
                            { title: "Lifetime Warranty", desc: "We stand behind the quality of our work, forever." }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="w-16 h-16 rounded-full bg-gray-50 mx-auto mb-6 flex items-center justify-center group-hover:bg-[#C5A059] transition-colors duration-500">
                                    <span className="text-2xl text-gray-900 group-hover:text-white transition-colors">✦</span>
                                </div>
                                <h3 className="text-lg font-serif mb-4">{item.title}</h3>
                                <p className="text-gray-500 font-light text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founder Quote */}
            <section className="py-32 bg-[#fcfcfc] relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <span className="text-6xl text-[#C5A059] serif opacity-30">“</span>
                    <blockquote className="text-2xl md:text-4xl font-serif font-light text-gray-900 mb-10 leading-relaxed italic relative z-10">
                        We don't just sell jewelry. We help you mark the moments that matter most. It is an honor to be part of your story.
                    </blockquote>
                    <div className="text-xs font-bold tracking-[0.2em] text-gray-900 uppercase">
                        Elena Vance, Founder
                    </div>
                </div>
            </section>
        </div>
    );
}
