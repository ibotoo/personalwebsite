import { useState } from 'react';
import { Icon } from '@iconify/react';
import { NextSeo } from 'next-seo';

import { Layout } from '~/layouts';
import { useSeoProps } from '~/lib';
import { Animate, Button } from '~/components';

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

    const seoProps = useSeoProps({
        title: 'İletişim - İbrahim Can Sancar | Rage Medya',
        description: 'İbrahim Can Sancar ile iletişime geçin. Sosyal medya pazarlama, Shopify e-ticaret danışmanlığı ve dijital pazarlama hizmetleri için doğrudan ulaşın.',
        additionalMetaTags: [
            {
                name: 'keywords',
                content: 'iletişim, contact, İbrahim Sancar iletişim, Rage Medya iletişim, sosyal medya uzmanı iletişim, shopify danışmanı iletişim, e-ticaret uzmanı iletişim, dijital pazarlama iletişim, istanbul sosyal medya ajansı, antalya e-ticaret danışmanı'
            }
        ],
    });

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
            <Layout.Default>
                <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">

                        {/* Header */}
                        <Animate
                            as="div"
                            animation={{
                                opacity: [0, 1],
                                y: [50, 0],
                            }}
                            className="text-center mb-12">
                            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                İletişim
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Sosyal medya pazarlama, e-ticaret danışmanlığı ve dijital pazarlama konularında
                                benimle iletişime geçebilirsiniz. Size en kısa sürede dönüş yapacağım.
                            </p>
                        </Animate>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                            {/* Contact Info */}
                            <Animate
                                animation={{
                                    opacity: [0, 1],
                                    x: [-50, 0],
                                }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8">

                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                        İletişim Bilgileri
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:mail" className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <a href="mailto:mail@ibrahimsancar.com" className="hover:text-blue-500 transition-colors">
                                                    mail@ibrahimsancar.com
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:mail" className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <a href="mailto:iletisim@ibrahimsancar.com" className="hover:text-blue-500 transition-colors">
                                                    iletisim@ibrahimsancar.com
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="feather:instagram" className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
                                                <a href="https://instagram.com/ibrahimsancar0" target="_blank" rel="noopener noreferrer"
                                                    className="hover:text-blue-500 transition-colors">
                                                    @ibrahimsancar0
                                                </a>
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Icon icon="simple-icons:x" className="w-5 h-5 text-blue-500" />
                                            <span className="text-gray-700 dark:text-gray-300">
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
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                        Hizmetlerim
                                    </h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-4 h-4 text-green-500" />
                                            <span>Sosyal Medya Pazarlama</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-4 h-4 text-green-500" />
                                            <span>Shopify Mağaza Kurulumu</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-4 h-4 text-green-500" />
                                            <span>E-Ticaret Danışmanlığı</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-4 h-4 text-green-500" />
                                            <span>Instagram & YouTube Marketing</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Icon icon="feather:check" className="w-4 h-4 text-green-500" />
                                            <span>Dijital Strateji Geliştirme</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Company Info */}
                                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Rage Medya
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                                        2021 yılında kurduğum Rage Medya ile sosyal medya pazarlama ve e-ticaret
                                        alanında yüzlerce başarılı proje gerçekleştirdim. Şirketinizin dijital
                                        dönüşümünde size yardımcı olmaktan mutluluk duyarım.
                                    </p>
                                </div>
                            </Animate>

                            {/* Contact Form */}
                            <Animate
                                animation={{
                                    opacity: [0, 1],
                                    x: [50, 0],
                                }}
                                transition={{ delay: 0.4 }}
                                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">

                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                                    Mesaj Gönder
                                </h2>

                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Icon icon="feather:check-circle" className="w-5 h-5 text-green-500" />
                                            <span className="text-green-700 dark:text-green-300">{submitMessage}</span>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <div className="flex items-center space-x-2">
                                            <Icon icon="feather:x-circle" className="w-5 h-5 text-red-500" />
                                            <span className="text-red-700 dark:text-red-300">{submitMessage}</span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Ad Soyad *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Adınız ve soyadınız"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                E-posta *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="ornek@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="+90 555 123 4567"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Şirket
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Şirket adınız"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            İlgilendiğiniz Hizmet
                                        </label>
                                        <select
                                            id="service"
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                            <option value="">Hizmet seçin</option>
                                            {SERVICES.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Konu *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Mesajınızın konusu"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Mesaj *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                                            placeholder="Mesajınızı buraya yazın..."
                                        />
                                    </div>

                                    <Button.Outline
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full">
                                        {isSubmitting ? (
                                            <>
                                                <Icon icon="feather:loader" className="mr-2 animate-spin" />
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                <Icon icon="feather:send" className="mr-2" />
                                                Mesaj Gönder
                                            </>
                                        )}
                                    </Button.Outline>

                                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                        * ile işaretli alanlar zorunludur. Mesajınız
                                        <span className="font-medium"> mail@ibrahimsancar.com</span> ve
                                        <span className="font-medium"> iletisim@ibrahimsancar.com</span> adreslerine gönderilecektir.
                                    </p>
                                </form>
                            </Animate>
                        </div>
                    </div>
                </div>
            </Layout.Default>
        </>
    );
} 