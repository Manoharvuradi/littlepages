import React from "react";
import Button from "../../common/buttons/filledbuttons";

interface ConfirmationStepProps {
  onBack: () => void;
  onConfirm: () => void;
  totalAmount: number;
}

const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ onBack, onConfirm, totalAmount }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Payment Method</h2>
      {/* Payment fields */}
      <div className="grid grid-cols-2 gap-4">
        <input className="border p-2 rounded-md" placeholder="Name on Card" />
        <input className="border p-2 rounded-md" placeholder="Card Number" />
        <input className="border p-2 rounded-md" placeholder="Exp Date (MM/YY)" />
        <input className="border p-2 rounded-md" placeholder="CVC" />
        <input className="border p-2 rounded-md" placeholder="ZIP/Postal Code" />
      </div>

      <h2 className="text-2xl font-semibold mt-8">Shipping</h2>
      <div className="border p-4 rounded-xl bg-gray-50">
        <h3 className="font-semibold">Shipping Method</h3>
        <p>Ground $6.99 (5–7 Business Days)</p>

        <div className="mt-4">
          <h3 className="font-semibold">Address</h3>
          <p>John Doe</p>
          <p>2-71/4-3</p>
          <p>Fort Wayne, Indiana 46774</p>
        </div>
      </div>

      {/* Confirm and Place Order Button */}
      <div className="flex justify-between mt-8">
        <Button
          text="Back"
          className="bg-gray-300 text-black hover:bg-gray-400"
          onClick={onBack}
        />

        <Button
          text={`Confirm and Place Order (₹${totalAmount.toFixed(2)})`}
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default ConfirmationStep;