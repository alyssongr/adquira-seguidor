import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Check if we're on the home page (which has yellow hero)
  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-xl transition-all ${
              isScrolled 
                ? "bg-gradient-to-br from-primary to-brand-yellow-dark text-primary-foreground" 
                : isHomePage 
                  ? "bg-primary-foreground text-primary shadow-md" 
                  : "bg-gradient-to-br from-primary to-brand-yellow-dark text-primary-foreground"
            } group-hover:scale-105`}>
              A
            </div>
            <span className={`font-display font-bold text-xl hidden sm:block transition-colors ${
              isScrolled 
                ? "text-foreground" 
                : isHomePage 
                  ? "text-primary-foreground" 
                  : "text-foreground"
            }`}>
              Adquira<span className={`${isScrolled ? "text-primary" : isHomePage ? "text-primary-foreground/80" : "text-primary"}`}>Seguidor</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-semibold transition-colors duration-200 relative group ${
                  location.pathname === link.href
                    ? isScrolled 
                      ? "text-primary" 
                      : isHomePage 
                        ? "text-primary-foreground" 
                        : "text-primary"
                    : isScrolled 
                      ? "text-muted-foreground hover:text-foreground" 
                      : isHomePage 
                        ? "text-primary-foreground/80 hover:text-primary-foreground" 
                        : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isScrolled || !isHomePage ? "bg-primary" : "bg-primary-foreground"
                  } ${
                    location.pathname === link.href
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild 
              variant={isScrolled || !isHomePage ? "cta" : "hero"} 
              size="lg"
              className={!isScrolled && isHomePage ? "shadow-lg" : ""}
            >
              <Link to="/servicos">Ver Serviços</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-card/95 border border-border text-foreground shadow-md"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-80 pb-6" : "max-h-0"
          }`}
        >
          <div className={`flex flex-col gap-4 pt-4 border-t ${
            isScrolled || !isHomePage ? "border-border" : "border-primary-foreground/20"
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`font-semibold py-2 transition-colors ${
                  location.pathname === link.href
                    ? isScrolled || !isHomePage
                      ? "text-primary"
                      : "text-primary-foreground"
                    : isScrolled || !isHomePage
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant={isScrolled || !isHomePage ? "cta" : "hero"} className="mt-2">
              <Link to="/servicos">Ver Serviços</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
