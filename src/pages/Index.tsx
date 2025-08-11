import { DataUpload } from '@/components/DataUpload';
import { AIAssistant } from '@/components/AIAssistant';
import { DataVisualization } from '@/components/DataVisualization';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Database, Image, TrendingUp, Zap, Shield } from 'lucide-react';
import heroImage from '@/assets/hero-analytics.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Data Analytics Dashboard" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AI-Powered Data Analytics
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Transform your raw data into actionable insights with our intelligent analytics platform
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8">
                <Zap className="w-5 h-5 mr-2" />
                Start Analyzing
              </Button>
              <Button variant="outline" size="lg" className="border-glass bg-glass backdrop-blur-glass">
                <Brain className="w-5 h-5 mr-2" />
                Try AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Data Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to clean, analyze, and visualize your data with AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-ai-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-ai-primary rounded-lg flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Smart Data Cleaning</h3>
              <p className="text-muted-foreground">
                Automatically detect and fix data quality issues with AI-powered cleaning algorithms
              </p>
            </Card>

            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-ai-secondary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-ai-secondary rounded-lg flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">OCR Text Extraction</h3>
              <p className="text-muted-foreground">
                Convert images and PDFs to analyzable text data with advanced OCR technology
              </p>
            </Card>

            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-ai-accent/50 transition-all duration-300">
              <div className="w-12 h-12 bg-ai-accent rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Interactive Visualizations</h3>
              <p className="text-muted-foreground">
                Create stunning charts and dashboards that reveal hidden patterns in your data
              </p>
            </Card>

            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-chart-1/50 transition-all duration-300">
              <div className="w-12 h-12 bg-chart-1 rounded-lg flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">AI Recommendations</h3>
              <p className="text-muted-foreground">
                Get intelligent suggestions for data analysis approaches and visualization strategies
              </p>
            </Card>

            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-chart-2/50 transition-all duration-300">
              <div className="w-12 h-12 bg-chart-2 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Real-time Processing</h3>
              <p className="text-muted-foreground">
                Process large datasets quickly with optimized algorithms and real-time feedback
              </p>
            </Card>

            <Card className="p-6 bg-glass backdrop-blur-glass border-glass hover:border-chart-3/50 transition-all duration-300">
              <div className="w-12 h-12 bg-chart-3 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data stays secure with enterprise-grade encryption and privacy controls
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Started with Your Data
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your datasets or images and let our AI assistant guide you through the analysis
            </p>
          </div>
          
          <DataUpload />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">Data Insights Dashboard</h2>
              <DataVisualization />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">AI Assistant</h2>
              <AIAssistant />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;