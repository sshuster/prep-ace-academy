
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { pricingPlans } from '@/data/mockData';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();

  const commonFeatures = [
    "1000+ practice questions",
    "Full-length practice tests",
    "Progress tracking",
    "Desktop and mobile access"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-prepace-purple to-prepace-blue py-16 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Choose the plan that best fits your test preparation needs. All plans include access to our core features.
            </p>
          </div>
        </section>
        
        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingPlans.map(plan => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-2">All plans include:</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 max-w-3xl mx-auto">
                {commonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Can I cancel my subscription?</h3>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
                  <p className="text-gray-600">
                    We offer a 7-day free trial for all new users. You can try any plan before committing to a subscription.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Can I upgrade or downgrade my plan?</h3>
                  <p className="text-gray-600">
                    Yes, you can change your plan at any time. If you upgrade, you'll be charged the prorated difference. If you downgrade, the new rate will apply at the next billing cycle.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Are there group or school discounts?</h3>
                  <p className="text-gray-600">
                    Yes, we offer special pricing for schools and groups of 10 or more students. Contact our sales team for details.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">How often is new content added?</h3>
                  <p className="text-gray-600">
                    We regularly update our content to reflect changes in test formats and to add new practice materials. Updates typically occur monthly.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, PayPal, and Apple Pay. For schools and institutions, we also accept purchase orders.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-prepace-purple text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Test Prep Journey?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful students who've improved their test scores with PrepAce Academy.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-prepace-purple hover:bg-gray-100 font-semibold px-8"
              onClick={() => navigate('/register')}
            >
              Start Your Free Trial
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
