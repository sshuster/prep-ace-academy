
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseCard from '@/components/CourseCard';
import { mockCourses } from '@/data/mockData';
import { BookOpen, CheckCircle, BarChart, Award } from 'lucide-react';

const Index = () => {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-prepace-purple to-prepace-blue py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
                Ace Your Exams with Confidence
              </h1>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
                Comprehensive prep courses for SAT, ACT, and other standardized tests. 
                Study at your own pace with video lessons, practice tests, and personalized feedback.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-white text-prepace-purple hover:bg-gray-100 font-semibold px-8"
                  asChild
                >
                  <Link to="/courses">Browse Courses</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 font-semibold px-8"
                  asChild
                >
                  <Link to="/register">Start Free Trial</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Students studying" 
                className="rounded-lg shadow-2xl max-w-md w-full animate-bounce-slow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose PrepAce Academy?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach to test preparation gives you everything you need to succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-prepace-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert-Led Video Lessons</h3>
              <p className="text-gray-600">
                Learn from experienced instructors who break down complex concepts into easy-to-understand lessons.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-prepace-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice Tests & Quizzes</h3>
              <p className="text-gray-600">
                Reinforce your learning with our extensive library of practice questions and full-length tests.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart className="h-6 w-6 text-prepace-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and personalized performance insights.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Score Improvement</h3>
              <p className="text-gray-600">
                Our proven methods have helped thousands of students achieve their target scores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Button asChild variant="outline">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of students have improved their test scores with PrepAce Academy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-prepace-purple flex items-center justify-center text-white font-bold mr-3">
                  J
                </div>
                <div>
                  <h4 className="font-semibold">Jessica T.</h4>
                  <p className="text-sm text-gray-500">SAT Score: 1540</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The SAT prep course helped me raise my score by over 200 points! The video lessons were clear and the practice tests really prepared me for the actual exam."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-prepace-blue flex items-center justify-center text-white font-bold mr-3">
                  M
                </div>
                <div>
                  <h4 className="font-semibold">Michael K.</h4>
                  <p className="text-sm text-gray-500">ACT Score: 34</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I struggled with the science section of the ACT until I found PrepAce. Their targeted lessons and strategies made all the difference. Highly recommend!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-prepace-orange flex items-center justify-center text-white font-bold mr-3">
                  A
                </div>
                <div>
                  <h4 className="font-semibold">Aisha H.</h4>
                  <p className="text-sm text-gray-500">AP Scores: 5,5,4</p>
                </div>
              </div>
              <p className="text-gray-600">
                "PrepAce Academy's AP courses were instrumental in helping me earn college credit. The instructors break down complex topics in a way that's easy to understand."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-prepace-purple text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Boost Your Test Scores?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who've achieved their academic goals with PrepAce Academy.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-prepace-purple hover:bg-gray-100 font-semibold px-8"
            asChild
          >
            <Link to="/register">Get Started Today</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
