import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ResearchSourcesPanel = ({
  sources = [],
  onAddSource,
  onRemoveSource,
  onCiteSource,
  onVerifySource
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockSources = [
    {
      id: '1',
      title: 'Machine Learning: A Probabilistic Perspective',
      authors: ['Kevin P. Murphy'],
      type: 'book',
      year: 2012,
      publisher: 'MIT Press',
      url: 'https://example.com/source1',
      verified: true,
      cited: true,
      category: 'primary',
      notes: 'Comprehensive overview of ML algorithms and theory',
      addedDate: '2025-07-15'
    },
    {
      id: '2',
      title: 'Deep Learning for Natural Language Processing',
      authors: ['Yoav Goldberg'],
      type: 'journal',
      year: 2017,
      journal: 'Journal of Artificial Intelligence Research',
      url: 'https://example.com/source2',
      verified: true,
      cited: false,
      category: 'secondary',
      notes: 'Excellent resource for NLP applications',
      addedDate: '2025-07-16'
    },
    {
      id: '3',
      title: 'Attention Is All You Need',
      authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar'],
      type: 'conference',
      year: 2017,
      conference: 'NIPS',
      url: 'https://example.com/source3',
      verified: true,
      cited: true,
      category: 'primary',
      notes: 'Foundational paper on transformer architecture',
      addedDate: '2025-07-17'
    },
    {
      id: '4',
      title: 'AI Ethics and Bias in Machine Learning',
      authors: ['Sarah Chen'],
      type: 'website',
      year: 2024,
      website: 'AI Research Blog',
      url: 'https://example.com/source4',
      verified: false,
      cited: false,
      category: 'supplementary',
      notes: 'Recent discussion on ethical considerations',
      addedDate: '2025-07-17'
    }
  ];

  const sourcesData = sources.length > 0 ? sources : mockSources;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book':
        return 'Book';
      case 'journal':
        return 'FileText';
      case 'conference':
        return 'Users';
      case 'website':
        return 'Globe';
      default:
        return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'book':
        return 'text-primary';
      case 'journal':
        return 'text-success';
      case 'conference':
        return 'text-accent';
      case 'website':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getCategoryBadge = (category) => {
    const styles = {
      primary: 'bg-primary/10 text-primary',
      secondary: 'bg-secondary/10 text-secondary',
      supplementary: 'bg-accent/10 text-accent'
    };
    return styles[category] || 'bg-muted text-text-secondary';
  };

  const filteredSources = sourcesData.filter(source => {
    const matchesSearch = source.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         source.authors.some(author => author.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || source.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatAuthors = (authors) => {
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
    return `${authors[0]} et al.`;
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-semibold text-text-primary">
            Research Sources
          </h3>
          <Button
            variant="ghost"
            size="xs"
            iconName="Plus"
            onClick={onAddSource}
          />
        </div>

        <Input
          type="search"
          placeholder="Search sources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3"
        />

        <div className="flex space-x-1">
          {['all', 'primary', 'secondary', 'supplementary'].map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-2 py-1 text-xs rounded-md transition-academic capitalize
                ${selectedCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:bg-muted'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filteredSources.map(source => (
            <div
              key={source.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-academic"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTypeIcon(source.type)} 
                    size={14} 
                    className={getTypeColor(source.type)}
                  />
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryBadge(source.category)}`}>
                    {source.category}
                  </span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {source.verified && (
                    <Icon name="CheckCircle" size={12} className="text-success" />
                  )}
                  {source.cited && (
                    <Icon name="Quote" size={12} className="text-primary" />
                  )}
                </div>
              </div>

              <h4 className="text-sm font-medium text-text-primary mb-1 line-clamp-2">
                {source.title}
              </h4>

              <p className="text-xs text-text-secondary mb-2">
                {formatAuthors(source.authors)} ({source.year})
              </p>

              {source.notes && (
                <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                  {source.notes}
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Quote"
                    onClick={() => onCiteSource?.(source.id)}
                    className="text-xs"
                  >
                    Cite
                  </Button>
                  
                  {!source.verified && (
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Shield"
                      onClick={() => onVerifySource?.(source.id)}
                      className="text-xs text-warning"
                    >
                      Verify
                    </Button>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ExternalLink"
                  onClick={() => window.open(source.url, '_blank')}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>Total Sources:</span>
            <span>{sourcesData.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Cited:</span>
            <span>{sourcesData.filter(s => s.cited).length}</span>
          </div>
          <div className="flex justify-between">
            <span>Verified:</span>
            <span>{sourcesData.filter(s => s.verified).length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchSourcesPanel;