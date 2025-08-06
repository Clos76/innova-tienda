import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink } from 'lucide-react';

// Sample datos
const sampleEvents = [
    {
        id: 1,
        title: "Concurso de Diseñadores",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, diam vitae pulvinar dictum, urna elit ornare tellus, at maximus elit elit vel libero. Cras faucibus urna id ex faucibus, sed gravida diam tempor.",
        date: "17/8/2025",
        time: "9:00 AM - 3:00 PM",
        location: "Carretera Tijuana-Ensenada Km. 29.5, Castillos del Mar, 22711 Playas de Rosarito, B.C.",
        image: "src/assets/eventos/agostoConcurso.png",
        category: "Concursos",
        attendees: 45,
        maxAttendees: 100,
        registrationUrl: "#"
    },
    {
        id: 2,
        title: "Revisión confección",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, diam vitae pulvinar dictum, urna elit ornare tellus, at maximus elit elit vel libero. Cras faucibus urna id ex faucibus, sed gravida diam tempor.",
        date: "25/9/2025",
        time: "9:00 AM - 3:00 PM",
        location: "Carretera Tijuana-Ensenada Km. 29.5, Castillos del Mar, 22711 Playas de Rosarito, B.C.",
        image: "src/assets/eventos/eventosSep.png",
        category: "Conferencia",
        attendees: 65,
        maxAttendees: 100,
        registrationUrl: "#"
    },
    {
        id: 3,
        title: "Taller de Moda",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, diam vitae pulvinar dictum, urna elit ornare tellus, at maximus elit elit vel libero. Cras faucibus urna id ex faucibus, sed gravida diam tempor.",
        date: "7/10/2025",
        time: "9:00 AM - 3:00 PM",
        location: "Carretera Tijuana-Ensenada Km. 29.5, Castillos del Mar, 22711 Playas de Rosarito, B.C.",
        image: "src/assets/eventos/eventosOct.png",
        category: "Concursos",
        attendees: 45,
        maxAttendees: 100,
        registrationUrl: "#"
    },
    {
        id: 4,
        title: "Conferencia de Textiles",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, diam vitae pulvinar dictum, urna elit ornare tellus, at maximus elit elit vel libero. Cras faucibus urna id ex faucibus, sed gravida diam tempor.",
        date: "25/11/2025",
        time: "9:00 AM - 3:00 PM",
        location: "Carretera Tijuana-Ensenada Km. 29.5, Castillos del Mar, 22711 Playas de Rosarito, B.C.",
        image: "src/assets/eventos/Nov.png",
        category: "Conferencia",
        attendees: 45,
        maxAttendees: 100,
        registrationUrl: "#"
    },
    {
        id: 5,
        title: "Intermoda 2026",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum, diam vitae pulvinar dictum, urna elit ornare tellus, at maximus elit elit vel libero. Cras faucibus urna id ex faucibus, sed gravida diam tempor.",
        date: "25/2/2026",
        time: "9:00 AM - 3:00 PM",
        location: "Carretera Tijuana-Ensenada Km. 29.5, Castillos del Mar, 22711 Playas de Rosarito, B.C.",
        image: "src/assets/eventos/2026.png",
        category: "Educacion",
        attendees: 67,
        maxAttendees: 100,
        registrationUrl: "#"
    }
];

// Reusable Event Card Component
const EventCard = ({ event, layout = 'horizontal', showFullDescription = true, className = '' }) => {
    const formatDate = (dateString) => {
        // Handle DD/MM/YYYY format from your data
        const [day, month, year] = dateString.split('/');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getAttendanceColor = (current, max) => {
        const percentage = (current / max) * 100;
        if (percentage >= 90) return 'text-red-600 bg-red-50';
        if (percentage >= 75) return 'text-orange-600 bg-orange-50';
        return 'text-green-600 bg-green-50';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Concursos': 'bg-blue-100 text-blue-800',
            'Conferencia': 'bg-purple-100 text-purple-800',
            'Educacion': 'bg-green-100 text-green-800',
            'Salud': 'bg-red-100 text-red-800',
            'Medioambiente': 'bg-emerald-100 text-emerald-800'
        };
        return colors[category] || 'bg-gray-100 text-gray-800';
    };

    if (layout === 'vertical') {
        return (
            <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getAttendanceColor(event.attendees, event.maxAttendees)}`}>
                            {event.attendees}/{event.maxAttendees} asistiendo
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2" />
                            <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{event.location}</span>
                        </div>
                    </div>

                    {showFullDescription && (
                        <p className="text-gray-700 mb-4 line-clamp-3">{event.description}</p>
                    )}

                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center">
                        Regístrate Ya
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        );
    }

    // Horizontal layout (default)
    return (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
            <div className="md:flex">
                <div className="md:w-1/3">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 md:h-full object-cover object-center"
                    />
                </div>
                <div className="md:w-2/3 p-6">
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
                            {event.category}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getAttendanceColor(event.attendees, event.maxAttendees)}`}>
                            <Users className="w-3 h-3 inline mr-1" />
                            {event.attendees}/{event.maxAttendees}
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>

                    <div className="grid md:grid-cols-2 gap-2 mb-4">
                        <div className="flex items-center text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 md:col-span-2">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{event.location}</span>
                        </div>
                    </div>

                    {showFullDescription && (
                        <p className="text-gray-700 mb-6">{event.description}</p>
                    )}

                    <button className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                        Regístrate Ya
                        <ExternalLink className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Event List Component
const EventList = ({ events, layout = 'horizontal', showFilters = true, maxEvents = null }) => {
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(events.map(event => event.category))];

    useEffect(() => {
        let filtered = events;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(event => event.category === selectedCategory);
        }

        if (maxEvents) {
            filtered = filtered.slice(0, maxEvents);
        }

        setFilteredEvents(filtered);
    }, [events, selectedCategory, maxEvents]);

    return (
        <div>
            {showFilters && (
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className={`space-y-6 ${layout === 'vertical' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0' : ''}`}>
                {filteredEvents.map(event => (
                    <EventCard
                        key={event.id}
                        event={event}
                        layout={layout}
                    />
                ))}
            </div>
        </div>
    );
};

// Main Events Page Component
const EventsPage = () => {
    const [events, setEvents] = useState(sampleEvents);

    // This is where you'd fetch from Firebase
    // useEffect(() => {
    //   const fetchEvents = async () => {
    //     // Firebase fetch logic here
    //     // const eventsData = await fetchEventsFromFirebase();
    //     // setEvents(eventsData);
    //   };
    //   fetchEvents();
    // }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#193956] to-[#EA3367] text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Próximos eventos
                        </h1>
                        <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                            Únete a nosotros para marcar la diferencia en nuestra comunidad. Descubre los próximos eventos, talleres y recaudaciones de fondos.            </p>
                    </div>
                </div>
            </div>

            {/* Events Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <EventList events={events} layout="horizontal" />
            </div>

            {/* Featured Events Section (Example of reusability) */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                        Eventos Destacados
                    </h2>
                    <EventList
                        events={events}
                        layout="vertical"
                        showFilters={false}
                        maxEvents={3}
                    />
                </div>
            </div>
        </div>
    );
};

export default EventsPage;