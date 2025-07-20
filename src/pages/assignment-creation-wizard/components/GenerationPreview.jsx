import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GenerationPreview = ({ 
  assignmentData, 
  configuration, 
  onStartGeneration, 
  onSaveDraft 
}) => {
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [resourceAllocation, setResourceAllocation] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Calculate estimated time based on configuration
    const calculateEstimatedTime = () => {
      const baseTime = 15; // minutes
      const complexityMultiplier = {
        beginner: 0.8,
        intermediate: 1.0,
        advanced: 1.3,
        expert: 1.6
      };
      const depthMultiplier = {
        basic: 0.7,
        comprehensive: 1.0,
        extensive: 1.4
      };
      
      const time = Math.round(
        baseTime * 
        (complexityMultiplier[configuration?.complexity] || 1.0) * 
        (depthMultiplier[configuration?.researchDepth] || 1.0)
      );
      
      setEstimatedTime(time);
    };

    // Calculate resource allocation
    const calculateResourceAllocation = () => {
      setResourceAllocation({
        aiProcessing: 40,
        research: 30,
        writing: 20,
        qualityCheck: 10
      });
    };

    calculateEstimatedTime();
    calculateResourceAllocation();
  }, [configuration]);

  const mockAssignmentData = assignmentData || {
    title: "Advanced Machine Learning Research Paper",
    type: "Research Paper",
    subject: "Computer Science",
    wordCount: "1500-2000",
    deadline: "2025-07-25",
    requirements: [
      "Comprehensive literature review",
      "5+ academic sources",
      "APA citation format",
      "Include methodology section",
      "Plagiarism check required"
    ]
  };

  const mockConfiguration = configuration || {
    tone: 'academic',
    style: 'formal',
    complexity: 'intermediate',
    citationFormat: 'apa',
    researchDepth: 'comprehensive',
    includeOutline: true,
    includeBibliography: true,
    plagiarismCheck: true,
    aiDetectionAvoidance: true
  };

  const deliverables = [
    {
      name: "Main Assignment Document",
      format: "DOCX",
      icon: "FileText",
      description: "Complete assignment with proper formatting"
    },
    {
      name: "Research Outline",
      format: "PDF",
      icon: "List",
      description: "Detailed structure and key points",
      conditional: mockConfiguration.includeOutline
    },
    {
      name: "Bibliography",
      format: "PDF",
      icon: "BookOpen",
      description: "Properly formatted citations and references",
      conditional: mockConfiguration.includeBibliography
    },
    {
      name: "Plagiarism Report",
      format: "PDF",
      icon: "Shield",
      description: "Comprehensive plagiarism analysis",
      conditional: mockConfiguration.plagiarismCheck
    },
    {
      name: "AI Detection Report",
      format: "PDF",
      icon: "Brain",
      description: "AI detection avoidance verification",
      conditional: mockConfiguration.aiDetectionAvoidance
    }
  ].filter(item => item.conditional !== false);

  const processingSteps = [
    {
      step: 1,
      title: "Requirement Analysis",
      description: "Analyzing assignment requirements and constraints",
      duration: "2-3 minutes",
      icon: "Search"
    },
    {
      step: 2,
      title: "Research & Data Collection",
      description: "Gathering relevant sources and academic materials",
      duration: `${Math.round(estimatedTime * 0.4)} minutes`,
      icon: "Database"
    },
    {
      step: 3,
      title: "Content Generation",
      description: "AI-powered writing with human-like output",
      duration: `${Math.round(estimatedTime * 0.3)} minutes`,
      icon: "PenTool"
    },
    {
      step: 4,
      title: "Quality Assurance",
      description: "Plagiarism check and AI detection avoidance",
      duration: `${Math.round(estimatedTime * 0.2)} minutes`,
      icon: "CheckCircle"
    },
    {
      step: 5,
      title: "Final Formatting",
      description: "Document formatting and citation styling",
      duration: `${Math.round(estimatedTime * 0.1)} minutes`,
      icon: "Layout"
    }
  ];

  const handleStartGeneration = () => {
    setIsGenerating(true);
    onStartGeneration?.();
  };

  const formatDeadline = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: `Overdue by ${Math.abs(diffDays)} days`, color: 'text-error' };
    } else if (diffDays === 0) {
      return { text: 'Due today', color: 'text-warning' };
    } else if (diffDays === 1) {
      return { text: 'Due tomorrow', color: 'text-warning' };
    } else if (diffDays <= 3) {
      return { text: `Due in ${diffDays} days`, color: 'text-warning' };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-success' };
    }
  };

  const deadlineInfo = formatDeadline(mockAssignmentData.deadline);

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Generation Preview
          </h2>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span className="text-sm text-text-secondary">
              Est. {estimatedTime} minutes
            </span>
          </div>
        </div>
        <p className="text-text-secondary">
          Review your assignment details and configuration before starting the AI generation process.
        </p>
      </div>

      {/* Assignment Summary */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Assignment Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Title</h4>
              <p className="text-sm text-text-secondary">{mockAssignmentData.title}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Type & Subject</h4>
              <p className="text-sm text-text-secondary">
                {mockAssignmentData.type} • {mockAssignmentData.subject}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Word Count</h4>
              <p className="text-sm text-text-secondary">{mockAssignmentData.wordCount} words</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Deadline</h4>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-text-secondary">
                  {new Date(mockAssignmentData.deadline).toLocaleDateString()}
                </p>
                <span className={`text-xs px-2 py-1 rounded-full bg-opacity-10 ${deadlineInfo.color} ${deadlineInfo.color.replace('text-', 'bg-')}/10`}>
                  {deadlineInfo.text}
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-1">Configuration</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <p>Tone: {mockConfiguration.tone} • Style: {mockConfiguration.style}</p>
                <p>Complexity: {mockConfiguration.complexity} • Citations: {mockConfiguration.citationFormat.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements List */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-text-primary mb-2">Key Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {mockAssignmentData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Check" size={14} className="text-success" />
                <span className="text-sm text-text-secondary">{requirement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expected Deliverables */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Expected Deliverables
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliverables.map((deliverable, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={deliverable.icon} size={20} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="text-sm font-medium text-text-primary">
                    {deliverable.name}
                  </h4>
                  <span className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                    {deliverable.format}
                  </span>
                </div>
                <p className="text-xs text-text-secondary">{deliverable.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Steps */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Processing Pipeline
        </h3>
        
        <div className="space-y-4">
          {processingSteps.map((step, index) => (
            <div key={step.step} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                {step.step}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-text-primary">{step.title}</h4>
                  <span className="text-xs text-text-secondary">{step.duration}</span>
                </div>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
              <Icon name={step.icon} size={16} className="text-text-secondary mt-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Resource Allocation */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Resource Allocation
        </h3>
        
        <div className="space-y-3">
          {Object.entries(resourceAllocation).map(([resource, percentage]) => (
            <div key={resource} className="flex items-center space-x-3">
              <div className="w-24 text-sm text-text-secondary capitalize">
                {resource.replace(/([A-Z])/g, ' $1').trim()}
              </div>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-12 text-sm text-text-primary text-right">
                {percentage}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="outline"
          size="lg"
          iconName="Save"
          iconPosition="left"
          onClick={onSaveDraft}
          disabled={isGenerating}
        >
          Save as Draft
        </Button>
        
        <Button
          variant="default"
          size="lg"
          iconName="Zap"
          iconPosition="left"
          onClick={handleStartGeneration}
          loading={isGenerating}
          disabled={isGenerating}
        >
          {isGenerating ? 'Starting Generation...' : 'Start AI Generation'}
        </Button>
      </div>

      {/* Important Notice */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} color="var(--color-warning)" />
          <div>
            <h4 className="text-sm font-medium text-warning mb-1">Important Notice</h4>
            <p className="text-sm text-text-secondary">
              Once generation starts, the process cannot be paused. Ensure all settings are correct before proceeding. 
              You'll receive real-time updates on the processing status.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPreview;