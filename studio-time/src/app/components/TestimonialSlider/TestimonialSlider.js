'use client'
import { motion } from 'framer-motion';
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const StudioTestimonialsSlider = () => {
  const testimonials = [
    { text: "This studio has truly elevated our brand!", author: "- Mark Thompson, CEO" },
    { text: "Incredible work, every project feels like a masterpiece!", author: "- Lisa Ray, Art Director" },
    { text: "The creativity here is unmatched, highly recommend!", author: "- Alex James, Designer" },
    // Add more testimonials as needed
  ];

  return (
    <section className="testimonials overflow-hidden relative bg-gray-800 py-16 font-montserrat">
      <h2 className="text-4xl font-semibold text-center text-white mb-8">What Our Clients Are Saying</h2>
      
      <motion.div
        className="flex space-x-8 animate-slider"
        animate={{
          x: ['0%', '-100%'],
        }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 12, // Adjust the speed of transition
          ease: 'linear',
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial p-8 bg-gray-700 text-white rounded-xl shadow-xl max-w-sm mx-auto">
            <Card>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardContent>{testimonial.text}</CardContent>
            <p className="mt-4 text-right text-sm font-semibold">{testimonial.author}</p>
            </Card>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default StudioTestimonialsSlider;
