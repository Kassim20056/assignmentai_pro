import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QualityScoreWidget = ({
  overallScore = 85,
  scores = {},
  onRunCheck,
  onViewDetails,
  isChecking = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockScores = {
    grammar: { score: 92, status: 'excellent', issues: 2 },
    readability: { score: 78, status: 'good', issues: 5 },
    plagiarism: { score: 95, status: 'excellent', issues: 0 },
    aiDetection: { score: 88, status: 'good', issues: 1 },
    citations: { score: 82, status: 'good', issues: 3 },
    structure: { score: 90, status: 'excellent', issues: 1 }
  };

  const scoresData = Object.keys(scores).length > 0 ? scores : mockScores;

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBackground = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 75) return 'bg-primary/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return 'CheckCircle';
      case 'good':
        return 'AlertCircle';
      case 'needs-improvement':
        return 'AlertTriangle';
      case 'poor':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-success';
      case 'good':
        return 'text-primary';
      case 'needs-improvement':
        return 'text-warning';
      case 'poor':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const formatCategoryName = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1');
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div className={`
        bg-surface border border-border rounded-lg shadow-academic-lg transition-all duration-300
        ${isExpanded ? 'w-80' : 'w-64'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                ${getScoreBackground(overallScore)} ${getScoreColor(overallScore)}
              `}>
                {overallScore}
              </div>
              <div>
                <h3 className="text-sm font-heading font-semibold text-text-primary">
                  Quality Score
                </h3>
                <p className="text-xs text-text-secondary">
                  Overall assessment
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="xs"
              iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            {Object.entries(scoresData).map(([category, data]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(data.status)} 
                    size={14} 
                    className={getStatusColor(data.status)}
                  />
                  <span className="text-sm text-text-primary">
                    {formatCategoryName(category)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getScoreColor(data.score)}`}>
                    {data.score}%
                  </span>
                  {data.issues > 0 && (
                    <span className="text-xs text-text-secondary">
                      ({data.issues})
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName={isChecking ? "Loader" : "RefreshCw"}
              onClick={onRunCheck}
              disabled={isChecking}
              className={isChecking ? "animate-spin" : ""}
            >
              {isChecking ? 'Checking...' : 'Recheck'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              onClick={onViewDetails}
            >
              Details
            </Button>
          </div>
        </div>

        {/* Quick Insights */}
        {isExpanded && (
          <div className="px-4 pb-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-xs font-medium text-text-primary mb-2">
                Quick Insights
              </h4>
              <div className="space-y-1 text-xs text-text-secondary">
                {overallScore >= 90 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={10} className="text-success" />
                    <span>Excellent quality - ready for submission</span>
                  </div>
                )}
                {overallScore >= 75 && overallScore < 90 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertCircle" size={10} className="text-primary" />
                    <span>Good quality - minor improvements suggested</span>
                  </div>
                )}
                {overallScore < 75 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={10} className="text-warning" />
                    <span>Needs improvement before submission</span>
                  </div>
                )}
                
                {scoresData.plagiarism?.score < 95 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={10} className="text-warning" />
                    <span>Check for potential plagiarism issues</span>
                  </div>
                )}
                
                {scoresData.aiDetection?.score < 85 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Bot" size={10} className="text-warning" />
                    <span>Consider humanizing AI-generated content</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QualityScoreWidget;