import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase"
import { Instagram, Globe } from 'lucide-react'

export default function DesignerProfileSection() {
    const { designerId } = useParams();
    const [designer, setDesigner] = useState(null);
    const [loadingDesigner, setLoadingDesigner] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDesigner = async () => {
            if (!designerId) return;

            try {
                setLoadingDesigner(true);
                const designerDoc = await getDoc(doc(db, "designers", designerId));

                if (designerDoc.exists()) {
                    setDesigner({ id: designerDoc.id, ...designerDoc.data() });
                    setError(null);
                } else {
                    setError("Designer not found:", designerId);
                }
            } catch (error) {
                console.error("Error fetching designer:", error);
                setError("Error al cargar el diseñador")
            } finally {
                setLoadingDesigner(false);
            }
        };

        fetchDesigner();
    }, [designerId]);

    if (loadingDesigner) {
        return <div className="p-8 text-center">Cargando diseñador...</div>;
    }
    if (error) {
        return <div className="p-8 text-center text-red-600">{error} </div>;
    }

    if (!designerId) {
        return null
    }

    return (
        <div className="mb-12">
            {loadingDesigner ? (
                // Skeleton loader
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 animate-pulse">
                        <div className="h-64 md:h-96 bg-gray-300"></div>
                        <div className="p-8 space-y-4">
                            <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            ) : designer ? (
                // Full profile layout
                <div className="bg-white  shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0 min-h-[400px] md:min-h-[500px]">
                        {/* Left Side - Image */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                            <img
                                src={designer.imageUrls?.[0] || '/placeholder-designer.jpg'}
                                alt={designer.name}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:hidden"></div>
                            <div className="absolute bottom-4 left-4 right-4 md:hidden">
                                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                                    {designer.name}
                                </h1>
                                {designer.brand && (
                                    <h2 className="text-lg font-semibold text-white/90 uppercase tracking-wide">
                                        {designer.brand}
                                    </h2>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Info */}
                        <div className="p-6 md:p-8 lg:p-10 bg-gradient-to-br from-[#023047] to-[#0081a7] text-white flex flex-col justify-center">
                            {/* Desktop header */}
                            <div className="hidden md:block mb-6">
                                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 leading-tight">
                                    {designer.name}
                                </h1>
                                {designer.brand && (
                                    <h2 className="text-lg lg:text-xl font-semibold text-[#00afb9] mb-4 uppercase tracking-wider">
                                        {designer.brand}
                                    </h2>
                                )}
                            </div>

                            {/* Description */}
                            {designer.description && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-3 text-[#00afb9] uppercase tracking-wide">
                                        Acerca del Diseñador
                                    </h3>
                                    <p className="text-white/90 leading-relaxed text-sm lg:text-base">
                                        {designer.description}
                                    </p>
                                </div>
                            )}

                            {/* Social Media */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-[#00afb9] uppercase tracking-wide">
                                    Conecta Conmigo
                                </h3>
                                <div className="space-y-3">
                                    {designer.instagram && (
                                        <a
                                            href={`https://instagram.com/${designer.instagram.replace('@', '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
                                        >
                                            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-full">
                                                <Instagram size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <span className="font-medium">Instagram</span>
                                                <p className="text-sm text-white/70">{designer.instagram}</p>
                                            </div>
                                        </a>
                                    )}

                                    {designer.website && (
                                        <a
                                            href={designer.website.startsWith('http') ? designer.website : `https://${designer.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all duration-300 hover:scale-105 group"
                                        >
                                            <div className="bg-gradient-to-r from-blue-400 to-cyan-400 p-2 rounded-full">
                                                <Globe size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <span className="font-medium">Sitio Web</span>
                                                <p className="text-sm text-white/70">{designer.website}</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}

          
        </div>
    );
}
