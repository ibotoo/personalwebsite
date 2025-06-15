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

// Varsayılan kanallar güncelleniyor ve genişletiliyor
const defaultChannels: Array<Channel> = [
    { id: '1', name: 'NTV', url: 'qnpfhjMhMKY', width: 0, height: 0, x: 0, y: 0 },
    { id: '2', name: 'Habertürk', url: 'SqEFj93oQMg', width: 0, height: 0, x: 0, y: 0 },
    { id: '3', name: 'Haber Global', url: 'Cj21_y9Z1oU', width: 0, height: 0, x: 0, y: 0 },
    { id: '4', name: 'TRT Haber', url: 'g0_N0L3n5qY', width: 0, height: 0, x: 0, y: 0 },
    { id: '5', name: 'TV 100', url: 'VNX0FJx_N5o', width: 0, height: 0, x: 0, y: 0 },
    { id: '6', name: 'Halk TV', url: '3fH47nYaNnk', width: 0, height: 0, x: 0, y: 0 },
    { id: '7', name: '24 TV', url: 'PVOUp92OUAU', width: 0, height: 0, x: 0, y: 0 },
    { id: '8', name: 'TGRT Haber', url: 'kC6QnFqjNFY', width: 0, height: 0, x: 0, y: 0 },
    { id: '9', name: 'KRT TV', url: 'k4Z0L_V4G_Q', width: 0, height: 0, x: 0, y: 0 },
    { id: '10', name: 'TELE 1', url: 'Qcic-0GvJq4', width: 0, height: 0, x: 0, y: 0 },
    { id: '11', name: 'Bengü Türk', url: 'XTRx8H2o75M', width: 0, height: 0, x: 0, y: 0 },
    { id: '12', name: 'Bloomberg HT', url: 'yvqQwM-ycyY', width: 0, height: 0, x: 0, y: 0 },
    { id: '13', name: 'Ulusal Kanal', url: 'E0aW3Kq2_y0', width: 0, height: 0, x: 0, y: 0 },
    { id: '14', name: 'Artı TV', url: '_AF2P0nSClU', width: 0, height: 0, x: 0, y: 0 },
    { id: '15', name: 'TVNET', url: '47G2aZ9mZ2I', width: 0, height: 0, x: 0, y: 0 },
    { id: '16', name: 'Ülke TV', url: 'w_86sXkBGqU', width: 0, height: 0, x: 0, y: 0 },
    { id: '17', name: 'Flash Haber TV', url: 'RgwZqK_E9M4', width: 0, height: 0, x: 0, y: 0 },
];

// Grid layout seçenekleri güncelleniyor ve genişletiliyor
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
    const [gridSize, setGridSize] = useState<number>(4); // gridSize state'i number olarak güncellendi
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
            const savedGridSize = localStorage.getItem('multiTV_gridSize');
            const savedAutoplay = localStorage.getItem('multiTV_autoplay');

            if (savedChannels) {
                try {
                    const parsedChannels = JSON.parse(savedChannels);
                    if (Array.isArray(parsedChannels) && parsedChannels.length > 0) {
                        setChannels(parsedChannels);
                        console.log('[MultiTV] useEffect: Loaded channels from localStorage:', parsedChannels);
                    } else {
                        // localStorage boşsa veya geçersizse varsayılan kanalları yükle
                        setChannels(defaultChannels);
                        console.log('[MultiTV] useEffect: No valid channels in localStorage, using default.');
                    }
                } catch (e) {
                    console.error('[MultiTV] useEffect: Error parsing channels from localStorage, using default.', e);
                    setChannels(defaultChannels); // Hata durumunda varsayılan kanalları yükle
                }
            } else {
                setChannels(defaultChannels); // localStorage'da kanal yoksa varsayılanları yükle
                console.log('[MultiTV] useEffect: No channels in localStorage, using default.');
            }

            // Grid size yükleme mantığı güncellendi
            if (savedGridSize && gridLayouts[Number(savedGridSize)]) {
                setGridSize(Number(savedGridSize));
                console.log(`[MultiTV] useEffect: Grid size set to: ${savedGridSize}`);
            } else {
                setGridSize(4); // Varsayılan olarak 4 kanalı ayarla (veya listedeki ilk uygun değer)
                console.log(`[MultiTV] useEffect: No saved grid size or invalid, defaulting to: 4`);
            }
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
                key={embedUrl} // key olarak embedUrl kullanmak iframe'in origin değiştiğinde yeniden render olmasını sağlar
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
        <Layout.Default seo={{ title: 'Multi TV - Çoklu Haber Kanalı İzleme' }} background={false}>
            <div className="min-h-screen relative">
                {/* Floating Settings Button */}
                <button
                    onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                    className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                    ⚙️
                </button>

                {/* Settings Sidebar */}
                {isSettingsOpen && (
                    <>
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={(): void => setIsSettingsOpen(false)}
                        />

                        {/* Settings Panel */}
                        <div className="fixed top-0 right-0 h-full w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Ayarlar</h2>
                                    <button
                                        onClick={(): void => setIsSettingsOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="mb-6">
                                    <div className="flex border-b border-gray-200 dark:border-gray-600">
                                        <button onClick={(): void => setActiveTab('grid')} className={`px-4 py-2 font-medium ${activeTab === 'grid' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>📊 Kanal Sayısı</button>
                                        <button onClick={(): void => setActiveTab('channels')} className={`px-4 py-2 font-medium ${activeTab === 'channels' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>📺 Kanalları Düzenle</button>
                                    </div>
                                </div>

                                {activeTab === 'grid' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Grid Boyutu Seçin</h3>
                                            <div className="grid grid-cols-3 gap-3">
                                                {Object.keys(gridLayouts).map((sizeStr) => {
                                                    const size = Number(sizeStr);
                                                    const layout = gridLayouts[size];
                                                    if (!layout) return null;
                                                    return (
                                                        <button
                                                            key={size}
                                                            onClick={(): void => setGridSize(size)}
                                                            className={`aspect-square flex flex-col items-center justify-center text-sm font-bold rounded-lg transition-all ${gridSize === size ? 'bg-primary-500 text-white shadow-lg scale-105' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105'}`}
                                                            title={`${size} kanal (${layout.cols}x${layout.rows} grid)`}
                                                        >
                                                            <span className="text-lg">{size}</span>
                                                            <span className="text-xs opacity-75">{layout.cols}×{layout.rows}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                                <input type="checkbox" checked={autoplay} onChange={(e): void => setAutoplay(e.target.checked)} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                                🔊 Otomatik oynatma
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'channels' && (
                                    <div className="space-y-6">
                                        {/* Hızlı Kanal Ekleme */}
                                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="YouTube video linkini veya ID&apos;sini yapıştırın..."
                                                    value={newChannelUrl}
                                                    onChange={(e): void => setNewChannelUrl(e.target.value)}
                                                    onKeyPress={handleKeyPress}
                                                    className="w-full p-3 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm focus:ring-2 focus:ring-primary-500"
                                                    disabled={isLoading}
                                                />
                                                <button
                                                    onClick={addChannel}
                                                    disabled={isLoading || !newChannelUrl.trim()}
                                                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    {isLoading ? '⏳ Ekleniyor...' : '➕ Kanal Ekle'}
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Video linkini yapıştırın, başlık otomatik çekilecek.</p>
                                        </div>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            YouTube video ID&apos;sini girmelisiniz. (Örnek: qnpfhjMhMKY)
                                        </p>
                                        <div className="space-y-4 max-h-96 overflow-y-auto">
                                            {channels.map((ch) => (
                                                <div key={ch.id} className="grid grid-cols-1 gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">📺 Kanal Adı</label>
                                                        <input
                                                            type="text"
                                                            value={ch.name}
                                                            onChange={(e): void => updateChannel(ch.id, e.target.value, ch.url)}
                                                            className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white text-sm focus:ring-2 focus:ring-primary-500"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">🔗 Video ID</label>
                                                        <input
                                                            type="text"
                                                            value={ch.url}
                                                            onChange={(e): void => updateChannel(ch.id, ch.name, e.target.value)}
                                                            className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm focus:ring-2 focus:ring-primary-500"
                                                            placeholder="qnpfhjMhMKY"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <button
                                                            onClick={(): void => removeChannel(ch.id)}
                                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                                                        >
                                                            🗑️ Sil
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
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
                                                className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                ➕ Yeni Kanal Ekle
                                            </button>
                                            <button
                                                onClick={saveSettings}
                                                className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                💾 Ayarları Kaydet
                                            </button>
                                            <button
                                                onClick={(): void => setFailedVideos((): Set<string> => new Set())}
                                                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                                            >
                                                🔄 Hataları Temizle
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Full Screen Video Grid */}
                <div className="h-screen w-full p-2">
                    <div className={`grid ${gridLayouts[gridSize]?.class || gridLayouts[4].class} gap-1 h-full w-full`}>
                        {displayedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className="rounded-lg overflow-hidden shadow-lg group aspect-video flex flex-col bg-black"
                                draggable
                                onDragStart={(e): void => handleDragStart(e, channel.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e): void => handleDrop(e, channel.id)}
                            >
                                <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-2 md:px-3 py-1 text-xs font-medium flex justify-between items-center flex-shrink-0">
                                    <span className="truncate flex-1 font-semibold">{channel.name}</span>
                                    <div className="flex items-center gap-1 ml-2">
                                        <span className="text-red-500 animate-pulse text-xs font-bold">● CANLI</span>
                                        {failedVideos.has(channel.url) && (
                                            <span className="text-yellow-500 text-xs">⚠️</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-grow relative w-full h-full">
                                    {renderVideoPlayer(channel)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {channels.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📺</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Henüz kanal eklenmedi</h2>
                            <p className="text-gray-600 dark:text-gray-400">Ayarlar butonuna tıklayarak kanal ekleyin</p>
                        </div>
                    </div>
                )}
            </div>
        </Layout.Default>
    );
}