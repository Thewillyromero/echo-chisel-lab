import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { blogPosts } from "@/data/blogPosts";
import { Clock, ArrowRight } from "lucide-react";

const cardVariants = (i: number) => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const Blog = () => {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      <section className="pt-28 sm:pt-32 pb-16 md:pb-20 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="container mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
          >
            <p className="text-primary/80 font-display text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 font-medium">
              Blog
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold mb-5 tracking-tight leading-[1.1]">
              Ideas para <span className="text-gradient">crecer</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg font-light">
              Artículos sobre IA conversacional, automatización y estrategias para no perder ni una llamada.
            </p>
          </motion.div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 max-w-6xl mx-auto">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                variants={cardVariants(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-60px" }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="block h-full rounded-2xl glass border-border/20 hover:border-border/30 p-5 sm:p-6 lg:p-8 transition-all duration-500 group"
                >
                  {/* Category badge */}
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-${post.categoryColor}/10 text-${post.categoryColor}`}>
                    {post.category}
                  </span>

                  <h2 className="font-display font-bold text-lg sm:text-xl text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-muted-foreground font-light leading-relaxed mb-5">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                      <span>{post.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="blog" />
    </div>
  );
};

export default Blog;
