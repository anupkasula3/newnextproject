import React, { useCallback, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Upload, 
  FileText, 
  Image, 
  File,
  X,
  CheckCircle,
  Clock,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { UploadedFile } from '@/pages/admin/MasterPanel';

interface FileUploadCardProps {
  onFileUpload: (files: File[]) => void;
  uploadedFiles: UploadedFile[];
  onFileSelect: (file: UploadedFile) => void;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  onFileUpload,
  uploadedFiles,
  onFileSelect
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileUpload(files);
    }
  }, [onFileUpload]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'image':
        return <Image className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: UploadedFile['analysisStatus']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: UploadedFile['analysisStatus']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Area */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-blue-600" />
            Upload Files
          </CardTitle>
          <CardDescription>
            Upload PDFs, images, or text files for AI analysis and teaching
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
              isDragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="text-lg font-medium mb-2">
              {isDragOver ? 'Drop files here' : 'Upload your files'}
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop files or click to browse
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                PDF
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Image className="h-3 w-3" />
                Images
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <File className="h-3 w-3" />
                Text
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              Choose Files
            </Button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.gif,.txt,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="mt-4 text-xs text-muted-foreground">
            Maximum file size: 10MB per file
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files List */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              Uploaded Files ({uploadedFiles.length})
            </span>
          </CardTitle>
          <CardDescription>
            Monitor file upload and AI analysis progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {uploadedFiles.length === 0 ? (
              <div className="text-center py-8">
                <File className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-muted-foreground">No files uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 cursor-pointer transition-colors"
                    onClick={() => onFileSelect(file)}
                  >
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        {getStatusIcon(file.analysisStatus)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatFileSize(file.size)}</span>
                        <span>•</span>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getStatusColor(file.analysisStatus)}`}
                        >
                          {file.analysisStatus}
                        </Badge>
                      </div>
                      {file.analysisStatus === 'processing' && (
                        <Progress value={65} className="mt-2 h-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};