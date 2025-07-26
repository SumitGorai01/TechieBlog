import React from "react";
import { Quote } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const testimonials = [
  {
    id: 1,
    name: "Sumit Gorai",
    role: "Software Developer",
    content:
      "TechieBlog has become my go-to source for staying updated with the latest tech trends. The articles are well-researched and easy to understand.",
    rating: 5,
    image: "https://avatars.githubusercontent.com/u/106994512?v=4",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Software Developer",
    content:
      "What I love most about TechieBlog is the depth of technical content. It's perfect for both beginners and experienced developers.",
    rating: 5,
    image:
      "https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg",
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Product Manager",
    content:
      "The insights shared on TechieBlog have helped me make better product decisions. The community discussions are incredibly valuable.",
    rating: 5,
    image:
      "https://images.saymedia-content.com/.image/t_share/MTc0OTk0MTIwOTMzMTg5NjAw/20-ways-to-tell-if-shes-a-lady.jpg",
  },
];

const Testimonials = () => (
  <section
    className="testimonials-section bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 md:px-0"
    style={{
      minHeight: "600px",
      overflow: "hidden",
    }}
    aria-labelledby="testimonials-heading"
  >
    <h2
      id="testimonials-heading"
      className="text-3xl md:text-4xl font-black text-center mb-2 text-indigo-800"
    >
      What Our Readers Say
    </h2>
    <p className="text-center max-w-lg mx-auto text-gray-700 mb-8 font-medium">
      Join thousands who trust{" "}
      <span className="font-bold text-indigo-600">TechieBlog</span>
      &nbsp;for their daily dose of tech insights!
    </p>

    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      autoPlay
      interval={7000}
      transitionTime={600}
      emulateTouch
      swipeable
      dynamicHeight={false}
      showArrows={true}
      className="max-w-2xl mx-auto"
    >
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="testimonial-card max-w-lg mx-auto bg-white/95 rounded-2xl shadow-xl p-7 mb-4 relative transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl"
        >
          <div className="flex items-center mb-5 gap-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full border-2 border-indigo-400 shadow-lg object-cover"
            />
            <div>
              <div className="font-bold text-lg text-indigo-900">
                {testimonial.name}
              </div>
              <div className="text-xs text-gray-400">{testimonial.role}</div>
              <div className="flex mt-1" aria-label={`${testimonial.rating} out of 5 stars`}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    fill="currentColor"
                    className="w-4 h-4 text-yellow-400"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M10 15l-5.878 3.09 1.122-6.545L.489 6.91l6.561-.955L10 0l2.95 5.955 6.561.955-4.753 4.635 1.12 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <blockquote className="relative text-lg text-gray-700 pl-8 italic border-l-4 border-indigo-300">
            <Quote className="absolute left-0 top-0 w-6 h-6 text-indigo-300 opacity-60" />
            {testimonial.content}
          </blockquote>
        </div>
      ))}
    </Carousel>

    <p className="text-center mt-8 text-sm text-gray-500">
      Want to share your story?{" "}
      <a
        href="#contact"
        className="font-semibold underline underline-offset-4 hover:text-indigo-600 duration-200"
      >
        Send us your testimonial!
      </a>
    </p>
  </section>
);

export default Testimonials;
