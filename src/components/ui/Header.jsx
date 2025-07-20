import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/assignment-dashboard',
      icon: 'LayoutDashboard',
      stage: 1,
      tooltip: 'Assignment portfolio and project management'
    },
    {
      label: 'Create',
      path: '/assignment-creation-wizard',
      icon: 'Plus',
      stage: 2,
      tooltip: 'Start new assignment with intelligent setup'
    },
    {
      label: 'Process',
      path: '/ai-processing-center',
      icon: 'Cpu',
      stage: 3,
      tooltip: 'Monitor AI generation and processing'
    },
    {
      label: 'Edit',
      path: '/assignment-editor',
      icon: 'Edit3',
      stage: 4,
      tooltip: 'Refine content and collaborate'
    },
    {
      label: 'Research',
      path: '/research-library',
      icon: 'BookOpen',
      stage: 5,
      tooltip: 'Manage sources and citations'
    },
    {
      label: 'Quality',
      path: '/quality-assurance-dashboard',
      icon: 'Shield',
      stage: 6,
      tooltip: 'Ensure academic standards and AI detection avoidance'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-surface border-b border-border shadow-academic">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                AssignmentAI Pro
              </h1>
              <span className="text-xs text-text-secondary font-caption">
                Academic Excellence Platform
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-academic
                ${isActiveRoute(item.path)
                  ? 'bg-primary text-primary-foreground shadow-academic'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
              title={item.tooltip}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconPosition="left"
              onClick={() => {}}
              className="text-text-secondary"
            >
              Search
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              onClick={() => {}}
              className="text-text-secondary relative"
            >
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-text-primary">Student</p>
              <p className="text-xs text-text-secondary">Premium Plan</p>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            onClick={toggleMobileMenu}
            className="lg:hidden text-text-secondary"
          />
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-[1100] bg-background">
          <nav className="p-6 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-academic
                  ${isActiveRoute(item.path)
                    ? 'bg-primary text-primary-foreground shadow-academic'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
              >
                <Icon name={item.icon} size={20} />
                <div>
                  <span className="block font-medium">{item.label}</span>
                  <span className="block text-xs opacity-75">{item.tooltip}</span>
                </div>
              </button>
            ))}
            
            {/* Mobile Quick Actions */}
            <div className="pt-4 border-t border-border space-y-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-academic">
                <Icon name="Search" size={20} />
                <span>Search Assignments</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-muted transition-academic">
                <Icon name="Bell" size={20} />
                <span>Notifications</span>
                <span className="ml-auto w-2 h-2 bg-accent rounded-full"></span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;