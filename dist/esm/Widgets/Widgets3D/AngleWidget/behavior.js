import { m as macro } from '../../../macros2.js';
import vtkPointPicker from '../../../Rendering/Core/PointPicker.js';

const MAX_POINTS = 3;
function widgetBehavior(publicAPI, model) {
  model.classHierarchy.push('vtkAngleWidgetProp');
  model._isDragging = false;
  const picker = vtkPointPicker.newInstance();
  picker.setPickFromList(1);

  // --------------------------------------------------------------------------
  // Display 2D
  // --------------------------------------------------------------------------

  publicAPI.setDisplayCallback = callback => model.representations[0].setDisplayCallback(callback);

  // --------------------------------------------------------------------------
  // Interactor events
  // --------------------------------------------------------------------------

  function ignoreKey(e) {
    return e.altKey || e.controlKey || e.shiftKey;
  }

  // --------------------------------------------------------------------------
  // Left press: Select handle to drag
  // --------------------------------------------------------------------------

  publicAPI.handleLeftButtonPress = e => {
    if (!model.activeState || !model.activeState.getActive() || !model.pickable || ignoreKey(e)) {
      return macro.VOID;
    }
    picker.initializePickList();
    picker.setPickList(publicAPI.getNestedProps());
    const manipulator = model.activeState?.getManipulator?.() ?? model.manipulator;
    if (model.activeState === model.widgetState.getMoveHandle() && model.widgetState.getHandleList().length < MAX_POINTS && manipulator) {
      const {
        worldCoords
      } = manipulator.handleEvent(e, model._apiSpecificRenderWindow);
      // Commit handle to location
      const moveHandle = model.widgetState.getMoveHandle();
      moveHandle.setOrigin(...worldCoords);
      const newHandle = model.widgetState.addHandle();
      newHandle.setOrigin(...moveHandle.getOrigin());
      newHandle.setColor(moveHandle.getColor());
      newHandle.setScale1(moveHandle.getScale1());
      newHandle.setManipulator(manipulator);
    } else if (model.dragable) {
      model._isDragging = true;
      model._apiSpecificRenderWindow.setCursor('grabbing');
      model._interactor.requestAnimation(publicAPI);
    }
    publicAPI.invokeStartInteractionEvent();
    return macro.EVENT_ABORT;
  };

  // --------------------------------------------------------------------------
  // Mouse move: Drag selected handle / Handle follow the mouse
  // --------------------------------------------------------------------------

  publicAPI.handleMouseMove = callData => {
    const manipulator = model.activeState?.getManipulator?.() ?? model.manipulator;
    if (manipulator && model.pickable && model.dragable && model.activeState && model.activeState.getActive() && !ignoreKey(callData)) {
      const {
        worldCoords
      } = manipulator.handleEvent(callData, model._apiSpecificRenderWindow);
      if (worldCoords.length && (model.activeState === model.widgetState.getMoveHandle() || model._isDragging) && model.activeState.setOrigin // e.g. the line is pickable but not draggable
      ) {
        model.activeState.setOrigin(worldCoords);
        publicAPI.invokeInteractionEvent();
        return macro.EVENT_ABORT;
      }
    }
    if (model.hasFocus) {
      model._widgetManager.disablePicking();
    }
    return macro.VOID;
  };

  // --------------------------------------------------------------------------
  // Left release: Finish drag / Create new handle
  // --------------------------------------------------------------------------

  publicAPI.handleLeftButtonRelease = () => {
    if (!model.activeState || !model.activeState.getActive() || !model.pickable) {
      return macro.VOID;
    }
    if (model.hasFocus && model.widgetState.getHandleList().length === MAX_POINTS) {
      publicAPI.loseFocus();
      return macro.VOID;
    }
    if (model._isDragging) {
      model._apiSpecificRenderWindow.setCursor('pointer');
      model.widgetState.deactivate();
      model._interactor.cancelAnimation(publicAPI);
      model._isDragging = false;
    } else if (model.activeState !== model.widgetState.getMoveHandle()) {
      model.widgetState.deactivate();
    }
    if (model.hasFocus && !model.activeState || model.activeState && !model.activeState.getActive()) {
      model._widgetManager.enablePicking();
      model._interactor.render();
    }
    publicAPI.invokeEndInteractionEvent();
    return macro.EVENT_ABORT;
  };

  // --------------------------------------------------------------------------
  // Focus API - modeHandle follow mouse when widget has focus
  // --------------------------------------------------------------------------

  publicAPI.grabFocus = () => {
    if (!model.hasFocus && model.widgetState.getHandleList().length < MAX_POINTS) {
      model.activeState = model.widgetState.getMoveHandle();
      model.activeState.activate();
      model.activeState.setVisible(true);
      model._interactor.requestAnimation(publicAPI);
      publicAPI.invokeStartInteractionEvent();
    }
    model.hasFocus = true;
  };

  // --------------------------------------------------------------------------

  publicAPI.loseFocus = () => {
    if (model.hasFocus) {
      model._interactor.cancelAnimation(publicAPI);
      publicAPI.invokeEndInteractionEvent();
    }
    model.widgetState.deactivate();
    model.widgetState.getMoveHandle().deactivate();
    model.widgetState.getMoveHandle().setVisible(false);
    model.widgetState.getMoveHandle().setOrigin(null);
    model.activeState = null;
    model.hasFocus = false;
    model._widgetManager.enablePicking();
    model._interactor.render();
  };
}

export { widgetBehavior as default };
