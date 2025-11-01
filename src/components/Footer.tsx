import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Sobre */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-md">
                <span className="text-secondary font-bold text-xl">AS</span>
              </div>
              <span className="font-bold text-lg">Adquira Seguidor</span>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Cresça seu perfil com velocidade e segurança. Planos flexíveis, entrega rápida e suporte humano.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover-scale p-2 bg-secondary-foreground/10 rounded-lg hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover-scale p-2 bg-secondary-foreground/10 rounded-lg hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover-scale p-2 bg-secondary-foreground/10 rounded-lg hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover-scale p-2 bg-secondary-foreground/10 rounded-lg hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/como-funciona" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Como Funciona</Link></li>
              <li><Link to="/planos" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Planos e Preços</Link></li>
              <li><Link to="/depoimentos" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Depoimentos</Link></li>
              <li><Link to="/blog" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="font-bold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li><Link to="/servicos/seguidores" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Seguidores</Link></li>
              <li><Link to="/servicos/curtidas" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Curtidas</Link></li>
              <li><Link to="/servicos/comentarios" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Comentários</Link></li>
              <li><Link to="/servicos/visualizacoes" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Visualizações</Link></li>
              <li><Link to="/servicos/combo" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">Pacotes Combo</Link></li>
              <li><Link to="/servicos/linkedin" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">LinkedIn</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Mail className="w-4 h-4 text-primary" />
                <span>contato@adquiraseguidor.com.br</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 98765-4321</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>São Paulo, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-secondary-foreground/60">
              © {currentYear} Adquira Seguidor. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/termos" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/lgpd" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                LGPD
              </Link>
              <Link to="/sobre" className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors">
                Sobre Nós
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
