import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingTimeline = ({ 
  currentStage = 2,
  stages = [
    {
      id: 1,
      title: 'Requirement Analysis',
      description: 'Parsing assignment requirements and constraints',
      status: 'completed',
      duration: '2m 15s',
      completedAt: '2025-07-17T13:20:30Z'
    },
    {
      id: 2,
      title: 'Research Gathering',
      description: 'Collecting relevant sources and academic materials',
      status: 'processing',
      progress: 67,
      estimatedTime: '3m 45s remaining'
    },
    {
      id: 3,
      title: 'Content Generation',
      description: 'AI-powered writing and structure creation',
      status: 'pending',
      estimatedTime: '8m 30s'
    },
    {
      id: 4,
      title: 'Humanization',
      description: 'QuillBot integration for natural language processing',
      status: 'pending',
      estimatedTime: '4m 15s'
    },
    {
      id: 5,
      title: 'Quality Verification',
      description: 'AI detection and plagiarism checking',
      status: 'pending',
      estimatedTime: '2m 45s'
    }
  ]
}) => {
  const getStageIcon = (stage) => {
    switch (stage.status) {
      case 'completed':
        return 'CheckCircle';
      case 'processing':
        return 'Loader';
      case 'error':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getStageStyles = (stage) => {
    switch (stage.status) {
      case 'completed':
        return {
          container: 'bg-success/10 border-success/20',
          icon: 'text-success',
          text: 'text-success'
        };
      case 'processing':
        return {
          container: 'bg-primary/10 border-primary/20',
          icon: 'text-primary',
          text: 'text-primary'
        };
      case 'error':
        return {
          container: 'bg-error/10 border-error/20',
          icon: 'text-error',
          text: 'text-error'
        };
      default:
        return {
          container: 'bg-muted border-border',
          icon: 'text-text-secondary',
          text: 'text-text-secondary'
        };
    }
  };

  const formatDuration = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Processing Timeline
        </h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>Total Est: 21m 30s</span>
        </div>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => {
          const styles = getStageStyles(stage);
          const isActive = stage.status === 'processing';
          
          return (
            <div key={stage.id} className="relative">
              {/* Connector Line */}
              {index < stages.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border" />
              )}
              
              <div className={`
                relative flex items-start space-x-4 p-4 rounded-lg border transition-academic
                ${styles.container}
                ${isActive ? 'ring-2 ring-primary/20' : ''}
              `}>
                {/* Stage Icon */}
                <div className={`
                  w-12 h-12 rounded-full bg-surface border-2 flex items-center justify-center
                  ${styles.icon} ${isActive ? 'border-primary' : 'border-border'}
                `}>
                  <Icon 
                    name={getStageIcon(stage)} 
                    size={20} 
                    className={isActive ? 'animate-spin' : ''}
                  />
                </div>

                {/* Stage Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-medium font-heading ${styles.text}`}>
                      {stage.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs">
                      {stage.status === 'completed' && stage.completedAt && (
                        <span className="text-text-secondary">
                          {formatDuration(stage.completedAt)}
                        </span>
                      )}
                      {stage.duration && (
                        <span className={`px-2 py-1 rounded-full bg-surface ${styles.text}`}>
                          {stage.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary mb-3">
                    {stage.description}
                  </p>

                  {/* Progress Bar for Active Stage */}
                  {stage.status === 'processing' && stage.progress !== undefined && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-text-secondary">Progress</span>
                        <span className="text-xs font-medium text-primary">
                          {stage.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${stage.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Estimated Time */}
                  {stage.estimatedTime && (
                    <div className="flex items-center space-x-2 text-xs text-text-secondary">
                      <Icon name="Timer" size={12} />
                      <span>{stage.estimatedTime}</span>
                    </div>
                  )}

                  {/* Error Details */}
                  {stage.status === 'error' && stage.error && (
                    <div className="mt-3 p-3 bg-error/10 border border-error/20 rounded-md">
                      <p className="text-sm text-error mb-2">{stage.error}</p>
                      <button className="text-xs text-error hover:underline">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Progress */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Overall Progress</span>
          <span className="text-sm font-medium text-primary">
            {Math.round((stages.filter(s => s.status === 'completed').length / stages.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
            style={{ 
              width: `${(stages.filter(s => s.status === 'completed').length / stages.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingTimeline;