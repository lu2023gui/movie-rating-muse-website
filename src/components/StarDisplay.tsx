
import { Star, StarOff } from "lucide-react";

interface StarDisplayProps {
  rating: number;
}

const StarDisplay = ({ rating }: StarDisplayProps) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-6 h-6 text-gray-400" />
      ))}
    </div>
  );
};

export default StarDisplay;
