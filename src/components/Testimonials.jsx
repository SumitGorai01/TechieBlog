import React from "react";
import { Quote, Star, Users, Award, TrendingUp } from "lucide-react";
import ContributorsLink from "../components/contributors/contributorsLink.jsx";
import { Link } from "react-router-dom";
import Counter from "./Counter.jsx";

const testimonials = [
  {
    id: 1,
    name: "Sumit Gorai",
    role: "Project Admin",
    content:
      "TechieBlog has become my go-to source for staying updated with the latest tech trends. The articles are well-researched and easy to understand.",
    rating: 5,
    image: "https://avatars.githubusercontent.com/u/106994512?v=4",
    verified: true,
    readTime: "Daily Reader",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Senior Developer",
    content:
      "What I love most about TechieBlog is the depth of technical content. It's perfect for both beginners and experienced developers.",
    rating: 5,
    image:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
    verified: true,
    readTime: "Weekly Reader",
  },
  {
    id: 3,
    name: "Meet the Contributors",
    role: "Meet the brilliant minds who brought this project to life!",
    content: (
      <Link to="/contributors" className="block">
        <ContributorsLink classes="w-16 h-16" />
      </Link>
    ),
    rating: 5,
    image:
      "https://i.fbcd.co/products/resized/resized-750-500/l014e-21-e05-mainpreview-bf38f61424a9008541dde17dd5ec374266c8a8602da2c55a92e4874ac7bfdf8a.jpg",
    verified: true,
    readTime: "Community",
  },
];

const stats = [
  { icon: Users, value: "50",mark:"K+", label: "Active Readers" },
  { icon: Star, value: "4.9",mark:"+", label: "Average Rating" },
  { icon: Award, value: "500",mark:null, label: "Articles Published" },
  { icon: TrendingUp, value: "98",mark:"%", label: "Satisfaction Rate" },
];

const Testimonials = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-black dark:to-gray-800">
      <div className="absolute inset-0">
        <div className="absolute top-20 -left-10 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 -right-10 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-2xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-orange-200 dark:border-white/20 rounded-full text-sm text-gray-700 dark:text-gray-200">
            <Star className="w-4 h-4 text-orange-500 mr-2" />
            Trusted by Developers Worldwide
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-red-600 dark:from-white dark:via-orange-200 dark:to-red-200 bg-clip-text text-transparent">
            What Our Community Says
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join thousands of tech enthusiasts who trust TechieBlog for their
            daily dose of
            <span className="text-transparent bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text font-semibold">
              {" "}
              cutting-edge insights
            </span>
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 dark:from-orange-500/10 dark:to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    <Counter target={stat.value} suffix={stat.mark} duration={10} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative cursor-pointer"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => {
                if (testimonial.id === 3) {
                  window.open("/contributors", "_blank"); // new tab
                }
              }}
            >
              <div className="relative h-full p-8 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200 dark:border-white/20 rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 dark:from-orange-500/10 dark:to-red-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <div className="relative">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-gray-700 shadow-lg"
                      />
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        {testimonial.role}
                      </p>
                      <div className="inline-flex items-center px-2 py-1 bg-orange-100 dark:bg-orange-900/30 rounded-full text-xs text-orange-700 dark:text-orange-300 font-medium">
                        {testimonial.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    {typeof testimonial.content === "string" ? (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        "{testimonial.content}"
                      </p>
                    ) : (
                      <div className="flex justify-center">
                        {testimonial.content}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="w-5 h-5 text-orange-500 fill-current transform hover:scale-110 transition-transform duration-200"
                        />
                      ))}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      {testimonial.rating}.0 rating
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl blur-xl opacity-20 animate-pulse"></div>
            <a href="https://discord.gg/CQgK8742" target="_new">
              <button className="relative px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25">
                Join Our Community
              </button>
            </a>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Share your thoughts and become part of our growing tech community
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
