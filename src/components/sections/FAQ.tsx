import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is a keyword-targeted backlink?",
    answer:
      "A keyword-targeted backlink is a link from another website to yours that uses specific keywords in the anchor text. This helps search engines understand what your page is about and can improve your rankings for those keywords.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "While results can vary, most clients start seeing improvements in their rankings within 2-3 months. However, SEO is a long-term strategy, and the best results typically come after 6-12 months of consistent link building.",
  },
  {
    question: "Are your backlinks permanent?",
    answer:
      "Yes, all our backlinks are permanent. Once placed, they will remain on the host websites indefinitely. We also provide a replacement guarantee if any link goes down within the first 12 months.",
  },
  {
    question: "How do you choose the websites for backlinks?",
    answer:
      "We carefully vet each website based on multiple factors including Domain Authority, traffic, relevance to your niche, and overall quality. We only work with legitimate websites that have real organic traffic and strong metrics.",
  },
];

export const FAQ = () => {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our backlink services
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};