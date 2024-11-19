import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Boost Your Rankings with
            <span className="text-primary"> Premium Backlinks</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Get high-quality, keyword-targeted backlinks from authoritative websites.
            Improve your SEO and drive more organic traffic to your website.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl"></div>
      </div>
    </div>
  );
};