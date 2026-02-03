"use client"

import React from "react"
import { X, AlertCircle, CheckCircle } from "lucide-react"

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: "warning" | "error" | "success"
  actionText?: string
  onAction?: () => void
}

export function AlertModal({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = "warning",
  actionText,
  onAction 
}: AlertModalProps) {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-6 h-6 text-red-500" />
      case "success":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-red-50 border-red-200"
      case "success":
        return "bg-green-50 border-green-200"
      default:
        return "bg-yellow-50 border-yellow-200"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-200">
        <div className={`p-6 border-b ${getBgColor()}`}>
          <div className="flex items-start gap-3">
            {getIcon()}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-1">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {actionText && onAction && (
          <div className="p-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onAction()
                onClose()
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {actionText}
            </button>
          </div>
        )}
        
        {!actionText && (
          <div className="p-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
