-- Create storage bucket for report media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('report-media', 'report-media', true);

-- Create policies for report media bucket
CREATE POLICY "Users can upload their own report media" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'report-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Report media is publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'report-media');

CREATE POLICY "Users can update their own report media" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'report-media' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own report media" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'report-media' AND auth.uid()::text = (storage.foldername(name))[1]);