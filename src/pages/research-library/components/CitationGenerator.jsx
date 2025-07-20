import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const CitationGenerator = ({ 
  source, 
  onClose, 
  onCopy, 
  onExport,
  onAddToBibliography 
}) => {
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [customStyle, setCustomStyle] = useState('');

  const formatOptions = [
    { value: 'apa', label: 'APA (7th Edition)' },
    { value: 'mla', label: 'MLA (9th Edition)' },
    { value: 'chicago', label: 'Chicago (17th Edition)' },
    { value: 'harvard', label: 'Harvard' },
    { value: 'ieee', label: 'IEEE' },
    { value: 'vancouver', label: 'Vancouver' },
    { value: 'custom', label: 'Custom Style' }
  ];

  const generateCitation = (format, source) => {
    const authors = source.authors.join(', ');
    const year = source.year;
    const title = source.title;
    const journal = source.journal;
    const volume = source.volume;
    const issue = source.issue;
    const pages = source.pages;
    const doi = source.doi;
    const url = source.url;

    switch (format) {
      case 'apa':
        return `${authors} (${year}). ${title}. ${journal}${volume ? `, ${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `, ${pages}` : ''}. ${doi ? `https://doi.org/${doi}` : url}`;
      
      case 'mla':
        return `${authors}. "${title}." ${journal}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}, ${year}${pages ? `, pp. ${pages}` : ''}. ${doi ? `DOI: ${doi}` : `Web. ${new Date().toLocaleDateString()}`}.`;
      
      case 'chicago':
        return `${authors}. "${title}." ${journal}${volume ? ` ${volume}` : ''}${issue ? `, no. ${issue}` : ''} (${year})${pages ? `: ${pages}` : ''}. ${doi ? `https://doi.org/${doi}` : url}.`;
      
      case 'harvard':
        return `${authors}, ${year}. ${title}. ${journal}${volume ? `, ${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `, pp.${pages}` : ''}.`;
      
      case 'ieee':
        return `${authors}, "${title}," ${journal}${volume ? `, vol. ${volume}` : ''}${issue ? `, no. ${issue}` : ''}${pages ? `, pp. ${pages}` : ''}, ${year}.`;
      
      case 'vancouver':
        return `${authors}. ${title}. ${journal}. ${year}${volume ? `;${volume}` : ''}${issue ? `(${issue})` : ''}${pages ? `:${pages}` : ''}.`;
      
      default:
        return `${authors} (${year}). ${title}. ${journal}.`;
    }
  };

  const citation = generateCitation(selectedFormat, source);

  const handleCopy = () => {
    navigator.clipboard.writeText(citation);
    onCopy?.(citation, selectedFormat);
  };

  const handleExport = (format) => {
    onExport?.(citation, selectedFormat, format);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-academic-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Quote" size={24} color="var(--color-primary)" />
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Citation Generator
              </h2>
              <p className="text-sm text-text-secondary">
                Generate citations in multiple formats
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Source Preview */}
            <div className="lg:col-span-1">
              <h3 className="font-heading font-semibold text-text-primary mb-4">
                Source Details
              </h3>
              
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">Title</label>
                  <p className="text-sm text-text-primary font-medium">{source.title}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-text-secondary uppercase">Authors</label>
                  <p className="text-sm text-text-primary">{source.authors.join(', ')}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-text-secondary uppercase">Year</label>
                    <p className="text-sm text-text-primary">{source.year}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-text-secondary uppercase">Type</label>
                    <p className="text-sm text-text-primary capitalize">{source.type}</p>
                  </div>
                </div>
                
                {source.journal && (
                  <div>
                    <label className="text-xs font-medium text-text-secondary uppercase">Journal</label>
                    <p className="text-sm text-text-primary">{source.journal}</p>
                  </div>
                )}
                
                {(source.volume || source.issue || source.pages) && (
                  <div className="grid grid-cols-3 gap-2">
                    {source.volume && (
                      <div>
                        <label className="text-xs font-medium text-text-secondary uppercase">Vol.</label>
                        <p className="text-sm text-text-primary">{source.volume}</p>
                      </div>
                    )}
                    {source.issue && (
                      <div>
                        <label className="text-xs font-medium text-text-secondary uppercase">Issue</label>
                        <p className="text-sm text-text-primary">{source.issue}</p>
                      </div>
                    )}
                    {source.pages && (
                      <div>
                        <label className="text-xs font-medium text-text-secondary uppercase">Pages</label>
                        <p className="text-sm text-text-primary">{source.pages}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {source.doi && (
                  <div>
                    <label className="text-xs font-medium text-text-secondary uppercase">DOI</label>
                    <p className="text-sm text-text-primary font-mono">{source.doi}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Citation Generator */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-semibold text-text-primary">
                  Generated Citation
                </h3>
                
                <div className="flex items-center space-x-2">
                  <Select
                    options={formatOptions}
                    value={selectedFormat}
                    onChange={setSelectedFormat}
                    className="w-48"
                  />
                </div>
              </div>

              {/* Custom Style Input */}
              {selectedFormat === 'custom' && (
                <div className="mb-4">
                  <Input
                    label="Custom Citation Style"
                    placeholder="Enter your custom citation format..."
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    description="Use variables like {authors}, {title}, {year}, {journal}, etc."
                  />
                </div>
              )}

              {/* Citation Output */}
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <label className="text-xs font-medium text-text-secondary uppercase">
                    {formatOptions.find(f => f.value === selectedFormat)?.label} Citation
                  </label>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Copy"
                    onClick={handleCopy}
                    className="text-text-secondary"
                  />
                </div>
                
                <p className="text-sm text-text-primary leading-relaxed font-mono bg-surface p-3 rounded border">
                  {citation}
                </p>
              </div>

              {/* Citation Actions */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant="default"
                  size="sm"
                  iconName="Copy"
                  onClick={handleCopy}
                >
                  Copy Citation
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="BookOpen"
                  onClick={() => onAddToBibliography?.(citation, selectedFormat)}
                >
                  Add to Bibliography
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => handleExport('txt')}
                >
                  Export as TXT
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="FileText"
                  onClick={() => handleExport('docx')}
                >
                  Export as DOCX
                </Button>
              </div>

              {/* Format Examples */}
              <div>
                <h4 className="font-medium text-text-primary mb-3">Format Examples</h4>
                
                <div className="space-y-3">
                  {formatOptions.slice(0, 4).map(format => (
                    <div key={format.value} className="bg-surface border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-text-secondary uppercase">
                          {format.label}
                        </span>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => setSelectedFormat(format.value)}
                          className={selectedFormat === format.value ? "text-primary" : "text-text-secondary"}
                        >
                          {selectedFormat === format.value ? "Selected" : "Use This"}
                        </Button>
                      </div>
                      <p className="text-xs text-text-primary font-mono leading-relaxed">
                        {generateCitation(format.value, source)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            Always verify citations according to your institution's guidelines
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Check"
              onClick={() => {
                handleCopy();
                onClose();
              }}
            >
              Copy & Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitationGenerator;