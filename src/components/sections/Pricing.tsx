import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: 299,
    description: "Perfect for small businesses",
    features: [
      "5 DA 40+ Backlinks",
      "Keyword Optimization",
      "Monthly Report",
      "Email Support",
    ],
  },
  {
    name: "Professional",
    price: 599,
    description: "Best for growing businesses",
    features: [
      "15 DA 50+ Backlinks",
      "Advanced Keyword Targeting",
      "Weekly Reports",
      "Priority Support",
      "Content Creation",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 999,
    description: "For large organizations",
    features: [
      "30 DA 60+ Backlinks",
      "Custom Strategy",
      "Real-time Reporting",
      "24/7 Support",
      "Content Creation",
      "Link Monitoring",
    ],
  },
];

export const Pricing = () => {
  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg bg-white p-8 ${
                plan.popular
                  ? "ring-2 ring-primary shadow-lg scale-105"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mt-4">{plan.name}</h3>
              <p className="text-gray-600 mt-2">{plan.description}</p>
              <div className="mt-4 mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular ? "bg-primary" : "bg-secondary"
                }`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};