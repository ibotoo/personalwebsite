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

const defaultChannels: Array<Channel> = [
    { id: '1', name: 'SÖZCÜ TV', url: 'ztmY_cCtUl0', width: 800, height: 600, x: 50, y: 50 },
    { id: '2', name: 'NTV', url: 'qnpfhjMhMKY', width: 400, height: 300, x: 420, y: 0 },
    { id: '3', name: 'CNN Türk', url: 'bdDfLLy9Y5k', width: 400, height: 300, x: 0, y: 320 },
    { id: '4', name: 'Habertürk', url: 'RNVNlJSUFoE', width: 400, height: 300, x: 420, y: 320 },
    { id: '5', name: 'Halk TV', url: 'ZSWPj9szKb8', width: 400, height: 300, x: 840, y: 0 },
    { id: '6', name: 'Haber Global', url: '6BX-NUzBSp8', width: 400, height: 300, x: 840, y: 320 },
];

const gridLayouts = {
    4: 'grid-cols-2 grid-rows-2',
    6: 'grid-cols-3 grid-rows-2',
    9: 'grid-cols-3 grid-rows-3',
    10: 'grid-cols-2 grid-rows-5',
    13: 'grid-cols-3 grid-rows-5',
    16: 'grid-cols-4 grid-rows-4',
    18: 'grid-cols-3 grid-rows-6',
    21: 'grid-cols-3 grid-rows-7',
    25: 'grid-cols-5 grid-rows-5',
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<keyof typeof gridLayouts>(6);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelUrl, setNewChannelUrl] = useState('');
    const [draggedChannel, setDraggedChannel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<'grid' | 'channels' | 'add'>('grid');
    const [currentOrigin, setCurrentOrigin] = useState('');

    useEffect(() => {
        // Client-side'da window.location.origin'i al
        if (typeof window !== 'undefined') {
            setCurrentOrigin(window.location.origin);
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

            const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
            const data = await response.json();
            return data.title || 'YouTube Video';
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

    const getYouTubeEmbedUrl = (videoId: string): string => {
        const params = new URLSearchParams({
            autoplay: '1',
            mute: '1',
            controls: '1',
            modestbranding: '1',
            rel: '0',
            fs: '1',
            enablejsapi: '1',
            ...(currentOrigin && { origin: currentOrigin })
        });

        return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
    };

    return (
        <Layout.Default seo={{ title: 'Multi TV - İbrahim SANCAR' }} background={false}>
            <div className="min-h-screen pt-32 pb-8">
                {/* Sticky Header */}
                <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-4">
                    <div className="max-w-full mx-auto">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                📺 Multi TV
                            </h1>
                            <button
                                onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
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
                                    className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-lg"
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
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Multi TV | Ayarlar
                            </h2>

                            {/* Dil */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Dil
                                </h3>
                                <div className="flex gap-2 text-sm">
                                    <span className="bg-blue-500 text-white px-2 py-1 rounded">Türkçe</span>
                                    <span className="text-gray-500">English</span>
                                    <span className="text-gray-500">Français</span>
                                    <span className="text-gray-500">Español</span>
                                    <span className="text-gray-500">العربية</span>
                                    <span className="text-gray-500">Kurdî</span>
                                </div>
                            </div>

                            {/* Tab Menu */}
                            <div className="mb-6">
                                <div className="flex border-b border-gray-200 dark:border-gray-600">
                                    <button
                                        onClick={(): void => setActiveTab('grid')}
                                        className={`px-4 py-2 font-medium ${activeTab === 'grid'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-600 dark:text-gray-400'}`}
                                    >
                                        Kanal sayısı
                                    </button>
                                    <button
                                        onClick={(): void => setActiveTab('channels')}
                                        className={`px-4 py-2 font-medium ${activeTab === 'channels'
                                            ? 'text-blue-600 border-b-2 border-blue-600'
                                            : 'text-gray-600 dark:text-gray-400'}`}
                                    >
                                        Kanalları değiştir
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'grid' && (
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {Object.keys(gridLayouts).map((size) => (
                                            <button
                                                key={size}
                                                onClick={(): void => setGridSize(Number(size) as keyof typeof gridLayouts)}
                                                className={`px-4 py-2 rounded-lg ${gridSize === Number(size)
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'channels' && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Kanal adresi bölümüne YouTube yayın adresi uzantısını girmelisiniz.
                                    </p>
                                    <div className="space-y-4">
                                        {channels.map((channel) => (
                                            <div key={channel.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Kanal Adı
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={channel.name}
                                                        onChange={(e): void => updateChannel(channel.id, e.target.value, channel.url)}
                                                        className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                        Video ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={channel.url}
                                                        onChange={(e): void => updateChannel(channel.id, channel.name, e.target.value)}
                                                        className="w-full p-2 border rounded dark:bg-gray-600 dark:border-gray-500 dark:text-white font-mono text-sm"
                                                        placeholder="ztmY_cCtUl0"
                                                    />
                                                </div>
                                                <div className="flex items-end">
                                                    <button
                                                        onClick={(): void => removeChannel(channel.id)}
                                                        className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                                    >
                                                        🗑️ Sil
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
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
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-4"
                                        >
                                            ➕ Yeni kanal ekle
                                        </button>
                                        <button
                                            onClick={(): void => {
                                                if (typeof window !== 'undefined') {
                                                    localStorage.setItem('multiTV_channels', JSON.stringify(channels));
                                                    alert('Ayarlar kaydedildi!');
                                                }
                                            }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            💾 Ayarları kaydet
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Video Grid */}
                    <div className={`grid ${gridLayouts[gridSize]} gap-4 h-screen max-h-[80vh]`}>
                        {displayedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                                draggable
                                onDragStart={(e): void => handleDragStart(e, channel.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e): void => handleDrop(e, channel.id)}
                            >
                                <div className="bg-gray-800 text-white px-3 py-2 text-sm font-medium flex justify-between items-center">
                                    <span className="truncate">{channel.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 animate-pulse">● CANLI</span>
                                    </div>
                                </div>
                                <iframe
                                    src={getYouTubeEmbedUrl(channel.url)}
                                    title={channel.name}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                    allowFullScreen
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    loading="lazy"
                                />
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