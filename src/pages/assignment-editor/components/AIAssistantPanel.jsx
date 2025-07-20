import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIAssistantPanel = ({
  onGenerateContent,
  onImproveText,
  onCheckGrammar,
  onHumanizeText,
  onFactCheck
}) => {
  const [activeTab, setActiveTab] = useState('suggestions');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const mockSuggestions = [
    {
      id: '1',
      type: 'improvement',
      title: 'Strengthen Introduction',
      description: 'Consider adding a more compelling hook to engage readers from the start.',
      action: 'Improve',
      priority: 'high',
      section: 'Introduction'
    },
    {
      id: '2',
      type: 'grammar',
      title: 'Grammar Check',
      description: 'Found 3 potential grammar issues in the methodology section.',
      action: 'Fix',
      priority: 'medium',
      section: 'Methodology'
    },
    {
      id: '3',
      type: 'citation',
      title: 'Missing Citations',
      description: 'Several claims in the literature review need proper citations.',
      action: 'Add Citations',
      priority: 'high',
      section: 'Literature Review'
    },
    {
      id: '4',
      type: 'structure',
      title: 'Improve Flow',
      description: 'The transition between paragraphs could be smoother.',
      action: 'Enhance',
      priority: 'low',
      section: 'Discussion'
    }
  ];

  const mockGrammarIssues = [
    {
      id: '1',
      text: 'The data shows that machine learning algorithms performs better',
      issue: 'Subject-verb disagreement',
      suggestion: 'The data shows that machine learning algorithms perform better',
      position: { line: 45, column: 12 }
    },
    {
      id: '2',
      text: 'This approach is more effective then traditional methods',
      issue: 'Incorrect word usage',
      suggestion: 'This approach is more effective than traditional methods',
      position: { line: 67, column: 8 }
    },
    {
      id: '3',
      text: 'The results was significant across all metrics',
      issue: 'Subject-verb disagreement',
      suggestion: 'The results were significant across all metrics',
      position: { line: 89, column: 15 }
    }
  ];

  const mockHumanizationTips = [
    {
      id: '1',
      category: 'Vocabulary',
      tip: 'Replace "utilize" with "use" for more natural language',
      impact: 'Medium',
      examples: ['utilize → use', 'facilitate → help', 'commence → start']
    },
    {
      id: '2',
      category: 'Sentence Structure',
      tip: 'Vary sentence lengths to create natural rhythm',
      impact: 'High',
      examples: ['Mix short and long sentences', 'Use transitional phrases', 'Avoid repetitive patterns']
    },
    {
      id: '3',
      category: 'Tone',
      tip: 'Add subtle personal insights while maintaining academic tone',
      impact: 'High',
      examples: ['Use "we observe" instead of "it is observed"', 'Include brief interpretations', 'Show reasoning process']
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'improvement':
        return 'TrendingUp';
      case 'grammar':
        return 'CheckCircle';
      case 'citation':
        return 'Quote';
      case 'structure':
        return 'Layout';
      default:
        return 'Lightbulb';
    }
  };

  const handleQuickAction = async (action, data) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    switch (action) {
      case 'improve':
        onImproveText?.(data);
        break;
      case 'grammar':
        onCheckGrammar?.(data);
        break;
      case 'humanize':
        onHumanizeText?.(data);
        break;
      case 'factcheck':
        onFactCheck?.(data);
        break;
      default:
        break;
    }
    
    setIsProcessing(false);
  };

  const renderSuggestions = () => (
    <div className="space-y-3">
      {mockSuggestions.map(suggestion => (
        <div key={suggestion.id} className="p-3 border border-border rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={getTypeIcon(suggestion.type)} 
                size={14} 
                className="text-primary"
              />
              <span className="text-sm font-medium text-text-primary">
                {suggestion.title}
              </span>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${getPriorityColor(suggestion.priority)}`}>
              {suggestion.priority}
            </span>
          </div>
          
          <p className="text-xs text-text-secondary mb-2">
            {suggestion.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              Section: {suggestion.section}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => handleQuickAction('improve', suggestion)}
              disabled={isProcessing}
            >
              {suggestion.action}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrammarCheck = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">
          Grammar Issues Found: {mockGrammarIssues.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          iconName="CheckCircle"
          onClick={() => handleQuickAction('grammar', 'all')}
          disabled={isProcessing}
        >
          Fix All
        </Button>
      </div>
      
      {mockGrammarIssues.map(issue => (
        <div key={issue.id} className="p-3 border border-border rounded-lg">
          <div className="mb-2">
            <p className="text-sm text-text-primary line-through opacity-60">
              {issue.text}
            </p>
            <p className="text-sm text-success mt-1">
              {issue.suggestion}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-text-secondary">
                {issue.issue}
              </span>
              <span className="text-xs text-text-secondary ml-2">
                Line {issue.position.line}
              </span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="xs">Accept</Button>
              <Button variant="ghost" size="xs">Ignore</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHumanization = () => (
    <div className="space-y-4">
      <div className="p-3 border border-border rounded-lg">
        <h4 className="text-sm font-medium text-text-primary mb-2">
          QuillBot Integration
        </h4>
        <p className="text-xs text-text-secondary mb-3">
          Humanize your text to bypass AI detection systems while maintaining academic quality.
        </p>
        <Button
          variant="outline"
          size="sm"
          iconName="Zap"
          onClick={() => handleQuickAction('humanize', inputText)}
          disabled={isProcessing}
          fullWidth
        >
          {isProcessing ? 'Humanizing...' : 'Humanize Selected Text'}
        </Button>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">
          Humanization Tips
        </h4>
        {mockHumanizationTips.map(tip => (
          <div key={tip.id} className="p-3 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">
                {tip.category}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${
                tip.impact === 'High' ? 'text-error' : 
                tip.impact === 'Medium' ? 'text-warning' : 'text-success'
              }`}>
                {tip.impact} Impact
              </span>
            </div>
            
            <p className="text-xs text-text-secondary mb-2">
              {tip.tip}
            </p>
            
            <div className="space-y-1">
              {tip.examples.map((example, index) => (
                <div key={index} className="text-xs text-text-secondary bg-muted/50 px-2 py-1 rounded">
                  {example}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContentGeneration = () => (
    <div className="space-y-4">
      <div>
        <Input
          label="Content Request"
          type="text"
          placeholder="Describe what you need help with..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          description="Be specific about the type of content you need"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          size="sm"
          iconName="FileText"
          onClick={() => handleQuickAction('generate', 'paragraph')}
          disabled={isProcessing}
        >
          Paragraph
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="List"
          onClick={() => handleQuickAction('generate', 'bullet-points')}
          disabled={isProcessing}
        >
          Bullet Points
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Quote"
          onClick={() => handleQuickAction('generate', 'conclusion')}
          disabled={isProcessing}
        >
          Conclusion
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Search"
          onClick={() => handleQuickAction('factcheck', inputText)}
          disabled={isProcessing}
        >
          Fact Check
        </Button>
      </div>
      
      {isProcessing && (
        <div className="p-4 border border-border rounded-lg bg-muted/20">
          <div className="flex items-center space-x-2">
            <Icon name="Loader" size={16} className="animate-spin text-primary" />
            <span className="text-sm text-text-secondary">
              AI is processing your request...
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: 'suggestions', label: 'Suggestions', icon: 'Lightbulb' },
    { id: 'grammar', label: 'Grammar', icon: 'CheckCircle' },
    { id: 'humanize', label: 'Humanize', icon: 'User' },
    { id: 'generate', label: 'Generate', icon: 'Zap' }
  ];

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-heading font-semibold text-text-primary mb-3">
          AI Assistant
        </h3>
        
        <div className="flex space-x-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-1 px-2 py-1 text-xs rounded-md transition-academic
                ${activeTab === tab.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-text-secondary hover:bg-muted'
                }
              `}
            >
              <Icon name={tab.icon} size={12} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'suggestions' && renderSuggestions()}
        {activeTab === 'grammar' && renderGrammarCheck()}
        {activeTab === 'humanize' && renderHumanization()}
        {activeTab === 'generate' && renderContentGeneration()}
      </div>
    </div>
  );
};

export default AIAssistantPanel;