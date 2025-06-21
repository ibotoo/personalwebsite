import { useEffect } from 'react';
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

// Core Web Vitals tracking component
export default function PerformanceOptimizer() {
    useEffect(() => {
        // Web Vitals tracking for performance monitoring
        function sendToAnalytics(metric: any) {
            // Send to Google Analytics 4
            if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', metric.name, {
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                    non_interaction: true,
                });
            }

            // Send to Search Console (if available)
            if (typeof window !== 'undefined' && (window as any).navigator?.sendBeacon) {
                const body = JSON.stringify({
                    name: metric.name,
                    value: metric.value,
                    id: metric.id,
                    url: window.location.href,
                    timestamp: Date.now(),
                });

                try {
                    window.navigator.sendBeacon('/api/web-vitals', body);
                } catch (error) {
                    console.log('Web Vitals tracking error:', error);
                }
            }

            // Console logging for development
            if (process.env.NODE_ENV === 'development') {
                console.log(`[Web Vitals] ${metric.name}:`, {
                    value: metric.value,
                    rating: metric.rating,
                    delta: metric.delta,
                    id: metric.id,
                });
            }
        }

        // Track all Core Web Vitals
        getCLS(sendToAnalytics);
        getFCP(sendToAnalytics);
        getFID(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);

        // Performance optimization hints
        if (typeof window !== 'undefined') {
            // Preload critical resources
            const criticalResources = [
                '/favicon.png',
                'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            ];

            criticalResources.forEach(resource => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = resource;
                link.as = resource.includes('fonts') ? 'style' : 'image';
                if (resource.includes('fonts')) {
                    link.crossOrigin = 'anonymous';
                }
                document.head.appendChild(link);
            });

            // Prefetch next likely pages
            const prefetchPages = ['/zaman-cizelgesi', '/multi-tv'];
            prefetchPages.forEach(page => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = page;
                document.head.appendChild(link);
            });
        }
    }, []);

    return null; // This component doesn't render anything
}

// Custom hook for performance monitoring
export function usePerformanceMonitoring() {
    useEffect(() => {
        // Monitor long tasks
        if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.duration > 50) {
                            console.warn('Long task detected:', {
                                duration: entry.duration,
                                startTime: entry.startTime,
                            });
                        }
                    }
                });
                observer.observe({ entryTypes: ['longtask'] });

                return () => observer.disconnect();
            } catch (error) {
                console.log('Performance observer not supported:', error);
            }
        }
    }, []);
}

// Component for lazy loading optimization
export function LazyLoadOptimizer({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Intersection Observer for lazy loading
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');

            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        img.src = img.dataset.src || '';
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));

            return () => imageObserver.disconnect();
        }
    }, []);

    return <>{children}</>;
}

// Critical CSS loader
export function CriticalCSSLoader() {
    useEffect(() => {
        // Load non-critical CSS asynchronously
        const nonCriticalCSS = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function () {
                if (link.media) {
                    link.media = 'all';
                }
            };
            document.head.appendChild(link);
        });
    }, []);

    return null;
} 