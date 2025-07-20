import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentOutline = ({ 
  outline = [],
  currentSection = null,
  onSectionClick,
  onAddSection,
  onDeleteSection,
  onReorderSection
}) => {
  const [expandedSections, setExpandedSections] = useState(new Set(['1', '2', '3']));

  const mockOutline = [
    {
      id: '1',
      title: 'Introduction',
      level: 1,
      wordCount: 245,
      status: 'completed',
      subsections: [
        { id: '1.1', title: 'Background', level: 2, wordCount: 120, status: 'completed' },
        { id: '1.2', title: 'Problem Statement', level: 2, wordCount: 125, status: 'completed' }
      ]
    },
    {
      id: '2',
      title: 'Literature Review',
      level: 1,
      wordCount: 892,
      status: 'in-progress',
      subsections: [
        { id: '2.1', title: 'Theoretical Framework', level: 2, wordCount: 456, status: 'completed' },
        { id: '2.2', title: 'Recent Studies', level: 2, wordCount: 436, status: 'in-progress' }
      ]
    },
    {
      id: '3',
      title: 'Methodology',
      level: 1,
      wordCount: 0,
      status: 'pending',
      subsections: []
    },
    {
      id: '4',
      title: 'Results',
      level: 1,
      wordCount: 0,
      status: 'pending',
      subsections: []
    },
    {
      id: '5',
      title: 'Discussion',
      level: 1,
      wordCount: 0,
      status: 'pending',
      subsections: []
    },
    {
      id: '6',
      title: 'Conclusion',
      level: 1,
      wordCount: 0,
      status: 'pending',
      subsections: []
    }
  ];

  const outlineData = outline.length > 0 ? outline : mockOutline;

  const toggleSection = (sectionId) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-primary';
      case 'pending':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const renderSection = (section, isSubsection = false) => {
    const isExpanded = expandedSections.has(section.id);
    const hasSubsections = section.subsections && section.subsections.length > 0;
    const isActive = currentSection === section.id;

    return (
      <div key={section.id} className={`${isSubsection ? 'ml-4' : ''}`}>
        <div
          className={`
            group flex items-center justify-between p-2 rounded-lg cursor-pointer transition-academic
            ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
          `}
          onClick={() => onSectionClick?.(section.id)}
        >
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            {hasSubsections && !isSubsection && (
              <Button
                variant="ghost"
                size="xs"
                iconName={isExpanded ? "ChevronDown" : "ChevronRight"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection(section.id);
                }}
                className="p-0 h-4 w-4"
              />
            )}
            
            <Icon 
              name={getStatusIcon(section.status)} 
              size={14} 
              className={getStatusColor(section.status)}
            />
            
            <span className={`text-sm font-medium truncate ${isSubsection ? 'text-text-secondary' : ''}`}>
              {section.title}
            </span>
          </div>

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-academic">
            <span className="text-xs text-text-secondary">
              {section.wordCount}w
            </span>
            
            <Button
              variant="ghost"
              size="xs"
              iconName="MoreHorizontal"
              onClick={(e) => {
                e.stopPropagation();
                // Show context menu
              }}
              className="p-0 h-4 w-4"
            />
          </div>
        </div>

        {hasSubsections && isExpanded && (
          <div className="mt-1 space-y-1">
            {section.subsections.map(subsection => renderSection(subsection, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-heading font-semibold text-text-primary">
            Document Outline
          </h3>
          <Button
            variant="ghost"
            size="xs"
            iconName="Plus"
            onClick={onAddSection}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {outlineData.map(section => renderSection(section))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>Total Sections:</span>
            <span>{outlineData.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Word Count:</span>
            <span>{outlineData.reduce((total, section) => total + section.wordCount, 0)}</span>
          </div>
          <div className="flex justify-between">
            <span>Completed:</span>
            <span>{outlineData.filter(s => s.status === 'completed').length}/{outlineData.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentOutline;