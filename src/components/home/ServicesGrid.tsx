import { Link } from "react-router-dom";
import { Users, Heart, MessageSquare, Eye, Package, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Users,
    title: "Seguidores",
    description: "Aumente sua base de seguidores com perfis reais e engajados",
    path: "/servicos/seguidores",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Heart,
    title: "Curtidas",
    description: "Mais curtidas para destacar suas publicações",
    path: "/servicos/curtidas",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: MessageSquare,
    title: "Comentários",
    description: "Comentários autênticos para aumentar o engajamento",
    path: "/servicos/comentarios",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Eye,
    title: "Visualizações",
    description: "Impulsione o alcance dos seus vídeos e stories",
    path: "/servicos/visualizacoes",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Package,
    title: "Pacotes Combo",
    description: "Economia e resultados completos em um só plano",
    path: "/servicos/combo",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o serviço ideal para impulsionar seu perfil e alcançar seus objetivos nas redes sociais
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link key={service.path} to={service.path}>
              <Card 
                className="h-full hover-lift border-2 hover:border-primary transition-all duration-300 hover:shadow-glow-lg group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <Button variant="link" className="p-0 h-auto font-semibold group/btn">
                    Saiba mais
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
