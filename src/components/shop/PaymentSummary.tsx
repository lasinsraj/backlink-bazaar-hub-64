interface PaymentSummaryProps {
  total: number;
}

export const PaymentSummary = ({ total }: PaymentSummaryProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center text-sm">
        <span>Subtotal:</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center text-sm mt-2">
        <span>Processing Fee:</span>
        <span>$0.00</span>
      </div>
      <div className="flex justify-between items-center font-bold text-lg mt-2 pt-2 border-t">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};