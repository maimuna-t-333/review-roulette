import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

function App() {
  const [reviewText, setReviewText] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);

  const submitReview = () => {
    if (reviewText.trim()) {
      setHasSubmitted(true);
    }
  };

  const spinWheel = () => {
    setSpinning(true);
    setSpinResult(null);
    

    setTimeout(() => {
      const isWinner = Math.random() < 0.5;
      setSpinResult(isWinner ? 'Win' : 'Lose');
      setSpinning(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {!hasSubmitted ? (
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">Review & Win</CardTitle>
              <CardDescription className="text-base">
                Share your thoughts and get a chance to spin the roulette wheel for exciting rewards!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="review">Write Your Review</Label>
                <Textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="h-32 resize-none"
                />
              </div>
              
              <Button
                onClick={submitReview}
                disabled={!reviewText.trim()}
                className="w-full"
                size="lg"
              >
                Submit Review
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">🎰 Spin the Wheel!</CardTitle>
              <CardDescription className="text-base">
                Thank you for your review! Now try your luck!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              
              <div className={`w-48 h-48 rounded-full border-8 border-purple-600 flex items-center justify-center text-4xl font-bold transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`}>
                {!spinResult && !spinning && '🎯'}
                {spinning && '🌀'}
                {spinResult && !spinning && (spinResult === 'Win' ? '🎉' : '😔')}
              </div>
              
              {spinResult && !spinning && (
                <Alert className={spinResult === 'Win' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}>
                  <AlertDescription className="text-center">
                    <p className={`text-3xl font-bold mb-2 ${spinResult === 'Win' ? 'text-green-700' : 'text-red-700'}`}>
                      {spinResult === 'Win' ? ' You Win!' : ' You Lose'}
                    </p>
                    <p className="text-gray-600">
                      {spinResult === 'Win' ? 'Congratulations on your victory!' : 'Better luck next time!'}
                    </p>
                  </AlertDescription>
                </Alert>
              )}
              
              <Button
                onClick={spinWheel}
                disabled={spinning}
                size="lg"
                className="px-8"
                variant={spinning ? "secondary" : "default"}
              >
                {spinning ? 'Spinning...' : spinResult ? 'Spin Again' : 'Spin the Wheel'}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default App;