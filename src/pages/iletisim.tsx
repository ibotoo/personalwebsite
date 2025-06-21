import { useState } from 'react';
import { Icon } from '@iconify/react';
import { NextSeo } from 'next-seo';

import { Layout } from '~/layouts';
import { Button, Navbar } from '~/components';

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    service: string;
    subject: string;
    message: string;
}

const SERVICES = [
    'Sosyal Medya Pazarlama',
    'Shopify Mağaza Kurulumu',
    'E-Ticaret Danışmanlığı',
    'Instagram Reklam Yönetimi',
    'YouTube Marketing',
    'Influencer Marketing',
    'Dijital Strateji Geliştirme',
    'Marka Yönetimi',
    'Diğer'
];

export default function ContactPage(): JSX.Element {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [submitMessage, setSubmitMessage] = useState('');

    const seoProps = {
        title: 'İletişim - İbrahim Can Sancar | Rage Medya',
        description: 'İbrahim Can Sancar ile iletişime geçin. Sosyal medya pazarlama, Shopify e-ticaret danışmanlığı ve dijital pazarlama hizmetleri için doğrudan ulaşın.',
        canonical: 'https://ibrahimsancar.com/iletisim',
        openGraph: {
            type: 'website',
            locale: 'tr_TR',
            url: 'https://ibrahimsancar.com/iletisim',
            site_name: 'İbrahim Can Sancar',
            title: 'İletişim - İbrahim Can Sancar | Rage Medya',
            description: 'İbrahim Can Sancar ile iletişime geçin. Sosyal medya pazarlama, Shopify e-ticaret danışmanlığı ve dijital pazarlama hizmetleri için doğrudan ulaşın.',
            images: [
                {
                    url: 'https://ibrahimsancar.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'İbrahim Can Sancar - Girişimci ve E-Ticaret Uzmanı',
                },
            ],
        },
        additionalMetaTags: [
            {
                name: 'keywords',
                content: 'iletişim, contact, İbrahim Sancar iletişim, Rage Medya iletişim, sosyal medya uzmanı iletişim, shopify danışmanı iletişim, e-ticaret uzmanı iletişim, dijital pazarlama iletişim, istanbul sosyal medya ajansı, antalya e-ticaret danışmanı'
            }
        ],
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSubmitStatus('success');
                setSubmitMessage(result.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    company: '',
                    service: '',
                    subject: '',
                    message: ''
                });
            } else {
                setSubmitStatus('error');
                setSubmitMessage(result.error || 'Bir hata oluştu');
            }
        } catch (error) {
            setSubmitStatus('error');
            setSubmitMessage('Bağlantı hatası oluştu. Lütfen tekrar deneyin.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <NextSeo {...seoProps} />
            <Navbar.NavigationButtons />
            <Layout.Default background={true}>
                <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 lg:py-8">
                    <div className="max-w-6xl w-full">

                        {/* Header */}
                        <div className="text-center mb-6 lg:mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                                İletişim
                            </h1>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Sosyal medya pazarlama, e-ticaret danışmanlığı ve dijital pazarlama konularında
                                benimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağım.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">

                            {/* Contact Info - Sol taraf (2 kolon) */}
                            <div className="lg:col-span-2 space-y-6">

                                <div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        İletişim Bilgileri
                                    </h2>

                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:mail" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                <a href="mailto:mail@ibrahimsancar.com" className="hover:text-blue-500 transition-colors">
                                                    mail@ibrahimsancar.com
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:mail" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                <a href="mailto:iletisim@ibrahimsancar.com" className="hover:text-blue-500 transition-colors">
                                                    iletisim@ibrahimsancar.com
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:instagram" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                <a href="https://instagram.com/ibrahimsancar0" target="_blank" rel="noopener noreferrer"
                                                    className="hover:text-blue-500 transition-colors">
                                                    @ibrahimsancar0
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="simple-icons:x" className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                                                <a href="https://x.com/ibrahimsancar0" target="_blank" rel="noopener noreferrer"
                                                    className="hover:text-blue-500 transition-colors">
                                                    @ibrahimsancar0
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Services */}
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Hizmetlerim
                                    </h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>Sosyal Medya Pazarlama</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>Shopify Mağaza Kurulumu</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>E-Ticaret Danışmanlığı</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>Instagram & YouTube Marketing</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-3 h-3 text-green-500 flex-shrink-0" />
                                            <span>Dijital Strateji Geliştirme</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Company Info */}
                                <div className="bg-gray-50/80 dark:bg-gray-800/80 p-4 rounded-lg backdrop-blur-sm">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                        Rage Medya
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                                        2021 yılında kurduğum Rage Medya ile sosyal medya pazarlama ve e-ticaret
                                        alanında yüzlerce başarılı proje gerçekleştirdim. Şirketinizin dijital
                                        dönüşümünde size yardımcı olmaktan mutluluk duyarım.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form - Sağ taraf (3 kolon) */}
                            <div className="lg:col-span-3">
                                <div className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-lg shadow-lg backdrop-blur-sm h-full">

                                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Mesaj Gönder
                                    </h2>

                                    {submitStatus === 'success' && (
                                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <Icon icon="feather:check-circle" className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                <span className="text-green-700 dark:text-green-300 text-sm sm:text-base">{submitMessage}</span>
                                            </div>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                            <div className="flex items-center space-x-2">
                                                <Icon icon="feather:alert-circle" className="w-5 h-5 text-red-500 flex-shrink-0" />
                                                <span className="text-red-700 dark:text-red-300 text-sm sm:text-base">{submitMessage}</span>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    Ad Soyad *
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                                    placeholder="Adınız ve soyadınız"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                    E-posta *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                                    placeholder="ornek@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                                placeholder="+90 (555) 123 45 67"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Konu *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                            >
                                                <option value="">Konu seçiniz</option>
                                                <option value="sosyal-medya">Sosyal Medya Pazarlama</option>
                                                <option value="shopify">Shopify Mağaza Kurulumu</option>
                                                <option value="e-ticaret">E-Ticaret Danışmanlığı</option>
                                                <option value="instagram">Instagram Marketing</option>
                                                <option value="youtube">YouTube Marketing</option>
                                                <option value="strateji">Dijital Strateji</option>
                                                <option value="diger">Diğer</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                                Mesaj *
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={4}
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors resize-none"
                                                placeholder="Projeniz hakkında detayları paylaşın..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Icon icon="feather:loader" className="w-4 h-4 animate-spin" />
                                                    <span>Gönderiliyor...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Icon icon="feather:send" className="w-4 h-4" />
                                                    <span>Mesaj Gönder</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout.Default>
        </>
    );
} 