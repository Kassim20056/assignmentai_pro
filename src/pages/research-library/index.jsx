import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import AssignmentContextHeader from '../../components/ui/AssignmentContextHeader';
import QuickActionFloatingButton from '../../components/ui/QuickActionFloatingButton';
import NotificationToast from '../../components/ui/NotificationToast';

import SourceCard from './components/SourceCard';
import SourceFilters from './components/SourceFilters';
import SourceOrganizer from './components/SourceOrganizer';
import CitationGenerator from './components/CitationGenerator';
import WebScraper from './components/WebScraper';

const ResearchLibrary = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [showCitationGenerator, setShowCitationGenerator] = useState(false);
  const [showWebScraper, setShowWebScraper] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    searchQuery: '',
    sourceType: 'all',
    yearRange: 'all',
    credibility: 'all',
    citationFormat: 'all',
    peerReviewed: false,
    openAccess: false,
    hasDoi: false,
    favoritesOnly: false,
    recentlyAdded: false
  });

  // Mock data
  const mockSources = [
    {
      id: 1,
      title: "Deep Learning for Natural Language Processing: A Comprehensive Survey",
      authors: ["Zhang, Y.", "Liu, M.", "Chen, X."],
      year: 2024,
      type: "journal",
      journal: "IEEE Transactions on Neural Networks",
      volume: "35",
      issue: "3",
      pages: "1245-1267",
      abstract: "This survey provides a comprehensive overview of deep learning techniques applied to natural language processing tasks, covering recent advances in transformer architectures, attention mechanisms, and their applications in various NLP domains.",
      doi: "10.1109/TNNLS.2024.001",
      url: "https://ieeexplore.ieee.org/document/example1",
      credibilityScore: 92,
      citationCount: 156,
      isPeerReviewed: true,
      isOpenAccess: false,
      isFavorite: true,
      dateAdded: "2024-07-15",
      tags: ["deep learning", "NLP", "transformers", "attention"],
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      relevanceScore: 95,
      impactFactor: 8.2,
      hIndex: 45
    },
    {
      id: 2,
      title: "Transformer Architecture Improvements for Large Language Models",
      authors: ["Johnson, A.", "Smith, B."],
      year: 2024,
      type: "conference",
      journal: "Proceedings of ICML 2024",
      pages: "892-905",
      abstract: "We propose several architectural improvements to the standard Transformer model that significantly enhance performance on large-scale language modeling tasks while reducing computational requirements.",
      url: "https://proceedings.mlr.press/example2",
      credibilityScore: 88,
      citationCount: 89,
      isPeerReviewed: true,
      isOpenAccess: true,
      isFavorite: false,
      dateAdded: "2024-07-14",
      tags: ["transformers", "LLM", "architecture", "efficiency"],
      thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=400&h=300&fit=crop",
      relevanceScore: 88,
      impactFactor: 7.1,
      hIndex: 38
    },
    {
      id: 3,
      title: "Ethical Considerations in AI Development: A Multidisciplinary Approach",
      authors: ["Brown, C.", "Davis, E.", "Wilson, F."],
      year: 2023,
      type: "book",
      journal: "MIT Press",
      abstract: "This book explores the ethical implications of artificial intelligence development and deployment, providing frameworks for responsible AI development across various domains and applications.",
      url: "https://mitpress.mit.edu/example3",
      credibilityScore: 85,
      citationCount: 234,
      isPeerReviewed: false,
      isOpenAccess: false,
      isFavorite: true,
      dateAdded: "2024-07-13",
      tags: ["AI ethics", "responsible AI", "policy", "governance"],
      thumbnail: "https://images.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg?w=400&h=300&fit=crop",
      relevanceScore: 82,
      publisher: "MIT Press"
    },
    {
      id: 4,
      title: "Quantum Computing Applications in Machine Learning",
      authors: ["Taylor, R.", "Anderson, K."],
      year: 2024,
      type: "journal",
      journal: "Nature Quantum Information",
      volume: "10",
      issue: "1",
      pages: "45-62",
      abstract: "This paper investigates the potential applications of quantum computing in machine learning, exploring quantum algorithms for optimization and pattern recognition tasks.",
      doi: "10.1038/s41534-024-00123-4",
      url: "https://nature.com/articles/example4",
      credibilityScore: 94,
      citationCount: 67,
      isPeerReviewed: true,
      isOpenAccess: true,
      isFavorite: false,
      dateAdded: "2024-07-12",
      tags: ["quantum computing", "machine learning", "optimization", "algorithms"],
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      relevanceScore: 79,
      impactFactor: 9.6,
      hIndex: 52
    },
    {
      id: 5,
      title: "Federated Learning: Challenges and Opportunities",
      authors: ["Lee, S.", "Kim, J.", "Park, H."],
      year: 2023,
      type: "website",
      journal: "arXiv preprint",
      abstract: "A comprehensive review of federated learning approaches, discussing privacy-preserving machine learning techniques and their applications in distributed systems.",
      url: "https://arxiv.org/abs/example5",
      credibilityScore: 76,
      citationCount: 123,
      isPeerReviewed: false,
      isOpenAccess: true,
      isFavorite: false,
      dateAdded: "2024-07-11",
      tags: ["federated learning", "privacy", "distributed systems", "ML"],
      thumbnail: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?w=400&h=300&fit=crop",
      relevanceScore: 74
    }
  ];

  const mockFolders = [
    {
      id: 'all',
      name: 'All Sources',
      children: []
    },
    {
      id: 'ai-ml',
      name: 'AI & Machine Learning',
      children: [
        { id: 'deep-learning', name: 'Deep Learning', children: [] },
        { id: 'nlp', name: 'Natural Language Processing', children: [] },
        { id: 'computer-vision', name: 'Computer Vision', children: [] }
      ]
    },
    {
      id: 'ethics',
      name: 'AI Ethics',
      children: []
    },
    {
      id: 'quantum',
      name: 'Quantum Computing',
      children: []
    },
    {
      id: 'current-project',
      name: 'Current Assignment',
      children: []
    }
  ];

  const mockCollections = [
    {
      id: 'recent',
      name: 'Recently Added',
      icon: 'Clock',
      count: 12
    },
    {
      id: 'favorites',
      name: 'Favorites',
      icon: 'Heart',
      count: 8
    },
    {
      id: 'high-impact',
      name: 'High Impact',
      icon: 'TrendingUp',
      count: 15
    },
    {
      id: 'peer-reviewed',
      name: 'Peer Reviewed',
      icon: 'Shield',
      count: 23
    },
    {
      id: 'open-access',
      name: 'Open Access',
      icon: 'Unlock',
      count: 18
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'citations-desc', label: 'Most Cited' },
    { value: 'credibility-desc', label: 'Most Credible' },
    { value: 'title-asc', label: 'Title A-Z' }
  ];

  const sourceCounts = {
    'all': mockSources.length,
    'ai-ml': 3,
    'deep-learning': 2,
    'nlp': 2,
    'computer-vision': 0,
    'ethics': 1,
    'quantum': 1,
    'current-project': 2
  };

  // Filter and sort sources
  const filteredSources = mockSources.filter(source => {
    if (filters.searchQuery && !source.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !source.authors.some(author => author.toLowerCase().includes(filters.searchQuery.toLowerCase()))) {
      return false;
    }
    if (filters.sourceType !== 'all' && source.type !== filters.sourceType) return false;
    if (filters.peerReviewed && !source.isPeerReviewed) return false;
    if (filters.openAccess && !source.isOpenAccess) return false;
    if (filters.hasDoi && !source.doi) return false;
    if (filters.favoritesOnly && !source.isFavorite) return false;
    if (selectedCollection === 'favorites' && !source.isFavorite) return false;
    if (selectedCollection === 'peer-reviewed' && !source.isPeerReviewed) return false;
    if (selectedCollection === 'open-access' && !source.isOpenAccess) return false;
    return true;
  });

  const sortedSources = [...filteredSources].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'date-asc':
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      case 'citations-desc':
        return b.citationCount - a.citationCount;
      case 'credibility-desc':
        return b.credibilityScore - a.credibilityScore;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'relevance':
      default:
        return (b.relevanceScore || 0) - (a.relevanceScore || 0);
    }
  });

  const handleCiteSource = (source) => {
    setSelectedSource(source);
    setShowCitationGenerator(true);
  };

  const handleAddNote = (source) => {
    addNotification({
      type: 'info',
      title: 'Note Added',
      message: `Note added to "${source.title}"`
    });
  };

  const handleToggleFavorite = (sourceId) => {
    const source = mockSources.find(s => s.id === sourceId);
    if (source) {
      source.isFavorite = !source.isFavorite;
      addNotification({
        type: source.isFavorite ? 'success' : 'info',
        title: source.isFavorite ? 'Added to Favorites' : 'Removed from Favorites',
        message: source.title
      });
    }
  };

  const handleLinkToAssignment = (source) => {
    addNotification({
      type: 'success',
      title: 'Source Linked',
      message: `"${source.title}" linked to current assignment`
    });
  };

  const handlePreviewSource = (source) => {
    window.open(source.url, '_blank');
  };

  const handleCopyCitation = (citation, format) => {
    addNotification({
      type: 'success',
      title: 'Citation Copied',
      message: `${format.toUpperCase()} citation copied to clipboard`
    });
  };

  const handleAddToBibliography = (citation, format) => {
    addNotification({
      type: 'success',
      title: 'Added to Bibliography',
      message: `Citation added in ${format.toUpperCase()} format`
    });
  };

  const handleScrapeComplete = (results) => {
    addNotification({
      type: 'success',
      title: 'Scraping Complete',
      message: `Found ${results.length} sources`
    });
  };

  const handleAddScrapedSources = (sources) => {
    addNotification({
      type: 'success',
      title: 'Sources Added',
      message: `${sources.length} sources added to library`
    });
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleDismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleCreateFolder = () => {
    addNotification({
      type: 'info',
      title: 'Create Folder',
      message: 'Folder creation feature coming soon'
    });
  };

  const handleCreateCollection = () => {
    addNotification({
      type: 'info',
      title: 'Create Collection',
      message: 'Collection creation feature coming soon'
    });
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      sourceType: 'all',
      yearRange: 'all',
      credibility: 'all',
      citationFormat: 'all',
      peerReviewed: false,
      openAccess: false,
      hasDoi: false,
      favoritesOnly: false,
      recentlyAdded: false
    });
    setSelectedCollection(null);
    setSelectedFolder('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AssignmentContextHeader />
      
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BookOpen" size={24} color="var(--color-primary)" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Research Library
                </h1>
                <p className="text-text-secondary">
                  Manage sources, citations, and research materials
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Globe"
                onClick={() => setShowWebScraper(true)}
              >
                Web Scraper
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                onClick={() => addNotification({
                  type: 'info',
                  title: 'Add Source',
                  message: 'Manual source addition coming soon'
                })}
              >
                Add Source
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Organization & Filters */}
            <div className="lg:col-span-4 space-y-6">
              <SourceOrganizer
                folders={mockFolders}
                collections={mockCollections}
                selectedFolder={selectedFolder}
                selectedCollection={selectedCollection}
                onFolderSelect={setSelectedFolder}
                onCollectionSelect={setSelectedCollection}
                onCreateFolder={handleCreateFolder}
                onCreateCollection={handleCreateCollection}
                sourceCounts={sourceCounts}
              />
              
              <SourceFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClearFilters={handleClearFilters}
                totalSources={mockSources.length}
                filteredCount={filteredSources.length}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              {/* Search and Controls */}
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="search"
                      placeholder="Search sources by title, author, keywords..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
                      }}
                      className="mb-0"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Select
                      options={sortOptions}
                      value={sortBy}
                      onChange={setSortBy}
                      className="w-40"
                    />
                    
                    <div className="flex border border-border rounded-lg">
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        iconName="List"
                        onClick={() => setViewMode('list')}
                        className="rounded-r-none"
                      />
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        iconName="Grid3X3"
                        onClick={() => setViewMode('grid')}
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-text-secondary">
                  Showing {sortedSources.length} of {mockSources.length} sources
                  {selectedCollection && ` in ${mockCollections.find(c => c.id === selectedCollection)?.name}`}
                </p>
                
                {sortedSources.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Quote"
                      onClick={() => addNotification({
                        type: 'info',
                        title: 'Batch Citation',
                        message: 'Batch citation generation coming soon'
                      })}
                    >
                      Cite All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      onClick={() => addNotification({
                        type: 'info',
                        title: 'Export Sources',
                        message: 'Source export feature coming soon'
                      })}
                    >
                      Export
                    </Button>
                  </div>
                )}
              </div>

              {/* Sources List/Grid */}
              {sortedSources.length > 0 ? (
                <div className={viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' :'space-y-4'
                }>
                  {sortedSources.map(source => (
                    <SourceCard
                      key={source.id}
                      source={source}
                      viewMode={viewMode}
                      onCite={handleCiteSource}
                      onAddNote={handleAddNote}
                      onToggleFavorite={handleToggleFavorite}
                      onLinkToAssignment={handleLinkToAssignment}
                      onPreview={handlePreviewSource}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                    No sources found
                  </h3>
                  <p className="text-text-secondary mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    iconName="RefreshCw"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showCitationGenerator && selectedSource && (
        <CitationGenerator
          source={selectedSource}
          onClose={() => {
            setShowCitationGenerator(false);
            setSelectedSource(null);
          }}
          onCopy={handleCopyCitation}
          onAddToBibliography={handleAddToBibliography}
        />
      )}

      {showWebScraper && (
        <WebScraper
          onClose={() => setShowWebScraper(false)}
          onScrapeComplete={handleScrapeComplete}
          onAddSources={handleAddScrapedSources}
        />
      )}

      {/* Floating Action Button */}
      <QuickActionFloatingButton
        onAddSource={() => setShowWebScraper(true)}
        onQuickUpload={() => addNotification({
          type: 'info',
          title: 'Quick Upload',
          message: 'File upload feature coming soon'
        })}
        onEmergencyHelp={() => addNotification({
          type: 'info',
          title: 'Help Center',
          message: 'Help documentation coming soon'
        })}
      />

      {/* Notifications */}
      <NotificationToast
        notifications={notifications}
        onDismiss={handleDismissNotification}
        onDismissAll={handleDismissAllNotifications}
        position="top-right"
      />
    </div>
  );
};

export default ResearchLibrary;