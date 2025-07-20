import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RequirementAnalysis = ({ analysisData, onEditRequirement, onConfirmAnalysis }) => {
  const mockAnalysisData = analysisData || {
    detectedRequirements: {
      deadline: "2025-07-25",
      wordCount: "1500-2000",
      subject: "Computer Science",
      assignmentType: "Research Paper",
      citationFormat: "APA",
      sources: "5+ academic sources"
    },
    assignmentClassification: {
      type: "Academic Research Paper",
      complexity: "Intermediate",
      confidence: 92
    },
    extractedTopics: [
      "Machine Learning Algorithms",
      "Neural Networks",
      "Deep Learning Applications",
      "AI Ethics and Bias",
      "Future of AI Technology"
    ],
    suggestedOutline: [
      "Introduction to Machine Learning",
      "Historical Development and Evolution",
      "Core Algorithms and Methodologies",
      "Current Applications and Case Studies",
      "Ethical Considerations and Challenges",
      "Future Directions and Conclusions"
    ],
    qualityMetrics: {
      clarity: 88,
      completeness: 85,
      feasibility: 90
    }
  };

  const getComplexityColor = (complexity) => {
    switch (complexity.toLowerCase()) {
      case 'beginner':
        return 'text-success bg-success/10';
      case 'intermediate':
        return 'text-warning bg-warning/10';
      case 'advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return `Overdue by ${Math.abs(diffDays)} days`;
    } else if (diffDays === 0) {
      return 'Due today';
    } else if (diffDays === 1) {
      return 'Due tomorrow';
    } else {
      return `Due in ${diffDays} days`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Analysis Header */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            AI Analysis Results
          </h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success">Analysis Complete</span>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Brain" size={24} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-text-primary">Analysis Confidence</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-success transition-all duration-500"
                  style={{ width: `${mockAnalysisData.assignmentClassification.confidence}%` }}
                />
              </div>
              <span className={`text-sm font-medium ${getConfidenceColor(mockAnalysisData.assignmentClassification.confidence)}`}>
                {mockAnalysisData.assignmentClassification.confidence}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detected Requirements */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Detected Requirements
          </h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Edit3"
            onClick={onEditRequirement}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Deadline */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-text-primary">Deadline</span>
            </div>
            <p className="text-sm text-text-secondary">
              {new Date(mockAnalysisData.detectedRequirements.deadline).toLocaleDateString()}
            </p>
            <p className="text-xs text-warning mt-1">
              {formatDeadline(mockAnalysisData.detectedRequirements.deadline)}
            </p>
          </div>

          {/* Word Count */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="FileText" size={16} color="var(--color-secondary)" />
              <span className="text-sm font-medium text-text-primary">Word Count</span>
            </div>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.detectedRequirements.wordCount} words
            </p>
          </div>

          {/* Subject */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BookOpen" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-text-primary">Subject</span>
            </div>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.detectedRequirements.subject}
            </p>
          </div>

          {/* Assignment Type */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Layers" size={16} color="var(--color-primary)" />
              <span className="text-sm font-medium text-text-primary">Type</span>
            </div>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.detectedRequirements.assignmentType}
            </p>
          </div>

          {/* Citation Format */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Quote" size={16} color="var(--color-secondary)" />
              <span className="text-sm font-medium text-text-primary">Citations</span>
            </div>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.detectedRequirements.citationFormat} Format
            </p>
          </div>

          {/* Sources */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Link" size={16} color="var(--color-accent)" />
              <span className="text-sm font-medium text-text-primary">Sources</span>
            </div>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.detectedRequirements.sources}
            </p>
          </div>
        </div>
      </div>

      {/* Assignment Classification */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Assignment Classification
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="Target" size={24} color="var(--color-primary)" />
            </div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Type</h4>
            <p className="text-sm text-text-secondary">
              {mockAnalysisData.assignmentClassification.type}
            </p>
          </div>

          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="TrendingUp" size={24} color="var(--color-warning)" />
            </div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Complexity</h4>
            <span className={`text-sm px-2 py-1 rounded-full ${getComplexityColor(mockAnalysisData.assignmentClassification.complexity)}`}>
              {mockAnalysisData.assignmentClassification.complexity}
            </span>
          </div>

          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name="CheckCircle" size={24} color="var(--color-success)" />
            </div>
            <h4 className="text-sm font-medium text-text-primary mb-1">Confidence</h4>
            <p className={`text-sm font-medium ${getConfidenceColor(mockAnalysisData.assignmentClassification.confidence)}`}>
              {mockAnalysisData.assignmentClassification.confidence}%
            </p>
          </div>
        </div>
      </div>

      {/* Extracted Topics */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Key Topics Identified
        </h3>
        <div className="flex flex-wrap gap-2">
          {mockAnalysisData.extractedTopics.map((topic, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Suggested Outline */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Suggested Outline
        </h3>
        <div className="space-y-2">
          {mockAnalysisData.suggestedOutline.map((section, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                {index + 1}
              </div>
              <span className="text-sm text-text-primary">{section}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quality Assessment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(mockAnalysisData.qualityMetrics).map(([metric, score]) => (
            <div key={metric} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-primary capitalize">
                  {metric}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {score}%
                </span>
              </div>
              <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Actions */}
      <div className="flex justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={onConfirmAnalysis}
        >
          Confirm Analysis & Continue
        </Button>
      </div>
    </div>
  );
};

export default RequirementAnalysis;