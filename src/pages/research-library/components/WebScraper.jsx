import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const WebScraper = ({ 
  onClose, 
  onScrapeComplete,
  onAddSources 
}) => {
  const [scrapeUrl, setScrapeUrl] = useState('');
  const [scrapeType, setScrapeType] = useState('single');
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [scrapeResults, setScrapeResults] = useState([]);
  const [selectedSources, setSelectedSources] = useState(new Set());
  const [scrapeProgress, setScrapeProgress] = useState(0);

  const scrapeTypeOptions = [
    { value: 'single', label: 'Single Page' },
    { value: 'domain', label: 'Entire Domain' },
    { value: 'search', label: 'Search Results' },
    { value: 'bibliography', label: 'Bibliography Page' }
  ];

  const mockScrapeResults = [
    {
      id: 1,
      title: "Deep Learning for Natural Language Processing: A Comprehensive Survey",
      authors: ["Zhang, Y.", "Liu, M.", "Chen, X."],
      year: 2024,
      type: "journal",
      journal: "IEEE Transactions on Neural Networks",
      abstract: "This survey provides a comprehensive overview of deep learning techniques applied to natural language processing tasks...",
      url: "https://example.com/paper1",
      doi: "10.1109/TNNLS.2024.001",
      credibilityScore: 92,
      citationCount: 156,
      isPeerReviewed: true,
      confidence: 95
    },
    {
      id: 2,
      title: "Transformer Architecture Improvements for Large Language Models",
      authors: ["Johnson, A.", "Smith, B."],
      year: 2024,
      type: "conference",
      journal: "Proceedings of ICML 2024",
      abstract: "We propose several architectural improvements to the standard Transformer model that significantly enhance performance...",
      url: "https://example.com/paper2",
      credibilityScore: 88,
      citationCount: 89,
      isPeerReviewed: true,
      confidence: 87
    },
    {
      id: 3,
      title: "Ethical Considerations in AI Development",
      authors: ["Brown, C.", "Davis, E.", "Wilson, F."],
      year: 2023,
      type: "book",
      journal: "MIT Press",
      abstract: "This book explores the ethical implications of artificial intelligence development and deployment...",
      url: "https://example.com/book1",
      credibilityScore: 85,
      citationCount: 234,
      isPeerReviewed: false,
      confidence: 78
    }
  ];

  const handleStartScraping = async () => {
    if (!scrapeUrl.trim()) return;
    
    setIsScrapingActive(true);
    setScrapeProgress(0);
    setScrapeResults([]);
    
    // Simulate scraping progress
    const progressInterval = setInterval(() => {
      setScrapeProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);
    
    // Simulate scraping completion
    setTimeout(() => {
      clearInterval(progressInterval);
      setScrapeProgress(100);
      setScrapeResults(mockScrapeResults);
      setIsScrapingActive(false);
      onScrapeComplete?.(mockScrapeResults);
    }, 5000);
  };

  const handleStopScraping = () => {
    setIsScrapingActive(false);
    setScrapeProgress(0);
  };

  const handleSourceSelect = (sourceId, selected) => {
    const newSelected = new Set(selectedSources);
    if (selected) {
      newSelected.add(sourceId);
    } else {
      newSelected.delete(sourceId);
    }
    setSelectedSources(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedSources.size === scrapeResults.length) {
      setSelectedSources(new Set());
    } else {
      setSelectedSources(new Set(scrapeResults.map(s => s.id)));
    }
  };

  const handleAddSelected = () => {
    const selectedResults = scrapeResults.filter(s => selectedSources.has(s.id));
    onAddSources?.(selectedResults);
    onClose();
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-primary';
    if (confidence >= 50) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Globe" size={24} color="var(--color-primary)" />
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Web Scraper
              </h2>
              <p className="text-sm text-text-secondary">
                Discover and extract sources from web pages
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

        {/* Scraping Configuration */}
        <div className="p-6 border-b border-border">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <Input
                label="URL to Scrape"
                type="url"
                placeholder="https://example.com/research-page"
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                disabled={isScrapingActive}
              />
            </div>
            
            <div>
              <Select
                label="Scrape Type"
                options={scrapeTypeOptions}
                value={scrapeType}
                onChange={setScrapeType}
                disabled={isScrapingActive}
              />
            </div>
            
            <div className="flex items-end">
              {!isScrapingActive ? (
                <Button
                  variant="default"
                  iconName="Search"
                  onClick={handleStartScraping}
                  disabled={!scrapeUrl.trim()}
                  fullWidth
                >
                  Start Scraping
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  iconName="Square"
                  onClick={handleStopScraping}
                  fullWidth
                >
                  Stop Scraping
                </Button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {(isScrapingActive || scrapeProgress > 0) && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-text-secondary">
                  {isScrapingActive ? 'Scraping in progress...' : 'Scraping completed'}
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {scrapeProgress}%
                </span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${scrapeProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {scrapeResults.length > 0 && (
          <div className="flex-1 overflow-hidden">
            {/* Results Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <h3 className="font-heading font-semibold text-text-primary">
                  Found {scrapeResults.length} Sources
                </h3>
                
                <Checkbox
                  label={`Select All (${selectedSources.size}/${scrapeResults.length})`}
                  checked={selectedSources.size === scrapeResults.length}
                  indeterminate={selectedSources.size > 0 && selectedSources.size < scrapeResults.length}
                  onChange={handleSelectAll}
                />
              </div>
              
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleAddSelected}
                disabled={selectedSources.size === 0}
              >
                Add Selected ({selectedSources.size})
              </Button>
            </div>

            {/* Results List */}
            <div className="p-6 overflow-y-auto max-h-[400px]">
              <div className="space-y-4">
                {scrapeResults.map(source => (
                  <div key={source.id} className="bg-surface border border-border rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <Checkbox
                        checked={selectedSources.has(source.id)}
                        onChange={(e) => handleSourceSelect(source.id, e.target.checked)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-heading font-semibold text-text-primary mb-1">
                              {source.title}
                            </h4>
                            <p className="text-sm text-text-secondary mb-2">
                              {source.authors.join(', ')} • {source.year}
                              {source.journal && ` • ${source.journal}`}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(source.confidence)} bg-current/10`}>
                              {source.confidence}% match
                            </div>
                            {source.isPeerReviewed && (
                              <div className="px-2 py-1 rounded-full text-xs font-medium text-success bg-success/10">
                                Peer Reviewed
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                          {source.abstract}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-text-secondary">
                          <span className="flex items-center space-x-1">
                            <Icon name="Shield" size={12} />
                            <span>{source.credibilityScore}% credible</span>
                          </span>
                          {source.citationCount && (
                            <span className="flex items-center space-x-1">
                              <Icon name="Quote" size={12} />
                              <span>{source.citationCount} citations</span>
                            </span>
                          )}
                          <span className="flex items-center space-x-1">
                            <Icon name="Link" size={12} />
                            <span className="truncate max-w-48">{source.url}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isScrapingActive && scrapeResults.length === 0 && scrapeProgress === 0 && (
          <div className="p-12 text-center">
            <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              Ready to Scrape
            </h3>
            <p className="text-text-secondary mb-4">
              Enter a URL above to discover and extract academic sources from web pages
            </p>
            <div className="text-sm text-text-secondary space-y-1">
              <p>• Automatically extracts metadata and citations</p>
              <p>• Verifies source credibility and relevance</p>
              <p>• Detects duplicate sources</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            Scraping respects robots.txt and rate limits
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            {scrapeResults.length > 0 && (
              <Button
                variant="default"
                size="sm"
                iconName="Plus"
                onClick={handleAddSelected}
                disabled={selectedSources.size === 0}
              >
                Add {selectedSources.size} Sources
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebScraper;