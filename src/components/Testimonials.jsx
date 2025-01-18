import React, { useState } from 'react';
import { UserCircle, Quote } from 'lucide-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Tech Enthusiast",
    content: "TechieBlog has become my go-to source for staying updated with the latest tech trends. The articles are well-researched and easy to understand.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Software Developer",
    content: "What I love most about TechieBlog is the depth of technical content. It's perfect for both beginners and experienced developers.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Product Manager",
    content: "The insights shared on TechieBlog have helped me make better product decisions. The community discussions are incredibly valuable.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const Testimonials = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <section className="py-16  to-pink-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4 dark:text-gray-300">
            What Our Readers Say
          </h2>
          <p className="text-lg dark:text-gray-300 text-gray-600">
            Join thousands of tech enthusiasts who trust TechieBlog for their daily dose of tech insights
          </p>
        </div>

          <Carousel
          showArrows={true}
          autoPlay={!isHovered}
          infiniteLoop={true}
          showThumbs={false}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="testimonial-inner bg-transparent">
                <div className="testimonial-front bg-transparent">
                  <img src={testimonial.image} alt={testimonial.name} className="w-44 h-44 rounded-full mx-auto" />
                  <h4 className="text-gray-700 dark:text-gray-300" >{testimonial.name}</h4>
                  <p className="text-gray-700 dark:text-gray-300">{testimonial.position}</p>
                  <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
                </div>
              
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
