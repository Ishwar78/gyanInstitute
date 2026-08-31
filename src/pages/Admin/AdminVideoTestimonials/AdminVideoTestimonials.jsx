import { useState, useEffect } from "react";
import { FiEdit3, FiPlus, FiTrash2, FiUpload, FiX, FiVideo, FiPlay, FiExternalLink } from "react-icons/fi";
import "./AdminVideoTestimonials.css";

export default function AdminVideoTestimonials() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "Advanced Digital Marketing With AI Training Company",
    studentName: "",
    courseOrRole: "Student",
    subText: "Gyan Institute - Experience",
    badgeText: "GYAN INSTITUTE - STORY",
    tagPill: "Student Testimonial",
    callLine: "Call Now - 8684031003",
    videoUrl: "",
    thumbnailUrl: "",
    order: 0,
    status: "Active",
  });

  const [selectedVideoFile, setSelectedVideoFile] = useState(null);
  const [selectedThumbFile, setSelectedThumbFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewModalVideo, setPreviewModalVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    if (!selectedVideoFile) {
      setVideoPreview(null);
      return;
    }
    const url = URL.createObjectURL(selectedVideoFile);
    setVideoPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedVideoFile]);

  useEffect(() => {
    if (!selectedThumbFile) {
      setThumbPreview(null);
      return;
    }
    const url = URL.createObjectURL(selectedThumbFile);
    setThumbPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [selectedThumbFile]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5005/api/video-testimonial");
      const json = await res.json();
      if (json.success) {
        setVideos(json.data);
      }
    } catch (error) {
      console.error("Failed to fetch video testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      studentName: "",
      courseOrRole: "",
      subText: "",
      badgeText: "GYAN INSTITUTE - STORY",
      tagPill: "Student Testimonial",
      callLine: "Call Now - 8684031003",
      videoUrl: "",
      thumbnailUrl: "",
      order: 0,
      status: "Active",
    });
    setSelectedVideoFile(null);
    setSelectedThumbFile(null);
    setVideoPreview(null);
    setThumbPreview(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || "",
      studentName: item.studentName || "",
      courseOrRole: item.courseOrRole || "",
      subText: item.subText || "",
      badgeText: item.badgeText || "",
      tagPill: item.tagPill || "",
      callLine: item.callLine || "",
      videoUrl: item.videoUrl || "",
      thumbnailUrl: item.thumbnailUrl || "",
      order: item.order !== undefined ? item.order : 0,
      status: item.status || "Active",
    });
    setSelectedVideoFile(null);
    setSelectedThumbFile(null);
    setVideoPreview(null);
    setThumbPreview(null);
    setModalOpen(true);
  };

  const uploadFile = async (file) => {
    const uploadData = new FormData();
    uploadData.append("file", file);

    const res = await fetch("http://localhost:5005/api/upload", {
      method: "POST",
      body: uploadData,
    });
    const json = await res.json();
    if (json.success) {
      return json.fileUrl || json.videoUrl || json.imageUrl;
    } else {
      throw new Error(json.message || "Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);
      let finalVideoUrl = formData.videoUrl;
      let finalThumbUrl = formData.thumbnailUrl;

      if (selectedVideoFile) {
        finalVideoUrl = await uploadFile(selectedVideoFile);
      }

      if (selectedThumbFile) {
        finalThumbUrl = await uploadFile(selectedThumbFile);
      }

      if (!finalVideoUrl) {
        alert("Please upload a video file or enter a valid video URL.");
        setUploading(false);
        return;
      }

      const payload = {
        ...formData,
        videoUrl: finalVideoUrl,
        thumbnailUrl: finalThumbUrl,
      };

      const url = editingId
        ? `http://localhost:5005/api/video-testimonial/${editingId}`
        : "http://localhost:5005/api/video-testimonial";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setModalOpen(false);
        fetchVideos();
      } else {
        alert("Failed to save video story: " + json.message);
      }
    } catch (error) {
      console.error("Error saving video story:", error);
      alert("Error uploading/saving video: " + (error.message || "Unknown error"));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video testimonial?")) return;

    try {
      const res = await fetch(`http://localhost:5005/api/video-testimonial/${id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        fetchVideos();
      } else {
        alert("Failed to delete video testimonial");
      }
    } catch (error) {
      console.error("Error deleting video testimonial:", error);
    }
  };

  return (
    <div className="admin-page admin-video-testimonials">
      <div className="admin-page-header">
        <div>
          <span className="eyebrow">HOMEPAGE & MEDIA</span>
          <h1>Video Testimonials / Stories</h1>
          <p>Upload and manage video reviews shown on the home page below Campus Gallery.</p>
        </div>
        <button className="primary-btn" onClick={openAddModal}>
          <FiPlus /> Add Video Story
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p style={{ padding: "20px" }}>Loading video stories...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Video Preview</th>
                <th>Student Details</th>
                <th>Card Headline & Subtitle</th>
                <th>Badge & Call Line</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((v) => (
                <tr key={v._id}>
                  <td>
                    <div className="admin-video-cell" onClick={() => setPreviewModalVideo(v)}>
                      {v.thumbnailUrl ? (
                        <img src={v.thumbnailUrl} alt={v.studentName} className="admin-video-thumb" />
                      ) : (
                        <video src={v.videoUrl} className="admin-video-thumb" muted preload="metadata" />
                      )}
                      <span className="play-overlay-icon"><FiPlay /></span>
                    </div>
                  </td>
                  <td>
                    <b>{v.studentName}</b>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>{v.courseOrRole}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: "600", fontSize: "13px", maxWidth: "260px" }}>{v.title}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>{v.subText}</div>
                  </td>
                  <td>
                    <span className="badge-tag-pill">{v.badgeText}</span>
                    <div style={{ fontSize: "12px", color: "var(--navy)", marginTop: "4px", fontWeight: "500" }}>
                      {v.callLine}
                    </div>
                  </td>
                  <td>
                    <span className={`status ${v.status === "Draft" ? "draft" : ""}`}>{v.status}</span>
                  </td>
                  <td>
                    <div className="actions">
                      <button title="Play video" onClick={() => setPreviewModalVideo(v)}><FiPlay /></button>
                      <button title="Edit" onClick={() => openEditModal(v)}><FiEdit3 /></button>
                      <button title="Delete" onClick={() => handleDelete(v._id)}><FiTrash2 /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {videos.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "30px" }}>
                    No video stories added yet. Click <strong>"Add Video Story"</strong> to upload your first video.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Video Watch Preview Modal */}
      {previewModalVideo && (
        <div className="course-modal-overlay" onClick={() => setPreviewModalVideo(null)}>
          <div className="video-player-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{previewModalVideo.studentName} - {previewModalVideo.title}</h3>
              <button onClick={() => setPreviewModalVideo(null)}><FiX /></button>
            </div>
            <div className="video-player-body">
              {previewModalVideo.videoUrl.includes("youtube.com") || previewModalVideo.videoUrl.includes("youtu.be") ? (
                <iframe
                  src={
                    previewModalVideo.videoUrl.includes("watch?v=")
                      ? previewModalVideo.videoUrl.replace("watch?v=", "embed/")
                      : previewModalVideo.videoUrl
                  }
                  title={previewModalVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="modal-video-element"
                />
              ) : (
                <video
                  src={previewModalVideo.videoUrl}
                  controls
                  autoPlay
                  className="modal-video-element"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="course-modal-overlay">
          <div className="course-modal video-story-modal">
            <div className="modal-head">
              <h2>{editingId ? "Edit Video Story" : "Add New Video Story"}</h2>
              <button onClick={() => setModalOpen(false)}><FiX /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-row">
                <label>
                  Student Name *
                  <input
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    placeholder="e.g. Ishwar Sharma"
                  />
                </label>
                <label>
                  Course / Role
                  <input
                    value={formData.courseOrRole}
                    onChange={(e) => setFormData({ ...formData, courseOrRole: e.target.value })}
                    placeholder="e.g. Digital Marketing Specialist"
                  />
                </label>
              </div>

              <label>
                Card Headline / Title
                <input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Advanced Digital Marketing With AI Training Company"
                />
              </label>

              <div className="form-row">
                <label>
                  Top Story Badge Tag
                  <input
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    placeholder="e.g. GYAN INSTITUTE - STORY"
                  />
                </label>
                <label>
                  Center Tag Pill
                  <input
                    value={formData.tagPill}
                    onChange={(e) => setFormData({ ...formData, tagPill: e.target.value })}
                    placeholder="e.g. Student Testimonial"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Call / Contact Line
                  <input
                    value={formData.callLine}
                    onChange={(e) => setFormData({ ...formData, callLine: e.target.value })}
                    placeholder="e.g. Call Now - 8684031003"
                  />
                </label>
                <label>
                  Bottom Subtitle (Student Review)
                  <input
                    value={formData.subText}
                    onChange={(e) => setFormData({ ...formData, subText: e.target.value })}
                    placeholder="e.g. Gyan Institute - Experience"
                  />
                </label>
              </div>

              {/* Video File Upload */}
              <div className="media-upload-section">
                <h3>Video Source</h3>
                <div className="upload-options-grid">
                  <div className="file-upload-box">
                    <label className="file-label">
                      <FiUpload /> Upload Video File (MP4, WebM, MOV)
                      <input
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/quicktime,video/*"
                        onChange={(e) => setSelectedVideoFile(e.target.files[0])}
                      />
                    </label>
                    {selectedVideoFile && <small className="file-name-hint">Selected: {selectedVideoFile.name}</small>}
                  </div>
                  <div className="url-input-box">
                    <label>
                      Or Video / YouTube URL
                      <input
                        type="text"
                        value={formData.videoUrl}
                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                        placeholder="https://... or http://localhost:5005/upload/..."
                      />
                    </label>
                  </div>
                </div>

                {(videoPreview || formData.videoUrl) && (
                  <div className="video-preview-wrap">
                    <p>Video Preview:</p>
                    <video
                      src={videoPreview || formData.videoUrl}
                      controls
                      style={{ maxHeight: "180px", borderRadius: "10px", background: "#000" }}
                    />
                  </div>
                )}
              </div>

              {/* Thumbnail Upload (Optional) */}
              <div className="media-upload-section">
                <h3>Optional Custom Thumbnail</h3>
                <div className="upload-options-grid">
                  <div className="file-upload-box">
                    <label className="file-label">
                      <FiUpload /> Upload Poster / Thumbnail (JPG, PNG)
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setSelectedThumbFile(e.target.files[0])}
                      />
                    </label>
                    {selectedThumbFile && <small className="file-name-hint">Selected: {selectedThumbFile.name}</small>}
                  </div>
                  <div className="url-input-box">
                    <label>
                      Or Thumbnail URL
                      <input
                        type="text"
                        value={formData.thumbnailUrl}
                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                        placeholder="https://..."
                      />
                    </label>
                  </div>
                </div>
                {(thumbPreview || formData.thumbnailUrl) && (
                  <div className="image-preview" style={{ marginTop: "10px" }}>
                    <img
                      src={thumbPreview || formData.thumbnailUrl}
                      alt="Thumbnail Preview"
                      style={{ height: "70px", borderRadius: "8px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </div>

              <div className="form-row">
                <label>
                  Status
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>
                <label>
                  Display Order
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  />
                </label>
              </div>

              <div className="modal-foot">
                <button type="button" className="cancel-btn" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={uploading}>
                  {uploading ? "Uploading & Saving..." : "Save Video Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
