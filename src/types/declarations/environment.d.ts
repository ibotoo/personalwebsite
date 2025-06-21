// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace NodeJS {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface ProcessEnv extends NodeJS.ProcessEnv {
		/**
		 * Resend API Key
		 *
		 * @description API key for Resend email service
		 */
		RESEND_API_KEY: string;

		/**
		 * From Email Address
		 *
		 * @description Email address to send from
		 */
		FROM_EMAIL: string;

		/**
		 * To Email Addresses
		 *
		 * @description Comma-separated list of email addresses to send to
		 */
		TO_EMAILS: string;

		/**
		 * Site URL
		 *
		 * @description Base URL of the website
		 */
		NEXT_PUBLIC_SITE_URL: string;
	}
}
