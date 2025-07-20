import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveGenerationPreview = ({
  isGenerating = true,
  currentSection = "Introduction",
  generatedContent = `Artificial Intelligence (AI) has emerged as one of the most transformative technologies of the 21st century, fundamentally reshaping how we approach problem-solving across diverse domains. Machine learning, a subset of AI, has particularly gained prominence due to its ability to enable systems to learn and improve from experience without being explicitly programmed for every scenario.

The evolution of machine learning algorithms has been remarkable, progressing from simple linear regression models to sophisticated deep learning architectures that can process vast amounts of unstructured data. This progression has opened new possibilities in fields ranging from healthcare and finance to autonomous systems and natural language processing.

Recent advances in neural network architectures, particularly transformer models, have demonstrated unprecedented capabilities in understanding and generating human-like text, leading to breakthrough applications in conversational AI, content creation, and automated reasoning systems.`,
  sources = [
    {
      id: 1,
      title: "Deep Learning: Foundations and Applications",
      author: "Goodfellow, I., Bengio, Y., & Courville, A.",
      year: 2016,
      type: "book",
      integrated: true,
      relevanceScore: 95
    },
    {
      id: 2,
      title: "Attention Is All You Need",
      author: "Vaswani, A., et al.",
      year: 2017,
      type: "paper",
      integrated: true,
      relevanceScore: 88
    },
    {
      id: 3,
      title: "Machine Learning Yearning",
      author: "Ng, A.",
      year: 2018,
      type: "book",
      integrated: false,
      relevanceScore: 82
    }
  ],
  qualityMetrics = {
    aiDetectionScore: 12,
    plagiarismScore: 3,
    readabilityScore: 85,
    citationAccuracy: 94,
    coherenceScore: 91
  }
}) => {
  const [streamingText, setStreamingText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (isGenerating && generatedContent) {
      const words = generatedContent.split(' ');
      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          setStreamingText(prev => prev + (prev ? ' ' : '') + words[currentWordIndex]);
          setCurrentWordIndex(prev => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 150);

      return () => clearInterval(interval);
    }
  }, [isGenerating, generatedContent, currentWordIndex]);

  const getQualityColor = (score, type = 'normal') => {
    if (type === 'inverse') {
      // For AI detection and plagiarism (lower is better)
      if (score <= 15) return 'text-success';
      if (score <= 30) return 'text-warning';
      return 'text-error';
    } else {
      // For readability, citation accuracy, coherence (higher is better)
      if (score >= 80) return 'text-success';
      if (score >= 60) return 'text-warning';
      return 'text-error';
    }
  };

  const getQualityBg = (score, type = 'normal') => {
    if (type === 'inverse') {
      if (score <= 15) return 'bg-success';
      if (score <= 30) return 'bg-warning';
      return 'bg-error';
    } else {
      if (score >= 80) return 'bg-success';
      if (score >= 60) return 'bg-warning';
      return 'bg-error';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Preview */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-success animate-pulse' : 'bg-text-secondary'}`} />
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Live Preview
              </h2>
            </div>
            {isGenerating && (
              <span className="text-sm text-text-secondary">
                Generating: {currentSection}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-muted rounded-md transition-academic">
              <Icon name="Copy" size={16} color="var(--color-text-secondary)" />
            </button>
            <button className="p-2 hover:bg-muted rounded-md transition-academic">
              <Icon name="Download" size={16} color="var(--color-text-secondary)" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            <div className="text-text-primary leading-relaxed">
              {isGenerating ? streamingText : generatedContent}
              {isGenerating && (
                <span className="inline-block w-2 h-5 bg-primary ml-1 animate-pulse" />
              )}
            </div>
          </div>

          {/* Generation Stats */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">
                  {streamingText.split(' ').length}
                </div>
                <div className="text-text-secondary">Words</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">
                  {streamingText.split('\n\n').length}
                </div>
                <div className="text-text-secondary">Paragraphs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-text-primary">
                  {sources.filter(s => s.integrated).length}
                </div>
                <div className="text-text-secondary">Sources Used</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {Math.round((streamingText.length / generatedContent.length) * 100)}%
                </div>
                <div className="text-text-secondary">Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Source Integration */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Source Integration
        </h3>

        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${source.integrated ? 'bg-success' : 'bg-text-secondary'}`} />
                <div>
                  <h4 className="text-sm font-medium text-text-primary">
                    {source.title}
                  </h4>
                  <p className="text-xs text-text-secondary">
                    {source.author} ({source.year})
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-xs text-text-secondary">
                  {source.relevanceScore}% relevant
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  source.type === 'book' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
                }`}>
                  {source.type}
                </div>
                {source.integrated && (
                  <Icon name="Check" size={14} color="var(--color-success)" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Metrics Dashboard */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Quality Metrics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Detection Score */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">AI Detection</span>
              <span className={`text-sm font-bold ${getQualityColor(qualityMetrics.aiDetectionScore, 'inverse')}`}>
                {qualityMetrics.aiDetectionScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getQualityBg(qualityMetrics.aiDetectionScore, 'inverse')}`}
                style={{ width: `${qualityMetrics.aiDetectionScore}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">Lower is better</p>
          </div>

          {/* Plagiarism Score */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Plagiarism</span>
              <span className={`text-sm font-bold ${getQualityColor(qualityMetrics.plagiarismScore, 'inverse')}`}>
                {qualityMetrics.plagiarismScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getQualityBg(qualityMetrics.plagiarismScore, 'inverse')}`}
                style={{ width: `${qualityMetrics.plagiarismScore}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">Lower is better</p>
          </div>

          {/* Readability Score */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Readability</span>
              <span className={`text-sm font-bold ${getQualityColor(qualityMetrics.readabilityScore)}`}>
                {qualityMetrics.readabilityScore}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getQualityBg(qualityMetrics.readabilityScore)}`}
                style={{ width: `${qualityMetrics.readabilityScore}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">Higher is better</p>
          </div>

          {/* Citation Accuracy */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Citation Accuracy</span>
              <span className={`text-sm font-bold ${getQualityColor(qualityMetrics.citationAccuracy)}`}>
                {qualityMetrics.citationAccuracy}%
              </span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${getQualityBg(qualityMetrics.citationAccuracy)}`}
                style={{ width: `${qualityMetrics.citationAccuracy}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">Higher is better</p>
          </div>
        </div>

        {/* Overall Quality Score */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-medium text-text-primary">Overall Quality Score</span>
            <span className="text-xl font-bold text-success">
              {Math.round((qualityMetrics.readabilityScore + qualityMetrics.citationAccuracy + qualityMetrics.coherenceScore) / 3)}%
            </span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-success to-primary transition-all duration-500"
              style={{ width: `${Math.round((qualityMetrics.readabilityScore + qualityMetrics.citationAccuracy + qualityMetrics.coherenceScore) / 3)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveGenerationPreview;