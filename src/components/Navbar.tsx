
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, BookOpen, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full bg-white shadow-sm z-50 sticky top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-prepace-purple" />
              <span className="text-xl font-bold text-prepace-dark">PrepAce Academy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-prepace-dark hover:text-prepace-purple transition-colors font-medium">
              Home
            </Link>
            <Link to="/courses" className="text-prepace-dark hover:text-prepace-purple transition-colors font-medium">
              Courses
            </Link>
            <Link to="/pricing" className="text-prepace-dark hover:text-prepace-purple transition-colors font-medium">
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full p-0 h-10 w-10 bg-prepace-light">
                    <User className="h-5 w-5 text-prepace-purple" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  {user?.role === 'admin' && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Portal</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/login')}
                  className="text-prepace-dark hover:text-prepace-purple"
                >
                  Log in
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-prepace-purple hover:bg-prepace-purple/90 text-white"
                >
                  Sign up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isAuthenticated && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2 rounded-full p-0 h-10 w-10 bg-prepace-light"
                onClick={() => navigate('/dashboard')}
              >
                <User className="h-5 w-5 text-prepace-purple" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-prepace-dark"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <Link 
              to="/" 
              className="block py-2 text-prepace-dark hover:text-prepace-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/courses" 
              className="block py-2 text-prepace-dark hover:text-prepace-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link 
              to="/pricing" 
              className="block py-2 text-prepace-dark hover:text-prepace-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="block py-2 text-prepace-dark hover:text-prepace-purple"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Portal
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block py-2 w-full text-left text-prepace-dark hover:text-prepace-purple"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 text-prepace-dark hover:text-prepace-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 text-prepace-dark hover:text-prepace-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
