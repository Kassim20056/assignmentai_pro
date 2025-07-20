import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities = [], onViewAll }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'created': 'Plus',
      'completed': 'CheckCircle',
      'updated': 'Edit3',
      'submitted': 'Send',
      'graded': 'Award',
      'downloaded': 'Download',
      'shared': 'Share',
      'commented': 'MessageCircle',
      'deadline_reminder': 'Clock',
      'ai_generated': 'Zap'
    };
    return iconMap[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colorMap = {
      'created': 'text-primary',
      'completed': 'text-success',
      'updated': 'text-accent',
      'submitted': 'text-primary',
      'graded': 'text-success',
      'downloaded': 'text-text-secondary',
      'shared': 'text-secondary',
      'commented': 'text-accent',
      'deadline_reminder': 'text-warning',
      'ai_generated': 'text-accent'
    };
    return colorMap[type] || 'text-text-secondary';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return activityTime.toLocaleDateString();
  };

  const mockActivities = [
    {
      id: 1,
      type: 'ai_generated',
      title: 'AI completed Machine Learning Research Paper',
      description: 'Generated 3,500 words with citations and references',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      assignmentId: 1,
      assignmentTitle: 'Advanced Machine Learning Research Paper'
    },
    {
      id: 2,
      type: 'created',
      title: 'New assignment created',
      description: 'Python Web Scraping Project added to Computer Science',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      assignmentId: 5,
      assignmentTitle: 'Python Web Scraping Project'
    },
    {
      id: 3,
      type: 'completed',
      title: 'Assignment completed',
      description: 'Shakespeare Analysis Essay finished and ready for submission',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      assignmentId: 3,
      assignmentTitle: 'Shakespeare Analysis Essay'
    },
    {
      id: 4,
      type: 'graded',
      title: 'Grade received',
      description: 'Shakespeare Analysis Essay graded: 92%',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      assignmentId: 3,
      assignmentTitle: 'Shakespeare Analysis Essay'
    },
    {
      id: 5,
      type: 'deadline_reminder',
      title: 'Deadline reminder',
      description: 'Business Strategy Case Study is overdue',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      assignmentId: 4,
      assignmentTitle: 'Business Strategy Case Study'
    },
    {
      id: 6,
      type: 'updated',
      title: 'Assignment updated',
      description: 'Added new research sources to Machine Learning paper',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      assignmentId: 1,
      assignmentTitle: 'Advanced Machine Learning Research Paper'
    },
    {
      id: 7,
      type: 'downloaded',
      title: 'Assignment downloaded',
      description: 'Downloaded PDF version of completed essay',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      assignmentId: 3,
      assignmentTitle: 'Shakespeare Analysis Essay'
    },
    {
      id: 8,
      type: 'shared',
      title: 'Assignment shared',
      description: 'Shared draft with study group for feedback',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      assignmentId: 1,
      assignmentTitle: 'Advanced Machine Learning Research Paper'
    }
  ];

  const displayActivities = activities.length > 0 ? activities : mockActivities;
  const recentActivities = displayActivities.slice(0, 10);

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Activity" size={16} color="var(--color-text-primary)" />
          <h3 className="text-sm font-medium text-text-primary">Recent Activity</h3>
        </div>
        <Button
          variant="ghost"
          size="xs"
          iconName="ExternalLink"
          onClick={onViewAll}
          className="text-text-secondary hover:text-primary"
        >
          View All
        </Button>
      </div>

      {/* Activity List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-academic group"
          >
            {/* Activity Icon */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              activity.type === 'completed' || activity.type === 'graded' ? 'bg-success/10' :
              activity.type === 'created' || activity.type === 'ai_generated' ? 'bg-primary/10' :
              activity.type === 'deadline_reminder'? 'bg-warning/10' : 'bg-muted'
            }`}>
              <Icon 
                name={getActivityIcon(activity.type)} 
                size={14} 
                color={`var(--color-${getActivityColor(activity.type).replace('text-', '')})`}
              />
            </div>

            {/* Activity Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-academic">
                    {activity.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  {activity.assignmentTitle && (
                    <p className="text-xs text-primary mt-1 font-medium">
                      {activity.assignmentTitle}
                    </p>
                  )}
                </div>
                <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                  {formatTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {recentActivities.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={32} color="var(--color-text-secondary)" className="mx-auto mb-3" />
          <p className="text-sm text-text-secondary">No recent activity</p>
        </div>
      )}

      {/* Activity Summary */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-primary">
              {recentActivities.filter(a => a.type === 'ai_generated').length}
            </p>
            <p className="text-xs text-text-secondary">AI Generated</p>
          </div>
          <div>
            <p className="text-lg font-bold text-success">
              {recentActivities.filter(a => a.type === 'completed').length}
            </p>
            <p className="text-xs text-text-secondary">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;