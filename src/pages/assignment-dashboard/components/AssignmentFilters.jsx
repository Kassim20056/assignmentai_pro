import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssignmentFilters = ({ onFilterChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'english', label: 'English Literature' },
    { value: 'business', label: 'Business Studies' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'physics', label: 'Physics' },
    { value: 'history', label: 'History' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'draft', label: 'Draft' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange?.({
      ...activeFilters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange?.({
      subject: 'all',
      status: 'all',
      priority: 'all',
      showCompleted: true,
      showOverdue: true
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (activeFilters.subject && activeFilters.subject !== 'all') count++;
    if (activeFilters.status && activeFilters.status !== 'all') count++;
    if (activeFilters.priority && activeFilters.priority !== 'all') count++;
    if (!activeFilters.showCompleted) count++;
    if (!activeFilters.showOverdue) count++;
    return count;
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} color="var(--color-text-primary)" />
          <h3 className="text-sm font-medium text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={clearAllFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Filter Content */}
      <div className={`space-y-4 ${isExpanded ? 'block' : 'hidden lg:block'}`}>
        {/* Subject Filter */}
        <div>
          <Select
            label="Subject"
            options={subjectOptions}
            value={activeFilters.subject || 'all'}
            onChange={(value) => handleFilterChange('subject', value)}
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div>
          <Select
            label="Status"
            options={statusOptions}
            value={activeFilters.status || 'all'}
            onChange={(value) => handleFilterChange('status', value)}
            className="w-full"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <Select
            label="Priority"
            options={priorityOptions}
            value={activeFilters.priority || 'all'}
            onChange={(value) => handleFilterChange('priority', value)}
            className="w-full"
          />
        </div>

        {/* Quick Checkboxes */}
        <div className="space-y-3 pt-2 border-t border-border">
          <Checkbox
            label="Show Completed"
            checked={activeFilters.showCompleted !== false}
            onChange={(e) => handleFilterChange('showCompleted', e.target.checked)}
          />
          <Checkbox
            label="Show Overdue"
            checked={activeFilters.showOverdue !== false}
            onChange={(e) => handleFilterChange('showOverdue', e.target.checked)}
          />
        </div>

        {/* Date Range Quick Filters */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide">
            Due Date
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleFilterChange('dateRange', 'today')}
              className={`text-xs ${activeFilters.dateRange === 'today' ? 'bg-primary/10 text-primary' : 'text-text-secondary'}`}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleFilterChange('dateRange', 'week')}
              className={`text-xs ${activeFilters.dateRange === 'week' ? 'bg-primary/10 text-primary' : 'text-text-secondary'}`}
            >
              This Week
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleFilterChange('dateRange', 'month')}
              className={`text-xs ${activeFilters.dateRange === 'month' ? 'bg-primary/10 text-primary' : 'text-text-secondary'}`}
            >
              This Month
            </Button>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleFilterChange('dateRange', 'overdue')}
              className={`text-xs ${activeFilters.dateRange === 'overdue' ? 'bg-error/10 text-error' : 'text-text-secondary'}`}
            >
              Overdue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentFilters;