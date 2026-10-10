
import Template from '../models/Template.js';

export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    console.error('Get templates error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch templates',
    });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      });
    }

    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    return res.status(200).json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('Get template error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch template',
    });
  }
};
