const logger = require('../utils/logger');
const BuilderState = require('../models/BuilderState');

const registerBuilderSocket = (io) => {
  const builderNamespace = io.of('/builder');

  builderNamespace.on('connection', (socket) => {
    logger.debug(`Builder Socket joined: ${socket.id}`);

    // Join vendor canvas editor channel room
    socket.on('join_builder_workspace', (vendorId) => {
      socket.join(vendorId);
      logger.debug(`Builder Socket client ${socket.id} joined workspace channel room: ${vendorId}`);
    });

    // Broadcast canvas section shifts/edits instantly to other developers
    socket.on('canvas_update', (data) => {
      const { vendorId, sections, layout } = data;
      
      // Broadcast update to all other collaborators in the same room
      socket.to(vendorId).emit('canvas_layout_changed', {
        sections,
        layout,
        updatedBy: socket.id
      });
      
      logger.debug(`Broadcasting canvas modifications for Vendor ${vendorId} from sender ${socket.id}`);
    });

    // Handle real-time selection focusing of widgets (to prevent concurrent edits clash)
    socket.on('focus_component', (data) => {
      const { vendorId, componentId, userName } = data;
      socket.to(vendorId).emit('component_focused', {
        componentId,
        userName
      });
    });

    socket.on('disconnect', () => {
      logger.debug(`Builder Socket closed: ${socket.id}`);
    });
  });
};

module.exports = registerBuilderSocket;
