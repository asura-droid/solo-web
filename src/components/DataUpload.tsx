import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Image, BarChart3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export const DataUpload = () => {
  const { toast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [cleanedData, setCleanedData] = useState<any[]>([]);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

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

const handleFiles = async (files: File[]) => {
  for (const file of files) {
    try {
      let data;
      if (
        file.type.includes('sheet') ||
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.xls')
      ) {
        data = await readExcel(file);
      } else if (
        file.type === 'text/csv' ||
        file.name.toLowerCase().endsWith('.csv')
      ) {
        data = await readCSV(file);
      } else if (file.name.toLowerCase().endsWith('.json')) {
        data = await readJSON(file);
      } else {
        toast({
          title: 'Unsupported file type',
          description: `${file.name} is not supported for cleaning.`,
        });
        continue; // skip unsupported files
      }

      const cleaned = cleanData(data);
      setCleanedData(cleaned);

      toast({
        title: 'File uploaded & cleaned',
        description: `Your file ${file.name} has been cleaned and is ready to download.`,
        duration: 5000,
      });
    } catch (error) {
      toast({
        title: 'Error reading file',
        description: `${file.name} failed to process.`,
        variant: 'destructive',
      });
      console.error(error);
    }
  }
};



  // Create downloadable CSV URL when cleanedData changes
useEffect(() => {
  if (cleanedData.length === 0) {
    setDownloadUrl(null);
    return;
  }
  const csv = Papa.unparse(cleanedData);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  setDownloadUrl(url);

  return () => URL.revokeObjectURL(url);
}, [cleanedData]);


  // Helpers
  function readExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheet];
        const json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        resolve(json);
      };
      reader.onerror = e => reject(e);
      reader.readAsArrayBuffer(file);
    });
  }

  function readCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: results => resolve(results.data),
        error: err => reject(err),
      });
    });
  }

  function readJSON(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (Array.isArray(json)) resolve(json);
          else resolve([json]);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = e => reject(e);
      reader.readAsText(file);
    });
  }

  function cleanData(data: any[]) {
    return data
      .filter(row => Object.values(row).some(v => v !== '' && v !== null))
      .map(row => {
        const cleanedRow: any = {};
        Object.entries(row).forEach(([k, v]) => {
          const key = k.trim().toLowerCase();
          let val = v;
          if (typeof val === 'string') val = val.trim();
          cleanedRow[key] = val;
        });
        return cleanedRow;
      });
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Dataset Upload Card */}
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

      {/* Image Upload Card */}
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

      {/* Download cleaned CSV button */}
      {downloadUrl && (
        <a
          href={downloadUrl}
          download="cleaned_data.csv"
          className="fixed bottom-6 right-6 px-5 py-3 bg-ai-primary hover:bg-ai-primary-dark text-white rounded-lg shadow-lg"
        >
          Download Cleaned CSV
        </a>
      )}
    </div>
  );
};
