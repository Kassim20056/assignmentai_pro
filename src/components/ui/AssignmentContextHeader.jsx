import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AssignmentContextHeader = ({ 
  assignmentTitle = "Advanced Machine Learning Research Paper",
  subject = "Computer Science",
  deadline = "2025-07-25",
  progress = 65,
  status = "In Progress",
  onSwitchAssignment,
  onViewDetails
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in progress':
        return 'text-primary bg-primary/10';
      case 'overdue':
        return 'text-error bg-error/10';
      case 'draft':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <div className="sticky top-16 z-50 bg-surface border-b border-border shadow-academic">
      <div className="px-6 py-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Assignment Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  {assignmentTitle}
                </h2>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="BookOpen" size={14} />
                    <span>{subject}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{formatDeadline(deadline)}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status}
            </div>
          </div>

          {/* Progress and Actions */}
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">Progress:</span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-text-primary">{progress}%</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                onClick={onViewDetails}
              />
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                onClick={onSwitchAssignment}
              >
                Switch
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="FileText" size={16} color="var(--color-primary)" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-heading font-semibold text-text-primary truncate">
                  {assignmentTitle}
                </h2>
                <div className="flex items-center space-x-2 text-xs text-text-secondary">
                  <span>{subject}</span>
                  <span>•</span>
                  <span>{formatDeadline(deadline)}</span>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>

          {/* Expanded Mobile Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                  {status}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">Progress:</span>
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-text-primary">{progress}%</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={onSwitchAssignment}
                  fullWidth
                >
                  Switch Assignment
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={onViewDetails}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentContextHeader;