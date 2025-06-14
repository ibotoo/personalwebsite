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
    { id: '1', name: 'NTV', url: 'NTVSpor', width: 400, height: 300, x: 0, y: 0 },
    { id: '2', name: 'Habertürk', url: 'HaberturkTV', width: 400, height: 300, x: 420, y: 0 },
    { id: '3', name: 'CNN Türk', url: 'cnnturk', width: 400, height: 300, x: 0, y: 320 },
    { id: '4', name: 'TRT Haber', url: 'trthabertv', width: 400, height: 300, x: 420, y: 320 },
    { id: '5', name: 'A Haber', url: 'ahabertv', width: 400, height: 300, x: 840, y: 0 },
    { id: '6', name: 'Halk TV', url: 'HalkTV', width: 400, height: 300, x: 840, y: 320 },
    { id: '7', name: '24 TV', url: '24tv', width: 400, height: 300, x: 0, y: 640 },
    { id: '8', name: 'TGRT Haber', url: 'tgrthaber', width: 400, height: 300, x: 420, y: 640 },
    { id: '9', name: 'Bloomberg HT', url: 'bloomberght', width: 400, height: 300, x: 840, y: 640 },
];

const gridLayouts = {
    4: 'grid-cols-2 grid-rows-2',
    6: 'grid-cols-3 grid-rows-2',
    9: 'grid-cols-3 grid-rows-3',
    16: 'grid-cols-4 grid-rows-4',
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<keyof typeof gridLayouts>(4);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelUrl, setNewChannelUrl] = useState('');
    const [draggedChannel, setDraggedChannel] = useState<string | null>(null);
    const [isGridMode, setIsGridMode] = useState(true);

    const displayedChannels = channels.slice(0, gridSize);

    const addChannel = (): void => {
        if (newChannelName && newChannelUrl) {
            const newChannel: Channel = {
                id: Date.now().toString(),
                name: newChannelName,
                url: convertToEmbedUrl(newChannelUrl),
                width: 400,
                height: 300,
                x: Math.random() * 200,
                y: Math.random() * 200,
            };
            setChannels([...channels, newChannel]);
            setNewChannelName('');
            setNewChannelUrl('');
        }
    };

    const convertToEmbedUrl = (url: string): string => {
        // YouTube kanal adı ise direkt kullan
        if (!url.includes('http') && !url.includes('.')) {
            return url;
        }

        if (url.includes('youtube.com/watch?v=')) {
            const videoId = url.split('v=')[1]?.split('&')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        }
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0];
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
        }
        if (url.includes('youtube.com/channel/')) {
            const channelId = url.split('channel/')[1]?.split('/')[0];
            return channelId;
        }
        return url;
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

    const updateChannelPosition = (id: string, x: number, y: number): void => {
        setChannels(prev => prev.map(channel =>
            channel.id === id ? { ...channel, x, y } : channel
        ));
    };

    const updateChannelSize = (id: string, width: number, height: number): void => {
        setChannels(prev => prev.map(channel =>
            channel.id === id ? { ...channel, width, height } : channel
        ));
    };

    const getYouTubeEmbedUrl = (channel: Channel): string => {
        if (channel.url.startsWith('http')) {
            return channel.url;
        }
        // YouTube kanal adını kullanarak embed URL oluştur
        return `https://www.youtube.com/embed/live_stream?channel=${channel.url}&autoplay=1&mute=1`;
    };

    return (
        <Layout.Default seo={{ title: 'Multi TV - İbrahim SANCAR' }} background={false}>
            <div className="min-h-screen py-24 px-4">
                <div className="max-w-full mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                            Multi TV
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={(): void => setIsGridMode(!isGridMode)}
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                {isGridMode ? '🎯 Serbest Mod' : '📱 Grid Mod'}
                            </button>
                            <button
                                onClick={(): void => setIsSettingsOpen(!isSettingsOpen)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                ⚙️ Ayarlar
                            </button>
                        </div>
                    </div>

                    {isSettingsOpen && (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                Multi TV Ayarlar
                            </h2>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Kanal Sayısı (Grid Modunda)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Object.keys(gridLayouts).map((size) => (
                                        <button
                                            key={size}
                                            onClick={(): void => setGridSize(Number(size) as keyof typeof gridLayouts)}
                                            className={`px-3 py-1 rounded ${gridSize === Number(size)
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Yeni Kanal Ekle
                                </h3>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        placeholder="Kanal Adı"
                                        value={newChannelName}
                                        onChange={(e): void => setNewChannelName(e.target.value)}
                                        className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <input
                                        type="text"
                                        placeholder="YouTube Kanal Adı (örn: trthabertv)"
                                        value={newChannelUrl}
                                        onChange={(e): void => setNewChannelUrl(e.target.value)}
                                        className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    <button
                                        onClick={addChannel}
                                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                    >
                                        Ekle
                                    </button>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    YouTube kanal adını giriniz (örn: trthabertv, NTVSpor, HaberturkTV)
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                    Aktif Kanallar
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                    {channels.map((channel) => (
                                        <div
                                            key={channel.id}
                                            className="flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded"
                                            draggable
                                            onDragStart={(e): void => handleDragStart(e, channel.id)}
                                            onDragOver={handleDragOver}
                                            onDrop={(e): void => handleDrop(e, channel.id)}
                                        >
                                            <span className="text-gray-900 dark:text-white cursor-move">
                                                🎥 {channel.name}
                                            </span>
                                            <button
                                                onClick={(): void => removeChannel(channel.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {isGridMode ? (
                        <div className={`grid ${gridLayouts[gridSize]} gap-4 h-screen max-h-[80vh]`}>
                            {displayedChannels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className="bg-black rounded-lg overflow-hidden shadow-lg cursor-move"
                                    draggable
                                    onDragStart={(e): void => handleDragStart(e, channel.id)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e): void => handleDrop(e, channel.id)}
                                >
                                    <div className="bg-gray-800 text-white px-3 py-1 text-sm font-medium flex justify-between">
                                        <span>{channel.name}</span>
                                        <span className="text-red-500">● CANLI</span>
                                    </div>
                                    <iframe
                                        src={getYouTubeEmbedUrl(channel)}
                                        title={channel.name}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
                            {channels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className="absolute bg-black rounded-lg overflow-hidden shadow-lg resize cursor-move"
                                    style={{
                                        left: channel.x,
                                        top: channel.y,
                                        width: channel.width,
                                        height: channel.height,
                                        minWidth: '200px',
                                        minHeight: '150px',
                                    }}
                                    draggable
                                    onDragStart={(e): void => handleDragStart(e, channel.id)}
                                >
                                    <div className="bg-gray-800 text-white px-3 py-1 text-xs font-medium flex justify-between cursor-move">
                                        <span>{channel.name}</span>
                                        <div className="flex gap-2">
                                            <span className="text-red-500">● CANLI</span>
                                            <button
                                                onClick={(): void => removeChannel(channel.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                    <iframe
                                        src={getYouTubeEmbedUrl(channel)}
                                        title={channel.name}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout.Default>
    );
}