import {
  Clock,
  Eye,
  Heart,
  Instagram,
  MessageCircle,
  Play,
  ShoppingCart,
  Users,
  Youtube,
} from "lucide-react";

export type Platform = "instagram" | "tiktok" | "youtube";

export interface Service {
  id: string;
  platform: Platform;
  name: string;
  description: string;
  pricePerUnit: number;
  minQuantity: number;
  maxQuantity: number;
}

export interface PlatformDefinition {
  id: Platform;
  name: string;
  icon: (props: { className?: string }) => JSX.Element;
  color: string;
}

export const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-5 h-5"}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const platforms: PlatformDefinition[] = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "from-pink-500 to-purple-600",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: TikTokIcon,
    color: "from-cyan-400 to-pink-500",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "from-red-500 to-red-600",
  },
];

export const platformById = {
  instagram: platforms[0],
  tiktok: platforms[1],
  youtube: platforms[2],
} as const;

export const services: Service[] = [
  // Instagram
  {
    id: "ig-followers",
    platform: "instagram",
    name: "Seguidores Instagram",
    description: "Aumente seu número de seguidores com perfis reais e ativos.",
    pricePerUnit: 0.05,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "ig-likes",
    platform: "instagram",
    name: "Curtidas Instagram",
    description: "Curtidas para suas fotos e vídeos. Aumenta o engajamento.",
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "ig-views",
    platform: "instagram",
    name: "Visualizações Reels",
    description: "Impulsione seus Reels com visualizações reais.",
    pricePerUnit: 0.01,
    minQuantity: 100,
    maxQuantity: 100000,
  },
  {
    id: "ig-story-views",
    platform: "instagram",
    name: "Visualizações Stories",
    description: "Mais visualizações para seus Stories.",
    pricePerUnit: 0.01,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "ig-comments",
    platform: "instagram",
    name: "Comentários Instagram",
    description: "Comentários personalizados para suas postagens.",
    pricePerUnit: 0.5,
    minQuantity: 10,
    maxQuantity: 500,
  },
  // TikTok
  {
    id: "tt-followers",
    platform: "tiktok",
    name: "Seguidores TikTok",
    description: "Seguidores reais para seu perfil TikTok.",
    pricePerUnit: 0.04,
    minQuantity: 100,
    maxQuantity: 50000,
  },
  {
    id: "tt-likes",
    platform: "tiktok",
    name: "Curtidas TikTok",
    description: "Curtidas para seus vídeos do TikTok.",
    pricePerUnit: 0.02,
    minQuantity: 50,
    maxQuantity: 20000,
  },
  {
    id: "tt-views",
    platform: "tiktok",
    name: "Visualizações TikTok",
    description: "Aumente as visualizações dos seus vídeos.",
    pricePerUnit: 0.005,
    minQuantity: 500,
    maxQuantity: 500000,
  },
  {
    id: "tt-shares",
    platform: "tiktok",
    name: "Compartilhamentos TikTok",
    description: "Mais compartilhamentos para viralizar seus vídeos.",
    pricePerUnit: 0.08,
    minQuantity: 50,
    maxQuantity: 5000,
  },
  // YouTube
  {
    id: "yt-subscribers",
    platform: "youtube",
    name: "Inscritos YouTube",
    description: "Aumente seus inscritos com qualidade e segurança.",
    pricePerUnit: 0.1,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "yt-views",
    platform: "youtube",
    name: "Visualizações YouTube",
    description: "Visualizações reais para seus vídeos.",
    pricePerUnit: 0.02,
    minQuantity: 100,
    maxQuantity: 100000,
  },
  {
    id: "yt-likes",
    platform: "youtube",
    name: "Likes YouTube",
    description: "Curtidas para aumentar o engajamento dos vídeos.",
    pricePerUnit: 0.04,
    minQuantity: 50,
    maxQuantity: 10000,
  },
  {
    id: "yt-watch",
    platform: "youtube",
    name: "Watch Time YouTube",
    description: "Horas de visualização para monetização.",
    pricePerUnit: 2.0,
    minQuantity: 10,
    maxQuantity: 4000,
  },
];

export const getServiceIcon = (serviceId: string) => {
  switch (serviceId) {
    case "ig-followers":
    case "tt-followers":
    case "yt-subscribers":
      return Users;
    case "ig-likes":
    case "tt-likes":
    case "yt-likes":
      return Heart;
    case "ig-views":
    case "ig-story-views":
    case "tt-views":
    case "yt-views":
      return Eye;
    case "ig-comments":
      return MessageCircle;
    case "tt-shares":
      return Play;
    case "yt-watch":
      return Clock;
    default:
      return ShoppingCart;
  }
};

export const serviceVisuals: Record<
  Service["id"],
  { gradient: string; accent: string; emoji: string }
> = {
  "ig-followers": {
    gradient: "from-pink-500/80 via-purple-500/70 to-orange-400/70",
    accent: "bg-pink-500/15",
    emoji: "👥",
  },
  "ig-likes": {
    gradient: "from-pink-500/80 via-rose-500/70 to-orange-400/70",
    accent: "bg-rose-500/15",
    emoji: "❤️",
  },
  "ig-views": {
    gradient: "from-purple-500/80 via-indigo-500/70 to-blue-500/70",
    accent: "bg-indigo-500/15",
    emoji: "🎬",
  },
  "ig-story-views": {
    gradient: "from-amber-400/80 via-orange-500/70 to-pink-500/70",
    accent: "bg-amber-500/15",
    emoji: "📱",
  },
  "ig-comments": {
    gradient: "from-purple-500/80 via-pink-500/70 to-rose-500/70",
    accent: "bg-purple-500/15",
    emoji: "💬",
  },
  "tt-followers": {
    gradient: "from-cyan-400/80 via-pink-500/70 to-purple-500/70",
    accent: "bg-cyan-500/15",
    emoji: "🚀",
  },
  "tt-likes": {
    gradient: "from-fuchsia-500/80 via-cyan-400/70 to-rose-500/70",
    accent: "bg-fuchsia-500/15",
    emoji: "👍",
  },
  "tt-views": {
    gradient: "from-sky-400/80 via-cyan-400/70 to-blue-500/70",
    accent: "bg-sky-500/15",
    emoji: "👁️",
  },
  "tt-shares": {
    gradient: "from-emerald-400/80 via-cyan-400/70 to-blue-500/70",
    accent: "bg-emerald-500/15",
    emoji: "📢",
  },
  "yt-subscribers": {
    gradient: "from-red-500/80 via-rose-500/70 to-orange-500/70",
    accent: "bg-red-500/15",
    emoji: "🎯",
  },
  "yt-views": {
    gradient: "from-orange-500/80 via-amber-500/70 to-red-500/70",
    accent: "bg-orange-500/15",
    emoji: "▶️",
  },
  "yt-likes": {
    gradient: "from-rose-500/80 via-red-500/70 to-orange-500/70",
    accent: "bg-rose-500/15",
    emoji: "⭐",
  },
  "yt-watch": {
    gradient: "from-amber-500/80 via-orange-500/70 to-red-500/70",
    accent: "bg-amber-500/15",
    emoji: "⏱️",
  },
};
