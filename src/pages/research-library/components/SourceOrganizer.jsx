import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SourceOrganizer = ({ 
  folders, 
  collections, 
  selectedFolder, 
  selectedCollection,
  onFolderSelect,
  onCollectionSelect,
  onCreateFolder,
  onCreateCollection,
  sourceCounts
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState(new Set(['root']));

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderFolder = (folder, level = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolder === folder.id;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-academic
            ${isSelected ? 'bg-primary/10 text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-muted'}
          `}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => onFolderSelect(folder.id)}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="p-0.5 hover:bg-muted rounded"
            >
              <Icon 
                name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                size={12} 
              />
            </button>
          )}
          {!hasChildren && <div className="w-4" />}
          
          <Icon 
            name={isExpanded && hasChildren ? "FolderOpen" : "Folder"} 
            size={16} 
            color={isSelected ? "var(--color-primary)" : "currentColor"}
          />
          
          <span className="flex-1 text-sm font-medium">{folder.name}</span>
          
          {sourceCounts[folder.id] && (
            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
              {sourceCounts[folder.id]}
            </span>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div>
            {folder.children.map(child => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="FolderTree" size={20} color="var(--color-primary)" />
          <h3 className="font-heading font-semibold text-text-primary">
            Organization
          </h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="lg:hidden"
        />
      </div>

      {/* Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        {/* Smart Collections */}
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Sparkles" size={14} />
            <span>Smart Collections</span>
          </h4>
          
          <div className="space-y-1">
            {collections.map(collection => (
              <div
                key={collection.id}
                className={`
                  flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-academic
                  ${selectedCollection === collection.id 
                    ? 'bg-primary/10 text-primary' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
                onClick={() => onCollectionSelect(collection.id)}
              >
                <Icon 
                  name={collection.icon} 
                  size={16} 
                  color={selectedCollection === collection.id ? "var(--color-primary)" : "currentColor"}
                />
                <span className="flex-1 text-sm font-medium">{collection.name}</span>
                <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                  {collection.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Folders */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-text-primary flex items-center space-x-2">
              <Icon name="Folder" size={14} />
              <span>Folders</span>
            </h4>
            <Button
              variant="ghost"
              size="xs"
              iconName="Plus"
              onClick={onCreateFolder}
              className="text-text-secondary"
            />
          </div>
          
          <div className="space-y-1">
            {folders.map(folder => renderFolder(folder))}
          </div>
        </div>

        {/* Subject Tags */}
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Tag" size={14} />
            <span>Popular Tags</span>
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {[
              'Machine Learning',
              'AI Ethics',
              'Deep Learning',
              'Computer Vision',
              'NLP',
              'Robotics',
              'Data Science',
              'Neural Networks'
            ].map((tag, index) => (
              <button
                key={index}
                className="px-2 py-1 bg-muted hover:bg-primary/10 hover:text-primary text-text-secondary text-xs rounded-full transition-academic"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
          
          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              iconName="Plus"
              onClick={onCreateCollection}
              fullWidth
              className="justify-start text-text-secondary"
            >
              Create Collection
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Upload"
              fullWidth
              className="justify-start text-text-secondary"
            >
              Import Sources
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              fullWidth
              className="justify-start text-text-secondary"
            >
              Export Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SourceOrganizer;