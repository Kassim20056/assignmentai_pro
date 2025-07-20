import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCards = ({ 
  assignments = [], 
  onEdit, 
  onDuplicate, 
  onDownload, 
  onDelete 
}) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-accent/10 text-accent', icon: 'Clock' },
      'in-progress': { color: 'bg-primary/10 text-primary', icon: 'Play' },
      'completed': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'overdue': { color: 'bg-error/10 text-error', icon: 'AlertTriangle' },
      'draft': { color: 'bg-muted text-text-secondary', icon: 'Edit3' }
    };

    const config = statusConfig[status] || statusConfig['pending'];
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span className="capitalize">{status.replace('-', ' ')}</span>
      </span>
    );
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-error' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-accent' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-accent' };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: 'text-accent' };
    } else {
      return { text: `Due ${date.toLocaleDateString()}`, color: 'text-text-secondary' };
    }
  };

  const getSubjectIcon = (subject) => {
    const subjectIcons = {
      'Computer Science': 'Code',
      'Mathematics': 'Calculator',
      'English Literature': 'BookOpen',
      'Business Studies': 'Briefcase',
      'Psychology': 'Brain',
      'Chemistry': 'Flask',
      'Physics': 'Zap',
      'History': 'Clock'
    };
    return subjectIcons[subject] || 'FileText';
  };

  const mockAssignments = [
    {
      id: 1,
      title: "Advanced Machine Learning Research Paper",
      subject: "Computer Science",
      type: "Research Paper",
      deadline: "2025-07-25",
      status: "in-progress",
      priority: "high",
      progress: 65,
      grade: null,
      wordCount: 3500,
      targetWords: 5000,
      description: "Comprehensive analysis of deep learning algorithms and their applications in computer vision and natural language processing.",
      createdAt: "2025-07-10"
    },
    {
      id: 2,
      title: "Calculus Problem Set #7",
      subject: "Mathematics",
      type: "Problem Set",
      deadline: "2025-07-20",
      status: "pending",
      priority: "medium",
      progress: 0,
      grade: null,
      wordCount: 0,
      targetWords: 2000,
      description: "Integration techniques, differential equations, and series convergence problems.",
      createdAt: "2025-07-15"
    },
    {
      id: 3,
      title: "Shakespeare Analysis Essay",
      subject: "English Literature",
      type: "Essay",
      deadline: "2025-07-18",
      status: "completed",
      priority: "low",
      progress: 100,
      grade: 92,
      wordCount: 1800,
      targetWords: 1800,
      description: "Literary analysis of themes and character development in Hamlet.",
      createdAt: "2025-07-05"
    },
    {
      id: 4,
      title: "Business Strategy Case Study",
      subject: "Business Studies",
      type: "Case Study",
      deadline: "2025-07-15",
      status: "overdue",
      priority: "high",
      progress: 45,
      grade: null,
      wordCount: 1200,
      targetWords: 3000,
      description: "Analysis of competitive strategies in the tech industry with focus on market positioning.",
      createdAt: "2025-07-08"
    }
  ];

  const displayAssignments = assignments.length > 0 ? assignments : mockAssignments;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {displayAssignments.map((assignment) => {
        const deadline = formatDeadline(assignment.deadline);
        
        return (
          <div
            key={assignment.id}
            className="bg-surface border border-border rounded-lg p-6 hover:shadow-academic-lg transition-academic group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon 
                    name={getSubjectIcon(assignment.subject)} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-text-primary line-clamp-1">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {assignment.subject}
                  </p>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="opacity-0 group-hover:opacity-100 transition-academic">
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Edit3"
                    onClick={() => onEdit?.(assignment)}
                    className="text-text-secondary hover:text-primary"
                  />
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="MoreHorizontal"
                    className="text-text-secondary hover:text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">
              {assignment.description}
            </p>

            {/* Status and Priority */}
            <div className="flex items-center justify-between mb-4">
              {getStatusBadge(assignment.status)}
              <span className={`text-xs px-2 py-1 rounded ${
                assignment.priority === 'high' ? 'bg-error/10 text-error' :
                assignment.priority === 'medium'? 'bg-accent/10 text-accent' : 'bg-success/10 text-success'
              }`}>
                {assignment.priority} priority
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-text-secondary">Progress</span>
                <span className="text-xs font-medium text-text-primary">
                  {assignment.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${assignment.progress}%` }}
                />
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Type</span>
                <span className="text-text-primary">{assignment.type}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-text-secondary">Deadline</span>
                <span className={deadline.color}>{deadline.text}</span>
              </div>
              {assignment.wordCount > 0 && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Word Count</span>
                  <span className="text-text-primary">
                    {assignment.wordCount.toLocaleString()}
                    {assignment.targetWords > 0 && ` / ${assignment.targetWords.toLocaleString()}`}
                  </span>
                </div>
              )}
              {assignment.grade && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Grade</span>
                  <span className="text-success font-medium">{assignment.grade}%</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                iconName="Edit3"
                onClick={() => onEdit?.(assignment)}
                fullWidth
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                onClick={() => onDownload?.(assignment)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={() => onDuplicate?.(assignment)}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                onClick={() => onDelete?.(assignment)}
                className="text-error hover:text-error"
              />
            </div>
          </div>
        );
      })}

      {/* Empty State */}
      {displayAssignments.length === 0 && (
        <div className="col-span-full text-center py-12">
          <Icon name="FileText" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No assignments found</h3>
          <p className="text-text-secondary mb-4">Get started by creating your first assignment</p>
          <Button variant="default" iconName="Plus">
            Create Assignment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AssignmentCards;