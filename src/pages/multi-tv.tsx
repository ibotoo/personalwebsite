import { useState } from 'react';
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
    { id: '1', name: 'SÖZCÜ TV Canlı Yayını', url: 'https://www.youtube-nocookie.com/embed/ztmY_cCtUl0?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&fs=1', width: 800, height: 600, x: 50, y: 50 },
];

const gridLayouts = {
    1: 'grid-cols-1 grid-rows-1',
    4: 'grid-cols-2 grid-rows-2',
    6: 'grid-cols-3 grid-rows-2',
    9: 'grid-cols-3 grid-rows-3',
    16: 'grid-cols-4 grid-rows-4',
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<keyof typeof gridLayouts>(1);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelUrl, setNewChannelUrl] = useState('');
    const [draggedChannel, setDraggedChannel] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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
            }

            if (!videoId) return 'Yeni Kanal';

            // YouTube oembed API kullanarak başlık al
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
            const embedUrl = convertToEmbedUrl(newChannelUrl);

            const newChannel: Channel = {
                id: Date.now().toString(),
                name: title,
                url: embedUrl,
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

    const convertToEmbedUrl = (url: string): string => {
        // YouTube nocookie domain kullan (engellenme sorununu çözer)
        let embedUrl = '';

        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } else if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;
        } else if (url.includes('youtube.com/embed/')) {
            // Mevcut embed URL'ini nocookie'ye çevir
            embedUrl = url.replace('youtube.com', 'youtube-nocookie.com');
        } else {
            // Varsayılan olarak nocookie domain kullan
            embedUrl = `https://www.youtube-nocookie.com/embed/${url}`;
        }

        // Engellenme sorununu çözen parametreler ekle
        const params = new URLSearchParams({
            autoplay: '1',
            mute: '1',
            controls: '1',
            modestbranding: '1',
            rel: '0',
            fs: '1',
            enablejsapi: '1',
            origin: window.location.origin
        });

        return `${embedUrl}?${params.toString()}`;
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

    return (
        <Layout.Default seo={{ title: 'Multi TV - İbrahim SANCAR' }} background={false}>
            <div className="min-h-screen py-24 px-4">
                <div className="max-w-full mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Multi TV
                        </h1>
                        <button
                            onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            ⚙️ Ayarlar
                        </button>
                    </div>

                    {/* Hızlı Kanal Ekleme */}
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg mb-8">
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
                                {isLoading ? '⏳ Ekleniyor...' : '➕ Ekle'}
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            YouTube video linkini yapıştırın, başlık otomatik olarak çekilecek
                        </p>
                    </div>

                    {isSettingsOpen && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Multi TV Ayarlar
                            </h2>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Ekran Düzeni
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(gridLayouts).map((size) => (
                                        <button
                                            key={size}
                                            onClick={(): void => setGridSize(Number(size) as keyof typeof gridLayouts)}
                                            className={`px-4 py-2 rounded-lg ${gridSize === Number(size)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {size} Kanal
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Aktif Kanallar ({channels.length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {channels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                                            draggable
                                            onDragStart={(e): void => handleDragStart(e, channel.id)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e): void => handleDrop(e, channel.id)}
                                        >
                                            <div className="flex items-center gap-2 cursor-move">
                                                <span className="text-xl">🎥</span>
                                                <span className="text-gray-900 dark:text-white font-medium">
                                                    {channel.name}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(): void => removeChannel(channel.id)}
                                                className="text-red-500 hover:text-red-700 p-1 rounded"
                                                title="Kanalı sil"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Video Grid */}
                    <div className={`grid ${gridLayouts[gridSize]} gap-4 h-screen max-h-[80vh]`}>
                        {displayedChannels.map((channel) => (
                            <div
                                key={channel.id}
                                className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                draggable
                                onDragStart={(e): void => handleDragStart(e, channel.id)}
                                onDragOver={handleDragOver}
                                onDrop={(e): void => handleDrop(e, channel.id)}
                            >
                                <div className="bg-gray-800 text-white px-3 py-2 text-sm font-medium flex justify-between items-center">
                                    <span className="truncate">{channel.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-500 animate-pulse">● CANLI</span>
                                        <button
                                            onClick={(): void => removeChannel(channel.id)}
                                            className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Kanalı sil"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                <iframe
                                    src={channel.url}
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