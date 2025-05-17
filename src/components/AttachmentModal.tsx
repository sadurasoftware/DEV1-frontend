import React from "react";
import ReactPlayer from "react-player";
import { AttachmentType } from "@/types/AttachmentType";

export const AttachmentModal: React.FC<AttachmentType> = ({ urls, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-4xl w-full relative overflow-y-auto max-h-screen">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black font-bold text-lg"
          aria-label="Close modal"
        >
          X
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {urls?.map((url, index) => {
            const isVideo = /\.(mp4|webm|ogg)$/i.test(url);
            return (
              <div key={index}>
                {isVideo ? (
                  <ReactPlayer url={url} controls width="100%" height="auto" />
                ) : (
                  <img
                    src={url}
                    alt={`Attachment ${index + 1}`}
                    className="w-full h-auto border rounded shadow object-contain"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
