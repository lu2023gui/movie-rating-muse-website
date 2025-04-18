
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import StarDisplay from "@/components/StarDisplay";

const Index = () => {
  const [rottenTomatoes, setRottenTomatoes] = useState("");
  const [metacritic, setMetacritic] = useState("");
  const [average, setAverage] = useState<number | null>(null);
  const [showStars, setShowStars] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  
  const getReviewComment = (avg: number) => {
    if (avg < 20) return "Now that's a TERRIBLE movie!";
    if (avg < 40) return "With a BAD movie like that, it would have been better to go see Pelé's!";
    if (avg < 60) return "Only MEDIOCRE, no comments!";
    if (avg < 73.6667) return "It's actually a GOOD movie, I liked it!";
    if (avg < 87.3333) return "What a GREAT movie, my friends, incredible!";
    return "That's ABSOLUTE CINEMA!";
  };

  const validateAndCalculate = () => {
    const rtRating = parseFloat(rottenTomatoes);
    const mcRating = parseFloat(metacritic);

    if (isNaN(rtRating) || rtRating < 0 || rtRating > 10) {
      setError("Rotten Tomatoes rating must be between 0 and 10");
      return;
    }

    if (isNaN(mcRating) || mcRating < 0 || mcRating > 100) {
      setError("Metacritic rating must be between 0 and 100");
      return;
    }

    const rtAdjusted = rtRating * 10;
    const calculatedAverage = (rtAdjusted + mcRating) / 2;
    setAverage(calculatedAverage);
    setError("");
    setShowStars(null);
  };

  const handleStarResponse = (response: string) => {
    const affirmativeAnswers = ["yes", "s", "y"];
    const negativeAnswers = ["no", "n", "not"];
    
    const normalizedResponse = response.toLowerCase().trim();
    
    if (affirmativeAnswers.includes(normalizedResponse)) {
      setShowStars(true);
    } else if (negativeAnswers.includes(normalizedResponse)) {
      setShowStars(false);
    } else {
      setError("Please answer with yes/y/s or no/n/not");
    }
  };

  const resetForm = () => {
    setRottenTomatoes("");
    setMetacritic("");
    setAverage(null);
    setShowStars(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Movie Rating Calculator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Rotten Tomatoes Rating (0-10)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rottenTomatoes}
              onChange={(e) => setRottenTomatoes(e.target.value)}
              placeholder="Enter rating from 0 to 10"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Metacritic Rating (0-100)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metacritic}
              onChange={(e) => setMetacritic(e.target.value)}
              placeholder="Enter rating from 0 to 100"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <Button 
            onClick={validateAndCalculate}
            className="w-full"
          >
            Calculate Average
          </Button>
        </div>

        {average !== null && (
          <div className="space-y-4 border-t pt-4">
            <p className="text-lg">
              Average Rating: <span className="font-bold">{average.toFixed(4)}</span>
            </p>
            <p className="text-lg">{getReviewComment(average)}</p>
            
            {showStars === null && (
              <div className="space-y-2">
                <p>Would you like to see the rating in stars?</p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleStarResponse("yes")}
                    variant="outline"
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button 
                    onClick={() => handleStarResponse("no")}
                    variant="outline"
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>
            )}

            {showStars === true && (
              <div className="space-y-2">
                <p>Star Rating ({(average / 20).toFixed(4)})</p>
                <StarDisplay rating={average / 20} />
              </div>
            )}

            {showStars === false && (
              <p>
                Okay. Enjoy the movie{average < 40 ? " (or bear with it)" : ""}!
              </p>
            )}

            <Button 
              onClick={resetForm}
              variant="outline"
              className="w-full mt-4"
            >
              Rate Another Movie
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;
