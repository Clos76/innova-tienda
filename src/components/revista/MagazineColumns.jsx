import React from 'react';
import { useNavigate } from 'react-router-dom';
import MagazineFlip from './MagazineReader';

const MagazineSection = () => {
    const navigate = useNavigate();

    const magazines = [
        {
            id: 1,
            slug: "mayo-2025",
            title: "Innovamoda Fashion Magazine Mayo",
            description: "Es la revista digital de InnovaModa, un espacion dedicado a resaltar el talento, la creatividad y la inovacion de la industria de la moda. ",
            date: "Mayo 2025",
            image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2025/#mayo-2025/1/",
            featured: true
        },
        {
            id: 2,
            slug: "marzo-2025",
            title: "Innova Fashion Magazine Marzo",
            description: "Meet the amazing volunteers who dedicate their time and energy to making our mission possible. Stories of inspiration and dedication.",
            date: "Marzo 2025",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
            
            embedUrl: "https://innovamoda.org/3d-flip-book/marzo-2025/#marzo-2025/1/",
        },
        {
            id: 3,
            slug: "febrero-2025",
            title: "Innova Fashion Magazine Febrero",
            description: "Es un placer darles la bienvenida a una nueva edición de Innovamoda Fashion Magazine, donde celebramos el estilo, la creatividad y las tendencias que nos inspiran cada día.",
            date: "January 2024",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/febrero-2025/#febrero-2025/1/",

        },
        {
            id: 4,
            slug: "diciembre-2024",
            title: "Innova Fashion Magazine Samantha Ayala",
            description: "Exploring sustainable practices and environmental initiatives within our community. Green solutions for a better tomorrow.",
            date: "December 2023",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/diciembre-2024/#diciembre-2024/1/",
        },
        {
            id: 5,
            slug: "youth-programs",
            title: "Youth Programs Update",
            description: "Highlighting our youth education and mentorship programs. Empowering the next generation through learning and growth.",
            date: "November 2023",
            image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2025/#mayo-2025/1/",
        },
        {
            id: 6,
            slug: "fundraising-success",
            title: "Fundraising Success Stories",
            description: "Celebrating our fundraising milestones and the generous donors who make our work possible. Thank you for your support.",
            date: "October 2023",
            image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop",
            downloadUrl: "#",
            embedUrl: "https://innovamoda.org/3d-flip-book/mayo-2025/#mayo-2025/1/",
        }
    ];

    const handleReadMagazine = (magazine) => {
        if (magazine.embedUrl) {
            // Navigate to the magazine reader page with the slug
            navigate(`/revista/${magazine.slug}`);
        }
    };

    const handleDownloadMagazine = (magazine) => {
        if (magazine.downloadUrl && magazine.downloadUrl !== "#") {
            window.open(magazine.downloadUrl, '_blank');
        }
    };

    const MagazineCard = ({ magazine }) => (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-1/3 flex-shrink-0">
                    <img
                        src={magazine.image}
                        alt={magazine.title}
                        className="w-full h-48 sm:h-full object-cover"
                    />
                </div>
                <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                            {magazine.title}
                        </h3>
                        {magazine.featured && (
                            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                Featured
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {magazine.description}
                    </p>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {magazine.date}
                        </div>

                        <div className="flex space-x-2">
                            {magazine.embedUrl && (
                                <button
                                    onClick={() => handleReadMagazine(magazine)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Read
                                </button>
                            )}
                            {magazine.downloadUrl && magazine.downloadUrl !== "#" && (
                                <button
                                    onClick={() => handleDownloadMagazine(magazine)}
                                    className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Split magazines into two columns for desktop
    const leftColumn = magazines.filter((_, index) => index % 2 === 0);
    const rightColumn = magazines.filter((_, index) => index % 2 === 1);

    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Digital Magazine Library
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Stay informed with our latest publications featuring community stories,
                        impact reports, and insights into our ongoing mission.
                    </p>
                </div>

                {/* Mobile Layout - Single Column */}
                <div className="lg:hidden">
                    {magazines.map((magazine) => (
                        <MagazineCard key={magazine.id} magazine={magazine} />
                    ))}
                </div>

                {/* Desktop Layout - Two Columns */}
                <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Left Column */}
                    <div>
                        {leftColumn.map((magazine) => (
                            <MagazineCard key={magazine.id} magazine={magazine} />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div>
                        {rightColumn.map((magazine) => (
                            <MagazineCard key={magazine.id} magazine={magazine} />
                        ))}
                    </div>
                </div>

                {/* Load More Button */}
                <div className="text-center mt-12">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
                        Load More Issues
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MagazineSection;