import Constants from './ImageMapper/Constants.js';
import { m as macro } from '../../macros2.js';
import vtkAbstractImageMapper from './AbstractImageMapper.js';
import { intersectWithLineForPointPicking, intersectWithLineForCellPicking } from './AbstractImageMapper/helper.js';
import { C as clampValue, R as multiply3x3_vect3, F as createUninitializedBounds, S as getSparseOrthogonalMatrix } from '../../Common/Core/Math/index.js';
import CoincidentTopologyHelper from './Mapper/CoincidentTopologyHelper.js';

const {
  staticOffsetAPI,
  otherStaticMethods
} = CoincidentTopologyHelper;
const {
  SlicingMode
} = Constants;

// ----------------------------------------------------------------------------
// vtkImageMapper methods
// ----------------------------------------------------------------------------

function vtkImageMapper(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkImageMapper');
  publicAPI.getSliceAtPosition = pos => {
    const image = publicAPI.getCurrentImage();
    let pos3;
    if (pos.length === 3) {
      pos3 = pos;
    } else if (Number.isFinite(pos)) {
      const bds = image.getBounds();
      switch (model.slicingMode) {
        case SlicingMode.X:
          pos3 = [pos, (bds[3] + bds[2]) / 2, (bds[5] + bds[4]) / 2];
          break;
        case SlicingMode.Y:
          pos3 = [(bds[1] + bds[0]) / 2, pos, (bds[5] + bds[4]) / 2];
          break;
        case SlicingMode.Z:
          pos3 = [(bds[1] + bds[0]) / 2, (bds[3] + bds[2]) / 2, pos];
          break;
      }
    }
    const ijk = [0, 0, 0];
    image.worldToIndex(pos3, ijk);
    const ex = image.getExtent();
    const {
      ijkMode
    } = publicAPI.getClosestIJKAxis();
    let slice = 0;
    switch (ijkMode) {
      case SlicingMode.I:
        slice = clampValue(ijk[0], ex[0], ex[1]);
        break;
      case SlicingMode.J:
        slice = clampValue(ijk[1], ex[2], ex[3]);
        break;
      case SlicingMode.K:
        slice = clampValue(ijk[2], ex[4], ex[5]);
        break;
      default:
        return 0;
    }
    return slice;
  };
  publicAPI.setSliceFromCamera = cam => {
    const fp = cam.getFocalPoint();
    switch (model.slicingMode) {
      case SlicingMode.I:
      case SlicingMode.J:
      case SlicingMode.K:
        {
          const slice = publicAPI.getSliceAtPosition(fp);
          publicAPI.setSlice(slice);
        }
        break;
      case SlicingMode.X:
        publicAPI.setSlice(fp[0]);
        break;
      case SlicingMode.Y:
        publicAPI.setSlice(fp[1]);
        break;
      case SlicingMode.Z:
        publicAPI.setSlice(fp[2]);
        break;
    }
  };
  publicAPI.setXSlice = id => {
    publicAPI.setSlicingMode(SlicingMode.X);
    publicAPI.setSlice(id);
  };
  publicAPI.setYSlice = id => {
    publicAPI.setSlicingMode(SlicingMode.Y);
    publicAPI.setSlice(id);
  };
  publicAPI.setZSlice = id => {
    publicAPI.setSlicingMode(SlicingMode.Z);
    publicAPI.setSlice(id);
  };
  publicAPI.setISlice = id => {
    publicAPI.setSlicingMode(SlicingMode.I);
    publicAPI.setSlice(id);
  };
  publicAPI.setJSlice = id => {
    publicAPI.setSlicingMode(SlicingMode.J);
    publicAPI.setSlice(id);
  };
  publicAPI.setKSlice = id => {
    publicAPI.setSlicingMode(SlicingMode.K);
    publicAPI.setSlice(id);
  };
  publicAPI.getSlicingModeNormal = () => {
    const out = [0, 0, 0];
    const mat3 = publicAPI.getCurrentImage().getDirection();
    switch (model.slicingMode) {
      case SlicingMode.X:
        out[0] = 1;
        break;
      case SlicingMode.Y:
        out[1] = 1;
        break;
      case SlicingMode.Z:
        out[2] = 1;
        break;
      case SlicingMode.I:
        multiply3x3_vect3(mat3, [1, 0, 0], out);
        break;
      case SlicingMode.J:
        multiply3x3_vect3(mat3, [0, 1, 0], out);
        break;
      case SlicingMode.K:
        multiply3x3_vect3(mat3, [0, 0, 1], out);
        break;
    }
    return out;
  };
  function computeClosestIJKAxis() {
    let xyzMode;
    switch (model.slicingMode) {
      case SlicingMode.X:
        xyzMode = 0;
        break;
      case SlicingMode.Y:
        xyzMode = 1;
        break;
      case SlicingMode.Z:
        xyzMode = 2;
        break;
      default:
        model.closestIJKAxis = {
          ijkMode: model.slicingMode,
          flip: false
        };
        return;
    }

    // The direction matrix in vtkImageData is the indexToWorld rotation matrix
    // with a column-major data layout since it is stored as a WebGL matrix.
    const direction = publicAPI.getCurrentImage().getDirection();
    const newMatrix = getSparseOrthogonalMatrix(direction);
    // With {foo}Vector filled with 0s except at {foo}Mode position where it is 1
    // We have xyzVector = (+/-) newMatrix * ijkVector
    let ijkMode = 0;
    for (; ijkMode < 3; ++ijkMode) {
      if (newMatrix[xyzMode + 3 * ijkMode] !== 0) {
        break;
      }
    }
    const flip = newMatrix[xyzMode + 3 * ijkMode] < 0;
    model.closestIJKAxis = {
      ijkMode,
      flip
    };
  }
  publicAPI.setSlicingMode = mode => {
    if (model.slicingMode === mode) {
      return;
    }
    model.slicingMode = mode;
    if (publicAPI.getCurrentImage()) {
      computeClosestIJKAxis();
    }
    publicAPI.modified();
  };
  publicAPI.getClosestIJKAxis = () => {
    if ((model.closestIJKAxis === undefined || model.closestIJKAxis.ijkMode === SlicingMode.NONE) && publicAPI.getCurrentImage()) {
      computeClosestIJKAxis();
    }
    return model.closestIJKAxis;
  };
  publicAPI.getBounds = () => {
    const image = publicAPI.getCurrentImage();
    if (!image) {
      return createUninitializedBounds();
    }
    if (!model.useCustomExtents) {
      return image.getBounds();
    }
    const ex = model.customDisplayExtent.slice();
    const {
      ijkMode
    } = publicAPI.getClosestIJKAxis();
    let nSlice = model.slice;
    if (ijkMode !== model.slicingMode) {
      // If not IJK slicing, get the IJK slice from the XYZ position/slice
      nSlice = publicAPI.getSliceAtPosition(model.slice);
    }
    switch (ijkMode) {
      case SlicingMode.I:
        ex[0] = nSlice;
        ex[1] = nSlice;
        break;
      case SlicingMode.J:
        ex[2] = nSlice;
        ex[3] = nSlice;
        break;
      case SlicingMode.K:
        ex[4] = nSlice;
        ex[5] = nSlice;
        break;
    }
    return image.extentToBounds(ex);
  };
  publicAPI.getBoundsForSlice = function () {
    let slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : model.slice;
    let halfThickness = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    const image = publicAPI.getCurrentImage();
    if (!image) {
      return createUninitializedBounds();
    }
    const extent = image.getSpatialExtent();
    const {
      ijkMode
    } = publicAPI.getClosestIJKAxis();
    let nSlice = slice;
    if (ijkMode !== model.slicingMode) {
      // If not IJK slicing, get the IJK slice from the XYZ position/slice
      nSlice = publicAPI.getSliceAtPosition(slice);
    }
    switch (ijkMode) {
      case SlicingMode.I:
        extent[0] = nSlice - halfThickness;
        extent[1] = nSlice + halfThickness;
        break;
      case SlicingMode.J:
        extent[2] = nSlice - halfThickness;
        extent[3] = nSlice + halfThickness;
        break;
      case SlicingMode.K:
        extent[4] = nSlice - halfThickness;
        extent[5] = nSlice + halfThickness;
        break;
    }
    return image.extentToBounds(extent);
  };
  publicAPI.intersectWithLineForPointPicking = (p1, p2) => intersectWithLineForPointPicking(p1, p2, publicAPI);
  publicAPI.intersectWithLineForCellPicking = (p1, p2) => intersectWithLineForCellPicking(p1, p2, publicAPI);
  publicAPI.getCurrentImage = () => publicAPI.getInputData();
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  slicingMode: SlicingMode.NONE,
  closestIJKAxis: {
    ijkMode: SlicingMode.NONE,
    flip: false
  },
  renderToRectangle: false,
  sliceAtFocalPoint: false,
  preferSizeOverAccuracy: false // Whether to use halfFloat representation of float, when it is inaccurate
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Build VTK API
  vtkAbstractImageMapper.extend(publicAPI, model, initialValues);
  macro.get(publicAPI, model, ['slicingMode']);
  macro.setGet(publicAPI, model, ['closestIJKAxis', 'renderToRectangle', 'sliceAtFocalPoint', 'preferSizeOverAccuracy']);
  CoincidentTopologyHelper.implementCoincidentTopologyMethods(publicAPI, model);

  // Object methods
  vtkImageMapper(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkImageMapper');

// ----------------------------------------------------------------------------

var vtkImageMapper$1 = {
  newInstance,
  extend,
  ...staticOffsetAPI,
  ...otherStaticMethods,
  ...Constants
};

export { vtkImageMapper$1 as default, extend, newInstance };
