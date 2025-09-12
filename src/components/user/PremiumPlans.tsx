
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Diamond, 
  Check, 
  Clock, 
  BookOpen, 
  Headphones, 
  Zap,
  MessageSquare,
  Award,
  Shield,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PaymentSection from '../payment/PaymentSection';

// Country-based pricing configuration
const countryPricing = {
  'US': { currency: 'USD', monthlyPrice: 14.99, quarterlyPrice: 39.99, yearlyPrice: 149.99 },
  'UK': { currency: 'GBP', monthlyPrice: 11.99, quarterlyPrice: 32.99, yearlyPrice: 119.99 },
  'IN': { currency: 'INR', monthlyPrice: 999, quarterlyPrice: 2699, yearlyPrice: 9999 },
  'AU': { currency: 'AUD', monthlyPrice: 19.99, quarterlyPrice: 53.99, yearlyPrice: 199.99 },
  'CA': { currency: 'CAD', monthlyPrice: 19.99, quarterlyPrice: 53.99, yearlyPrice: 199.99 },
  'NZ': { currency: 'NZD', monthlyPrice: 22.99, quarterlyPrice: 61.99, yearlyPrice: 229.99 },
  'SG': { currency: 'SGD', monthlyPrice: 19.99, quarterlyPrice: 53.99, yearlyPrice: 199.99 },
  'default': { currency: 'USD', monthlyPrice: 14.99, quarterlyPrice: 39.99, yearlyPrice: 149.99 }
};

// Currency symbols for formatting
const currencySymbols = {
  'USD': '$',
  'GBP': '£',
  'INR': '₹',
  'AUD': 'A$',
  'CAD': 'C$',
  'NZD': 'NZ$',
  'SGD': 'S$'
};

const PremiumPlans = () => {
  const { toast } = useToast();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [userCountry, setUserCountry] = useState('default');
  const [pricing, setPricing] = useState(countryPricing.default);

  useEffect(() => {
    // Get the country from localStorage
    const country = localStorage.getItem('selectedCountry');
    if (country && countryPricing[country]) {
      setUserCountry(country);
      setPricing(countryPricing[country]);
    }
  }, []);

  // Format price with currency symbol
  const formatPrice = (price: number) => {
    const symbol = currencySymbols[pricing.currency] || '$';
    return `${symbol}${price}`;
  };

  const plans = [
    {
      id: 'monthly',
      name: 'Monthly',
      price: formatPrice(pricing.monthlyPrice),
      period: `per month`,
      color: 'bg-indigo hover:bg-indigo/90',
      features: [
        'Full access to all practice modules',
        'Unlimited AI writing assessments',
        'Basic speaking feedback',
        'Access to 10 mock tests'
      ],
      mostPopular: false
    },
    {
      id: 'quarterly',
      name: 'Quarterly',
      price: formatPrice(pricing.quarterlyPrice),
      period: `per 3 months`,
      color: 'bg-teal hover:bg-teal/90',
      features: [
        'Everything in Monthly',
        'Personalized study plan',
        'Detailed performance analytics',
        'Access to 30 mock tests',
        'Priority support'
      ],
      mostPopular: true,
      savePercent: '11%'
    },
    {
      id: 'yearly',
      name: 'Yearly',
      price: formatPrice(pricing.yearlyPrice),
      period: `per year`,
      color: 'bg-coral hover:bg-coral/90',
      features: [
        'Everything in Quarterly',
        'Expert review for writing tasks',
        'Live speaking practice sessions',
        'Unlimited mock tests',
        '1-on-1 coaching session',
        'Score guarantee program'
      ],
      mostPopular: false,
      savePercent: '17%'
    }
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setShowDialog(true);
  };

  const handleConfirmUpgrade = () => {
    setShowDialog(false);
    setShowPayment(true);
  };
  
  const handleBackToPlans = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  if (showPayment && selectedPlan) {
    return <PaymentSection planId={selectedPlan} onBack={handleBackToPlans} />;
  }

  return (
    <>
      <Card className="w-full shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Diamond className="mr-2 h-5 w-5 text-indigo" />
            Upgrade Your IELTS Preparation
            {userCountry !== 'default' && (
              <div className="ml-auto flex items-center text-sm text-muted-foreground">
                <Globe className="h-4 w-4 mr-1.5" />
                Prices shown in {pricing.currency}
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`relative border rounded-xl p-6 ${
                  plan.mostPopular 
                    ? 'border-teal shadow-md' 
                    : 'border-muted hover:border-indigo/50'
                } transition-all duration-300 flex flex-col h-full`}
              >
                {plan.mostPopular && (
                  <Badge className="absolute -top-2 -right-2 bg-teal">
                    Most Popular
                  </Badge>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  {plan.savePercent && (
                    <Badge variant="outline" className="mt-1 text-coral">
                      Save {plan.savePercent}
                    </Badge>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className={`w-full text-white ${plan.color}`}
                  onClick={() => handleUpgrade(plan.id)}
                >
                  Upgrade Now
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-indigo mr-2" />
              <h3 className="font-medium">All plans include:</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo" />
                <span className="text-sm">Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo" />
                <span className="text-sm">Updated study materials</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="h-4 w-4 text-indigo" />
                <span className="text-sm">Access to all listening resources</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-indigo" />
                <span className="text-sm">Performance tracking</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Upgrade</DialogTitle>
            <DialogDescription>
              You're about to upgrade to our {selectedPlan} plan. This will give you access to premium features to enhance your IELTS preparation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <Award className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Premium Benefits</h4>
                <p className="text-sm text-muted-foreground">Unlock advanced features including expert evaluations and personalized guidance</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-muted">
              <MessageSquare className="h-5 w-5 text-indigo mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Priority Support</h4>
                <p className="text-sm text-muted-foreground">Get fast responses from our IELTS experts whenever you need help</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-indigo hover:bg-indigo/90" onClick={handleConfirmUpgrade}>
              Proceed to Payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumPlans;
