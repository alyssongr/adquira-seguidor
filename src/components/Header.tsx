import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: "Início", path: "/" },
    { 
      name: "Serviços", 
      path: "#",
      hasDropdown: true,
      subItems: [
        { name: "Seguidores", path: "/servicos/seguidores" },
        { name: "Curtidas", path: "/servicos/curtidas" },
        { name: "Comentários", path: "/servicos/comentarios" },
        { name: "Visualizações", path: "/servicos/visualizacoes" },
        { name: "Pacotes Combo", path: "/servicos/combo" },
      ]
    },
    { name: "Como Funciona", path: "/como-funciona" },
    { name: "Planos e Preços", path: "/planos" },
    { name: "Depoimentos", path: "/depoimentos" },
    { name: "API & Revenda", path: "/api-revenda" },
    { name: "Blog", path: "/blog" },
    { name: "Suporte", path: "/suporte" },
    { name: "Contato", path: "/contato" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border shadow-sm backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover-scale">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-md">
              <span className="text-secondary font-bold text-xl">AS</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Adquira Seguidor</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              link.hasDropdown ? (
                <div 
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1">
                    {link.name}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-card border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                      {link.subItems?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/planos">
              <Button size="lg">Começar Agora</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.hasDropdown ? (
                  <>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-muted rounded-md transition-colors flex items-center justify-between"
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {link.name}
                      <ChevronDown className={cn("w-4 h-4 transition-transform", servicesOpen && "rotate-180")} />
                    </button>
                    {servicesOpen && link.subItems?.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className="block pl-8 pr-4 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={cn(
                      "block px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive(link.path) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 px-4 space-y-2">
              <Link to="/login" className="block" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Entrar</Button>
              </Link>
              <Link to="/planos" className="block" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Começar Agora</Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
