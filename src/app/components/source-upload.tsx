'use client';

import { useState, useRef, type DragEvent, type ChangeEvent } from 'react';
import { Trash, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios'

interface SourceUploadProps {
  setIsUploaded: (value: boolean) => void;
  loading: boolean
  setLoading: (value: boolean) => void
}

const SourceUpload: React.FC<SourceUploadProps> = ({ setIsUploaded, loading, setLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please upload a PDF file.")
      return
    }

    const file = files[0]
    if (file.type !== "application/pdf") {
      setError("Only PDF files are supported.")
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      setResponse(res.data.data || res.data)
      setIsUploaded(true)
     
    } catch (err: any) {
      console.error("Upload error:", err)
      const message = err.response?.data?.error || "Unexpected error during upload."
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setResponse(null); // optional: reset extracted response if you want
    setError(null);
  };
  
  return (
    <div className="w-full max-w-7xl m-auto p-6 space-y-6">
      <div
        className={cn(
          'w-full h-[400px] my-auto rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors',
          isDragging ? 'shadow-md' : ''
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <div className="flex flex-col justify-center items-center gap-5">
          <label> Upload a file*</label>
          <Upload className="text-gray-500" size={100} strokeWidth={0.5} />
        </div>

        <div className="flex flex-col items-center text-center mt-7">
          <p className="text-sm font-medium text-gray-700">Drag & Drop</p>
          <p className="text-xs text-gray-500 mt-1">
            or <span className="text-gray-700 font-bold">Browse</span>
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </div>

      {files.length > 0 && (
  <div className="mt-4 p-4">
    <h3 className="text-sm font-medium mb-2">Uploaded Files:</h3>
    <ul className="text-xs space-y-1">
      {files.map((file, index) => (
        <li
          key={index}
          className="text-gray-700 flex gap-2 items-center py-1"
        >
          <span>
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
          </span>
          <Trash
            onClick={() => deleteFile(index)}
            size={16}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </li>
      ))}
    </ul>

    <button
      onClick={handleUpload}
      disabled={loading}
      className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-black text-sm"
    >
      {loading ? 'Uploading...' : 'UPLOAD'}
    </button>
  </div>
)}


      {error && (
        <p className="text-sm text-red-500 bg-red-100 p-2 rounded">{error}</p>
      )}

      {response && (
        <div className="bg-gray-100 text-sm p-4 rounded-lg overflow-x-auto">
          <h3 className="font-medium text-gray-700 mb-2">📄 Extracted Data:</h3>
          <pre className="whitespace-pre-wrap text-xs text-gray-800">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SourceUpload;
