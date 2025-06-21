import Image from 'next/image';
import { clsx } from 'clsx';

interface LogoProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'icon' | 'full' | 'text';
    className?: string;
    priority?: boolean;
}

const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
};

const sizePx = {
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
};

export function Logo({
    size = 'md',
    variant = 'icon',
    className,
    priority = false
}: LogoProps) {
    const logoSize = sizePx[size];

    if (variant === 'text') {
        return (
            <div className={clsx('flex items-center font-bold text-gray-900 dark:text-white', className)}>
                <span className={clsx(
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-base',
                    size === 'lg' && 'text-lg',
                    size === 'xl' && 'text-xl'
                )}>
                    İbrahim Can Sancar
                </span>
            </div>
        );
    }

    if (variant === 'full') {
        return (
            <div className={clsx('flex items-center space-x-3', className)}>
                <Image
                    src="/ibrahim-sancar-logo.png"
                    alt="İbrahim Can Sancar Logo"
                    width={logoSize}
                    height={logoSize}
                    priority={priority}
                    className={clsx(sizeClasses[size], 'rounded-full')}
                />
                <span className={clsx(
                    'font-semibold text-gray-900 dark:text-white',
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-base',
                    size === 'lg' && 'text-lg',
                    size === 'xl' && 'text-xl'
                )}>
                    İbrahim Can Sancar
                </span>
            </div>
        );
    }

    // Default: icon only
    return (
        <Image
            src="/ibrahim-sancar-logo.png"
            alt="İbrahim Can Sancar Logo"
            width={logoSize}
            height={logoSize}
            priority={priority}
            className={clsx(sizeClasses[size], 'rounded-full', className)}
        />
    );
}

// Rage Medya Logo Component
export function RageMediaLogo({
    size = 'md',
    variant = 'icon',
    className,
    priority = false
}: LogoProps) {
    const logoSize = sizePx[size];

    if (variant === 'text') {
        return (
            <div className={clsx('flex items-center font-bold text-gray-900 dark:text-white', className)}>
                <span className={clsx(
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-base',
                    size === 'lg' && 'text-lg',
                    size === 'xl' && 'text-xl'
                )}>
                    Rage Medya
                </span>
            </div>
        );
    }

    if (variant === 'full') {
        return (
            <div className={clsx('flex items-center space-x-3', className)}>
                <Image
                    src="/rage-medya-logo.png"
                    alt="Rage Medya Logo"
                    width={logoSize}
                    height={logoSize}
                    priority={priority}
                    className={clsx(sizeClasses[size], 'rounded-lg')}
                />
                <span className={clsx(
                    'font-semibold text-gray-900 dark:text-white',
                    size === 'sm' && 'text-sm',
                    size === 'md' && 'text-base',
                    size === 'lg' && 'text-lg',
                    size === 'xl' && 'text-xl'
                )}>
                    Rage Medya
                </span>
            </div>
        );
    }

    // Default: icon only
    return (
        <Image
            src="/rage-medya-logo.png"
            alt="Rage Medya Logo"
            width={logoSize}
            height={logoSize}
            priority={priority}
            className={clsx(sizeClasses[size], 'rounded-lg', className)}
        />
    );
} 