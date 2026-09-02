import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Link2, X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import ImageCropModal from './ImageCropModal';
import { checkUploadStatus, uploadImage } from '../../services/uploadService';

const TAB_LINK = 'link';
const TAB_UPLOAD = 'upload';
const STATUS_IDLE = 'idle';
const STATUS_CROPPING = 'cropping';
const STATUS_UPLOADING = 'uploading';
const STATUS_DONE = 'done';

const ImageUploadField = ({
  label = 'Image',
  value = '',
  onChange,
  aspectRatio = 1,
  recommendedSize = '',
  folder = 'gbu-website/general',
}) => {
  const [activeTab, setActiveTab] = useState(TAB_LINK);
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE);
  const [cloudConfigured, setCloudConfigured] = useState(true);
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    checkUploadStatus()
      .then((data) => { if (!cancelled) setCloudConfigured(!!data.configured); })
      .catch(() => { if (!cancelled) setCloudConfigured(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    return () => { if (imageSrc) URL.revokeObjectURL(imageSrc); };
  }, [imageSrc]);

  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      return;
    }
    setError('');
    setImageSrc(URL.createObjectURL(file));
    setUploadStatus(STATUS_CROPPING);
  }, []);

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
        setTimeout(() => setUploadStatus(STATUS_IDLE), 2000);
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
      {label && <label className="block text-sm font-medium text-slate-700">{label}</label>}

      <div className="flex border-b border-slate-200">
        <button type="button" onClick={() => setActiveTab(TAB_LINK)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === TAB_LINK ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
          <Link2 className="h-3.5 w-3.5" /> Link
        </button>
        <button type="button" onClick={() => setActiveTab(TAB_UPLOAD)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === TAB_UPLOAD ? 'border-sky-500 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
          <Upload className="h-3.5 w-3.5" /> Upload
        </button>
      </div>

      <div className="pt-2">
        {activeTab === TAB_LINK && (
          <div className="relative">
            <input type="text" value={value}
              onChange={(e) => { onChange(e.target.value); setError(''); }}
              placeholder="Paste image URL here..."
              className="w-full px-3 py-2 pr-9 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors bg-slate-50 hover:bg-white focus:bg-white"
            />
            {value && (
              <button type="button" onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

        {activeTab === TAB_UPLOAD && (
          <>
            {!cloudConfigured ? (
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>Cloud storage is not connected. To enable uploads, add Cloudinary credentials in the backend <code className="font-mono bg-amber-100 px-1 rounded text-xs">.env</code> file.</span>
              </div>
            ) : (
              <>
                {uploadStatus === STATUS_UPLOADING && (
                  <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" /> <span>Uploading image...</span>
                  </div>
                )}
                {uploadStatus === STATUS_DONE && (
                  <div className="flex items-center justify-center gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
                    <CheckCircle className="h-4 w-4" /> <span>Image uploaded successfully!</span>
                  </div>
                )}
                {(uploadStatus === STATUS_IDLE || uploadStatus === STATUS_CROPPING) && (
                  <div onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${dragOver ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-slate-50 hover:border-sky-400 hover:bg-sky-50/50'}`}>
                    <Upload className="h-7 w-7 text-slate-400" />
                    <p className="text-sm text-slate-500 text-center">Click to select or drag an image here</p>
                    <p className="text-xs text-slate-400">PNG, JPG, WEBP supported</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileSelect(file); }} />
              </>
            )}
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> {error}
        </p>
      )}
      {recommendedSize && <p className="text-xs text-slate-400">Recommended: {recommendedSize}</p>}

      {value && (
        <div className="relative inline-block mt-1">
          <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow-sm"
            onError={(e) => { e.target.style.display = 'none'; }} />
          <button type="button" onClick={handleClear}
            className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white rounded-full p-0.5 hover:bg-rose-600 transition-colors shadow">
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <ImageCropModal open={uploadStatus === STATUS_CROPPING && !!imageSrc} imageSrc={imageSrc}
        aspectRatio={aspectRatio} onCropDone={handleCropDone} onClose={handleCropClose} />
    </div>
  );
};

export default ImageUploadField;
