import { useRef, useState, useEffect } from 'react';

export default function VideoSection({ title, videoUrl }) {
    const iframeRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // stops observing after trigger
                }
            },
            { threshold: 0.3 }
        );
        if (iframeRef.current) {
            observer.observe(iframeRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const autoplayUrl = `${videoUrl}?autoplay=${isVisible ? 1 : 0}&mute=1&rel=0&showinfo=0`;

    return (
        <section className="w-full py-8 bg-white">
            <div className="w-full mx-auto px-4">
                {title && (
                    <h2 className="text-3xl font-bold text-black mb-4 text-center">{title}</h2>
                )}

                <div className="relative w-full pt-[56.25%] rounded overflow-hidden">
                    <iframe
                        ref={iframeRef}
                        className="absolute top-0 left-0 w-full h-full"
                        src={autoplayUrl}
                        frameBorder="0"
                        title={title || "Video"}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
