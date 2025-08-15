import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image, Video, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileUploadProps {
  onFilesUploaded: (urls: string[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  userId?: string;
}

export interface UploadedFile {
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  error?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesUploaded,
  maxFiles = 5,
  maxFileSize = 10,
  acceptedTypes = ['image/*', 'video/*'],
  userId
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `حجم الملف يجب أن يكون أقل من ${maxFileSize} ميجابايت`;
    }

    // Check file type
    const isValidType = acceptedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isValidType) {
      return 'نوع الملف غير مدعوم. يرجى اختيار صورة أو فيديو.';
    }

    return null;
  };

  const handleFileSelect = (selectedFiles: FileList) => {
    const newFiles: UploadedFile[] = [];

    Array.from(selectedFiles).forEach(file => {
      if (files.length + newFiles.length >= maxFiles) {
        toast({
          title: "تم الوصول للحد الأقصى",
          description: `يمكنك رفع حتى ${maxFiles} ملفات فقط`,
          variant: "destructive"
        });
        return;
      }

      const validationError = validateFile(file);
      if (validationError) {
        toast({
          title: "خطأ في الملف",
          description: validationError,
          variant: "destructive"
        });
        return;
      }

      const preview = file.type.startsWith('image/') 
        ? URL.createObjectURL(file)
        : '';

      newFiles.push({
        file,
        preview,
        uploading: false,
        uploaded: false
      });
    });

    setFiles(prev => [...prev, ...newFiles]);
  };

  const uploadFiles = async () => {
    if (!userId) {
      toast({
        title: "خطأ في التحقق",
        description: "يجب تسجيل الدخول لرفع الملفات",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const fileItem = files[i];
        if (fileItem.uploaded) {
          if (fileItem.url) uploadedUrls.push(fileItem.url);
          continue;
        }

        // Update file status to uploading
        setFiles(prev => prev.map((f, index) => 
          index === i ? { ...f, uploading: true } : f
        ));

        const fileExt = fileItem.file.name.split('.').pop();
        const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { data, error } = await supabase.storage
          .from('report-media')
          .upload(fileName, fileItem.file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Upload error:', error);
          setFiles(prev => prev.map((f, index) => 
            index === i ? { 
              ...f, 
              uploading: false, 
              error: 'فشل في رفع الملف' 
            } : f
          ));
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('report-media')
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl);

        // Update file status to uploaded
        setFiles(prev => prev.map((f, index) => 
          index === i ? { 
            ...f, 
            uploading: false, 
            uploaded: true, 
            url: publicUrl 
          } : f
        ));
      }

      onFilesUploaded(uploadedUrls);
      
      if (uploadedUrls.length > 0) {
        toast({
          title: "تم رفع الملفات بنجاح",
          description: `تم رفع ${uploadedUrls.length} ملف بنجاح`,
        });
      }

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "خطأ في الرفع",
        description: "حدث خطأ أثناء رفع الملفات",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      // Revoke object URL to prevent memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview);
      }
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return Image;
    if (file.type.startsWith('video/')) return Video;
    return FileText;
  };

  return (
    <div className="space-y-4">
      <div
        className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">
          اضغط لاختيار الملفات أو اسحبها هنا
        </p>
        <p className="text-sm text-muted-foreground">
          الصور والفيديوهات - حتى {maxFileSize} ميجابايت لكل ملف
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">الملفات المحددة ({files.length}/{maxFiles})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((fileItem, index) => {
              const FileIcon = getFileIcon(fileItem.file);
              return (
                <Card key={index} className="relative">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      {fileItem.preview ? (
                        <img
                          src={fileItem.preview}
                          alt="Preview"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                          <FileIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-right">
                          {fileItem.file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(fileItem.file.size / 1024 / 1024).toFixed(2)} ميجابايت
                        </p>
                        
                        {fileItem.uploading && (
                          <div className="mt-1">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div className="bg-primary h-1 rounded-full animate-pulse w-1/2"></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">جاري الرفع...</p>
                          </div>
                        )}
                        
                        {fileItem.uploaded && (
                          <p className="text-xs text-green-600 mt-1">تم الرفع بنجاح</p>
                        )}
                        
                        {fileItem.error && (
                          <p className="text-xs text-red-600 mt-1">{fileItem.error}</p>
                        )}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                        disabled={fileItem.uploading}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Button
            onClick={uploadFiles}
            disabled={uploading || files.length === 0 || files.every(f => f.uploaded)}
            className="w-full"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                جاري رفع الملفات...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                رفع الملفات ({files.filter(f => !f.uploaded).length})
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;