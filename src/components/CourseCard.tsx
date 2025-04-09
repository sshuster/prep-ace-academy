
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, PlayCircle, FileText } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from '@/data/mockData';

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrolled = false }) => {
  const { id, title, description, type, level, duration, videos, quizzes, progress, imageSrc } = course;
  
  const badgeColor = () => {
    switch (type) {
      case 'SAT': return 'bg-blue-500';
      case 'ACT': return 'bg-green-500';
      case 'AP': return 'bg-purple-500';
      case 'PSAT': return 'bg-pink-500';
      case 'GRE': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow hover:shadow-md group">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge className={`${badgeColor()} hover:${badgeColor()}`}>
              {type}
            </Badge>
            <Badge variant="outline" className="bg-white">
              {level}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration} hours</span>
          </div>
          <div className="flex items-center">
            <PlayCircle className="h-4 w-4 mr-1" />
            <span>{videos} videos</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            <span>{quizzes} quizzes</span>
          </div>
        </div>
        
        {enrolled && progress !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-prepace-purple hover:bg-prepace-purple/90">
          <Link to={`/courses/${id}`}>
            {enrolled ? 'Continue Learning' : 'View Course'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
