import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';

interface Channel {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

// Güncel kanallar kanallar.txt dosyasından alındı
const defaultChannels: Array<Channel> = [
    { id: '1', name: 'Haber Global TV', url: '6BX-NUzBSp8', width: 0, height: 0, x: 0, y: 0 },
    { id: '2', name: 'CNN TÜRK', url: 'bdDfLLy9Y5k', width: 0, height: 0, x: 0, y: 0 },
    { id: '3', name: 'SÖZCÜ TV', url: 'ztmY_cCtUl0', width: 0, height: 0, x: 0, y: 0 },
    { id: '4', name: 'Habertürk TV', url: 'RNVNlJSUFoE', width: 0, height: 0, x: 0, y: 0 },
    { id: '5', name: 'A Haber', url: 'nmY9i63t6qo', width: 0, height: 0, x: 0, y: 0 },
    { id: '6', name: 'Ekol TV', url: '9KEThxQtWYA', width: 0, height: 0, x: 0, y: 0 },
    { id: '7', name: 'HALK TV', url: 'ZSWPj9szKb8', width: 0, height: 0, x: 0, y: 0 },
    { id: '8', name: 'TRT Haber', url: 'TNax9QRxK40', width: 0, height: 0, x: 0, y: 0 },
    { id: '9', name: 'TGRT Haber', url: 'TsB0xYOH0AU', width: 0, height: 0, x: 0, y: 0 },
    { id: '10', name: 'NTV', url: 'qnpfhjMhMKY', width: 0, height: 0, x: 0, y: 0 },
    { id: '11', name: 'tv100', url: '6g_DvD8e2T0', width: 0, height: 0, x: 0, y: 0 },
    { id: '12', name: 'TVNET', url: '6DEEsrkWz1c', width: 0, height: 0, x: 0, y: 0 },
    { id: '13', name: 'TELE1', url: 'fNqmmqNNGp8', width: 0, height: 0, x: 0, y: 0 },
    { id: '14', name: '24 TV', url: 'cs8h7IljHNc', width: 0, height: 0, x: 0, y: 0 },
    { id: '15', name: 'Bloomberg HT', url: 'hHSmBJk6w0c', width: 0, height: 0, x: 0, y: 0 },
    { id: '16', name: 'ÜLKE TV', url: 'rOwylmsPB94', width: 0, height: 0, x: 0, y: 0 },
    { id: '17', name: 'CNBC-e', url: 'XihyuKSyUD0', width: 0, height: 0, x: 0, y: 0 },
];

// Grid layout seçenekleri
const gridLayouts: { [key: number]: { cols: number; rows: number; class: string; } } = {
    1: { cols: 1, rows: 1, class: 'grid-cols-1 grid-rows-1' },
    2: { cols: 2, rows: 1, class: 'grid-cols-2 grid-rows-1' },
    3: { cols: 3, rows: 1, class: 'grid-cols-3 grid-rows-1' },
    4: { cols: 2, rows: 2, class: 'grid-cols-2 grid-rows-2' },
    6: { cols: 3, rows: 2, class: 'grid-cols-3 grid-rows-2' },
    8: { cols: 4, rows: 2, class: 'grid-cols-4 grid-rows-2' },
    9: { cols: 3, rows: 3, class: 'grid-cols-3 grid-rows-3' },
    10: { cols: 5, rows: 2, class: 'grid-cols-5 grid-rows-2' },
    12: { cols: 4, rows: 3, class: 'grid-cols-4 grid-rows-3' },
    15: { cols: 5, rows: 3, class: 'grid-cols-5 grid-rows-3' },
    16: { cols: 4, rows: 4, class: 'grid-cols-4 grid-rows-4' },
    20: { cols: 5, rows: 4, class: 'grid-cols-5 grid-rows-4' },
    25: { cols: 5, rows: 5, class: 'grid-cols-5 grid-rows-5' },
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<number>(4); // Varsayılan 4 kanal - sabit
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelUrl, setNewChannelUrl] = useState('');
    const [draggedChannel, setDraggedChannel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'grid' | 'channels'>('grid');
    const [autoplay, setAutoplay] = useState(true);
    const [failedVideos, setFailedVideos] = useState<Set<string>>(new Set());
    const [currentOrigin, setCurrentOrigin] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const origin = window.location.origin;
            setCurrentOrigin(origin);
            console.log(`[MultiTV] useEffect: Origin set to: ${origin}`);

            const savedChannels = localStorage.getItem('multiTV_channels');
            const savedAutoplay = localStorage.getItem('multiTV_autoplay');

            if (savedChannels) {
                try {
                    const parsedChannels = JSON.parse(savedChannels);
                    if (Array.isArray(parsedChannels) && parsedChannels.length > 0) {
                        setChannels(parsedChannels);
                        console.log('[MultiTV] useEffect: Loaded channels from localStorage:', parsedChannels);
                    } else {
                        setChannels(defaultChannels);
                        console.log('[MultiTV] useEffect: No valid channels in localStorage, using default.');
                    }
                } catch (e) {
                    console.error('[MultiTV] useEffect: Error parsing channels from localStorage, using default.', e);
                    setChannels(defaultChannels);
                }
            } else {
                setChannels(defaultChannels);
                console.log('[MultiTV] useEffect: No channels in localStorage, using default.');
            }

            // Grid boyutu her zaman 4 olarak sabitlendi
            setGridSize(4);
            console.log(`[MultiTV] useEffect: Grid size forced to: 4`);

            if (savedAutoplay !== null) {
                setAutoplay(savedAutoplay === 'true');
                console.log(`[MultiTV] useEffect: Autoplay set to: ${savedAutoplay}`);
            }
        }
    }, []);

    const displayedChannels = channels.slice(0, gridSize);

    const getVideoTitle = async (url: string): Promise<string> => {
        const videoId = extractVideoId(url);
        if (!videoId) return 'Yeni Kanal';
        try {
            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            const data = await response.json();
            return data.title || 'YouTube Video';
        } catch (e) { return 'YouTube Video'; }
    };

    const addChannel = async (): Promise<void> => {
        if (!newChannelUrl.trim()) return;
        setIsLoading(true);
        try {
            const title = await getVideoTitle(newChannelUrl);
            const videoId = extractVideoId(newChannelUrl);
            const newChannel: Channel = { id: Date.now().toString(), name: title, url: videoId, width: 400, height: 300, x: 0, y: 0 };
            setChannels(prevChannels => [...prevChannels, newChannel]);
            setNewChannelUrl('');
        } catch (error) { console.error('Kanal eklenirken hata:', error); }
        finally { setIsLoading(false); }
    };

    const extractVideoId = (url: string): string => {
        const patterns = [
            /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)([a-zA-Z0-9_-]{11})/,
            /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match && match[1]) return match[1];
        }
        return url;
    };

    const updateChannel = (id: string, name: string, videoId: string): void => {
        setChannels(prev => prev.map(ch => ch.id === id ? { ...ch, name, url: videoId } : ch));
    };
    const removeChannel = (id: string): void => setChannels(channels.filter(ch => ch.id !== id));
    const handleDragStart = (e: React.DragEvent, id: string): void => { e.dataTransfer.effectAllowed = 'move'; setDraggedChannel(id); };
    const handleDragOver = (e: React.DragEvent): void => e.preventDefault();
    const handleDrop = (e: React.DragEvent, targetId: string): void => {
        e.preventDefault();
        if (!draggedChannel || draggedChannel === targetId) return;
        const draggedIdx = channels.findIndex(c => c.id === draggedChannel);
        const targetIdx = channels.findIndex(c => c.id === targetId);
        if (draggedIdx === -1 || targetIdx === -1) return;
        const newCh = [...channels];
        const [draggedItem] = newCh.splice(draggedIdx, 1);
        newCh.splice(targetIdx, 0, draggedItem);
        setChannels(newCh);
        setDraggedChannel(null);
    };
    const handleKeyPress = (e: React.KeyboardEvent): void => { if (e.key === 'Enter') addChannel(); };

    const saveSettings = (): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('multiTV_channels', JSON.stringify(channels));
            localStorage.setItem('multiTV_gridSize', gridSize.toString());
            localStorage.setItem('multiTV_autoplay', autoplay.toString());
            alert('Ayarlar başarıyla kaydedildi!');
        }
    };

    const getVideoEmbedUrl = (videoId: string): string | null => {
        if (!currentOrigin) {
            console.log(`[MultiTV] getVideoEmbedUrl: Origin not ready for video ID: ${videoId}. Returning null.`);
            return null;
        }

        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            mute: '1',
            controls: '1',
            rel: '0',
            modestbranding: '1',
            fs: '1',
            enablejsapi: '1'
        });
        params.append('origin', currentOrigin);

        const finalUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
        console.log(`[MultiTV] getVideoEmbedUrl: Video ID: ${videoId}, Origin: ${currentOrigin}, Final Embed URL: ${finalUrl}`);
        return finalUrl;
    };

    const handleVideoError = (videoId: string, channelName: string): void => {
        console.error(`Video yükleme hatası: ${channelName} (${videoId})`);
        setFailedVideos(prev => new Set(prev).add(videoId));
    };

    const renderVideoPlayer = (channel: Channel): JSX.Element => {
        const embedUrl = getVideoEmbedUrl(channel.url);

        if (!embedUrl) {
            return (
                <div className="w-full h-full flex items-center justify-center text-white bg-gray-700">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <span className="text-sm">Video yükleniyor...</span>
                    </div>
                </div>
            );
        }

        const isVideoFailed = failedVideos.has(channel.url);
        if (isVideoFailed) {
            return (
                <div className="w-full h-full flex flex-col items-center justify-center text-white bg-gray-900 p-4">
                    <div className="text-center">
                        <div className="text-4xl mb-2">⚠️</div>
                        <p className="text-sm mb-3">Video yüklenemedi</p>
                        <div className="flex flex-col gap-2">
                            <a
                                href={`https://www.youtube.com/watch?v=${channel.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                                YouTube&apos;da Aç
                            </a>
                            <button
                                onClick={(): void => setFailedVideos((prev: Set<string>): Set<string> => {
                                    const newSet = new Set(prev);
                                    newSet.delete(channel.url);
                                    return newSet;
                                })}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors"
                            >
                                Tekrar Dene
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <iframe
                key={embedUrl}
                src={embedUrl}
                title={channel.name}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
                onError={(): void => handleVideoError(channel.url, channel.name)}
            />
        );
    };

    return (
        <>
            <NextSeo
                title="Multi TV - Çoklu Haber Kanalı İzleme"
                description="Birden fazla haber kanalını aynı anda izleyin"
            />
            <div className="fixed inset-0 bg-black overflow-hidden">
                {/* Floating Settings Button - Sağ Orta */}
                <button
                    onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                    className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
                    title="Ayarlar"
                >
                    <span className="text-xl">⚙️</span>
                </button>

                {/* Settings Sidebar */}
                {isSettingsOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
                            onClick={(): void => setIsSettingsOpen(false)}
                        />

                        {/* Settings Panel */}
                        <div className="fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl z-50 overflow-y-auto border-l border-gray-700">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                        ⚙️ Ayarlar
                                    </h2>
                                    <button
                                        onClick={(): void => setIsSettingsOpen(false)}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-2xl hover:rotate-90 transform transition-transform"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="mb-8">
                                    <div className="flex bg-gray-800 rounded-lg p-1">
                                        <button
                                            onClick={(): void => setActiveTab('grid')}
                                            className={`flex-1 px-4 py-3 font-medium rounded-md transition-all duration-200 ${activeTab === 'grid'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            📊 Grid Boyutu
                                        </button>
                                        <button
                                            onClick={(): void => setActiveTab('channels')}
                                            className={`flex-1 px-4 py-3 font-medium rounded-md transition-all duration-200 ${activeTab === 'channels'
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            📺 Kanallar
                                        </button>
                                    </div>
                                </div>

                                {activeTab === 'grid' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-6 text-white">Grid Boyutu Seçin</h3>
                                            <div className="grid grid-cols-3 gap-4">
                                                {Object.keys(gridLayouts).map((sizeStr) => {
                                                    const size = Number(sizeStr);
                                                    const layout = gridLayouts[size];
                                                    if (!layout) return null;
                                                    return (
                                                        <button
                                                            key={size}
                                                            onClick={(): void => setGridSize(size)}
                                                            className={`aspect-square flex flex-col items-center justify-center text-sm font-bold rounded-xl transition-all duration-300 transform hover:scale-105 ${gridSize === size
                                                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl scale-105 ring-2 ring-blue-400'
                                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white shadow-lg'
                                                                }`}
                                                            title={`${size} kanal (${layout.cols}x${layout.rows} grid)`}
                                                        >
                                                            <span className="text-2xl font-bold">{size}</span>
                                                            <span className="text-xs opacity-80 mt-1">{layout.cols}×{layout.rows}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="bg-gray-800 p-4 rounded-xl">
                                            <label className="flex items-center gap-3 text-white cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={autoplay}
                                                    onChange={(e): void => setAutoplay(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-2 bg-gray-700"
                                                />
                                                <span className="text-lg">🔊 Otomatik Oynatma</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'channels' && (
                                    <div className="space-y-6">
                                        {/* Hızlı Kanal Ekleme */}
                                        <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600">
                                            <h4 className="text-lg font-semibold text-white mb-4">🚀 Hızlı Kanal Ekle</h4>
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    type="text"
                                                    placeholder="YouTube video linkini veya ID&apos;sini yapıştırın..."
                                                    value={newChannelUrl}
                                                    onChange={(e): void => setNewChannelUrl(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    className="w-full p-4 border border-gray-600 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    onClick={addChannel}
                                                    disabled={isLoading || !newChannelUrl.trim()}
                                                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-4 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100"
                                                >
                                                    {isLoading ? '⏳ Ekleniyor...' : '➕ Kanal Ekle'}
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-3">💡 Video linkini yapıştırın, başlık otomatik çekilecek.</p>
                                        </div>

                                        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                                            {channels.map((ch) => (
                                                <div key={ch.id} className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 rounded-xl border border-gray-600 hover:border-gray-500 transition-all">
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">📺 Kanal Adı</label>
                                                            <input
                                                                type="text"
                                                                value={ch.name}
                                                                onChange={(e): void => updateChannel(ch.id, e.target.value, ch.url)}
                                                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">🔗 Video ID</label>
                                                            <input
                                                                type="text"
                                                                value={ch.url}
                                                                onChange={(e): void => updateChannel(ch.id, ch.name, e.target.value)}
                                                                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                                placeholder="qnpfhjMhMKY"
                                                            />
                                                        </div>
                                                        <div className="flex justify-end">
                                                            <button
                                                                onClick={(): void => removeChannel(ch.id)}
                                                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
                                                            >
                                                                🗑️ Sil
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-4 pt-6 border-t border-gray-700">
                                            <button
                                                onClick={(): void => {
                                                    const newChannel: Channel = {
                                                        id: Date.now().toString(),
                                                        name: 'Yeni Kanal',
                                                        url: '',
                                                        width: 400,
                                                        height: 300,
                                                        x: 0,
                                                        y: 0
                                                    };
                                                    setChannels((prev: Array<Channel>): Array<Channel> => [...prev, newChannel]);
                                                }}
                                                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                                            >
                                                ➕ Yeni Kanal Ekle
                                            </button>
                                            <button
                                                onClick={saveSettings}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
                                            >
                                                💾 Ayarları Kaydet
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Full Screen Video Grid - Responsive ve Tam Ekran */}
                <div className="w-full h-full p-1">
                    <div className={`grid ${gridLayouts[gridSize]?.class || gridLayouts[4].class} gap-1 h-full w-full`}>
                        {displayedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className="rounded-lg overflow-hidden shadow-2xl group bg-black relative w-full h-full"
                                draggable
                                onDragStart={(e): void => handleDragStart(e, channel.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e): void => handleDrop(e, channel.id)}
                            >
                                {/* Video Player - Tam Ekran Uyumlu */}
                                <div className="w-full h-full">
                                    {renderVideoPlayer(channel)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #374151;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #6B7280;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9CA3AF;
                }
                
                /* Grid düzenleri için özel CSS */
                .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
                .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
                .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
                .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
                .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
                
                .grid-rows-1 { grid-template-rows: repeat(1, minmax(0, 1fr)); }
                .grid-rows-2 { grid-template-rows: repeat(2, minmax(0, 1fr)); }
                .grid-rows-3 { grid-template-rows: repeat(3, minmax(0, 1fr)); }
                .grid-rows-4 { grid-template-rows: repeat(4, minmax(0, 1fr)); }
                .grid-rows-5 { grid-template-rows: repeat(5, minmax(0, 1fr)); }
                
                /* Video container'ların tam boyut alması */
                .grid > div {
                    min-height: 0;
                    min-width: 0;
                }
                
                /* iframe'lerin responsive olması */
                iframe {
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover;
                }
            `}</style>
        </>
    );
}