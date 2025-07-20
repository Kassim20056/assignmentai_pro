import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFloatingButton = ({
  onNewAssignment,
  onAddSource,
  onQuickUpload,
  onEmergencyHelp,
  customActions = []
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getContextualActions = () => {
    const currentPath = location.pathname;
    
    switch (currentPath) {
      case '/assignment-dashboard':
        return [
          {
            icon: 'Plus',
            label: 'New Assignment',
            action: onNewAssignment,
            color: 'bg-primary hover:bg-primary/90',
            primary: true
          },
          {
            icon: 'Upload',
            label: 'Quick Upload',
            action: onQuickUpload,
            color: 'bg-secondary hover:bg-secondary/90'
          },
          {
            icon: 'HelpCircle',
            label: 'Get Help',
            action: onEmergencyHelp,
            color: 'bg-accent hover:bg-accent/90'
          }
        ];
        
      case '/research-library':
        return [
          {
            icon: 'BookPlus',
            label: 'Add Source',
            action: onAddSource,
            color: 'bg-primary hover:bg-primary/90',
            primary: true
          },
          {
            icon: 'Search',
            label: 'Search Library',
            action: () => {},
            color: 'bg-secondary hover:bg-secondary/90'
          },
          {
            icon: 'Download',
            label: 'Export Citations',
            action: () => {},
            color: 'bg-accent hover:bg-accent/90'
          }
        ];
        
      case '/assignment-editor':
        return [
          {
            icon: 'Save',
            label: 'Quick Save',
            action: () => {},
            color: 'bg-success hover:bg-success/90',
            primary: true
          },
          {
            icon: 'BookOpen',
            label: 'Research',
            action: () => {},
            color: 'bg-primary hover:bg-primary/90'
          },
          {
            icon: 'Zap',
            label: 'AI Assist',
            action: () => {},
            color: 'bg-accent hover:bg-accent/90'
          }
        ];
        
      case '/ai-processing-center':
        return [
          {
            icon: 'Pause',
            label: 'Pause Process',
            action: () => {},
            color: 'bg-warning hover:bg-warning/90',
            primary: true
          },
          {
            icon: 'RotateCcw',
            label: 'Restart',
            action: () => {},
            color: 'bg-secondary hover:bg-secondary/90'
          }
        ];
        
      case '/quality-assurance-dashboard':
        return [
          {
            icon: 'CheckCircle',
            label: 'Run Check',
            action: () => {},
            color: 'bg-primary hover:bg-primary/90',
            primary: true
          },
          {
            icon: 'FileText',
            label: 'Generate Report',
            action: () => {},
            color: 'bg-secondary hover:bg-secondary/90'
          }
        ];
        
      default:
        return [
          {
            icon: 'Plus',
            label: 'Quick Action',
            action: () => {},
            color: 'bg-primary hover:bg-primary/90',
            primary: true
          }
        ];
    }
  };

  const actions = [...getContextualActions(), ...customActions];
  const primaryAction = actions.find(action => action.primary) || actions[0];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleActionClick = (action) => {
    action.action?.();
    setIsExpanded(false);
  };

  return (
    <>
      {/* Mobile Only - Hidden on desktop and tablet */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        {/* Expanded Action Menu */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3 animate-slide-up">
            {actions.slice(1).reverse().map((action, index) => (
              <div
                key={index}
                className="flex items-center space-x-3"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="bg-surface text-text-primary px-3 py-1 rounded-lg text-sm font-medium shadow-academic whitespace-nowrap">
                  {action.label}
                </span>
                <button
                  onClick={() => handleActionClick(action)}
                  className={`
                    w-12 h-12 rounded-full shadow-academic-lg text-white
                    flex items-center justify-center transition-spring
                    ${action.color}
                  `}
                >
                  <Icon name={action.icon} size={20} color="white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main Floating Button */}
        <div className="relative">
          {/* Primary Action Button */}
          <button
            onClick={() => handleActionClick(primaryAction)}
            onLongPress={toggleExpanded}
            className={`
              w-14 h-14 rounded-full shadow-academic-lg text-white
              flex items-center justify-center transition-spring
              ${primaryAction.color}
              ${isExpanded ? 'scale-110' : 'hover:scale-105'}
            `}
          >
            <Icon name={primaryAction.icon} size={24} color="white" />
          </button>

          {/* Expand/Collapse Toggle */}
          {actions.length > 1 && (
            <button
              onClick={toggleExpanded}
              className={`
                absolute -top-2 -right-2 w-6 h-6 rounded-full bg-surface border-2 border-primary
                flex items-center justify-center transition-spring shadow-academic
                ${isExpanded ? 'rotate-45' : 'hover:scale-110'}
              `}
            >
              <Icon 
                name={isExpanded ? "X" : "MoreHorizontal"} 
                size={12} 
                color="var(--color-primary)" 
              />
            </button>
          )}
        </div>

        {/* Backdrop */}
        {isExpanded && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </div>

      {/* Desktop/Tablet Quick Actions Bar */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <div className="bg-surface border border-border rounded-lg shadow-academic-lg p-2 flex items-center space-x-2">
          {actions.slice(0, 3).map((action, index) => (
            <Button
              key={index}
              variant={action.primary ? "default" : "ghost"}
              size="sm"
              iconName={action.icon}
              onClick={() => handleActionClick(action)}
              className={action.primary ? "" : "text-text-secondary hover:text-text-primary"}
            >
              {action.label}
            </Button>
          ))}
          
          {actions.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={toggleExpanded}
              className="text-text-secondary hover:text-text-primary"
            />
          )}
        </div>

        {/* Desktop Expanded Menu */}
        {isExpanded && actions.length > 3 && (
          <div className="absolute bottom-full right-0 mb-2 bg-surface border border-border rounded-lg shadow-academic-lg p-2 space-y-1 min-w-48">
            {actions.slice(3).map((action, index) => (
              <button
                key={index}
                onClick={() => handleActionClick(action)}
                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-sm text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-academic"
              >
                <Icon name={action.icon} size={16} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuickActionFloatingButton;