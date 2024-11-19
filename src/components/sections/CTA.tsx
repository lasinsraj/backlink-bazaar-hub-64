import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <div className="bg-primary py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Ready to Boost Your Rankings?
        </h2>
        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
          Start building high-quality backlinks today and watch your website climb
          the search rankings.
        </p>
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-gray-100"
        >
          Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};