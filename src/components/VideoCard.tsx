
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Play, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Video } from '@/data/mockData';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const { title, duration, watched, thumbnail } = video;
  
  return (
    <Card 
      className={cn(
        "cursor-pointer group overflow-hidden transition-all duration-300 hover:shadow-md",
        watched ? "border-green-200" : ""
      )}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-32 object-cover group-hover:brightness-75 transition-all duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black bg-opacity-50 rounded-full p-2">
              <Play className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs py-1 px-2 rounded">
            {duration}
          </div>
          {watched && (
            <div className="absolute top-2 left-2">
              <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
            </div>
          )}
        </div>
        <div className="p-3">
          <h4 className="font-medium line-clamp-2 text-sm">{title}</h4>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
