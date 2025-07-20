import React from 'react';
import Icon from '../../../components/AppIcon';

const AssignmentStatsCards = ({ stats = {} }) => {
  const defaultStats = {
    total: 24,
    pending: 8,
    inProgress: 6,
    completed: 9,
    overdue: 1,
    completionRate: 75,
    avgGrade: 87.5,
    upcomingDeadlines: 5
  };

  const currentStats = { ...defaultStats, ...stats };

  const statCards = [
    {
      title: 'Total Assignments',
      value: currentStats.total,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+3 this week',
      changeType: 'positive'
    },
    {
      title: 'In Progress',
      value: currentStats.inProgress,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '2 due today',
      changeType: 'warning'
    },
    {
      title: 'Completed',
      value: currentStats.completed,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+2 this week',
      changeType: 'positive'
    },
    {
      title: 'Overdue',
      value: currentStats.overdue,
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: 'Needs attention',
      changeType: 'negative'
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'warning':
        return 'text-accent';
      case 'negative':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-4 hover:shadow-academic transition-academic"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-text-secondary font-medium">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                  {card.value}
                </p>
                <p className={`text-xs mt-2 ${getChangeColor(card.changeType)}`}>
                  {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon name={card.icon} size={20} color={`var(--color-${card.color.replace('text-', '')})`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Completion Rate */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-primary">Completion Rate</h3>
            <span className="text-lg font-bold text-success">{currentStats.completionRate}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-success transition-all duration-500"
              style={{ width: `${currentStats.completionRate}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {currentStats.completed} of {currentStats.total} assignments completed
          </p>
        </div>

        {/* Average Grade */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text-primary">Average Grade</h3>
            <span className="text-lg font-bold text-primary">{currentStats.avgGrade}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${currentStats.avgGrade}%` }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            Based on {currentStats.completed} completed assignments
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h3 className="text-sm font-medium text-text-primary mb-3">Quick Insights</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Upcoming Deadlines</span>
            <span className="text-accent font-medium">{currentStats.upcomingDeadlines} this week</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Most Active Subject</span>
            <span className="text-text-primary font-medium">Computer Science</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Success Rate</span>
            <span className="text-success font-medium">94.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentStatsCards;