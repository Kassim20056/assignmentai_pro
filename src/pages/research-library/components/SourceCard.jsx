import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SourceCard = ({ 
  source, 
  onCite, 
  onAddNote, 
  onToggleFavorite, 
  onLinkToAssignment,
  onPreview,
  viewMode = 'list'
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'journal':
        return 'BookOpen';
      case 'book':
        return 'Book';
      case 'website':
        return 'Globe';
      case 'conference':
        return 'Users';
      case 'thesis':
        return 'GraduationCap';
      case 'report':
        return 'FileText';
      default:
        return 'File';
    }
  };

  const getCredibilityColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10';
    if (score >= 70) return 'text-primary bg-primary/10';
    if (score >= 50) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (viewMode === 'grid') {
    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-academic transition-academic">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name={getSourceTypeIcon(source.type)} size={16} color="var(--color-primary)" />
            <span className="text-xs text-text-secondary uppercase font-medium">{source.type}</span>
          </div>
          <Button
            variant="ghost"
            size="xs"
            iconName={source.isFavorite ? "Heart" : "Heart"}
            onClick={() => onToggleFavorite(source.id)}
            className={source.isFavorite ? "text-error" : "text-text-secondary"}
          />
        </div>

        <h3 className="font-heading font-semibold text-sm text-text-primary mb-2 line-clamp-2">
          {source.title}
        </h3>

        <p className="text-xs text-text-secondary mb-3 line-clamp-2">
          {source.authors.join(', ')} • {source.year}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getCredibilityColor(source.credibilityScore)}`}>
            {source.credibilityScore}% credible
          </div>
          {source.citationCount && (
            <span className="text-xs text-text-secondary">
              {source.citationCount} citations
            </span>
          )}
        </div>

        <div className="flex space-x-1">
          <Button
            variant="outline"
            size="xs"
            iconName="Quote"
            onClick={() => onCite(source)}
            fullWidth
          >
            Cite
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Eye"
            onClick={() => onPreview(source)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-academic transition-academic">
      <div className="flex items-start space-x-4">
        {/* Source Thumbnail */}
        <div className="flex-shrink-0 w-16 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
          {source.thumbnail ? (
            <Image 
              src={source.thumbnail} 
              alt={source.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name={getSourceTypeIcon(source.type)} size={24} color="var(--color-text-secondary)" />
          )}
        </div>

        {/* Source Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs text-text-secondary uppercase font-medium">{source.type}</span>
                <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCredibilityColor(source.credibilityScore)}`}>
                  {source.credibilityScore}%
                </div>
                {source.isPeerReviewed && (
                  <div className="px-2 py-0.5 rounded-full text-xs font-medium text-success bg-success/10">
                    Peer Reviewed
                  </div>
                )}
              </div>
              
              <h3 className="font-heading font-semibold text-text-primary mb-1 line-clamp-2">
                {source.title}
              </h3>
              
              <p className="text-sm text-text-secondary mb-2">
                {source.authors.join(', ')} • {source.year}
                {source.journal && ` • ${source.journal}`}
              </p>
            </div>

            <div className="flex items-center space-x-1 ml-4">
              <Button
                variant="ghost"
                size="xs"
                iconName={source.isFavorite ? "Heart" : "Heart"}
                onClick={() => onToggleFavorite(source.id)}
                className={source.isFavorite ? "text-error" : "text-text-secondary"}
              />
              <Button
                variant="ghost"
                size="xs"
                iconName="MoreHorizontal"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>

          {/* Abstract/Summary */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {source.abstract}
          </p>

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-xs text-text-secondary mb-3">
            {source.doi && (
              <span className="flex items-center space-x-1">
                <Icon name="Link" size={12} />
                <span>DOI: {source.doi}</span>
              </span>
            )}
            {source.citationCount && (
              <span className="flex items-center space-x-1">
                <Icon name="Quote" size={12} />
                <span>{source.citationCount} citations</span>
              </span>
            )}
            <span className="flex items-center space-x-1">
              <Icon name="Calendar" size={12} />
              <span>Added {formatDate(source.dateAdded)}</span>
            </span>
          </div>

          {/* Tags */}
          {source.tags && source.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {source.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 bg-muted text-text-secondary text-xs rounded-full">
                  {tag}
                </span>
              ))}
              {source.tags.length > 3 && (
                <span className="px-2 py-0.5 bg-muted text-text-secondary text-xs rounded-full">
                  +{source.tags.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Quote"
              onClick={() => onCite(source)}
            >
              Cite
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="StickyNote"
              onClick={() => onAddNote(source)}
            >
              Note
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Link2"
              onClick={() => onLinkToAssignment(source)}
            >
              Link
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={() => onPreview(source)}
            >
              Preview
            </Button>
          </div>

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Publication Details</h4>
                  <div className="space-y-1 text-text-secondary">
                    {source.publisher && <p>Publisher: {source.publisher}</p>}
                    {source.volume && <p>Volume: {source.volume}</p>}
                    {source.issue && <p>Issue: {source.issue}</p>}
                    {source.pages && <p>Pages: {source.pages}</p>}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-text-primary mb-2">Research Metrics</h4>
                  <div className="space-y-1 text-text-secondary">
                    <p>Impact Factor: {source.impactFactor || 'N/A'}</p>
                    <p>H-Index: {source.hIndex || 'N/A'}</p>
                    <p>Relevance Score: {source.relevanceScore}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SourceCard;