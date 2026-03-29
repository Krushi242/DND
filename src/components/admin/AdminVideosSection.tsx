import React from 'react';
import { PlaySquare, Plus, Trash2, X } from 'lucide-react';
import type { VideoItem } from '../../utils/videos';
import VideoPlayer from '../common/VideoPlayer';

interface AdminVideosSectionProps {
  videoItems: VideoItem[];
  videoSrc: string;
  videoError: string | null;
  isAddModalOpen: boolean;
  deleteTarget: VideoItem | null;
  isLoading: boolean;
  isSaving: boolean;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onRequestDelete: (item: VideoItem) => void;
  onConfirmDelete: () => void;
  onCloseDeleteModal: () => void;
}

const AdminVideosSection: React.FC<AdminVideosSectionProps> = ({
  videoItems,
  videoSrc,
  videoError,
  isAddModalOpen,
  deleteTarget,
  isLoading,
  isSaving,
  onUrlChange,
  onSubmit,
  onOpenModal,
  onCloseModal,
  onRequestDelete,
  onConfirmDelete,
  onCloseDeleteModal,
}) => {
  return (
    <>
      <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-semibold text-[#1E293B]">
              <PlaySquare size={20} className="text-[#005948]" />
              Video Manager
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">Choose videos here and they will show on the Videos page.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex w-fit rounded-full bg-[#005948]/10 px-3 py-1 text-sm font-medium text-[#005948]">
              {videoItems.length} Videos
            </span>
            <button
              type="button"
              onClick={onOpenModal}
              className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center text-[#64748B]">
              <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#005948]"></div>
              <p>Loading videos...</p>
            </div>
          ) : videoItems.length === 0 ? (
            <div className="rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-6 py-12 text-center text-[#64748B]">
              No videos found.
            </div>
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {videoItems.map((item, index) => (
              <div key={item.id} className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-white">
                <VideoPlayer src={item.videoUrl} title={`Video ${index + 1}`} />
                  <div className="space-y-3 p-4">
                    <div>
                      <p className="text-base font-semibold text-[#1E293B]">Video {index + 1}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRequestDelete(item)}
                      className="inline-flex items-center gap-2 rounded-[10px] border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[120] overflow-y-auto bg-[#0f172a]/55 p-4">
          <div className="flex min-h-full items-center justify-center">
            <div className="flex w-full max-w-[560px] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[10px] border border-[#DDE7E3] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.22)]">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
                <div>
                  <h3 className="text-xl font-semibold text-[#1E293B]">Add Video</h3>
                  <p className="mt-1 text-sm text-[#64748B]">Add a YouTube, Google Drive, or direct video URL.</p>
                </div>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="rounded-full p-2 text-[#64748B] transition-colors hover:bg-[#F1F5F9] hover:text-[#1E293B]"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={onSubmit} className="flex-1 space-y-4 overflow-y-auto p-6">
                <div>
                  <label htmlFor="video-url" className="mb-2 block text-sm font-medium text-[#334155]">Video URL</label>
                  <input
                    id="video-url"
                    type="url"
                    value={videoSrc}
                    onChange={onUrlChange}
                    className="w-full rounded-[10px] border border-[#CBD5E1] bg-white px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#005948]/20"
                    placeholder="https://www.youtube.com/watch?v=xxxx"
                  />
                </div>

                {videoError && (
                  <div className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {videoError}
                  </div>
                )}

                {videoSrc && (
                  <div className="overflow-hidden rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC]">
                    <VideoPlayer src={videoSrc} title="Video preview" />
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    disabled={isSaving}
                    className="rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-[10px] bg-[#F26A21] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e05a12]"
                  >
                    {isSaving ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add Video
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-[125] flex items-center justify-center bg-[#0f172a]/60 p-4">
          <div className="w-full max-w-[420px] rounded-[10px] border border-[#DDE7E3] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
            <h3 className="text-xl font-semibold text-[#1E293B]">Delete Video?</h3>
            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              This will remove the selected video from the videos page. Please confirm before deleting.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCloseDeleteModal}
                className="rounded-[10px] border border-[#D9E2EC] bg-white px-4 py-3 text-sm font-medium text-[#475569] transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirmDelete}
                className="inline-flex items-center gap-2 rounded-[10px] bg-red-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminVideosSection;
