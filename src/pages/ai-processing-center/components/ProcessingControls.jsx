import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingControls = ({
  isProcessing = true,
  isPaused = false,
  canModify = true,
  onPause,
  onResume,
  onStop,
  onModifyParameters,
  onRegenerateSection,
  onExportResults,
  currentStage = "Research Gathering",
  progress = 67
}) => {
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);

  const handlePause = () => {
    onPause?.();
  };

  const handleResume = () => {
    onResume?.();
  };

  const handleStop = () => {
    if (window.confirm('Are you sure you want to stop processing? This will cancel the current assignment generation.')) {
      onStop?.();
    }
  };

  const handleModifyParameters = () => {
    setShowModifyModal(true);
  };

  const handleRegenerateSection = (section) => {
    onRegenerateSection?.(section);
    setShowRegenerateModal(false);
  };

  const sections = [
    'Introduction',
    'Literature Review',
    'Methodology',
    'Results',
    'Discussion',
    'Conclusion'
  ];

  return (
    <>
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Processing Controls
          </h2>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isProcessing && !isPaused ? 'bg-success/10 text-success' : isPaused ?'bg-warning/10 text-warning': 'bg-text-secondary/10 text-text-secondary'
          }`}>
            {isProcessing && !isPaused ? 'Processing' : isPaused ? 'Paused' : 'Stopped'}
          </div>
        </div>

        {/* Primary Controls */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {isProcessing && !isPaused ? (
            <Button
              variant="warning"
              iconName="Pause"
              iconPosition="left"
              onClick={handlePause}
              fullWidth
            >
              Pause
            </Button>
          ) : isPaused ? (
            <Button
              variant="success"
              iconName="Play"
              iconPosition="left"
              onClick={handleResume}
              fullWidth
            >
              Resume
            </Button>
          ) : (
            <Button
              variant="default"
              iconName="RotateCcw"
              iconPosition="left"
              onClick={() => window.location.reload()}
              fullWidth
            >
              Restart
            </Button>
          )}

          <Button
            variant="destructive"
            iconName="Square"
            iconPosition="left"
            onClick={handleStop}
            fullWidth
          >
            Stop
          </Button>
        </div>

        {/* Secondary Controls */}
        <div className="space-y-3">
          <Button
            variant="outline"
            iconName="Settings"
            iconPosition="left"
            onClick={handleModifyParameters}
            disabled={!canModify}
            fullWidth
          >
            Modify Parameters
          </Button>

          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => setShowRegenerateModal(true)}
            disabled={!isProcessing}
            fullWidth
          >
            Regenerate Section
          </Button>

          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            onClick={onExportResults}
            fullWidth
          >
            Export Current Results
          </Button>
        </div>

        {/* Current Status */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Current Stage:</span>
              <span className="font-medium text-text-primary">{currentStage}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Progress:</span>
              <span className="font-medium text-primary">{progress}%</span>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="p-2 text-xs text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-academic">
              <Icon name="Eye" size={14} className="mx-auto mb-1" />
              <div>Preview</div>
            </button>
            <button className="p-2 text-xs text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-academic">
              <Icon name="Save" size={14} className="mx-auto mb-1" />
              <div>Save Draft</div>
            </button>
            <button className="p-2 text-xs text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-academic">
              <Icon name="Share" size={14} className="mx-auto mb-1" />
              <div>Share</div>
            </button>
            <button className="p-2 text-xs text-text-secondary hover:text-text-primary hover:bg-muted rounded-md transition-academic">
              <Icon name="HelpCircle" size={14} className="mx-auto mb-1" />
              <div>Help</div>
            </button>
          </div>
        </div>
      </div>

      {/* Modify Parameters Modal */}
      {showModifyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Modify Parameters
              </h3>
              <button
                onClick={() => setShowModifyModal(false)}
                className="p-1 hover:bg-muted rounded-md transition-academic"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Writing Tone
                </label>
                <select className="w-full p-2 border border-border rounded-md bg-surface text-text-primary">
                  <option>Academic</option>
                  <option>Professional</option>
                  <option>Casual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Creativity Level: 75%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="75"
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Quality Level
                </label>
                <select className="w-full p-2 border border-border rounded-md bg-surface text-text-primary">
                  <option>Premium</option>
                  <option>Standard</option>
                  <option>Basic</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowModifyModal(false)}
                fullWidth
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => {
                  onModifyParameters?.();
                  setShowModifyModal(false);
                }}
                fullWidth
              >
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Regenerate Section Modal */}
      {showRegenerateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Regenerate Section
              </h3>
              <button
                onClick={() => setShowRegenerateModal(false)}
                className="p-1 hover:bg-muted rounded-md transition-academic"
              >
                <Icon name="X" size={16} color="var(--color-text-secondary)" />
              </button>
            </div>

            <p className="text-sm text-text-secondary mb-4">
              Select which section you'd like to regenerate:
            </p>

            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => handleRegenerateSection(section)}
                  className="w-full p-3 text-left text-sm text-text-primary hover:bg-muted rounded-md transition-academic border border-border"
                >
                  {section}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowRegenerateModal(false)}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessingControls;