
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import CourseCard from '@/components/CourseCard';
import VideoCard from '@/components/VideoCard';
import CourseStats from '@/components/CourseStats';
import ProgressChart from '@/components/charts/ProgressChart';
import ScoreChart from '@/components/charts/ScoreChart';
import { mockCourses, mockVideos, userProgressData, mockScoreData } from '@/data/mockData';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const enrolledCourses = mockCourses.slice(0, 4); // First 4 courses as enrolled
  const recentVideos = mockVideos.slice(0, 3); // First 3 videos as recent

  if (!user) {
    return null; // Or a loading state
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">Track your progress and continue your test prep journey.</p>
          </div>
          
          {/* Course statistics */}
          <div className="mb-10">
            <CourseStats 
              totalCourses={enrolledCourses.length}
              completedCourses={1}
              totalHours={28}
              videosWatched={8}
            />
          </div>
          
          {/* Charts - progress and scores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <ProgressChart data={userProgressData} />
            <ScoreChart data={mockScoreData} />
          </div>
          
          {/* My courses section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button variant="outline" onClick={() => navigate('/courses')}>
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {enrolledCourses.map(course => (
                <CourseCard key={course.id} course={course} enrolled={true} />
              ))}
            </div>
          </div>
          
          {/* Continue learning section */}
          <div className="mb-10">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Continue Learning</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentVideos.map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video} 
                      onClick={() => navigate(`/courses/${video.courseId}`)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommended practice */}
          <div>
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-bold">Recommended Practice</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">SAT Math - Algebra Practice</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Based on your recent test results, we recommend practicing more algebra questions.
                      </p>
                      <Button variant="outline" className="w-full">Start Practice</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">SAT Reading - Evidence Questions</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Improve your skills in identifying textual evidence for reading comprehension.
                      </p>
                      <Button variant="outline" className="w-full">Start Practice</Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">Full-Length Practice Test</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Take a complete practice test to assess your overall readiness.
                      </p>
                      <Button variant="outline" className="w-full">Begin Test</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
