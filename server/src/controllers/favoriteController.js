
import Favorite from '../models/Favorite.js';
import Template from '../models/Template.js';

const isValidObjectId = (id) =>
  typeof id === 'string' && /^[a-f\d]{24}$/i.test(id);

export const addFavorite = async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      });
    }

    const template = await Template.findById(templateId);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found',
      });
    }

    const existingFavorite = await Favorite.findOne({
      user: req.user._id,
      template: templateId,
    });

    if (existingFavorite) {
      return res.status(200).json({
        success: true,
        message: 'Template is already in favorites',
        favorite: existingFavorite,
      });
    }

    const favorite = await Favorite.create({
      user: req.user._id,
      template: templateId,
    });

    return res.status(201).json({
      success: true,
      message: 'Template added to favorites',
      favorite,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).json({
        success: true,
        message: 'Template is already in favorites',
      });
    }

    console.error('Add favorite error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to add favorite',
    });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.user._id,
    })
      .populate('template')
      .sort({ createdAt: -1 });

    const templates = favorites
      .filter((item) => item.template)
      .map((item) => item.template);

    return res.status(200).json({
      success: true,
      count: templates.length,
      templates,
    });
  } catch (error) {
    console.error('Get favorites error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch favorites',
    });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { templateId } = req.params;

    if (!isValidObjectId(templateId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid template ID',
      });
    }

    const favorite = await Favorite.findOneAndDelete({
      user: req.user._id,
      template: templateId,
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Template removed from favorites',
    });
  } catch (error) {
    console.error('Remove favorite error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to remove favorite',
    });
  }
};
