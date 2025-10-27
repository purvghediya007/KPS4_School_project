
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import multer from "multer";
import fs from "fs";
import Admin from "./adminModel.js";

const app = express();
const PORT = 5000;
const SECRET_KEY = "my_secret";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/adminpanel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create uploads folder if not exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// JWT verification middleware for admin routes
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header missing" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Event Image Schema
const imageSchema = new mongoose.Schema({
  eventId: Number,
  year: Number,
  imageUrl: String, // only filename stored here
  type: { type: String, enum: ["photo", "video"], default: "photo" },
  uploadedAt: { type: Date, default: Date.now },
});

const EventImage = mongoose.model("EventImage", imageSchema);

// ✅ Announcement Schema (ADD THIS)

const announcementSchema = new mongoose.Schema({
  message: { type: String, required: true },
  file: { type: String }, // store filename
  fileType: { type: String }, // image or pdf for easy handling
  createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model("Announcement", announcementSchema);


const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});
const Achievement = mongoose.model("Achievement", achievementSchema);

// ✅ Media Gallery Schema
const mediaSchema = new mongoose.Schema({
  filename: String,
  path: String,
  uploadedAt: { type: Date, default: Date.now },
});
const Media = mongoose.model("Media", mediaSchema);

// Admin Login
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || password !== admin.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: admin._id }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// Upload Image/Video for Event (Admin only)
app.post("/api/events/:eventId", upload.single("media"), async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const { year, type } = req.body;

  try {
    const newMedia = await EventImage.create({
      eventId,
      year: parseInt(year),
      type: type || "photo",
      imageUrl: req.file.filename, // save only filename
    });
    res.json({ message: "Media uploaded", media: newMedia });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload media" });
  }
});

// Fetch Event Images and Videos separately by Year and Event ID
app.get("/api/events/:year/:eventId", async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const year = parseInt(req.params.year);

  try {
    const images = await EventImage.find({ eventId, year, type: "photo" });
    const videos = await EventImage.find({ eventId, year, type: "video" });

    res.json({
      images: images.map(({ _id, imageUrl }) => ({ _id, imageUrl })),
      videos: videos.map(({ _id, imageUrl }) => ({ _id, imageUrl })),
    });
  } catch (err) {
    console.error("Error fetching event media:", err);
    res.status(500).json({ message: "Failed to fetch event media" });
  }
});
// ✅ Get one recent photo per event (max 10 unique events)
app.get("/api/events/recent-images", async (req, res) => {
  try {
    // Fetch all photos sorted by upload date descending
    const photos = await EventImage.find({ type: "photo" }).sort({ uploadedAt: -1 });

    const seenEvents = new Set();
    const uniquePhotos = [];

    for (const photo of photos) {
      if (!seenEvents.has(photo.eventId)) {
        seenEvents.add(photo.eventId);
        uniquePhotos.push({
          eventId: photo.eventId,
          imageUrl: photo.imageUrl,
          eventName: `Event ${photo.eventId}`,
          uploadedAt: photo.uploadedAt,
        });
      }
      if (uniquePhotos.length >= 10) break; // limit to max 10 events
    }

    res.json(uniquePhotos);
  } catch (err) {
    console.error("Error fetching recent images:", err);
    res.status(500).json({ message: "Failed to fetch recent images" });
  }
});



// Delete Media (Admin only)
app.delete("/api/events/media/:mediaId", verifyAdmin, async (req, res) => {
  try {
    const mediaId = req.params.mediaId;
    const media = await EventImage.findById(mediaId);
    if (!media) {
      return res.status(404).json({ message: "Media not found" });
    }

    // Delete file from uploads folder
    fs.unlink(`uploads/${media.imageUrl}`, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    // Delete from DB
    await EventImage.findByIdAndDelete(mediaId);

    res.json({ message: "Media deleted successfully" });
  } catch (err) {
    console.error("Delete media error:", err);
    res.status(500).json({ message: "Failed to delete media" });
  }
});


app.post("/api/announcement", upload.single("file"), async (req, res) => {
  try {
    const { message } = req.body;
    const file = req.file ? req.file.filename : null;
    const fileType = req.file ? req.file.mimetype : null;

    if (!message || message.trim() === "") {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    const newAnnouncement = await Announcement.create({
      message,
      file,
      fileType,
    });

    res.status(201).json({
      message: "Announcement saved",
      data: newAnnouncement,
    });
  } catch (err) {
    console.error("Error posting announcement:", err);
    res.status(500).json({ message: "Failed to post announcement" });
  }
});

app.get("/api/announcement", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });

    const updatedAnnouncements = announcements.map((a) => ({
      ...a._doc,
      fileUrl: a.file ? `http://localhost:5000/uploads/${a.file}` : null,
    }));

    res.json(updatedAnnouncements);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ message: "Failed to fetch announcements" });
  }
});


// Media Gallery and Achievements (unchanged)...
app.post("/api/achievements", upload.single("image"), async (req, res) => {
  try {
    const { title, text } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !text) {
      return res.status(400).json({ message: "Title and text are required" });
    }

    const newAchievement = new Achievement({
      title,
      text,
      image,
    });

    await newAchievement.save();
    res.status(201).json({ message: "Achievement submitted successfully" });
  } catch (err) {
    console.error("Error saving achievement:", err);
    res.status(500).json({ message: "Failed to submit achievement" });
  }
});

app.get("/api/achievements", async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ createdAt: -1 });
    res.json(achievements);
  } catch (err) {
    console.error("Error fetching achievements:", err);
    res.status(500).json({ message: "Failed to fetch achievements" });
  }
});

app.get("/api/achievements/latest", async (req, res) => {
  try {
    const latestAchievement = await Achievement.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(1);               // only last added
    res.json(latestAchievement[0] || {}); // return single object
  } catch (err) {
    console.error("Error fetching latest achievement:", err);
    res.status(500).json({ message: "Failed to fetch latest achievement" });
  }
});

// Media Gallery 

// ✅ Upload Media Images
app.post("/api/media", upload.array("files", 10), async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const savedFiles = files.map((file) => ({
      filename: file.filename,
      path: file.path.replace(/\\/g, "/"),
    }));

    await Media.insertMany(savedFiles);

    res
      .status(201)
      .json({ message: "Files uploaded successfully", files: savedFiles });
  } catch (err) {
    console.error("Media upload error:", err);
    res.status(500).json({ message: "Failed to upload media" });
  }
});

// ✅ Get All Media Files
app.get("/api/media", async (req, res) => {
  try {
    const media = await Media.find().sort({ uploadedAt: -1 });
    res.json(media);
  } catch (err) {
    console.error("Error fetching media:", err);
    res.status(500).json({ message: "Failed to fetch media" });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
