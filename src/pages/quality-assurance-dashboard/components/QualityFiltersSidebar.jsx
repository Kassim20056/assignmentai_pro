import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const QualityFiltersSidebar = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({
    timeRange: '7d',
    qualityThreshold: 80,
    assignmentTypes: ['essay', 'research'],
    detectionServices: ['originality', 'gptzero'],
    showOnlyIssues: false,
    includeArchived: false
  });

  const timeRangeOptions = [
    { value: '1d', label: 'Last 24 hours' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: 'all', label: 'All time' }
  ];

  const assignmentTypeOptions = [
    { value: 'essay', label: 'Essays' },
    { value: 'research', label: 'Research Papers' },
    { value: 'report', label: 'Reports' },
    { value: 'thesis', label: 'Thesis' },
    { value: 'coding', label: 'Coding Projects' }
  ];

  const detectionServiceOptions = [
    { value: 'originality', label: 'Originality.ai' },
    { value: 'gptzero', label: 'GPTZero' },
    { value: 'copyleaks', label: 'Copyleaks' },
    { value: 'turnitin', label: 'Turnitin' }
  ];

  const qualityThresholds = [
    { value: 60, label: '60% - Basic', color: 'text-error' },
    { value: 70, label: '70% - Fair', color: 'text-warning' },
    { value: 80, label: '80% - Good', color: 'text-primary' },
    { value: 90, label: '90% - Excellent', color: 'text-success' }
  ];

  const historicalComparisons = [
    { period: 'Last Week', change: '+5.2%', trend: 'up', color: 'text-success' },
    { period: 'Last Month', change: '+12.8%', trend: 'up', color: 'text-success' },
    { period: 'Last Quarter', change: '-2.1%', trend: 'down', color: 'text-error' }
  ];

  const improvementSuggestions = [
    {
      id: 1,
      title: 'Enhance Citation Formatting',
      description: 'Switch to APA 7th edition for better compliance',
      impact: 'High',
      effort: 'Low',
      icon: 'BookOpen'
    },
    {
      id: 2,
      title: 'Improve Sentence Variety',
      description: 'Use more complex sentence structures',
      impact: 'Medium',
      effort: 'Medium',
      icon: 'Edit3'
    },
    {
      id: 3,
      title: 'Add Transition Phrases',
      description: 'Better paragraph flow and coherence',
      impact: 'Medium',
      effort: 'Low',
      icon: 'ArrowRight'
    }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const getImpactColor = (impact) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quality Filters */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quality Filters
        </h3>
        
        <div className="space-y-4">
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters.timeRange}
            onChange={(value) => handleFilterChange('timeRange', value)}
          />
          
          <Select
            label="Assignment Types"
            options={assignmentTypeOptions}
            value={filters.assignmentTypes}
            onChange={(value) => handleFilterChange('assignmentTypes', value)}
            multiple
          />
          
          <Select
            label="Detection Services"
            options={detectionServiceOptions}
            value={filters.detectionServices}
            onChange={(value) => handleFilterChange('detectionServices', value)}
            multiple
          />
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Quality Threshold: {filters.qualityThreshold}%
            </label>
            <input
              type="range"
              min="50"
              max="100"
              step="5"
              value={filters.qualityThreshold}
              onChange={(e) => handleFilterChange('qualityThreshold', parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Checkbox
              label="Show only assignments with issues"
              checked={filters.showOnlyIssues}
              onChange={(e) => handleFilterChange('showOnlyIssues', e.target.checked)}
            />
            <Checkbox
              label="Include archived assignments"
              checked={filters.includeArchived}
              onChange={(e) => handleFilterChange('includeArchived', e.target.checked)}
            />
          </div>
        </div>
      </div>

      {/* Historical Comparisons */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Historical Comparison
        </h3>
        
        <div className="space-y-3">
          {historicalComparisons.map((comparison, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-text-primary">{comparison.period}</p>
                <p className="text-xs text-text-secondary">Quality improvement</p>
              </div>
              <div className={`flex items-center space-x-1 ${comparison.color}`}>
                <Icon 
                  name={comparison.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                  size={14} 
                />
                <span className="text-sm font-medium">{comparison.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Suggestions */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Improvement Suggestions
          </h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-academic">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {improvementSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={suggestion.icon} size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-text-primary">{suggestion.title}</h4>
                  <p className="text-xs text-text-secondary mt-1">{suggestion.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(suggestion.impact)}`}>
                      {suggestion.impact} Impact
                    </span>
                    <span className="text-xs text-text-secondary">
                      {suggestion.effort} Effort
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4 shadow-academic">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-muted/50 hover:bg-muted rounded-lg transition-academic">
            <Icon name="RefreshCw" size={16} color="var(--color-primary)" />
            <span className="text-sm text-text-primary">Refresh Analysis</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-muted/50 hover:bg-muted rounded-lg transition-academic">
            <Icon name="Download" size={16} color="var(--color-secondary)" />
            <span className="text-sm text-text-primary">Export Report</span>
          </button>
          
          <button className="w-full flex items-center space-x-3 p-3 text-left bg-muted/50 hover:bg-muted rounded-lg transition-academic">
            <Icon name="Settings" size={16} color="var(--color-text-secondary)" />
            <span className="text-sm text-text-primary">Configure Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualityFiltersSidebar;