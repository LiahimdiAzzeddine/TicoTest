import { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapPin, Clock, X, Package, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, zoom);
        }
    }, [center, zoom, map]);
    return null;
}

function formatHours(hours) {
    if (!hours || !hours.string) return null;
    const [open1, close1, open2, close2] = hours.string;
    if (!open1 || !close1) return "Fermé";

    const format = (time) => `${time.slice(0, 2)}:${time.slice(2)}`;
    if (open2 && close2) {
        return `${format(open1)}-${format(close1)} et ${format(open2)}-${format(close2)}`;
    }
    return `${format(open1)}-${format(close1)}`;
}

export function RelayPointModal({ isOpen, onClose, onSelect, postcode }) {
    const [relayPoints, setRelayPoints] = useState([]);
    const [selectedRelay, setSelectedRelay] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && postcode) {
            setIsLoading(true);
            setSelectedRelay(null);
            fetch(`https://tico.foodhea.com/api/relay-points?country=FR&postcode=${postcode}`)
                .then(res => res.json())
                .then(data => {
                    if (data?.WSI3_PointRelais_RechercheResult?.PointsRelais?.PointRelais_Details) {
                        setRelayPoints(data.WSI3_PointRelais_RechercheResult.PointsRelais.PointRelais_Details);
                    }
                })
                .finally(() => setIsLoading(false));
        }
    }, [isOpen, postcode]);

    const mapCenter = useMemo(() => {
        if (relayPoints.length > 0) {
            const lat = parseFloat(relayPoints[0].Latitude.replace(',', '.'));
            const lng = parseFloat(relayPoints[0].Longitude.replace(',', '.'));
            return [lat, lng];
        }
        return [48.8566, 2.3522];
    }, [relayPoints]);

    if (!isOpen) return null;

    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    return (
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-white rounded-3xl w-full max-w-7xl h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#0a548d] via-[#0c5fa0] to-[#0d6bb3] text-white p-6 sm:p-8">
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <Package className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold">Points Relais</h2>
                                    <p className="text-sm sm:text-base text-cyan-100 mt-1">
                                        {isLoading ? (
                                            "Recherche en cours..."
                                        ) : relayPoints.length > 0 ? (
                                            `${relayPoints.length} point${relayPoints.length > 1 ? 's' : ''} disponible${relayPoints.length > 1 ? 's' : ''} près de chez vous`
                                        ) : (
                                            "Code postal: " + postcode
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all flex items-center justify-center group"
                        >
                            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    {/* Liste des points relais */}
                    <div className="md:w-2/5 overflow-y-auto border-r border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center p-8">
                                    <div className="relative w-16 h-16 mx-auto mb-6">
                                        <div className="absolute inset-0 rounded-full border-4 border-[#d9f2f2]"></div>
                                        <div className="absolute inset-0 rounded-full border-4 border-[#0a548d] border-t-transparent animate-spin"></div>
                                    </div>
                                    <p className="text-gray-600 font-medium">Chargement des points relais...</p>
                                    <p className="text-sm text-gray-500 mt-2">Veuillez patienter</p>
                                </div>
                            </div>
                        ) : relayPoints.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <Package className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="font-semibold text-gray-700 mb-2">Aucun point relais trouvé</p>
                                    <p className="text-sm text-gray-500">Essayez avec un autre code postal</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-6 space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-bold text-[#0a548d] uppercase tracking-wide">
                                        Points disponibles
                                    </h3>
                                    <span className="text-xs bg-[#0a548d] text-white px-3 py-1 rounded-full font-medium">
                                        {relayPoints.length}
                                    </span>
                                </div>
                                {relayPoints.map((relay, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedRelay(relay)}
                                        className={`group bg-white rounded-2xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                                            selectedRelay?.Num === relay.Num
                                                ? 'border-[#0a548d] bg-gradient-to-br from-[#d9f2f2] to-[#e6f7f7] shadow-lg scale-[1.02]'
                                                : 'border-gray-200 hover:border-[#0a548d]/50 hover:shadow-md hover:scale-[1.01]'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors ${
                                                selectedRelay?.Num === relay.Num
                                                    ? 'bg-[#0a548d] text-white'
                                                    : 'bg-gray-100 text-gray-600 group-hover:bg-[#0a548d]/10 group-hover:text-[#0a548d]'
                                            }`}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-[#0a548d] text-base mb-2 truncate">
                                                    {relay.LgAdr1}
                                                </h3>
                                                <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                                    <div className="flex-1">
                                                        <p className="leading-snug">{relay.LgAdr3}</p>
                                                        <p className="font-medium text-gray-700 mt-0.5">
                                                            {relay.CP} {relay.Ville}
                                                        </p>
                                                    </div>
                                                </div>
                                                {relay.Distance && relay.Distance !== "0" && (
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 rounded-lg px-2 py-1 w-fit">
                                                        <Navigation className="w-3 h-3" />
                                                        <span>À {relay.Distance} m</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Carte et détails */}
                    <div className="md:w-3/5 flex flex-col">
                        {/* Carte */}
                        <div className="flex-1 relative bg-gray-100">
                            <MapContainer
                                center={mapCenter}
                                zoom={13}
                                className="h-full w-full"
                                scrollWheelZoom={true}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <MapUpdater center={mapCenter} zoom={13} />
                                {relayPoints.map((relay, i) => {
                                    const lat = parseFloat(relay.Latitude.replace(',', '.'));
                                    const lng = parseFloat(relay.Longitude.replace(',', '.'));

                                    if (isNaN(lat) || isNaN(lng)) {
                                        return null;
                                    }

                                    return (
                                        <Marker
                                            key={i}
                                            position={[lat, lng]}
                                            eventHandlers={{
                                                click: () => setSelectedRelay(relay)
                                            }}
                                        >
                                            <Popup>
                                                <div className="min-w-[240px] p-2">
                                                    <h4 className="font-bold text-[#0a548d] text-base mb-2">
                                                        {relay.LgAdr1}
                                                    </h4>
                                                    <div className="text-sm text-gray-700 mb-3 space-y-1">
                                                        <p>{relay.LgAdr3}</p>
                                                        <p className="font-medium">{relay.CP} {relay.Ville}</p>
                                                    </div>
                                               
                                                </div>
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                            </MapContainer>
                        </div>

                        {/* Détails du point sélectionné */}
                        {selectedRelay && (
                            <div className="bg-white border-t-4 border-[#0a548d] p-6 max-h-[320px] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-12 h-12 bg-[#d9f2f2] rounded-xl flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-6 h-6 text-[#0a548d]" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-[#0a548d] mb-1">
                                                    {selectedRelay.LgAdr1}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {selectedRelay.LgAdr3}
                                                </p>
                                                <p className="text-sm font-semibold text-gray-800 mt-1">
                                                    {selectedRelay.CP} {selectedRelay.Ville}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            console.log("Relay choisi:", selectedRelay);
                                            onSelect(selectedRelay);
                                        }}
                                        className="flex-shrink-0 bg-gradient-to-r from-[#0a548d] to-[#0d6bb3] text-white px-8 py-3.5 rounded-xl hover:shadow-lg hover:scale-105 transition-all font-bold text-sm sm:text-base"
                                    >
                                        Choisir ce point
                                    </button>
                                </div>

                                {/* Horaires */}
                                <div className="border-t-2 border-gray-100 pt-5">
                                    <div className="flex items-center gap-2 text-[#0a548d] font-bold mb-4">
                                        <div className="w-8 h-8 bg-[#d9f2f2] rounded-lg flex items-center justify-center">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <span>Horaires d'ouverture</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {days.map((day, idx) => {
                                            const hourKey = `Horaires_${day}`;
                                            const hours = selectedRelay[hourKey];
                                            const formattedHours = formatHours(hours);
                                            const isClosed = formattedHours === "Fermé";
                                            
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                                                >
                                                    <span className="font-semibold text-gray-700 text-sm">{day}</span>
                                                    <span className={`text-sm font-medium ${
                                                        isClosed ? 'text-red-500' : 'text-gray-600'
                                                    }`}>
                                                        {formattedHours || "Non disponible"}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}