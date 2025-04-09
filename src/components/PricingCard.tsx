
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from 'lucide-react';
import { PricingPlan } from '@/data/mockData';

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  const { name, price, features, recommended, description } = plan;
  
  return (
    <Card className={`flex flex-col h-full relative ${recommended ? 'border-prepace-purple shadow-lg' : ''}`}>
      {recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-prepace-purple text-white px-4 py-1 rounded-full text-sm font-medium">
          Recommended
        </div>
      )}
      <CardHeader className={recommended ? 'pt-8' : ''}>
        <CardTitle className="text-2xl font-bold text-center">{name}</CardTitle>
        <p className="text-center text-gray-600 mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/month</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${
            recommended 
              ? 'bg-prepace-purple hover:bg-prepace-purple/90' 
              : 'bg-prepace-blue hover:bg-prepace-blue/90'
          }`}
        >
          Choose {name}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
