import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-yellow flex items-center justify-center font-display font-bold text-primary-foreground text-xl">
                A
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Adquira<span className="text-primary">Seguidor</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Impulsione suas redes sociais com seguidores, curtidas e
              visualizações reais. Entrega rápida e segura.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Plataformas
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  TikTok
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail size={16} className="text-primary" />
                contato@adquiraseguidor.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <MessageCircle size={16} className="text-primary" />
                WhatsApp
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Instagram size={16} className="text-primary" />
                @adquiraseguidor
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2024 Adquira Seguidor. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
