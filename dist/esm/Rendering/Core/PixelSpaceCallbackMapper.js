import { mat4, vec3 } from 'gl-matrix';
import { m as macro } from '../../macros2.js';
import vtkMapper from './Mapper.js';

// ----------------------------------------------------------------------------
// vtkPixelSpaceCallbackMapper methods
// ----------------------------------------------------------------------------

function vtkPixelSpaceCallbackMapper(publicAPI, model) {
  model.classHierarchy.push('vtkPixelSpaceCallbackMapper');
  if (!model.callback) {
    model.callback = () => {};
  }
  publicAPI.invokeCallback = (dataset, camera, aspect, windowSize, depthValues) => {
    if (!model.callback) {
      return;
    }
    const matrix = camera.getCompositeProjectionMatrix(aspect, -1, 1);
    mat4.transpose(matrix, matrix);
    const dataPoints = dataset.getPoints();
    const result = new Float64Array(3);
    const width = windowSize.usize;
    const height = windowSize.vsize;
    const hw = width / 2;
    const hh = height / 2;
    const coords = [];
    for (let pidx = 0; pidx < dataPoints.getNumberOfPoints(); pidx += 1) {
      const point = dataPoints.getPoint(pidx);
      vec3.transformMat4(result, point, matrix);
      const coord = [result[0] * hw + hw, result[1] * hh + hh, result[2], 0];
      if (depthValues) {
        const linIdx = Math.floor(coord[1]) * width + Math.floor(coord[0]);
        const idx = linIdx * 4;
        const r = depthValues[idx] / 255;
        const g = depthValues[idx + 1] / 255;
        const z = (r * 256 + g) / 257;
        coord[3] = z * 2 - 1;
      }
      coords.push(coord);
    }
    model.callback(coords, camera, aspect, depthValues, [width, height]);
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  callback: null,
  useZValues: false
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkMapper.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['callback', 'useZValues']);

  // Object methods
  vtkPixelSpaceCallbackMapper(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkPixelSpaceCallbackMapper');

// ----------------------------------------------------------------------------

var vtkPixelSpaceCallbackMapper$1 = {
  newInstance,
  extend
};

export { vtkPixelSpaceCallbackMapper$1 as default, extend, newInstance };
