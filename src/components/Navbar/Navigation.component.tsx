import { useRouter } from 'next/router';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';

interface NavigationButtonsProps {
    className?: string;
}

export function NavigationButtons({ className = '' }: NavigationButtonsProps): JSX.Element {
    const router = useRouter();
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll durumunu izle (sadece mobilde)
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 100;
            setShowScrollTop(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleBackClick = () => {
        if (window.history.length > 1) {
            router.back();
        } else {
            router.push('/');
        }
    };

    const handleMenuClick = () => {
        // Ana sayfaya git
        router.push('/');
    };

    const buttons = [
        {
            icon: 'feather:arrow-left',
            onClick: handleBackClick,
            label: 'Geri',
            ariaLabel: 'Önceki sayfaya dön'
        },
        {
            icon: 'feather:home',
            onClick: handleMenuClick,
            label: 'Ana Sayfa',
            ariaLabel: 'Ana sayfaya git'
        }
    ];

    return (
        <>
            {/* Sol üst navigasyon butonları */}
            <div className={`fixed top-4 left-4 z-50 flex space-x-2 ${className}`}>
                {buttons.map((button, index) => (
                    <div key={index} className="relative group">
                        <button
                            onClick={button.onClick}
                            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white rounded-lg shadow-md hover:shadow-lg backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 hover:border-gray-300/70 dark:hover:border-gray-500/70 transition-all duration-200 ease-out transform hover:scale-105"
                            aria-label={button.ariaLabel}
                        >
                            <Icon icon={button.icon} className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                            {button.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Scroll to top butonu (sadece mobilde, scroll yapılınca görünür) */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 ease-out transform hover:scale-110 lg:hidden"
                    aria-label="Yukarı dön"
                >
                    <Icon icon="feather:arrow-up" className="w-5 h-5" />
                </button>
            )}
        </>
    );
} 