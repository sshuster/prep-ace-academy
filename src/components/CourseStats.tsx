
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, Clock, PlayCircle, Award } from 'lucide-react';

interface CourseStatsProps {
  totalCourses: number;
  completedCourses: number;
  totalHours: number;
  videosWatched: number;
}

const CourseStats: React.FC<CourseStatsProps> = ({ 
  totalCourses, 
  completedCourses, 
  totalHours, 
  videosWatched 
}) => {
  const stats = [
    {
      title: "Enrolled Courses",
      value: totalCourses,
      icon: <Award className="h-6 w-6 text-prepace-blue" />,
      description: `${completedCourses} completed`
    },
    {
      title: "Study Time",
      value: `${totalHours}h`,
      icon: <Clock className="h-6 w-6 text-prepace-orange" />,
      description: "Total hours spent"
    },
    {
      title: "Videos Watched",
      value: videosWatched,
      icon: <PlayCircle className="h-6 w-6 text-prepace-purple" />,
      description: "Lessons completed"
    },
    {
      title: "Completion Rate",
      value: `${Math.round((completedCourses / totalCourses) * 100)}%`,
      icon: <CircleCheck className="h-6 w-6 text-green-500" />,
      description: "Course completion"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className="p-2 rounded-full bg-gray-100">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CourseStats;
