declare global {
    interface Window {
        gtag: (command: string, action: string, params?: Record<string, unknown>) => void;
    }
}

export * from './common';
export * from './events';
export * from './list';
export * from './navigation';
export * from './state';
export * from './theme';
export * from './timeline';
