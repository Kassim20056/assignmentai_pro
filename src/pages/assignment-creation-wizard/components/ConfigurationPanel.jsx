import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfigurationPanel = ({ onConfigurationSave, initialConfig = {} }) => {
  const [config, setConfig] = useState({
    tone: initialConfig.tone || 'academic',
    style: initialConfig.style || 'formal',
    complexity: initialConfig.complexity || 'intermediate',
    citationFormat: initialConfig.citationFormat || 'apa',
    includeOutline: initialConfig.includeOutline || true,
    includeBibliography: initialConfig.includeBibliography || true,
    plagiarismCheck: initialConfig.plagiarismCheck || true,
    aiDetectionAvoidance: initialConfig.aiDetectionAvoidance || true,
    researchDepth: initialConfig.researchDepth || 'comprehensive',
    languageVariant: initialConfig.languageVariant || 'us-english',
    ...initialConfig
  });

  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  const toneOptions = [
    { value: 'academic', label: 'Academic', description: 'Scholarly and professional tone' },
    { value: 'conversational', label: 'Conversational', description: 'Engaging and accessible' },
    { value: 'persuasive', label: 'Persuasive', description: 'Compelling and argumentative' },
    { value: 'analytical', label: 'Analytical', description: 'Critical and evaluative' },
    { value: 'descriptive', label: 'Descriptive', description: 'Detailed and explanatory' }
  ];

  const styleOptions = [
    { value: 'formal', label: 'Formal', description: 'Traditional academic writing' },
    { value: 'semi-formal', label: 'Semi-formal', description: 'Balanced professional tone' },
    { value: 'technical', label: 'Technical', description: 'Specialized terminology' },
    { value: 'creative', label: 'Creative', description: 'Innovative and expressive' }
  ];

  const complexityOptions = [
    { value: 'beginner', label: 'Beginner', description: 'Simple concepts and language' },
    { value: 'intermediate', label: 'Intermediate', description: 'Moderate complexity' },
    { value: 'advanced', label: 'Advanced', description: 'Complex analysis and terminology' },
    { value: 'expert', label: 'Expert', description: 'Highly specialized content' }
  ];

  const citationOptions = [
    { value: 'apa', label: 'APA 7th Edition', description: 'American Psychological Association' },
    { value: 'mla', label: 'MLA 9th Edition', description: 'Modern Language Association' },
    { value: 'chicago', label: 'Chicago 17th Edition', description: 'Chicago Manual of Style' },
    { value: 'harvard', label: 'Harvard', description: 'Harvard referencing system' },
    { value: 'ieee', label: 'IEEE', description: 'Institute of Electrical and Electronics Engineers' }
  ];

  const researchDepthOptions = [
    { value: 'basic', label: 'Basic Research', description: '3-5 sources, fundamental concepts' },
    { value: 'comprehensive', label: 'Comprehensive', description: '8-12 sources, detailed analysis' },
    { value: 'extensive', label: 'Extensive', description: '15+ sources, in-depth exploration' }
  ];

  const languageOptions = [
    { value: 'us-english', label: 'US English', description: 'American spelling and conventions' },
    { value: 'uk-english', label: 'UK English', description: 'British spelling and conventions' },
    { value: 'canadian-english', label: 'Canadian English', description: 'Canadian spelling and conventions' },
    { value: 'australian-english', label: 'Australian English', description: 'Australian spelling and conventions' }
  ];

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onConfigurationSave(config);
  };

  const getEstimatedTime = () => {
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
    
    const estimatedMinutes = Math.round(
      baseTime * 
      complexityMultiplier[config.complexity] * 
      depthMultiplier[config.researchDepth]
    );
    
    return estimatedMinutes;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Header */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Assignment Configuration
          </h2>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>Est. {getEstimatedTime()} minutes</span>
          </div>
        </div>
        <p className="text-text-secondary">
          Customize the output parameters to match your specific requirements and preferences.
        </p>
      </div>

      {/* Output Parameters */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Output Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone Selection */}
          <div>
            <Select
              label="Writing Tone"
              description="Choose the overall tone for your assignment"
              options={toneOptions}
              value={config.tone}
              onChange={(value) => handleConfigChange('tone', value)}
            />
          </div>

          {/* Style Selection */}
          <div>
            <Select
              label="Writing Style"
              description="Select the appropriate writing style"
              options={styleOptions}
              value={config.style}
              onChange={(value) => handleConfigChange('style', value)}
            />
          </div>

          {/* Complexity Level */}
          <div>
            <Select
              label="Complexity Level"
              description="Set the academic complexity level"
              options={complexityOptions}
              value={config.complexity}
              onChange={(value) => handleConfigChange('complexity', value)}
            />
          </div>

          {/* Citation Format */}
          <div>
            <Select
              label="Citation Format"
              description="Choose your preferred citation style"
              options={citationOptions}
              value={config.citationFormat}
              onChange={(value) => handleConfigChange('citationFormat', value)}
            />
          </div>
        </div>
      </div>

      {/* Research Configuration */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Research Configuration
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Select
              label="Research Depth"
              description="Determine the extent of research required"
              options={researchDepthOptions}
              value={config.researchDepth}
              onChange={(value) => handleConfigChange('researchDepth', value)}
            />
          </div>

          <div>
            <Select
              label="Language Variant"
              description="Select your preferred English variant"
              options={languageOptions}
              value={config.languageVariant}
              onChange={(value) => handleConfigChange('languageVariant', value)}
            />
          </div>
        </div>
      </div>

      {/* Quality Assurance Options */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quality Assurance
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Include Detailed Outline"
            description="Generate a comprehensive outline with your assignment"
            checked={config.includeOutline}
            onChange={(e) => handleConfigChange('includeOutline', e.target.checked)}
          />
          
          <Checkbox
            label="Generate Bibliography"
            description="Automatically create a properly formatted bibliography"
            checked={config.includeBibliography}
            onChange={(e) => handleConfigChange('includeBibliography', e.target.checked)}
          />
          
          <Checkbox
            label="Plagiarism Check"
            description="Run comprehensive plagiarism detection before delivery"
            checked={config.plagiarismCheck}
            onChange={(e) => handleConfigChange('plagiarismCheck', e.target.checked)}
          />
          
          <Checkbox
            label="AI Detection Avoidance"
            description="Optimize content to pass AI detection systems"
            checked={config.aiDetectionAvoidance}
            onChange={(e) => handleConfigChange('aiDetectionAvoidance', e.target.checked)}
          />
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <button
          onClick={() => setAdvancedExpanded(!advancedExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Advanced Settings
          </h3>
          <Icon 
            name={advancedExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-text-secondary"
          />
        </button>
        
        {advancedExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-4">
            <Checkbox
              label="Include Methodology Section"
              description="Add detailed methodology for research papers"
              checked={config.includeMethodology || false}
              onChange={(e) => handleConfigChange('includeMethodology', e.target.checked)}
            />
            
            <Checkbox
              label="Generate Executive Summary"
              description="Create a concise executive summary"
              checked={config.includeExecutiveSummary || false}
              onChange={(e) => handleConfigChange('includeExecutiveSummary', e.target.checked)}
            />
            
            <Checkbox
              label="Include Appendices"
              description="Add relevant appendices and supplementary materials"
              checked={config.includeAppendices || false}
              onChange={(e) => handleConfigChange('includeAppendices', e.target.checked)}
            />
            
            <Checkbox
              label="Generate Presentation Slides"
              description="Create accompanying presentation slides"
              checked={config.generateSlides || false}
              onChange={(e) => handleConfigChange('generateSlides', e.target.checked)}
            />
          </div>
        )}
      </div>

      {/* Configuration Summary */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Configuration Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-text-secondary">Tone:</span>
            <span className="ml-1 text-text-primary capitalize">{config.tone}</span>
          </div>
          <div>
            <span className="text-text-secondary">Style:</span>
            <span className="ml-1 text-text-primary capitalize">{config.style}</span>
          </div>
          <div>
            <span className="text-text-secondary">Complexity:</span>
            <span className="ml-1 text-text-primary capitalize">{config.complexity}</span>
          </div>
          <div>
            <span className="text-text-secondary">Citations:</span>
            <span className="ml-1 text-text-primary uppercase">{config.citationFormat}</span>
          </div>
        </div>
      </div>

      {/* Save Configuration */}
      <div className="flex justify-center">
        <Button
          variant="default"
          size="lg"
          iconName="Save"
          iconPosition="left"
          onClick={handleSave}
        >
          Save Configuration & Continue
        </Button>
      </div>
    </div>
  );
};

export default ConfigurationPanel;