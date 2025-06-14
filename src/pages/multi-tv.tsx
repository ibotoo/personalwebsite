import { useState } from 'react';
import { Layout } from '~/layouts';
import { Animate } from '~/components';

interface Channel {
    id: string;
    name: string;
    url: string;
}

const defaultChannels: Array<Channel> = [
    { id: '1', name: 'NTV', url: 'https://www.youtube.com/embed/live_stream?channel=UChKJJ-dpktKbP3Y-Yq2AE6g&autoplay=1&mute=1' },
    { id: '2', name: 'Habertürk', url: 'https://www.youtube.com/embed/live_stream?channel=UCGsXmb2FbuYJ7WFIGx3U8XQ&autoplay=1&mute=1' },
    { id: '3', name: 'Haber Global', url: 'https://www.youtube.com/embed/live_stream?channel=UC1LTnfTnrKBKPeBAT9cKx7Q&autoplay=1&mute=1' },
    { id: '4', name: 'TRT Haber', url: 'https://www.youtube.com/embed/live_stream?channel=UCdWn5LBvhidmYMM_xkN5ApQ&autoplay=1&mute=1' },
    { id: '5', name: 'TV 100', url: 'https://www.youtube.com/embed/live_stream?channel=UCTR-xAjTEy8sKHGWQ33DgmA&autoplay=1&mute=1' },
    { id: '6', name: 'Halk TV', url: 'https://www.youtube.com/embed/live_stream?channel=UC0LSUfvD4B03lCGCUdKu_CA&autoplay=1&mute=1' },
    { id: '7', name: '24 TV', url: 'https://www.youtube.com/embed/live_stream?channel=UCo01NvHlxCdqI0uSWjpFOIg&autoplay=1&mute=1' },
    { id: '8', name: 'TGRT Haber', url: 'https://www.youtube.com/embed/live_stream?channel=UC9EV_fLLvGTkYDlGvGKRdcQ&autoplay=1&mute=1' },
    { id: '9', name: 'Bloomberg HT', url: 'https://www.youtube.com/embed/live_stream?channel=UC9HnhXhq9GqxOjU5ZpYMuwg&autoplay=1&mute=1' },
];

const gridLayouts = {
    4: 'grid-cols-2 grid-rows-2',
    6: 'grid-cols-3 grid-rows-2',
    9: 'grid-cols-3 grid-rows-3',
    10: 'grid-cols-4 grid-rows-3',
    13: 'grid-cols-4 grid-rows-4',
    16: 'grid-cols-4 grid-rows-4',
};

export default function MultiTVPage(): JSX.Element {
    const [channels, setChannels] = useState<Array<Channel>>(defaultChannels);
    const [gridSize, setGridSize] = useState<keyof typeof gridLayouts>(4);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [newChannelName, setNewChannelName] = useState('');
    const [newChannelUrl, setNewChannelUrl] = useState('');

    const displayedChannels = channels.slice(0, gridSize);

    const addChannel = (): void => {
        if (newChannelName && newChannelUrl) {
            const newChannel: Channel = {
                id: Date.now().toString(),
                name: newChannelName,
                url: convertToEmbedUrl(newChannelUrl),
            };
            setChannels([...channels, newChannel]);
            setNewChannelName('');
            setNewChannelUrl('');
        }
    };

    const convertToEmbedUrl = (url: string): string => {
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
            return `https://www.youtube.com/embed/live_stream?channel=${channelId}&autoplay=1&mute=1`;
        }
        return url.includes('embed') ? url : `https://www.youtube.com/embed/${url}?autoplay=1&mute=1`;
    };

    const removeChannel = (id: string): void => {
        setChannels(channels.filter(channel => channel.id !== id));
    };

    return (
        <Layout.Default seo={{ title: 'Multi TV - İbrahim SANCAR' }} background={false}>
            <div className="min-h-screen py-24 px-4">
                <Animate
                    as="div"
                    animation={{
                        opacity: [0, 1],
                        scale: [0.75, 1],
                    }}
                >
                    <div className="max-w-7xl mx-auto">
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

                        {isSettingsOpen && (
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                                    Multi TV Ayarlar
                                </h2>

                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                                        Kanal Sayısı
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
                                            placeholder="YouTube URL veya Kanal ID"
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
                                        YouTube video linkini, kanal linkini veya video ID&apos;sini girebilirsiniz
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
                                            >
                                                <span className="text-gray-900 dark:text-white">{channel.name}</span>
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

                        <div
                            className={`grid ${gridLayouts[gridSize]} gap-4 h-screen max-h-[80vh]`}
                        >
                            {displayedChannels.map((channel) => (
                                <div
                                    key={channel.id}
                                    className="bg-black rounded-lg overflow-hidden shadow-lg"
                                >
                                    <div className="bg-gray-800 text-white px-3 py-1 text-sm font-medium flex justify-between">
                                        <span>{channel.name}</span>
                                        <span className="text-red-500">● CANLI</span>
                                    </div>
                                    <iframe
                                        src={channel.url}
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
                    </div>
                </Animate>
            </div>
        </Layout.Default>
    );
} 