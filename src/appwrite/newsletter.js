import emailjs from '@emailjs/browser';

export class NewsletterService {
    // Simple in-memory storage for demo (in production, you'd use a proper backend)
    constructor() {
        this.subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    }

    async subscribeToNewsletter(email) {
        try {
            // Check if email already exists in localStorage
            const existingSubscriber = this.subscribers.find(sub => sub.email === email);

            if (existingSubscriber) {
                throw new Error("This email is already subscribed to our newsletter!");
            }

            // Add to local storage
            const subscription = {
                email,
                subscribedAt: new Date().toISOString(),
                isActive: true
            };

            this.subscribers.push(subscription);
            localStorage.setItem('newsletter_subscribers', JSON.stringify(this.subscribers));

            // Send confirmation email
            await this.sendConfirmationEmail(email);

            return subscription;
        } catch (error) {
            console.error("NewsletterService :: subscribeToNewsletter :: error", error);
            throw error;
        }
    }

    async sendConfirmationEmail(email) {
        try {
            const templateParams = {
                to_email: email,
                to_name: email.split('@')[0], // Use part before @ as name
                from_name: "TechieBlog Team",
                message: `Welcome to TechieBlog! 🎉

Thank you for subscribing to our newsletter. You're now part of our community of tech enthusiasts!

Here's what you can expect:
• Weekly deep dives into cutting-edge technology
• Exclusive content and insights
• Early access to new articles
• Zero spam - we respect your inbox

Stay tuned for amazing content coming your way!

Best regards,
The TechieBlog Team

---
If you didn't subscribe to this newsletter, please ignore this email.`
            };

            const result = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID_NEWSLETTER,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID_NEWSLETTER,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY_NEWSLETTER
            );

            console.log('Newsletter confirmation email sent successfully:', result.text);
            return result;
        } catch (error) {
            console.error('Error sending newsletter confirmation email:', error);
            throw new Error('Failed to send confirmation email. Please try again.');
        }
    }

    async unsubscribe(email) {
        try {
            const subscriberIndex = this.subscribers.findIndex(sub => sub.email === email);

            if (subscriberIndex === -1) {
                throw new Error("Email not found in our newsletter list.");
            }

            // Update subscription status instead of deleting
            this.subscribers[subscriberIndex].isActive = false;
            this.subscribers[subscriberIndex].unsubscribedAt = new Date().toISOString();

            localStorage.setItem('newsletter_subscribers', JSON.stringify(this.subscribers));

            return this.subscribers[subscriberIndex];
        } catch (error) {
            console.error("NewsletterService :: unsubscribe :: error", error);
            throw error;
        }
    }

    async getSubscribers() {
        try {
            return this.subscribers.filter(sub => sub.isActive);
        } catch (error) {
            console.error("NewsletterService :: getSubscribers :: error", error);
            return [];
        }
    }
}

const newsletterService = new NewsletterService();
export default newsletterService;
