import { CheckCircle, Shield, TrendingUp, Zap } from "lucide-react";

const features = [
  {
    title: "High Domain Authority",
    description: "Get backlinks from websites with DA 50+",
    icon: Shield,
  },
  {
    title: "Keyword Targeted",
    description: "Precise anchor text optimization for your keywords",
    icon: TrendingUp,
  },
  {
    title: "Fast Delivery",
    description: "Links indexed within 7-14 days",
    icon: Zap,
  },
  {
    title: "100% Manual Outreach",
    description: "Natural, white-hat link building process",
    icon: CheckCircle,
  },
];

export const Features = () => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Backlinks?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide high-quality backlinks that help improve your website's
            authority and search engine rankings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};