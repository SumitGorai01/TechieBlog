import React, { useState } from "react";

const Input = ({ label, className, value, ...props }) => (
  <div className="relative group">
    <input
      {...props}
      value={value}
      className={`${className}`}
    />
    <label className={`absolute left-4 text-sm font-medium transition-all duration-200 pointer-events-none
      ${value ? '-top-2 left-3 text-xs text-orange-500 bg-white dark:bg-slate-900 px-1' : 'top-4 text-slate-400'}
      group-focus-within:-top-2 group-focus-within:left-3 group-focus-within:text-xs group-focus-within:text-orange-500 group-focus-within:bg-white group-focus-within:px-1
      dark:group-focus-within:bg-slate-900`}>
      {label}
    </label>
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button className={className} {...props}>
    {children}
  </button>
);

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setConfirmation("Please fill in all fields before sending.");
      setTimeout(() => setConfirmation(""), 4000);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setConfirmation("Your message has been sent successfully!");
      setIsSubmitting(false);
      setTimeout(() => setConfirmation(""), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-16 px-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100/20 dark:bg-orange-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-orange-600 dark:from-white dark:via-slate-200 dark:to-orange-400 bg-clip-text text-transparent mb-4">
            Let's create something amazing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear about your project and discuss how we can bring your vision to life.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-500/5 dark:shadow-orange-500/10 border border-white/20 dark:border-slate-700/50 overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            
            <div className="lg:col-span-2 p-8 lg:p-12 bg-gradient-to-br from-orange-500/5 to-orange-600/10 dark:from-orange-900/20 dark:to-orange-800/20">
              <div className="space-y-8">
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email us</h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">Drop us a line anytime</p>
                      <a href="mailto:info@techieblog.com" className="text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 font-medium transition-colors">
                       info@techieblog.com
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Follow us</h3>
                  <div className="flex gap-3">
                    {[
                      { name: 'X', href: 'https://x.com', icon: 'M18.244 2H21.5l-7.68 8.77L22 22h-7.8l-5.54-7.3L2.98 22H-.5l8.34-9.54L0 2h7.9l5.05 6.73L18.244 2z' },
                      { name: 'GitHub', href: 'https://github.com/SumitGorai01/TechieBlog', icon: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' },
                      { name: 'LinkedIn', href: 'https://www.linkedin.com', icon: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z' },
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className="w-11 h-11 bg-white/50 dark:bg-slate-800/50 hover:bg-orange-100 dark:hover:bg-orange-900/30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                      >
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-orange-600 dark:text-slate-400 dark:group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-white/50 dark:bg-slate-800/30 rounded-2xl p-6 border border-orange-100/50 dark:border-orange-900/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Quick Response</h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    We typically respond within 24 hours on business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    label="Name"
                    className="w-full px-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    label="Email"
                    className="w-full px-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                    required
                  />
                </div>

                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  label="Subject"
                  className="w-full px-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
                  required
                />

                <div className="relative group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full px-4 py-4 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200 resize-none"
                    required
                  />
                  <label className={`absolute left-4 text-sm font-medium transition-all duration-200 pointer-events-none
                    ${formData.message ? '-top-2 left-3 text-xs text-orange-500 bg-white dark:bg-slate-900 px-1' : 'top-4 text-slate-400'}
                    group-focus-within:-top-2 group-focus-within:left-3 group-focus-within:text-xs group-focus-within:text-orange-500 group-focus-within:bg-white group-focus-within:px-1
                    dark:group-focus-within:bg-slate-900`}>
                    Message
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </Button>

                {confirmation && (
                  <div className={`text-center p-4 rounded-2xl font-medium transition-all duration-300 ${
                    confirmation.includes('success') 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
                      : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                  }`}>
                    {confirmation}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;