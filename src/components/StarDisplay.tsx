
import { Star } from "lucide-react";

interface StarDisplayProps {
  rating: number;
}

const StarDisplay = ({ rating }: StarDisplayProps) => {
  const MAX_STARS = 5;
  const stars = [];
  
  for (let i = 0; i < MAX_STARS; i++) {
    const difference = rating - i;
    
    if (difference >= 1) {
      // Full star
      stars.push(
        <Star 
          key={`star-${i}`} 
          className="w-6 h-6 text-red-500 fill-red-500 animate-star-ping" 
          style={{ animationDelay: `${i * 150}ms` }}
        />
      );
    } else if (difference > 0) {
      // Partial star
      const percentage = difference * 100;
      stars.push(
        <div key={`star-${i}`} className="relative w-6 h-6">
          <Star className="absolute w-6 h-6 text-gray-400" />
          <div className="absolute w-6 h-6 overflow-hidden" style={{ width: `${percentage}%` }}>
            <Star className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
        </div>
      );
    } else {
      // Empty star
      stars.push(
        <Star 
          key={`star-${i}`} 
          className="w-6 h-6 text-gray-400" 
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars}
    </div>
  );
};

export default StarDisplay;
