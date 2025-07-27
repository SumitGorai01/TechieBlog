import React from "react";
import { Quote } from "lucide-react";
import ContributorsLink from "../components/contributors/contributorsLink.jsx";
// import "./Testimonials.css"; // custom CSS for flip animation
const testimonials = [
  {
    id: 1,
    name: "Sumit Gorai",
    role: "Project Admin",
    content:
      "TechieBlog has become my go-to source for staying updated with the latest tech trends. The articles are well-researched and easy to understand.",
    rating: 5,
    image: "https://avatars.githubusercontent.com/u/106994512?v=4",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Reader",
    content:
      "What I love most about TechieBlog is the depth of technical content. It's perfect for both beginners and experienced developers.",
    rating: 5,
    image:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 3,
    name: "Meet the Contributors",
    role: "Meet the brilliant minds who brought this project to life!",
    content: <ContributorsLink classes="w-16 h-16" />,
    rating: 5,
    image: "https://i.fbcd.co/products/resized/resized-750-500/l014e-21-e05-mainpreview-bf38f61424a9008541dde17dd5ec374266c8a8602da2c55a92e4874ac7bfdf8a.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 bg-gradient-to-r from-yellow-50 via-orange-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            What Our Readers Say
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            Join thousands of tech enthusiasts who trust TechieBlog for their daily dose of tech insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flip-card">
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h4 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300 mb-4">
                    {testimonial.role}
                  </p>
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-orange-500 dark:text-orange-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Back Side */}
                <div className="flip-card-back bg-orange-100 dark:bg-gray-700 rounded-lg p-6">
                  <div className="flex items-center mb-2 justify-left">
                    <Quote className="w-6 h-6 text-orange-500 dark:text-orange-300 mr-2" />
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300 text-center mb-6">
                    {typeof testimonial.content === "string" ? (
                      <p>{testimonial.content}</p>
                    ) : (
                      testimonial.content
                    )}
                  </div>
                  <h4 className="text-xl font-semibold text-center text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                  <div className="flex justify-center">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <svg
                        key={index}
                        className="w-5 h-5 text-orange-500 dark:text-orange-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
