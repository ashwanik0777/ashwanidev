import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Link2, X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import ImageCropModal from './ImageCropModal';
import { checkUploadStatus, uploadImage } from '../../services/uploadService';

const STATUS_IDLE = 'idle';
const STATUS_CROPPING = 'cropping';
const STATUS_UPLOADING = 'uploading';
const STATUS_DONE = 'done';

const ImageUploadField = ({
  label = 'Image',
  required = false,
  value = '',
  onChange,
  aspectRatio = 1,
  recommendedSize = '',
  folder = 'gbu-website/general',
}) => {
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE);
  const [cloudConfigured, setCloudConfigured] = useState(null); // null = not checked yet
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => { if (imageSrc) URL.revokeObjectURL(imageSrc); };
  }, [imageSrc]);

  /* Check cloud status lazily — only when user tries to upload */
  const checkCloudAndProceed = useCallback(async (file) => {
    if (cloudConfigured === null) {
      try {
        const data = await checkUploadStatus();
        setCloudConfigured(!!data.configured);
        if (!data.configured) {
          setError('Cloud storage is not connected. To enable uploads, add Cloudinary credentials in the backend .env file.');
          return;
        }
      } catch {
        setCloudConfigured(false);
        setError('Cloud storage is not connected. To enable uploads, add Cloudinary credentials in the backend .env file.');
        return;
      }
    } else if (cloudConfigured === false) {
      setError('Cloud storage is not connected. To enable uploads, add Cloudinary credentials in the backend .env file.');
      return;
    }
    // Cloud is configured — proceed with crop
    setError('');
    setImageSrc(URL.createObjectURL(file));
    setUploadStatus(STATUS_CROPPING);
  }, [cloudConfigured]);

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setError('');
    checkCloudAndProceed(file);
  }, [checkCloudAndProceed]);

  const onDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files?.[0]); };

  const handleCropDone = async (blob) => {
    setUploadStatus(STATUS_UPLOADING);
    if (imageSrc) { URL.revokeObjectURL(imageSrc); setImageSrc(null); }
    try {
      const file = new File([blob], 'cropped-image.webp', { type: blob.type || 'image/webp' });
      const result = await uploadImage(file, folder);
      if (result?.url) {
        onChange(result.url);
        setUploadStatus(STATUS_DONE);
        setTimeout(() => setUploadStatus(STATUS_IDLE), 2500);
      } else {
        throw new Error('No URL returned from upload.');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err?.response?.data?.message || 'Image upload failed. Please try again.');
      setUploadStatus(STATUS_IDLE);
    }
  };

  const handleCropClose = () => {
    if (imageSrc) { URL.revokeObjectURL(imageSrc); setImageSrc(null); }
    setUploadStatus(STATUS_IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClear = () => {
    onChange('');
    setError('');
    setUploadStatus(STATUS_IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-slate-700">{label} {required && <span className="text-rose-500">*</span>}</label>}

      {/* Upload drop zone */}
      {uploadStatus === STATUS_UPLOADING ? (
        <div className="flex items-center justify-center gap-2 p-5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> <span>Uploading image...</span>
        </div>
      ) : uploadStatus === STATUS_DONE ? (
        <div className="flex items-center justify-center gap-2 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <CheckCircle className="h-4 w-4" /> <span>Image uploaded successfully!</span>
        </div>
      ) : (
        <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-1.5 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragOver ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/50'
          }`}>
          <Upload className="h-5 w-5 text-slate-400" />
          <p className="text-xs text-slate-500 text-center">Click to select or drag image here</p>
          <p className="text-[10px] text-slate-400">PNG, JPG, WEBP supported</p>
        </div>
      )}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileSelect(file); }} />

      {/* OR divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">or paste link</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* URL input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Link2 className="h-3.5 w-3.5" />
        </div>
        <input type="text" value={value}
          onChange={(e) => { onChange(e.target.value); setError(''); }}
          placeholder="https://example.com/image.jpg"
          className="w-full pl-8 pr-9 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors bg-white hover:border-slate-300"
        />
        {value && (
          <button type="button" onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Error message — only shown when user tries to upload */}
      {error && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Recommended size hint */}
      {recommendedSize && <p className="text-[10px] text-slate-400">Recommended: {recommendedSize}</p>}

      {/* Preview thumbnail */}
      {value && (
        <div className="relative inline-block">
          <img src={value} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-slate-200 shadow-sm"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <button type="button" onClick={handleClear}
            className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-0.5 hover:bg-rose-600 transition-colors shadow">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Crop Modal */}
      <ImageCropModal open={uploadStatus === STATUS_CROPPING && !!imageSrc} imageSrc={imageSrc}
        aspectRatio={aspectRatio} onCropDone={handleCropDone} onClose={handleCropClose} />
    </div>
  );
};

export default ImageUploadField;
