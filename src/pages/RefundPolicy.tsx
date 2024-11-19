const RefundPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-primary">Return and Refund Policy</h1>
      <div className="prose max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Refund Eligibility</h2>
          <p className="mb-4">
            We offer a 30-day money-back guarantee if you are not satisfied with our services. To be eligible for a refund:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The request must be made within 30 days of purchase</li>
            <li>You must provide detailed reasoning for your refund request</li>
            <li>The service must not have been fully delivered</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Refund Process</h2>
          <p className="mb-4">
            Once we receive your refund request:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>We will review your case within 48 hours</li>
            <li>If approved, the refund will be processed within 5-7 business days</li>
            <li>The refund will be issued to the original payment method</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Contact Us</h2>
          <p>
            If you have any questions about our refund policy, please contact our support team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;