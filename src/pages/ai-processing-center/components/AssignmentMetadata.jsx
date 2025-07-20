import React from 'react';
import Icon from '../../../components/AppIcon';

const AssignmentMetadata = ({
  assignment = {
    title: "Advanced Machine Learning Research Paper",
    subject: "Computer Science",
    type: "Research Paper",
    wordCount: 3500,
    deadline: "2025-07-25T23:59:00Z",
    priority: "High",
    difficulty: "Advanced",
    language: "English",
    citationStyle: "APA",
    sources: 15
  },
  parameters = {
    tone: "Academic",
    complexity: "Graduate Level",
    creativity: 75,
    aiDetectionAvoidance: "Maximum",
    plagiarismThreshold: 5,
    qualityLevel: "Premium"
  },
  queuePosition = 2,
  estimatedStart = "2025-07-17T13:28:00Z"
}) => {
  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      formatted: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      urgency: diffDays <= 1 ? 'urgent' : diffDays <= 3 ? 'warning' : 'normal'
    };
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-error bg-error/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'low':
        return 'text-success bg-success/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const deadline = formatDeadline(assignment.deadline);
  const startTime = new Date(estimatedStart).toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="space-y-6">
      {/* Assignment Details */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Assignment Details
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
            {assignment.priority} Priority
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-text-primary mb-2">
              {assignment.title}
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="BookOpen" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Subject:</span>
                <span className="text-text-primary">{assignment.subject}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Type:</span>
                <span className="text-text-primary">{assignment.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Hash" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Words:</span>
                <span className="text-text-primary">{assignment.wordCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Language:</span>
                <span className="text-text-primary">{assignment.language}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Quote" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Citations:</span>
                <span className="text-text-primary">{assignment.citationStyle}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Library" size={14} color="var(--color-text-secondary)" />
                <span className="text-text-secondary">Sources:</span>
                <span className="text-text-primary">{assignment.sources}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon 
                  name="Clock" 
                  size={14} 
                  color={deadline.urgency === 'urgent' ? 'var(--color-error)' : 'var(--color-text-secondary)'} 
                />
                <span className="text-text-secondary">Deadline:</span>
                <span className={`font-medium ${
                  deadline.urgency === 'urgent' ? 'text-error' : 
                  deadline.urgency === 'warning' ? 'text-warning' : 'text-text-primary'
                }`}>
                  {deadline.formatted}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                assignment.difficulty === 'Advanced' ? 'text-error bg-error/10' :
                assignment.difficulty === 'Intermediate'? 'text-warning bg-warning/10' : 'text-success bg-success/10'
              }`}>
                {assignment.difficulty}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Processing Parameters */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Processing Parameters
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Writing Tone</span>
              <span className="text-sm font-medium text-text-primary">{parameters.tone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Complexity Level</span>
              <span className="text-sm font-medium text-text-primary">{parameters.complexity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Quality Level</span>
              <span className="text-sm font-medium text-primary">{parameters.qualityLevel}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">Creativity</span>
                <span className="text-sm font-medium text-text-primary">{parameters.creativity}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${parameters.creativity}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">AI Detection Avoidance</span>
                <span className="text-sm font-medium text-success">{parameters.aiDetectionAvoidance}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success w-full" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text-secondary">Plagiarism Threshold</span>
                <span className="text-sm font-medium text-text-primary">&lt; {parameters.plagiarismThreshold}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${100 - parameters.plagiarismThreshold * 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Queue Status */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Queue Status
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">Position in Queue</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-primary">#{queuePosition}</span>
              <span className="text-xs text-text-secondary">of 5</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Play" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">Estimated Start</span>
            </div>
            <span className="text-sm font-medium text-text-primary">{startTime}</span>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Info" size={12} />
              <span>Processing will begin automatically when your turn arrives</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentMetadata;