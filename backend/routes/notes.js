const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// POST /api/notes - create
router.post(
  "/",
  auth,
  [body("title").trim().notEmpty().withMessage("Title required")],
  async (req, res) => {
    const errs = validationResult(req);
    if (!errs.isEmpty()) return res.status(400).json({ errors: errs.array() });

    try {
      const note = new Note({
        user: req.user.id,
        title: req.body.title,
        content: req.body.content || "",
        tags: Array.isArray(req.body.tags) ? req.body.tags : [],
      });
      await note.save();
      res.json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// GET /api/notes?page=1&limit=10&q=...&tag=...
router.get('/', auth, async (req, res) => {
  const { q, tag, page = 1, limit = 10 } = req.query;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const perPage = Math.min(100, parseInt(limit, 10) || 10);

  const filter = { user: req.user.id };
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { content: new RegExp(q, 'i') }];
  if (tag) filter.tags = tag;

  try {
    const total = await Note.countDocuments(filter);
    const notes = await Note.find(filter)
      .sort({ updatedAt: -1 })
      .skip((pageNum - 1) * perPage)
      .limit(perPage);

    res.json({
      notes,
      pagination: {
        total,
        page: pageNum,
        perPage,
        totalPages: Math.ceil(total / perPage)
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// PUT /api/notes/:id - update
router.put("/:id", auth, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: "Note not found" });
    if (note.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized" });

    const { title, content, tags } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = Array.isArray(tags) ? tags : note.tags;
    note.updatedAt = Date.now();
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// DELETE /api/notes/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: "Note not found" });
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Note.deleteOne({ _id: req.params.id });

    res.json({ msg: "Note removed successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});



module.exports = router;
