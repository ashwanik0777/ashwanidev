import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Upload, Link, X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import ImageCropModal from './ImageCropModal';
import { checkUploadStatus, uploadImage } from '../../services/uploadService';

/* ── Tab identifiers ── */
const TAB_LINK = 'link';
const TAB_UPLOAD = 'upload';

/* ── Upload states ── */
const STATUS_IDLE = 'idle';
const STATUS_CROPPING = 'cropping';
const STATUS_UPLOADING = 'uploading';
const STATUS_DONE = 'done';

/* ══════════════════════════════════════════════
   ImageUploadField
   ══════════════════════════════════════════════ */
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
  const [cloudConfigured, setCloudConfigured] = useState(true); // optimistic
  const [imageSrc, setImageSrc] = useState(null); // object URL for crop
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  /* ── Check Cloudinary status on mount ── */
  useEffect(() => {
    let cancelled = false;
    checkUploadStatus()
      .then((data) => {
        if (!cancelled) setCloudConfigured(!!data.configured);
      })
      .catch(() => {
        if (!cancelled) setCloudConfigured(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  /* ── Cleanup object URL on unmount / change ── */
  useEffect(() => {
    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [imageSrc]);

  /* ── Handle file selection (click or drop) ── */
  const handleFileSelect = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('कृपया एक valid image file select करें');
      return;
    }
    setError('');
    const objectUrl = URL.createObjectURL(file);
    setImageSrc(objectUrl);
    setUploadStatus(STATUS_CROPPING);
  }, []);

  /* ── Drop zone handlers ── */
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFileSelect(file);
  };

  /* ── Crop done → upload ── */
  const handleCropDone = async (blob) => {
    setUploadStatus(STATUS_UPLOADING);
    // close crop modal source
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }

    try {
      const file = new File([blob], 'cropped-image.webp', { type: blob.type || 'image/webp' });
      const result = await uploadImage(file, folder);
      if (result?.url) {
        onChange(result.url);
        setUploadStatus(STATUS_DONE);
        // reset status after 2s
        setTimeout(() => setUploadStatus(STATUS_IDLE), 2000);
      } else {
        throw new Error('Upload response mein URL nahi mila');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err?.response?.data?.message || 'Image upload fail ho gaya, retry karein');
      setUploadStatus(STATUS_IDLE);
    }
  };

  /* ── Close crop modal ── */
  const handleCropClose = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
      setImageSrc(null);
    }
    setUploadStatus(STATUS_IDLE);
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ── Clear value ── */
  const handleClear = () => {
    onChange('');
    setError('');
    setUploadStatus(STATUS_IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ══════════════════════════════════════════════ */
  return (
    <div className="space-y-2">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* ── Tabs ── */}
      <div className="flex border-b border-gray-200">
        <button
          type="button"
          onClick={() => setActiveTab(TAB_LINK)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === TAB_LINK
              ? 'border-sky-500 text-sky-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Link size={15} />
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => setActiveTab(TAB_UPLOAD)}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === TAB_UPLOAD
              ? 'border-sky-500 text-sky-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Upload size={15} />
          📤 Upload
        </button>
      </div>

      {/* ── Tab Content ── */}
      <div className="pt-2">
        {/* ─── LINK TAB ─── */}
        {activeTab === TAB_LINK && (
          <div className="relative">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setError('');
              }}
              placeholder="Image URL paste करें…"
              className="w-full px-3 py-2 pr-9 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
            />
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* ─── UPLOAD TAB ─── */}
        {activeTab === TAB_UPLOAD && (
          <>
            {!cloudConfigured ? (
              /* Warning when Cloudinary not configured */
              <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                <span>
                  ⚠️ Cloud storage connected नहीं है। Uploads enable करने के लिए backend <code className="font-mono bg-amber-100 px-1 rounded">.env</code> में Cloudinary credentials add करें।
                </span>
              </div>
            ) : (
              <>
                {/* Upload status indicators */}
                {uploadStatus === STATUS_UPLOADING && (
                  <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-sky-50 border border-sky-200 text-sky-700 text-sm">
                    <Loader2 size={18} className="animate-spin" />
                    <span>Image upload हो रही है…</span>
                  </div>
                )}

                {uploadStatus === STATUS_DONE && (
                  <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    <CheckCircle size={18} />
                    <span>Image successfully upload हो गई! ✅</span>
                  </div>
                )}

                {/* Drop zone – shown in idle / cropping states */}
                {(uploadStatus === STATUS_IDLE || uploadStatus === STATUS_CROPPING) && (
                  <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                      dragOver
                        ? 'border-sky-500 bg-sky-50'
                        : 'border-gray-300 bg-gray-50 hover:border-sky-400 hover:bg-sky-50/50'
                    }`}
                  >
                    <Upload size={28} className="text-gray-400" />
                    <p className="text-sm text-gray-500 text-center">
                      Click करें या image यहाँ drag करें
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP supported</p>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </>
            )}
          </>
        )}
      </div>

      {/* ── Error message ── */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertTriangle size={13} />
          {error}
        </p>
      )}

      {/* ── Recommended size hint ── */}
      {recommendedSize && (
        <p className="text-xs text-gray-400">Recommended: {recommendedSize}</p>
      )}

      {/* ── Preview thumbnail ── */}
      {value && (
        <div className="relative inline-block mt-1">
          <img
            src={value}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors shadow"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* ── Crop Modal ── */}
      <ImageCropModal
        open={uploadStatus === STATUS_CROPPING && !!imageSrc}
        imageSrc={imageSrc}
        aspectRatio={aspectRatio}
        onCropDone={handleCropDone}
        onClose={handleCropClose}
      />
    </div>
  );
};

export default ImageUploadField;
