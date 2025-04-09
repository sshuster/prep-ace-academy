
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";

// Mock users for frontend testing
const MOCK_USERS = [
  { id: 1, username: 'muser', password: 'muser', name: 'Mock User', role: 'user' },
  { id: 2, username: 'mvc', password: 'mvc', name: 'Mock Admin', role: 'admin' }
];

type User = {
  id: number;
  username: string;
  name: string;
  role: 'admin' | 'user';
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, name: string) => Promise<boolean>;
  allUsers: User[];
  removeUser: (userId: number) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([...MOCK_USERS]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('prepace_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Try to authenticate with mock users first (frontend only)
    const mockUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (mockUser) {
      const { password, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('prepace_user', JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      return true;
    }

    // In a real app, we would check with the backend here
    // For now, just simulate a server call
    try {
      // This would be a fetch to the backend in a real application
      const apiUser = allUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (apiUser) {
        const { password, ...userWithoutPassword } = apiUser;
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        localStorage.setItem('prepace_user', JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${userWithoutPassword.name}!`);
        return true;
      }
      
      toast.error("Invalid username or password");
      return false;
    } catch (error) {
      toast.error("Login failed. Please try again later.");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('prepace_user');
    setUser(null);
    setIsAuthenticated(false);
    toast.info("You have been logged out");
  };

  const register = async (username: string, password: string, name: string): Promise<boolean> => {
    // Check if username already exists
    if (allUsers.some(u => u.username === username)) {
      toast.error("Username already exists");
      return false;
    }

    try {
      // This would be a fetch to the backend in a real application
      const newUser = {
        id: allUsers.length + 1,
        username,
        password, // In real app, this would be hashed on the server
        name,
        role: 'user' as const
      };
      
      setAllUsers(prev => [...prev, newUser]);
      
      // Automatically log in the new user
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      localStorage.setItem('prepace_user', JSON.stringify(userWithoutPassword));
      
      toast.success("Registration successful!");
      return true;
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
      return false;
    }
  };

  const removeUser = (userId: number) => {
    // Check if trying to remove a mock user
    if (MOCK_USERS.some(u => u.id === userId)) {
      toast.error("Cannot remove demo users");
      return;
    }
    
    setAllUsers(users => users.filter(u => u.id !== userId));
    toast.success("User removed successfully");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        register, 
        allUsers, 
        removeUser, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
