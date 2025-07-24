import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AISetupGuide = ({ onClose }) => {
  const [selectedProvider, setSelectedProvider] = useState('mock');

  const providers = [
    {
      id: 'openrouter',
      name: 'OpenRouter (Recommended)',
      description: 'Access to multiple AI models including Claude, GPT, and more',
      cost: 'Pay-per-use: $0.50-$15 per 1M tokens',
      setup: 'API key required',
      pros: ['Multiple model options', 'Competitive pricing', 'High quality', 'Fast responses'],
      cons: ['Requires payment', 'API key needed'],
      icon: 'Zap',
      setupUrl: 'https://openrouter.ai'
    },
    {
      id: 'mock',
      name: 'Mock AI (Development)',
      description: 'Use simulated AI responses for testing and development',
      cost: 'Free',
      setup: 'No setup required',
      pros: ['Instant setup', 'No API keys needed', 'Works offline'],
      cons: ['Not real AI', 'Limited responses'],
      icon: 'Code'
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      description: 'Free tier available with rate limits',
      cost: 'Free tier: 1000 requests/month',
      setup: 'Create account and get API token',
      pros: ['Free tier available', 'Good model selection', 'Easy to use'],
      cons: ['Rate limits', 'Slower responses', 'Queue times'],
      icon: 'Brain',
      setupUrl: 'https://huggingface.co/settings/tokens'
    },
    {
      id: 'local',
      name: 'Local AI (Ollama)',
      description: 'Run AI models locally on your computer',
      cost: 'Free (uses your hardware)',
      setup: 'Install Ollama and download models',
      pros: ['Completely free', 'Private', 'No rate limits'],
      cons: ['Requires powerful hardware', 'Setup complexity', 'Large downloads'],
      icon: 'HardDrive',
      setupUrl: 'https://ollama.ai'
    }
  ];

  const handleProviderSelect = (providerId) => {
    setSelectedProvider(providerId);
  };

  const handleSetupProvider = () => {
    const provider = providers.find(p => p.id === selectedProvider);
    if (provider.setupUrl) {
      window.open(provider.setupUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-academic-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={24} color="var(--color-primary)" />
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                AI Service Setup
              </h2>
              <p className="text-sm text-text-secondary">
                Choose a free AI service for your assignments
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
            className="text-text-secondary"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`
                  p-4 border rounded-lg cursor-pointer transition-academic
                  ${selectedProvider === provider.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-muted/50'
                  }
                `}
                onClick={() => handleProviderSelect(provider.id)}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={provider.icon} size={24} color="var(--color-primary)" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {provider.name}
                      </h3>
                      <span className="text-sm font-medium text-success">
                        {provider.cost}
                      </span>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-3">
                      {provider.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-1">Pros:</h4>
                        <ul className="text-xs text-text-secondary space-y-1">
                          {provider.pros.map((pro, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <Icon name="Check" size={12} className="text-success" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-text-primary mb-1">Cons:</h4>
                        <ul className="text-xs text-text-secondary space-y-1">
                          {provider.cons.map((con, index) => (
                            <li key={index} className="flex items-center space-x-1">
                              <Icon name="Minus" size={12} className="text-warning" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="text-xs text-text-secondary">
                      Setup: {provider.setup}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <div className={`
                      w-4 h-4 rounded-full border-2 transition-academic
                      ${selectedProvider === provider.id 
                        ? 'border-primary bg-primary' 
                        : 'border-border'
                      }
                    `}>
                      {selectedProvider === provider.id && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Setup Instructions */}
          {selectedProvider !== 'mock' && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                Setup Instructions
              </h3>
              
              {selectedProvider === 'huggingface' && (
                <div className="space-y-3 text-sm text-text-secondary">
                  <p>1. Go to <a href="https://huggingface.co" target="_blank" className="text-primary hover:underline">Hugging Face</a> and create a free account</p>
                  <p>2. Navigate to Settings → Access Tokens</p>
                  <p>3. Create a new token with "Read" permissions</p>
                  <p>4. Copy the token and add it to your environment variables</p>
                  <p>5. Set VITE_AI_PROVIDER=huggingface in your .env file</p>
                </div>
              )}
              
              {selectedProvider === 'openrouter' && (
                <div className="space-y-3 text-sm text-text-secondary">
                  <p>1. Go to <a href="https://openrouter.ai" target="_blank" className="text-primary hover:underline">OpenRouter</a> and create an account</p>
                  <p>2. Add credits to your account (minimum $5)</p>
                  <p>3. Generate an API key in your dashboard</p>
                  <p>4. Copy the API key and add it to your .env file</p>
                  <p>5. Set VITE_AI_PROVIDER=openrouter in your .env file</p>
                  <p className="text-primary">✓ Your API key is already configured!</p>
                </div>
              )}
              
              {selectedProvider === 'local' && (
                <div className="space-y-3 text-sm text-text-secondary">
                  <p>1. Install <a href="https://ollama.ai" target="_blank" className="text-primary hover:underline">Ollama</a> on your computer</p>
                  <p>2. Run: <code className="bg-surface px-2 py-1 rounded">ollama pull llama2</code></p>
                  <p>3. Start Ollama: <code className="bg-surface px-2 py-1 rounded">ollama serve</code></p>
                  <p>4. Set VITE_AI_PROVIDER=local in your .env file</p>
                  <p>Note: Requires 8GB+ RAM for good performance</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            You can change the AI provider anytime in settings
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              {selectedProvider === 'openrouter' ? 'Use OpenRouter' : 'Use Mock AI'}
            </Button>
            {selectedProvider !== 'mock' && (
              <Button
                variant="default"
                size="sm"
                iconName="ExternalLink"
                onClick={handleSetupProvider}
              >
                {selectedProvider === 'openrouter' ? 'Start Using OpenRouter' : `Setup ${providers.find(p => p.id === selectedProvider)?.name}`}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISetupGuide;