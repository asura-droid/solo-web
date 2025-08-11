import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const DataUpload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      toast({
        title: "File uploaded",
        description: `${file.name} ready for analysis`,
      });
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Data Upload */}
      <Card className="relative overflow-hidden bg-glass backdrop-blur-glass border-glass">
        <div className="absolute inset-0 bg-gradient-accent opacity-50" />
        <div 
          className={`relative p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
            dragActive ? 'border-ai-primary bg-ai-primary/10' : 'border-muted-foreground/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Upload Dataset</h3>
              <p className="text-muted-foreground mb-4">
                Drop your CSV, Excel, or JSON files here
              </p>
            </div>
            <div className="space-y-2">
              <input
                type="file"
                id="data-upload"
                className="hidden"
                multiple
                accept=".csv,.xlsx,.xls,.json"
                onChange={handleFileInput}
              />
              <Button 
                variant="secondary" 
                onClick={() => document.getElementById('data-upload')?.click()}
                className="w-full"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground">
                Supports CSV, Excel, JSON files up to 50MB
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Image Upload */}
      <Card className="relative overflow-hidden bg-glass backdrop-blur-glass border-glass">
        <div className="absolute inset-0 bg-gradient-accent opacity-50" />
        <div 
          className={`relative p-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
            dragActive ? 'border-ai-secondary bg-ai-secondary/10' : 'border-muted-foreground/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-ai-secondary rounded-full flex items-center justify-center">
              <Image className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Extract Text from Images</h3>
              <p className="text-muted-foreground mb-4">
                Upload images to extract and analyze text data
              </p>
            </div>
            <div className="space-y-2">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleFileInput}
              />
              <Button 
                variant="secondary" 
                onClick={() => document.getElementById('image-upload')?.click()}
                className="w-full"
              >
                <FileText className="w-4 h-4 mr-2" />
                Upload Images
              </Button>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, PDF supported
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};