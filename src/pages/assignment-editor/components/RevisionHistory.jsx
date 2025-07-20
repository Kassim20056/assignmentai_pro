import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RevisionHistory = ({
  revisions = [],
  currentRevision = null,
  onSelectRevision,
  onCompareRevisions,
  onRestoreRevision,
  onCreateCheckpoint
}) => {
  const [selectedRevisions, setSelectedRevisions] = useState([]);
  const [showDetails, setShowDetails] = useState(null);

  const mockRevisions = [
    {
      id: 'rev-7',
      version: '1.7',
      timestamp: new Date('2025-07-17T13:20:00'),
      author: 'You',
      type: 'manual',
      changes: {
        added: 156,
        removed: 23,
        modified: 8
      },
      description: 'Added conclusion section and refined methodology',
      wordCount: 2847,
      isCurrent: true,
      checkpoint: false
    },
    {
      id: 'rev-6',
      version: '1.6',
      timestamp: new Date('2025-07-17T12:45:00'),
      author: 'AI Assistant',
      type: 'ai-generated',
      changes: {
        added: 234,
        removed: 12,
        modified: 15
      },
      description: 'AI-generated content for literature review section',
      wordCount: 2714,
      isCurrent: false,
      checkpoint: true
    },
    {
      id: 'rev-5',
      version: '1.5',
      timestamp: new Date('2025-07-17T11:30:00'),
      author: 'You',
      type: 'manual',
      changes: {
        added: 89,
        removed: 45,
        modified: 12
      },
      description: 'Restructured introduction and added problem statement',
      wordCount: 2492,
      isCurrent: false,
      checkpoint: false
    },
    {
      id: 'rev-4',
      version: '1.4',
      timestamp: new Date('2025-07-17T10:15:00'),
      author: 'Collaborator',
      type: 'collaborative',
      changes: {
        added: 67,
        removed: 34,
        modified: 9
      },
      description: 'Peer review feedback incorporated',
      wordCount: 2448,
      isCurrent: false,
      checkpoint: false
    },
    {
      id: 'rev-3',
      version: '1.3',
      timestamp: new Date('2025-07-16T16:20:00'),
      author: 'You',
      type: 'manual',
      changes: {
        added: 178,
        removed: 56,
        modified: 23
      },
      description: 'Major revision with new research findings',
      wordCount: 2415,
      isCurrent: false,
      checkpoint: true
    }
  ];

  const revisionsData = revisions.length > 0 ? revisions : mockRevisions;

  const getTypeIcon = (type) => {
    switch (type) {
      case 'manual':
        return 'User';
      case 'ai-generated':
        return 'Bot';
      case 'collaborative':
        return 'Users';
      case 'auto-save':
        return 'Save';
      default:
        return 'FileText';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'manual':
        return 'text-primary';
      case 'ai-generated':
        return 'text-accent';
      case 'collaborative':
        return 'text-secondary';
      case 'auto-save':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const handleRevisionSelect = (revisionId) => {
    if (selectedRevisions.includes(revisionId)) {
      setSelectedRevisions(selectedRevisions.filter(id => id !== revisionId));
    } else if (selectedRevisions.length < 2) {
      setSelectedRevisions([...selectedRevisions, revisionId]);
    }
  };

  const handleCompare = () => {
    if (selectedRevisions.length === 2) {
      onCompareRevisions?.(selectedRevisions[0], selectedRevisions[1]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-semibold text-text-primary">
            Revision History
          </h3>
          <Button
            variant="ghost"
            size="xs"
            iconName="Bookmark"
            onClick={onCreateCheckpoint}
          />
        </div>

        {selectedRevisions.length === 2 && (
          <Button
            variant="outline"
            size="sm"
            iconName="GitCompare"
            onClick={handleCompare}
            fullWidth
          >
            Compare Selected
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {revisionsData.map(revision => (
            <div
              key={revision.id}
              className={`
                p-3 border rounded-lg transition-academic cursor-pointer
                ${revision.isCurrent 
                  ? 'border-primary bg-primary/5' 
                  : selectedRevisions.includes(revision.id)
                    ? 'border-accent bg-accent/5' :'border-border hover:bg-muted/50'
                }
              `}
              onClick={() => handleRevisionSelect(revision.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getTypeIcon(revision.type)} 
                    size={14} 
                    className={getTypeColor(revision.type)}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    v{revision.version}
                  </span>
                  {revision.checkpoint && (
                    <Icon name="Bookmark" size={12} className="text-accent" />
                  )}
                  {revision.isCurrent && (
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      Current
                    </span>
                  )}
                </div>
                
                <Button
                  variant="ghost"
                  size="xs"
                  iconName={showDetails === revision.id ? "ChevronUp" : "ChevronDown"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(showDetails === revision.id ? null : revision.id);
                  }}
                />
              </div>

              <p className="text-xs text-text-secondary mb-2">
                {revision.description}
              </p>

              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>{revision.author}</span>
                <span>{formatTimestamp(revision.timestamp)}</span>
              </div>

              {showDetails === revision.id && (
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-success font-medium">+{revision.changes.added}</div>
                      <div className="text-text-secondary">Added</div>
                    </div>
                    <div className="text-center">
                      <div className="text-error font-medium">-{revision.changes.removed}</div>
                      <div className="text-text-secondary">Removed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-accent font-medium">{revision.changes.modified}</div>
                      <div className="text-text-secondary">Modified</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-secondary">
                      {revision.wordCount} words
                    </span>
                    
                    {!revision.isCurrent && (
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="RotateCcw"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestoreRevision?.(revision.id);
                        }}
                        className="text-xs"
                      >
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <div className="text-xs text-text-secondary space-y-1">
          <div className="flex justify-between">
            <span>Total Revisions:</span>
            <span>{revisionsData.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Checkpoints:</span>
            <span>{revisionsData.filter(r => r.checkpoint).length}</span>
          </div>
          <div className="flex justify-between">
            <span>Last Modified:</span>
            <span>{formatTimestamp(revisionsData[0]?.timestamp)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevisionHistory;