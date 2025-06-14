import { useState, useEffect } from 'react';
import { Layout } from '~/layouts';

interface Channel {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    x: number;
    y: number;
}

// Orijinal Multi TV projesindeki varsayılan kanallar - Güncel canlı yayın ID'leri
const defaultChannels: Array<Channel> = [
    { id: '1', name: 'NTV', url: 'qnpfhjMhMKY', width: 800, height: 600, x: 50, y: 50 },
    { id: '2', name: 'Habertürk', url: 'RNVNlJSUFoE', width: 400, height: 300, x: 420, y: 0 },
    { id: '3', name: 'Haber Global', url: '6BX-NUzBSp8', width: 400, height: 300, x: 0, y: 320 },
    { id: '4', name: 'TRT Haber', url: 'Fxzjb_17wP4', width: 400, height: 300, x: 420, y: 320 },
    { id: '5', name: 'Halk TV', url: 'ZSWPj9szKb8', width: 400, height: 300, x: 840, y: 0 },
    { id: '6', name: 'TGRT Haber', url: 'YEiKwOVmzrM', width: 400, height: 300, x: 840, y: 320 },
    { id: '7', name: '24 TV', url: 'Ot0wdO02o8M', width: 400, height: 300, x: 0, y: 640 },
    { id: '8', name: 'KRT TV', url: 'L4_qGUvKmWs', width: 400, height: 300, x: 420, y: 640 },
    { id: '9', name: 'TELE 1', url: 'MzJLaOOXGpE', width: 400, height: 300, x: 840, y: 640 },
];

// 16:9 ekranlar için optimize edilmiş grid düzenleri
const gridLayouts = {
    4: { cols: 2, rows: 2, class: 'grid-cols-2 grid-rows-2' },
    6: { cols: 3, rows: 2, class: 'grid-cols-3 grid-rows-2' },
    9: { cols: 3, rows: 3, class: 'grid-cols-3 grid-rows-3' },
    12: { cols: 4, rows: 3, class: 'grid-cols-4 grid-rows-3' },
    16: { cols: 4, rows: 4, class: 'grid-cols-4 grid-rows-4' },
    20: { cols: 5, rows: 4, class: 'grid-cols-5 grid-rows-4' },
    25: { cols: 5, rows: 5, class: 'grid-cols-5 grid-rows-5' },
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<keyof typeof gridLayouts>(9);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelUrl, setNewChannelUrl] = useState('');
    const [draggedChannel, setDraggedChannel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'grid' | 'channels'>('grid');
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Kaydedilmiş ayarları yükle
            const savedChannels = localStorage.getItem('multiTV_channels');
            const savedGridSize = localStorage.getItem('multiTV_gridSize');
            const savedAutoplay = localStorage.getItem('multiTV_autoplay');

            if (savedChannels) {
                try {
                    setChannels(JSON.parse(savedChannels));
                } catch (e) {
                    console.error('Kaydedilmiş kanallar yüklenemedi:', e);
                }
            }

            if (savedGridSize && savedGridSize in gridLayouts) {
                setGridSize(Number(savedGridSize) as keyof typeof gridLayouts);
            }

            if (savedAutoplay !== null) {
                setAutoplay(savedAutoplay === 'true');
            }
        }
    }, []);

    const displayedChannels = channels.slice(0, gridSize);

    const getVideoTitle = async (url: string): Promise<string> => {
        try {
            let videoId = '';

            if (url.includes('youtube.com/watch?v=')) {
                videoId = url.split('v=')[1]?.split('&')[0] || '';
            } else if (url.includes('youtu.be/')) {
                videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
            } else if (url.includes('youtube.com/embed/')) {
                videoId = url.split('embed/')[1]?.split('?')[0] || '';
            } else {
                videoId = url;
            }

            if (!videoId) return 'Yeni Kanal';

            try {
                const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
                const data = await response.json();
                return data.title || 'YouTube Video';
            } catch (e) {
                return 'YouTube Video';
            }
        } catch (error) {
            console.error('Başlık alınamadı:', error);
            return 'YouTube Video';
        }
    };

    const addChannel = async (): Promise<void> => {
        if (!newChannelUrl.trim()) return;

        setIsLoading(true);

        try {
            const title = await getVideoTitle(newChannelUrl);
            const videoId = extractVideoId(newChannelUrl);

            const newChannel: Channel = {
                id: Date.now().toString(),
                name: title,
                url: videoId,
                width: 400,
                height: 300,
                x: Math.random() * 200,
                y: Math.random() * 200,
            };

            setChannels([...channels, newChannel]);
            setNewChannelUrl('');
        } catch (error) {
            console.error('Kanal eklenirken hata:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const extractVideoId = (url: string): string => {
        if (url.includes('youtube.com/watch?v=')) {
            return url.split('v=')[1]?.split('&')[0] || url;
        } else if (url.includes('youtu.be/')) {
            return url.split('youtu.be/')[1]?.split('?')[0] || url;
        } else if (url.includes('youtube.com/embed/')) {
            return url.split('embed/')[1]?.split('?')[0] || url;
        }
        return url;
    };

    const updateChannel = (id: string, name: string, videoId: string): void => {
        setChannels(prev => prev.map(channel =>
            channel.id === id ? { ...channel, name, url: videoId } : channel
        ));
    };

    const removeChannel = (id: string): void => {
        setChannels(channels.filter(channel => channel.id !== id));
    };

    const handleDragStart = (e: React.DragEvent, channelId: string): void => {
        setDraggedChannel(channelId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent): void => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, targetChannelId: string): void => {
        e.preventDefault();
        if (!draggedChannel || draggedChannel === targetChannelId) return;

        const draggedIndex = channels.findIndex(c => c.id === draggedChannel);
        const targetIndex = channels.findIndex(c => c.id === targetChannelId);

        if (draggedIndex !== -1 && targetIndex !== -1) {
            const newChannels = [...channels];
            const draggedItem = newChannels[draggedIndex];
            newChannels.splice(draggedIndex, 1);
            newChannels.splice(targetIndex, 0, draggedItem);
            setChannels(newChannels);
        }
        setDraggedChannel(null);
    };

    const handleKeyPress = (e: React.KeyboardEvent): void => {
        if (e.key === 'Enter') {
            addChannel();
        }
    };

    const saveSettings = (): void => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('multiTV_channels', JSON.stringify(channels));
            localStorage.setItem('multiTV_gridSize', gridSize.toString());
            localStorage.setItem('multiTV_autoplay', autoplay.toString());
            alert('Ayarlar kaydedildi!');
        }
    };

    // W3Schools rehberine göre düzeltilmiş embed yöntemi
    const getYouTubeEmbedUrl = (videoId: string): string => {
        // W3Schools önerisi: autoplay=1&mute=1 birlikte kullan
        const params = new URLSearchParams({
            autoplay: autoplay ? '1' : '0',
            mute: '1', // Autoplay için gerekli
            controls: '1', // Kontrolleri göster
            rel: '0', // İlgili videoları gizle
            modestbranding: '1', // YouTube logosunu küçült
            fs: '1', // Tam ekran izin ver
            cc_load_policy: '0', // Altyazıları gizle
            iv_load_policy: '3', // Açıklamaları gizle
            disablekb: '1' // Klavye kısayollarını devre dışı bırak
        });

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    };

    return (
        <Layout.Default seo={{ title: 'Multi TV - Çoklu Haber Kanalı İzleme' }} background={false}>
            <div className="min-h-screen pt-32 pb-8">
                {/* Sticky Header */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                    <div className="max-w-full mx-auto">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    📺 Multi TV
                                </h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Aynı anda birden fazla haber kanalını izleyebileceğiniz çoklu ekran uygulaması
                                </p>
                            </div>
                            <button
                                onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                                className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                ⚙️ Ayarlar
                            </button>
                        </div>

                        {/* Hızlı Kanal Ekleme */}
                        <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="YouTube video linkini buraya yapıştırın..."
                                    value={newChannelUrl}
                                    onChange={(e): void => setNewChannelUrl(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    disabled={isLoading}
                                />
                                <button
                                    onClick={addChannel}
                                    disabled={isLoading || !newChannelUrl.trim()}
                                    className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg transition-colors duration-200 text-lg font-semibold"
                                >
                                    {isLoading ? '⏳' : '➕ Ekle'}
                                </button>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                YouTube video linkini yapıştırın, başlık otomatik olarak çekilecek
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-full mx-auto px-4">
                    {isSettingsOpen && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                                ⚙️ Multi TV Ayarları
                            </h2>

                            {/* Tab Menu */}
                            <div className="mb-6">
                                <div className="flex border-b border-gray-200 dark:border-gray-600">
                                    <button
                                        onClick={(): void => setActiveTab('grid')}
                                        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'grid'
                                            ? 'text-primary-600 border-b-2 border-primary-600'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                    >
                                        📊 Kanal Sayısı
                                    </button>
                                    <button
                                        onClick={(): void => setActiveTab('channels')}
                                        className={`px-4 py-2 font-medium transition-colors ${activeTab === 'channels'
                                            ? 'text-primary-600 border-b-2 border-primary-600'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
                                    >
                                        📺 Kanalları Düzenle
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'grid' && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                                            Grid Boyutu Seçin
                                        </h3>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                                            {Object.entries(gridLayouts).map(([size, layout]) => (
                                                <button
                                                    key={size}
                                                    onClick={(): void => setGridSize(Number(size) as keyof typeof gridLayouts)}
                                                    className={`aspect-square flex flex-col items-center justify-center text-sm font-bold rounded-lg transition-all ${gridSize === Number(size)
                                                        ? 'bg-primary-500 text-white shadow-lg scale-105'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'
                                                        }`}
                                                    title={`${layout.cols}x${layout.rows} grid`}
                                                >
                                                    <span className="text-lg">{size}</span>
                                                    <span className="text-xs opacity-75">{layout.cols}×{layout.rows}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                            <input
                                                type="checkbox"
                                                checked={autoplay}
                                                onChange={(e): void => setAutoplay(e.target.checked)}
                                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                            />
                                            🔊 Otomatik oynatma
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'channels' && (
                                <div className="space-y-6">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Kanal adresi bölümüne YouTube video ID&apos;sini girmelisiniz. (Örnek: qnpfhjMhMKY)
                                    </p>
                                    <div className="space-y-4 max-h-96 overflow-y-auto">
                                        {channels.map((channel) => (
                                            <div key={channel.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        📺 Kanal Adı
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={channel.name}
                                                        onChange={(e): void => updateChannel(channel.id, e.target.value, channel.url)}
                                                        className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        🔗 Video ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={channel.url}
                                                        onChange={(e): void => updateChannel(channel.id, channel.name, e.target.value)}
                                                        className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                                        placeholder="qnpfhjMhMKY"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <button
                                                        onClick={(): void => removeChannel(channel.id)}
                                                        className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                                    >
                                                        🗑️ Sil
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                                        <button
                                            onClick={(): void => {
                                                const newChannel: Channel = {
                                                    id: Date.now().toString(),
                                                    name: 'Yeni Kanal',
                                                    url: '',
                                                    width: 400,
                                                    height: 300,
                                                    x: 0,
                                                    y: 0,
                                                };
                                                setChannels([...channels, newChannel]);
                                            }}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            ➕ Yeni Kanal Ekle
                                        </button>
                                        <button
                                            onClick={saveSettings}
                                            className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
                                        >
                                            💾 Ayarları Kaydet
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Video Grid */}
                    <div className={`grid ${gridLayouts[gridSize].class} gap-2 md:gap-4 min-h-[60vh]`}>
                        {displayedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-300 dark:border-gray-600"
                                draggable
                                onDragStart={(e): void => handleDragStart(e, channel.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e): void => handleDrop(e, channel.id)}
                            >
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm font-medium flex justify-between items-center">
                                    <span className="truncate flex-1">{channel.name}</span>
                                    <div className="flex items-center gap-1 md:gap-2 ml-2">
                                        <span className="text-red-500 animate-pulse text-xs">● CANLI</span>
                                    </div>
                                </div>
                                <div className="relative aspect-video bg-black">
                                    <iframe
                                        src={getYouTubeEmbedUrl(channel.url)}
                                        title={channel.name}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {channels.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📺</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Henüz kanal eklenmedi
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400">
                                Yukarıdaki alana YouTube video linkini yapıştırarak başlayın
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout.Default>
    );
}