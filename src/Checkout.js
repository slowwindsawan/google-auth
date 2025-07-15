import React, { useState } from 'react';
import { Check, CreditCard, Lock } from 'lucide-react';

const CheckoutPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const email = queryParams.get('email');

  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const plans = [
    { id: 'monthly', name: 'Monthly', price: '$14.99', period: '/month' },
    { id: 'yearly', name: 'Yearly', price: '$99.99', period: '/year', savings: 'Save 20%' },
  ];

  const monthlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97636&page-template=18913&exfo=742&x-userEmail=${email}&billing-email=${email}`;
  const yearlyCheckoutUrl = `https://store.payproglobal.com/checkout?products[1][id]=97637&page-template=18913&exfo=742&x-userEmail=${email}&billing-email=${email}`;

  const checkoutUrl = selectedPlan === 'yearly' ? yearlyCheckoutUrl : monthlyCheckoutUrl;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-10">
        <h1 className="text-center text-3xl md:text-4xl font-extrabold text-blue-700 mb-6">
          Upgrade to Premium
        </h1>

        <div className="text-center text-blue-700 bg-blue-100 px-4 py-3 rounded-lg font-medium mb-6 text-base md:text-lg">
          {selectedPlan === 'yearly' ? (
            <span>🎉 Save $60/year with our yearly plan!</span>
          ) : (
            <span>💡 Switch to yearly and get 2 months free!</span>
          )}
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`px-4 py-2 rounded-xl font-semibold text-sm md:text-base transition-all border-2 ${
                selectedPlan === plan.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
              }`}
            >
              {plan.name}
              <span className="ml-2 text-sm font-medium text-blue-500">
                {plan.savings || ''}
              </span>
            </button>
          ))}
        </div>

        <div className="rounded-xl p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            Complete Your Payment
          </h2>

          <div className="w-full h-[100vh] overflow-hidden rounded-lg">
            <iframe
              src={checkoutUrl}
              title="Payment Checkout"
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
