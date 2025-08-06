import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import type { Game } from "@shared/schema";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/game/${game.slug}`}>
      <div className="game-card bg-white rounded-xl shadow-soft hover:shadow-hover smooth-transition hover-scale cursor-pointer">
        <img 
          src={game.imageUrl} 
          alt={game.name} 
          className="w-full h-32 object-cover rounded-t-xl"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-1 font-['Poppins']">{game.name}</h3>
          <p className="text-gray-600 text-sm">{game.currency}</p>
          {game.isPopular === 1 && (
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
              Most Popular
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}