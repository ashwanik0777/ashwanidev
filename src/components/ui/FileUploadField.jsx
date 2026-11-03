import React, { useState, useRef, useCallback } from 'react';
import { FileText, Link2, X, Loader2, CheckCircle, AlertTriangle, Upload, Download } from 'lucide-react';
import { checkUploadStatus, uploadFile, resolveUploadUrl } from '../../services/uploadService';

const STATUS_IDLE = 'idle';
const STATUS_UPLOADING = 'uploading';
const STATUS_DONE = 'done';

/**
 * Reusable file upload field for documents (PDF, DOC, DOCX, XLS, XLSX).
 * Strictly accepts only the file types specified in the `accept` prop.
 */
const FileUploadField = ({
  label = 'Document',
  required = false,
  value = '',
  onChange,
  accept = '.pdf',
  maxSize = 20 * 1024 * 1024,
  folder = '',
  fileName = '',
}) => {
  const [uploadStatus, setUploadStatus] = useState(STATUS_IDLE);
  const [storageReady, setStorageReady] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [uploadedName, setUploadedName] = useState('');
  const [uploadedSize, setUploadedSize] = useState(0);
  const fileInputRef = useRef(null);

  // Parse accept string into display labels
  const acceptedTypes = accept
    .split(',')
    .map((t) => t.trim().replace('.', '').toUpperCase())
    .join(', ');

  // Build a MIME type set from accept string for validation
  const mimeMap = {
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.xls': 'application/vnd.ms-excel',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  const allowedMimes = accept
    .split(',')
    .map((t) => mimeMap[t.trim()])
    .filter(Boolean);

  const validateFile = useCallback(
    (file) => {
      if (!file) return 'No file selected.';
      // Check MIME type
      if (allowedMimes.length > 0 && !allowedMimes.includes(file.type)) {
        return `Only ${acceptedTypes} files are accepted.`;
      }
      // Check extension as fallback
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      const allowedExts = accept.split(',').map((t) => t.trim().toLowerCase());
      if (!allowedExts.includes(ext)) {
        return `Only ${acceptedTypes} files are accepted.`;
      }
      // Check size
      if (file.size > maxSize) {
        const maxMB = Math.round(maxSize / (1024 * 1024));
        return `File size (${(file.size / (1024 * 1024)).toFixed(1)} MB) exceeds the ${maxMB} MB limit.`;
      }
      return null;
    },
    [accept, maxSize, allowedMimes, acceptedTypes]
  );

  const handleFileSelect = useCallback(
    async (file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setError(validationError);
        return;
      }
      setError('');

      // Check storage lazily
      if (storageReady === null) {
        try {
          const data = await checkUploadStatus();
          setStorageReady(!!data.configured);
          if (!data.configured) {
            setError('File storage is not connected. Please check the backend configuration.');
            return;
          }
        } catch {
          setStorageReady(false);
          setError('File storage is not connected. Please check the backend configuration.');
          return;
        }
      } else if (storageReady === false) {
        setError('File storage is not connected. Please check the backend configuration.');
        return;
      }

      // Upload — pass current value as replaceUrl to auto-delete old file
      setUploadStatus(STATUS_UPLOADING);
      try {
        const result = await uploadFile(file, folder, fileName, value || '');
        if (result?.url) {
          onChange(result.url);
          setUploadedName(result.originalName || file.name);
          setUploadedSize(result.size || file.size);
          setUploadStatus(STATUS_DONE);
          setTimeout(() => setUploadStatus(STATUS_IDLE), 2500);
        } else {
          throw new Error('No URL returned from upload.');
        }
      } catch (err) {
        console.error('File upload failed:', err);
        setError(err?.response?.data?.message || 'File upload failed. Please try again.');
        setUploadStatus(STATUS_IDLE);
      }
    },
    [validateFile, storageReady, folder, onChange]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);
  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const handleClear = () => {
    onChange('');
    setError('');
    setUploadedName('');
    setUploadedSize(0);
    setUploadStatus(STATUS_IDLE);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const displayUrl = value ? resolveUploadUrl(value) : '';
  const maxMB = Math.round(maxSize / (1024 * 1024));

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      {label && (
        <span className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
      )}

      {/* Upload drop zone */}
      {uploadStatus === STATUS_UPLOADING ? (
        <div className="flex items-center justify-center gap-2 p-5 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 text-sm">
          <Loader2 className="h-4 w-4 animate-spin" /> <span>Uploading file...</span>
        </div>
      ) : uploadStatus === STATUS_DONE ? (
        <div className="flex items-center justify-center gap-2 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          <CheckCircle className="h-4 w-4" /> <span>File uploaded successfully!</span>
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); fileInputRef.current?.click(); }}
          className={`flex flex-col items-center justify-center gap-1.5 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragOver
              ? 'border-sky-500 bg-sky-50'
              : 'border-slate-200 bg-slate-50/50 hover:border-sky-400 hover:bg-sky-50/50'
          }`}
        >
          <Upload className="h-5 w-5 text-slate-400" />
          <p className="text-xs text-slate-500 text-center">Click to select or drag file here</p>
          <p className="text-[10px] text-slate-400">
            {acceptedTypes} supported · Max {maxMB} MB
          </p>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {/* OR divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
          or paste link
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* URL input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Link2 className="h-3.5 w-3.5" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setError('');
          }}
          placeholder={`https://example.com/document.${accept.split(',')[0]?.replace('.', '') || 'pdf'}`}
          className="w-full pl-8 pr-9 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-colors bg-white hover:border-slate-300"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* File preview / info */}
      {displayUrl && (
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <FileText className="h-8 w-8 text-rose-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">
              {uploadedName || value.split('/').pop() || 'Document'}
            </p>
            {uploadedSize > 0 && (
              <p className="text-[10px] text-slate-400">{formatSize(uploadedSize)}</p>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href={displayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-sky-600 transition-colors rounded-lg hover:bg-sky-50"
              onClick={(e) => e.stopPropagation()}
            >
              <Download className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadField;
