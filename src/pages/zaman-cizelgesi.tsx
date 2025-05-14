import { format, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import fs from 'fs';
import path from 'path';
import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Pill } from '~/components';
import { Layout } from '~/layouts';

import type { GetStaticProps } from 'next';

import type { Timeline, TimelineEvent } from '~/types';

interface TimelineProps {
    timeline?: Timeline;
}

interface TimelineItemProps {
    event: TimelineEvent & { date: Date };
    isLast: boolean;
}

// Zaman çizelgesi öğesi için ayrı bir bileşen oluşturuyoruz
const TimelineItem = memo(({ event, isLast }: TimelineItemProps) => (
    <li className="my-2" key={event.title}>
        <div className="relative pb-5 sm:pb-8">
            {!isLast && (
                <span
                    aria-hidden="true"
                    className="absolute top-1 left-1/2 w-0.5 h-full -ml-px bg-gray-200 dark:bg-gray-600 animate-pulse"
                />
            )}

            <div className="relative flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 px-6 py-4 sm:py-4 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 animate-fadeIn">
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 bg-opacity-15 mx-auto sm:mx-0 rounded-full shadow-lg animate-bounce">
                    <Icon
                        aria-hidden="true"
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500"
                        icon={event.icon}
                    />
                </div>

                <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                    <h1 className="flex flex-col sm:flex-row items-center justify-between w-full mb-2 text-gray-500 dark:text-white text-base sm:text-lg tracking-tight font-bold">
                        <span>{event.title}</span>
                        <Pill.Date className="mt-2 sm:mt-0 sm:ml-4">
                            {format(event.date, 'PPP', { locale: tr })}
                        </Pill.Date>
                    </h1>

                    <p className="my-2 text-gray-300 text-sm sm:text-base text-center sm:text-left">
                        {event.description}
                    </p>

                    {event.link && (
                        <Button.Outline
                            className="mt-2 mx-auto sm:mx-0"
                            href={event.link.url}
                            rel="noopener noreferrer"
                            small={true}
                            target="_blank">
                            {event.link.text}
                            <Icon
                                aria-hidden="true"
                                className="ml-2 sm:ml-3"
                                icon="feather:external-link"
                            />
                        </Button.Outline>
                    )}
                </div>
            </div>
        </div>
    </li>
));

TimelineItem.displayName = 'TimelineItem';

export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
    // JSON dosyasını fs modülü ile okuyoruz
    const dataFilePath = path.join(process.cwd(), 'src/data/timeline.json');
    const jsonData = fs.readFileSync(dataFilePath, 'utf8');
    const rawTimeline = JSON.parse(jsonData);

    // Sıralama değiştirildi: eskiden yeniye (artan tarih sırası)
    const timeline = (rawTimeline as Array<TimelineEvent>).sort(
        (a, b) => +new Date(a.date) - +new Date(b.date),
    );

    return {
        props: {
            timeline,
        },
    };
};

export default function TimelinePage({ timeline: rawTimeline }: TimelineProps): JSX.Element {
    const timeline = rawTimeline.map((event) => {
        // Son giriş için güncel tarihi kullan
        if (event.date === "current") {
            const today = new Date();
            return {
                ...event,
                date: today
            };
        }

        // Diğer girişler için normal tarihi kullan
        return {
            ...event,
            // Not: Safari iOS'ta standart `new Date()` parsing çalışmadığı için özel parser kullanıyoruz
            date: parse(event.date.toString(), 'MM-dd-yyyy', new Date())
        };
    });

    const router = useRouter();

    return (
        <Layout.Default seo={{ title: 'İbrahim Can Sancar ─ Zaman Çizelgesi' }}>
            <div className="flex flex-grow min-h-screen pt-16 pb-12">
                <div className="flex-grow flex flex-col justify-center max-w-xs sm:max-w-sm md:max-w-2xl w-full mx-auto px-3 sm:px-6 md:px-8">
                    <button
                        onClick={() => router.back()}
                        className="sm:hidden fixed top-4 left-4 z-10 flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                        <Icon icon="feather:arrow-left" className="w-5 h-5 text-primary-500" />
                    </button>
                    <div className="flex items-center justify-center mb-4 sm:mb-8 md:mb-12">
                        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">Zaman Çizelgem</h1>
                    </div>
                    <ul className="-mb-8 w-full" role="list">
                        {timeline.map((event, index) => (
                            <TimelineItem
                                key={event.title}
                                event={event}
                                isLast={index === timeline.length - 1}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout.Default>
    );
} 