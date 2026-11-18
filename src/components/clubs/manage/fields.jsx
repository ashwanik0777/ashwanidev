import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Loader2, Plus, X } from "lucide-react";
import ImageCropModal from "../../ui/ImageCropModal";
import { ensureStorage, iconButton, inputClass, move, uploadError } from "../clubUi";
import { uploadImage } from "../../../services/uploadService";
import { parseImageUrl } from "../../../utils/imageUtils";

export const Field = ({ label, required, hint, error, children, className = "" }) => (
  <label className={`block ${className}`}>
    <span className="mb-1.5 block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </span>
    {children}
    {error ? <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span> : hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>}
  </label>
);

export const StepHeading = ({ title, children }) => (
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
    <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">{title}</h3>
    {children}
  </div>
);

// Bullet points (objectives, rules ...): one input per point, Enter adds the next one.
export const ListEditor = ({ label, items, onChange, placeholder, addLabel = "Add point", max = 20 }) => {
  const listRef = useRef(null);
  const focusNewRow = useRef(false);
  const list = Array.isArray(items) ? items : [];

  // Focus moves to a new row as soon as it is in the page, before the next key press arrives.
  useLayoutEffect(() => {
    if (!focusNewRow.current) return;
    focusNewRow.current = false;
    const inputs = listRef.current?.querySelectorAll("input");
    inputs?.[inputs.length - 1]?.focus();
  }, [list.length]);

  const add = () => {
    focusNewRow.current = true;
    onChange([...list, ""]);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-xs text-slate-400">{list.filter((item) => String(item).trim()).length} added</span>
      </div>
      <div ref={listRef} className="space-y-2">
        {list.map((item, index) => (
          <div key={index} className="group flex items-center gap-1.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-[11px] font-bold text-slate-500">{index + 1}</span>
            <input
              className={inputClass}
              value={item}
              placeholder={placeholder}
              onChange={(event) => onChange(list.map((value, i) => (i === index ? event.target.value : value)))}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  if (index === list.length - 1 && list.length < max) add();
                }
              }}
            />
            <button type="button" className={`${iconButton} hidden sm:flex`} onClick={() => onChange(move(list, index, index - 1))} disabled={index === 0} aria-label="Move up">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" className={`${iconButton} hidden sm:flex`} onClick={() => onChange(move(list, index, index + 1))} disabled={index === list.length - 1} aria-label="Move down">
              <ArrowDown className="h-4 w-4" />
            </button>
            <button type="button" className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`} onClick={() => onChange(list.filter((_, i) => i !== index))} aria-label="Remove">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      {list.length < max && (
        <button
          type="button"
          onClick={add}
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-sky-700 transition hover:bg-sky-50"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      )}
    </div>
  );
};

/**
 * A small photo box: pick a file, crop it, upload it. Used for team photos and event images.
 * shape "circle" for people, "rect" for event images.
 */
export const PhotoInput = ({ value, onChange, folder, aspectRatio = 1, shape = "circle", label = "Photo", cropHint = "" }) => {
  const inputRef = useRef(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const pick = async (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose a JPG, PNG or WebP image.");
      return;
    }
    setError("");
    try {
      await ensureStorage();
      setCropSrc(URL.createObjectURL(file));
    } catch (err) {
      setError(uploadError(err));
    }
  };

  const closeCrop = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const upload = async (blob) => {
    closeCrop();
    setBusy(true);
    try {
      const file = new File([blob], "photo.webp", { type: blob.type || "image/webp" });
      const result = await uploadImage(file, folder);
      if (!result?.url) throw new Error("The upload did not return a link.");
      onChange(result.url);
    } catch (err) {
      setError(uploadError(err));
    } finally {
      setBusy(false);
    }
  };

  const frame = shape === "circle" ? "h-16 w-16 rounded-full" : "h-16 w-24 rounded-xl";

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`group relative flex shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 text-slate-400 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-600 ${frame}`}
        aria-label={value ? `Change ${label.toLowerCase()}` : `Upload ${label.toLowerCase()}`}
      >
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin text-sky-600" />
        ) : value ? (
          <img src={parseImageUrl(value, 300)} alt="" className="h-full w-full object-cover object-top" />
        ) : (
          <ImagePlus className="h-5 w-5" />
        )}
      </button>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <button type="button" onClick={() => inputRef.current?.click()} disabled={busy} className="text-sm font-semibold text-sky-700 transition hover:text-sky-800">
            {busy ? "Uploading..." : value ? `Change ${label.toLowerCase()}` : `Upload ${label.toLowerCase()}`}
          </button>
          {value && !busy && (
            <button type="button" onClick={() => onChange("")} className="text-sm font-semibold text-slate-500 transition hover:text-rose-600">
              Remove
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-xs font-medium text-rose-600">{error}</p>}
      </div>
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => pick(event.target.files?.[0])} />
      <ImageCropModal open={!!cropSrc} imageSrc={cropSrc} aspectRatio={aspectRatio} hint={cropHint} onCropDone={upload} onClose={closeCrop} />
    </div>
  );
};

