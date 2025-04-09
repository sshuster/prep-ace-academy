
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface UserRowProps {
  id: number;
  username: string;
  name: string;
  role: string;
  onDelete: (id: number) => void;
}

const UserRow: React.FC<UserRowProps> = ({ id, username, name, role, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{id}</td>
      <td className="p-4">{username}</td>
      <td className="p-4">{name}</td>
      <td className="p-4">
        <span 
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}
        >
          {role}
        </span>
      </td>
      <td className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
};

export default UserRow;
