import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingDeadlines = ({ assignments = [], onViewAssignment }) => {
  const getDeadlineInfo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { 
        text: `${Math.abs(diffDays)}d overdue`, 
        color: 'text-error',
        bgColor: 'bg-error/10',
        urgency: 'overdue'
      };
    } else if (diffDays === 0) {
      return { 
        text: 'Due today', 
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        urgency: 'today'
      };
    } else if (diffDays === 1) {
      return { 
        text: 'Due tomorrow', 
        color: 'text-accent',
        bgColor: 'bg-accent/10',
        urgency: 'tomorrow'
      };
    } else if (diffDays <= 7) {
      return { 
        text: `${diffDays}d left`, 
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        urgency: 'week'
      };
    } else {
      return { 
        text: `${diffDays}d left`, 
        color: 'text-text-secondary',
        bgColor: 'bg-muted',
        urgency: 'later'
      };
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

  const mockUpcomingAssignments = [
    {
      id: 1,
      title: "Advanced Machine Learning Research Paper",
      subject: "Computer Science",
      deadline: "2025-07-25",
      status: "in-progress",
      progress: 65
    },
    {
      id: 2,
      title: "Calculus Problem Set #7",
      subject: "Mathematics",
      deadline: "2025-07-20",
      status: "pending",
      progress: 0
    },
    {
      id: 4,
      title: "Business Strategy Case Study",
      subject: "Business Studies",
      deadline: "2025-07-15",
      status: "overdue",
      progress: 45
    },
    {
      id: 6,
      title: "Organic Chemistry Lab Report",
      subject: "Chemistry",
      deadline: "2025-07-18",
      status: "pending",
      progress: 25
    },
    {
      id: 7,
      title: "World War II Historical Analysis",
      subject: "History",
      deadline: "2025-07-22",
      status: "draft",
      progress: 10
    }
  ];

  const displayAssignments = assignments.length > 0 ? assignments : mockUpcomingAssignments;
  
  // Sort by urgency and deadline
  const sortedAssignments = [...displayAssignments]
    .map(assignment => ({
      ...assignment,
      deadlineInfo: getDeadlineInfo(assignment.deadline)
    }))
    .sort((a, b) => {
      const urgencyOrder = { 'overdue': 0, 'today': 1, 'tomorrow': 2, 'week': 3, 'later': 4 };
      const urgencyDiff = urgencyOrder[a.deadlineInfo.urgency] - urgencyOrder[b.deadlineInfo.urgency];
      
      if (urgencyDiff !== 0) return urgencyDiff;
      
      // If same urgency, sort by actual deadline
      return new Date(a.deadline) - new Date(b.deadline);
    })
    .slice(0, 8); // Show only top 8 most urgent

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} color="var(--color-text-primary)" />
          <h3 className="text-sm font-medium text-text-primary">Upcoming Deadlines</h3>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="Calendar"
          className="text-text-secondary hover:text-primary"
        >
          View All
        </Button>
      </div>

      {/* Deadline List */}
      <div className="space-y-3">
        {sortedAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-academic cursor-pointer group"
            onClick={() => onViewAssignment?.(assignment)}
          >
            {/* Subject Icon */}
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getSubjectIcon(assignment.subject)} 
                size={14} 
                color="var(--color-primary)" 
              />
            </div>

            {/* Assignment Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-text-primary line-clamp-1 group-hover:text-primary transition-academic">
                {assignment.title}
              </h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-text-secondary">
                  {assignment.subject}
                </span>
                <span className="text-xs text-text-secondary">•</span>
                <span className="text-xs text-text-secondary">
                  {assignment.progress}% complete
                </span>
              </div>
            </div>

            {/* Deadline Badge */}
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${assignment.deadlineInfo.color} ${assignment.deadlineInfo.bgColor}`}>
              {assignment.deadlineInfo.text}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedAssignments.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No upcoming deadlines</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-error">
              {sortedAssignments.filter(a => a.deadlineInfo.urgency === 'overdue').length}
            </p>
            <p className="text-xs text-text-secondary">Overdue</p>
          </div>
          <div>
            <p className="text-lg font-bold text-accent">
              {sortedAssignments.filter(a => ['today', 'tomorrow'].includes(a.deadlineInfo.urgency)).length}
            </p>
            <p className="text-xs text-text-secondary">Due Soon</p>
          </div>
          <div>
            <p className="text-lg font-bold text-warning">
              {sortedAssignments.filter(a => a.deadlineInfo.urgency === 'week').length}
            </p>
            <p className="text-xs text-text-secondary">This Week</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDeadlines;