"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useSessionStore } from "@/hooks/useSession"
import { Upload, File, CheckCircle, XCircle, Loader2 } from "lucide-react"
import clsx from "clsx"

export function FileUploader() {
  const { uploadFiles, uploadedFiles } = useSessionStore()
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        await uploadFiles(acceptedFiles)
      }
    },
    [uploadFiles],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  })

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={clsx(
          "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
        )}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500">PDF or DOCX files (multiple files allowed)</p>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-900">Uploaded Files</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file) => (
              <div key={file.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  {file.status === "uploading" && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {file.status === "uploading" && <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />}
                  {file.status === "success" && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {file.status === "error" && <XCircle className="h-4 w-4 text-red-600" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
