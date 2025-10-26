import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    name: "Mariana Santos",
    role: "Influenciadora Digital",
    image: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    text: "Incrível! Meu perfil cresceu 5 mil seguidores em apenas uma semana. O suporte foi super atencioso e o processo muito fácil. Recomendo demais!",
  },
  {
    name: "Carlos Eduardo",
    role: "Empreendedor",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Precisava de mais visibilidade para meu negócio e a Adquira Seguidor entregou exatamente o que prometeu. Resultados rápidos e reais!",
  },
  {
    name: "Juliana Oliveira",
    role: "Coach",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    text: "Melhor investimento que fiz para minha marca pessoal. Engajamento aumentou muito e consegui fechar mais clientes. Equipe nota 10!",
  },
  {
    name: "Rafael Lima",
    role: "Músico",
    image: "https://i.pravatar.cc/150?img=13",
    rating: 5,
    text: "Como artista independente, precisava de alcance. O serviço funcionou perfeitamente e minha música chegou a muito mais pessoas!",
  },
  {
    name: "Camila Ferreira",
    role: "Loja Online",
    image: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    text: "Minhas vendas triplicaram depois que aumentei meus seguidores. O pacote combo foi perfeito para meu e-commerce. Parabéns!",
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já transformaram seus perfis
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover-lift border-2 hover:border-primary transition-all duration-300">
                  <CardContent className="p-6">
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                      ))}
                    </div>

                    <p className="text-sm text-muted-foreground mb-6 line-clamp-4">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-bold text-sm">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">★★★★★ 4.9/5</span> baseado em mais de 15.000 avaliações
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
