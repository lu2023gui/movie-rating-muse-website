import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import StarDisplay from "@/components/StarDisplay";
import { Film, Star, Clapperboard, Drama, Popcorn, Theater } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Index = () => {
  const [rottenTomatoes, setRottenTomatoes] = useState("");
  const [metacritic, setMetacritic] = useState("");
  const [average, setAverage] = useState<number | null>(null);
  const [showStars, setShowStars] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  
  const getReviewComment = (avg: number) => {
    if (avg < 20) return "PÉSSIMO";
    if (avg < 40) return "RUIM";
    if (avg < 60) return "MEDÍOCRE";
    if (avg <= 218/3) return "BOM";
    if (avg <= 259/3) return "ÓTIMO";
    return "EXCELENTE";
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
    <div 
      className="min-h-screen flex items-center justify-center bg-transparent backdrop-blur-sm p-4 relative overflow-hidden font-sans"
      style={{
        background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 100%)"
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Film className="absolute text-blue-500/20 w-24 h-24 animate-float-slow top-20 left-[10%]" />
        <Star className="absolute text-yellow-400/20 w-16 h-16 animate-float top-40 right-[15%]" />
        <Clapperboard className="absolute text-blue-500/20 w-20 h-20 animate-float-reverse bottom-20 left-[20%]" />
        <Drama className="absolute text-red-500/20 w-18 h-18 animate-float top-[30%] left-[30%]" />
        <Popcorn className="absolute text-yellow-400/20 w-16 h-16 animate-float-slow bottom-[25%] right-[25%]" />
        <Theater className="absolute text-blue-500/20 w-20 h-20 animate-float-reverse top-[15%] right-[35%]" />
      </div>

      <Card className="w-full max-w-md p-6 space-y-6 bg-black/60 backdrop-blur-md border-white/10 shadow-2xl animate-fade-in">
        <div className="relative">
          <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500">
            Movie Rating Calculator
          </h1>
          <Clapperboard className="absolute -top-1 -left-1 w-6 h-6 text-red-500/50 animate-pulse" />
        </div>
        
        <div className="space-y-4">
          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm mb-2 text-white/80 group-hover:text-red-200">Rotten Tomatoes Rating (0-10)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rottenTomatoes}
              onChange={(e) => setRottenTomatoes(e.target.value)}
              placeholder="Enter rating from 0 to 10"
              className="bg-black/30 border-white/20 text-white placeholder:text-white/30 transition-colors focus:border-red-500/50"
            />
          </div>

          <div className="group transition-all duration-300 hover:scale-[1.02]">
            <label className="block text-sm mb-2 text-white/80 group-hover:text-blue-200">Metacritic Rating (0-100)</label>
            <Input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={metacritic}
              onChange={(e) => setMetacritic(e.target.value)}
              placeholder="Enter rating from 0 to 100"
              className="bg-black/30 border-white/20 text-white placeholder:text-white/30 transition-colors focus:border-blue-500/50"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm animate-shake">{error}</p>
          )}

          <Button 
            onClick={validateAndCalculate}
            className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 transition-all duration-300 text-white group"
          >
            <Film className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Calculate Average
          </Button>
        </div>

        {average !== null && (
          <div className="space-y-4 border-t border-white/10 pt-4 animate-fade-in">
            <p className="text-lg text-white/90">
              Average Rating: <span className="font-bold text-blue-400">{average.toFixed(4)}</span>
            </p>
            <p className="text-lg text-white/90">{getReviewComment(average)}</p>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white transition-all duration-300 group"
                >
                  <Star className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  See Star Rating
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black/90 border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-center text-white">Star Rating ({(average / 20).toFixed(4)})</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center py-4">
                  <StarDisplay rating={average / 20} />
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              onClick={resetForm}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-500 hover:to-blue-500 text-white transition-colors group"
            >
              <Clapperboard className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              Rate Another Movie
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;
