import React from 'react';
import Icon from '../../../components/AppIcon';

const QualityMetricsOverview = ({ metrics = {} }) => {
  const defaultMetrics = {
    aiDetectionScore: 92,
    plagiarismPercentage: 3.2,
    citationAccuracy: 88,
    overallQuality: 85,
    trends: {
      aiDetection: 5,
      plagiarism: -1.2,
      citations: 3,
      overall: 2
    }
  };

  const currentMetrics = { ...defaultMetrics, ...metrics };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/20';
    if (score >= 75) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-error bg-error/10 border-error/20';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-text-secondary' };
  };

  const MetricCard = ({ title, value, unit, trend, icon, description }) => {
    const scoreColor = getScoreColor(value);
    const trendInfo = getTrendIcon(trend);

    return (
      <div className="bg-card border border-border rounded-lg p-6 shadow-academic">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name={icon} size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
              <p className="text-xs text-text-secondary/75">{description}</p>
            </div>
          </div>
          <div className={`flex items-center space-x-1 ${trendInfo.color}`}>
            <Icon name={trendInfo.icon} size={14} />
            <span className="text-xs font-medium">
              {Math.abs(trend)}{unit === '%' ? 'pp' : '%'}
            </span>
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-text-primary">
              {value}{unit}
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${scoreColor}`}>
              {value >= 90 ? 'Excellent' : value >= 75 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
          
          <div className="w-16 h-16">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-muted)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeDasharray={`${value}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Quality Metrics Overview
        </h2>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Clock" size={16} />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard
          title="AI Detection Score"
          value={currentMetrics.aiDetectionScore}
          unit="%"
          trend={currentMetrics.trends.aiDetection}
          icon="Shield"
          description="Human-like content score"
        />
        
        <MetricCard
          title="Plagiarism Check"
          value={currentMetrics.plagiarismPercentage}
          unit="%"
          trend={currentMetrics.trends.plagiarism}
          icon="Search"
          description="Originality verification"
        />
        
        <MetricCard
          title="Citation Accuracy"
          value={currentMetrics.citationAccuracy}
          unit="%"
          trend={currentMetrics.trends.citations}
          icon="BookOpen"
          description="Reference formatting"
        />
        
        <MetricCard
          title="Overall Quality"
          value={currentMetrics.overallQuality}
          unit="%"
          trend={currentMetrics.trends.overall}
          icon="Award"
          description="Composite quality score"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Icon name="Zap" size={20} color="var(--color-accent)" />
            <div>
              <h3 className="text-sm font-medium text-text-primary">Quick Quality Boost</h3>
              <p className="text-xs text-text-secondary">Run automated improvements on current assignment</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-academic">
              Enhance Now
            </button>
            <button className="px-3 py-1.5 bg-surface border border-border text-text-secondary rounded-md text-sm font-medium hover:bg-muted transition-academic">
              Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityMetricsOverview;