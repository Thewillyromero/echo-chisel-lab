import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactFormDialog from "@/components/ContactFormDialog";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/m4SFv9fHyIZraSrAu8QT";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [contactOpen, setContactOpen] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background noise-overlay">
        <Navbar onContact={() => setContactOpen(true)} />
        <div className="pt-32 pb-20 px-5 text-center">
          <h1 className="text-3xl font-display font-bold mb-4">Artículo no encontrado</h1>
          <p className="text-muted-foreground mb-8">El artículo que buscas no existe o ha sido movido.</p>
          <Button variant="outline" onClick={() => navigate("/blog")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Volver al blog
          </Button>
        </div>
        <Footer />
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="blog" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background noise-overlay">
      <Navbar onContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="pt-28 sm:pt-32 pb-10 md:pb-14 px-5 md:px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full bg-brand-lavender/[0.05] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-brand-teal/[0.04] blur-[100px]" />

        <div className="max-w-[720px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Volver al blog
            </Link>

            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 bg-${post.categoryColor}/10 text-${post.categoryColor}`}>
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-editorial font-extrabold mb-5 tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground/60">
              <span>{post.date}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime} de lectura
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="pb-16 md:pb-20 px-5 md:px-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[720px] mx-auto prose-blog"
        >
          {post.content}
        </motion.article>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-[720px] mx-auto mt-12 md:mt-16"
        >
          <div className="glass-warm rounded-2xl p-6 sm:p-8 md:p-10 text-center border border-brand-lavender/20">
            <h3 className="text-xl sm:text-2xl font-display font-extrabold mb-3 tracking-tight">
              ¿Listo para no perder <span className="text-gradient">ni una llamada más</span>?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base font-light mb-6 max-w-md mx-auto">
              Reserva una consulta gratuita de 15 minutos y descubre cómo CALLA puede transformar la atención telefónica de tu negocio.
            </p>
            <Button
              size="lg"
              className="rounded-xl glow-box text-sm sm:text-base"
              onClick={() => window.open(BOOKING_URL, "_blank")}
            >
              Reservar consulta gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </section>

      <Footer />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} source="blog-post" />
    </div>
  );
};

export default BlogPost;
