import { format, parse } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Icon } from '@iconify/react';
import fs from 'fs';
import path from 'path';
import { memo } from 'react';

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
                    className="absolute top-1 left-1/2 w-0.5 h-full -ml-px bg-gray-200 dark:bg-gray-600"
                />
            )}

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 px-3 py-3 sm:py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg hover:border-primary-500 dark:hover:border-primary-500 transition duration-300 ease-in-out">
                <div className="relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-500 bg-opacity-15 mx-auto sm:mx-2 rounded-full shadow-lg">
                    <Icon
                        aria-hidden="true"
                        className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500"
                        icon={event.icon}
                    />
                </div>

                <div className="min-w-0 flex-1 px-2 sm:px-4 text-center sm:text-left">
                    <h1 className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between mb-2 text-gray-500 dark:text-white text-base sm:text-lg tracking-tight font-bold">
                        <span>{event.title}</span>
                        <span className="flex-1 hidden sm:block" />
                        <Pill.Date className="mt-2 sm:mt-0 mx-auto sm:mx-0" small={true}>
                            {format(event.date, 'PPP', { locale: tr })}
                        </Pill.Date>
                    </h1>

                    <p className="my-2 sm:my-2 text-gray-300 text-sm sm:text-base">
                        {event.description}
                    </p>

                    {event.link && (
                        <Button.Outline
                            className="mt-2 sm:mt-2 mx-auto sm:mx-0 block sm:inline-flex"
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

    return (
        <Layout.Default seo={{ title: 'İbrahim Can Sancar ─ Zaman Çizelgesi' }}>
            <div className="flex flex-grow min-h-screen pt-16 pb-12">
                <div className="flex-grow flex flex-col justify-center max-w-xs sm:max-w-sm md:max-w-2xl w-full mx-auto px-3 sm:px-6 md:px-8">
                    <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 sm:mb-8 md:mb-12">Zaman Çizelgem</h1>
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