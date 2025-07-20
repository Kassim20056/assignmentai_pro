import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SourceFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  totalSources,
  filteredCount
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sourceTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'journal', label: 'Journal Articles' },
    { value: 'book', label: 'Books' },
    { value: 'website', label: 'Websites' },
    { value: 'conference', label: 'Conference Papers' },
    { value: 'thesis', label: 'Thesis/Dissertation' },
    { value: 'report', label: 'Reports' }
  ];

  const yearRangeOptions = [
    { value: 'all', label: 'All Years' },
    { value: '2024', label: '2024' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2020-2024', label: '2020-2024' },
    { value: '2015-2024', label: '2015-2024' },
    { value: '2010-2024', label: '2010-2024' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const credibilityOptions = [
    { value: 'all', label: 'All Sources' },
    { value: '90+', label: 'Highly Credible (90%+)' },
    { value: '70+', label: 'Credible (70%+)' },
    { value: '50+', label: 'Moderately Credible (50%+)' },
    { value: '0+', label: 'All Credibility Levels' }
  ];

  const citationFormatOptions = [
    { value: 'all', label: 'All Formats' },
    { value: 'apa', label: 'APA' },
    { value: 'mla', label: 'MLA' },
    { value: 'chicago', label: 'Chicago' },
    { value: 'harvard', label: 'Harvard' },
    { value: 'ieee', label: 'IEEE' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleCheckboxChange = (key, checked) => {
    onFiltersChange({
      ...filters,
      [key]: checked
    });
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    value && value !== 'all' && value !== ''
  ).length;

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-text-primary">
            Filters
          </h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
              {activeFiltersCount} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClearFilters}
              className="text-text-secondary"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>

      {/* Results Summary */}
      <div className="px-4 py-2 bg-muted/50 text-sm text-text-secondary">
        Showing {filteredCount} of {totalSources} sources
      </div>

      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="p-4 space-y-4">
          {/* Search Query */}
          <div>
            <Input
              label="Search Sources"
              type="search"
              placeholder="Search by title, author, keywords..."
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              className="mb-0"
            />
          </div>

          {/* Source Type */}
          <div>
            <Select
              label="Source Type"
              options={sourceTypeOptions}
              value={filters.sourceType || 'all'}
              onChange={(value) => handleFilterChange('sourceType', value)}
            />
          </div>

          {/* Publication Year */}
          <div>
            <Select
              label="Publication Year"
              options={yearRangeOptions}
              value={filters.yearRange || 'all'}
              onChange={(value) => handleFilterChange('yearRange', value)}
            />
          </div>

          {/* Custom Year Range */}
          {filters.yearRange === 'custom' && (
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="From Year"
                type="number"
                placeholder="2020"
                value={filters.yearFrom || ''}
                onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
                min="1900"
                max="2024"
              />
              <Input
                label="To Year"
                type="number"
                placeholder="2024"
                value={filters.yearTo || ''}
                onChange={(e) => handleFilterChange('yearTo', e.target.value)}
                min="1900"
                max="2024"
              />
            </div>
          )}

          {/* Credibility Score */}
          <div>
            <Select
              label="Credibility Level"
              options={credibilityOptions}
              value={filters.credibility || 'all'}
              onChange={(value) => handleFilterChange('credibility', value)}
            />
          </div>

          {/* Citation Format */}
          <div>
            <Select
              label="Citation Format"
              options={citationFormatOptions}
              value={filters.citationFormat || 'all'}
              onChange={(value) => handleFilterChange('citationFormat', value)}
            />
          </div>

          {/* Advanced Options */}
          <div className="space-y-3 pt-2 border-t border-border">
            <h4 className="font-medium text-text-primary text-sm">Advanced Options</h4>
            
            <Checkbox
              label="Peer Reviewed Only"
              checked={filters.peerReviewed || false}
              onChange={(e) => handleCheckboxChange('peerReviewed', e.target.checked)}
            />
            
            <Checkbox
              label="Open Access Only"
              checked={filters.openAccess || false}
              onChange={(e) => handleCheckboxChange('openAccess', e.target.checked)}
            />
            
            <Checkbox
              label="Has DOI"
              checked={filters.hasDoi || false}
              onChange={(e) => handleCheckboxChange('hasDoi', e.target.checked)}
            />
            
            <Checkbox
              label="Favorites Only"
              checked={filters.favoritesOnly || false}
              onChange={(e) => handleCheckboxChange('favoritesOnly', e.target.checked)}
            />
            
            <Checkbox
              label="Recently Added"
              description="Added in the last 7 days"
              checked={filters.recentlyAdded || false}
              onChange={(e) => handleCheckboxChange('recentlyAdded', e.target.checked)}
            />
          </div>

          {/* Subject Tags */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Subject Tags
            </label>
            <Input
              type="text"
              placeholder="Enter tags separated by commas"
              value={filters.tags || ''}
              onChange={(e) => handleFilterChange('tags', e.target.value)}
              description="e.g., machine learning, artificial intelligence"
            />
          </div>

          {/* Citation Count Range */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Minimum Citations
            </label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minCitations || ''}
              onChange={(e) => handleFilterChange('minCitations', e.target.value)}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceFilters;