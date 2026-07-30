import ContactMessage from '../models/ContactMessage.js';

const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone = '', subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your name, email, subject, and message.',
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone || '').trim();
    const cleanSubject = String(subject).trim();
    const cleanMessage = String(message).trim();

    if (cleanName.length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters long.' });
    }

    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (cleanPhone && !/^[0-9+()\-\s]{7,15}$/.test(cleanPhone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid phone number.' });
    }

    if (cleanSubject.length < 3) {
      return res.status(400).json({ success: false, message: 'Subject must be at least 3 characters long.' });
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return res.status(400).json({ success: false, message: 'Message must be between 10 and 2000 characters.' });
    }

    const contactMessage = await ContactMessage.create({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      subject: cleanSubject,
      message: cleanMessage,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully.',
      data: {
        _id: contactMessage._id,
        status: contactMessage.status,
      },
    });
  } catch (error) {
    console.error('Create contact message error:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not send your message right now. Please try again later.',
    });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const status = req.query.status;

    const query = status ? { status } : {};
    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      success: true,
      data: messages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Fetch contact messages error:', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to load contact messages right now.',
    });
  }
};

const getContactMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Contact message not found.' });
    }

    return res.status(200).json({ success: true, data: message });
  } catch (error) {
    console.error('Fetch contact message error:', error);
    return res.status(500).json({ success: false, message: 'Unable to load this message.' });
  }
};

const updateContactMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'replied', 'resolved'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid status.' });
    }

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Contact message not found.' });
    }

    return res.status(200).json({ success: true, message: 'Status updated successfully.', data: message });
  } catch (error) {
    console.error('Update contact status error:', error);
    return res.status(500).json({ success: false, message: 'Unable to update message status.' });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Contact message not found.' });
    }

    return res.status(200).json({ success: true, message: 'Contact message deleted successfully.' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    return res.status(500).json({ success: false, message: 'Unable to delete message.' });
  }
};

export {
  createContactMessage,
  getContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage,
};
