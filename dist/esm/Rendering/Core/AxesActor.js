import { m as macro } from '../../macros2.js';
import vtkMatrixBuilder from '../../Common/Core/MatrixBuilder.js';
import vtkDataArray from '../../Common/Core/DataArray.js';
import vtkActor from './Actor.js';
import vtkMapper from './Mapper.js';
import vtkArrowSource from '../../Filters/Sources/ArrowSource.js';
import vtkAppendPolyData from '../../Filters/General/AppendPolyData.js';

// ----------------------------------------------------------------------------

function centerDataSet(ds) {
  const bounds = ds.getPoints().getBounds();
  const center = [-(bounds[0] + bounds[1]) * 0.5, -(bounds[2] + bounds[3]) * 0.5, -(bounds[4] + bounds[5]) * 0.5];
  vtkMatrixBuilder.buildFromDegree().translate(...center).apply(ds.getPoints().getData());
}
function shiftDataset(ds, axis) {
  const bounds = ds.getPoints().getBounds();
  const center = [0, 0, 0];
  center[axis] = -bounds[axis * 2];
  vtkMatrixBuilder.buildFromDegree().translate(...center).apply(ds.getPoints().getData());
}

// ----------------------------------------------------------------------------

function addColor(ds, r, g, b) {
  const size = ds.getPoints().getData().length;
  const rgbArray = new Uint8ClampedArray(size);
  let offset = 0;
  while (offset < size) {
    rgbArray[offset++] = r;
    rgbArray[offset++] = g;
    rgbArray[offset++] = b;
  }
  ds.getPointData().setScalars(vtkDataArray.newInstance({
    name: 'color',
    numberOfComponents: 3,
    values: rgbArray
  }));
}

// ----------------------------------------------------------------------------
// vtkAxesActor
// ----------------------------------------------------------------------------

function vtkAxesActor(publicAPI, model) {
  // Set our className
  model.classHierarchy.push('vtkAxesActor');
  const _mapper = vtkMapper.newInstance();
  publicAPI.setMapper(_mapper);
  publicAPI.update = () => {
    const xAxis = vtkArrowSource.newInstance({
      direction: [1, 0, 0],
      ...model.config
    }).getOutputData();
    if (model.config.recenter) {
      centerDataSet(xAxis);
    } else {
      shiftDataset(xAxis, 0);
    }
    addColor(xAxis, ...model.xAxisColor);
    const yAxis = vtkArrowSource.newInstance({
      direction: [0, 1, 0],
      ...model.config
    }).getOutputData();
    if (model.config.recenter) {
      centerDataSet(yAxis);
    } else {
      shiftDataset(yAxis, 1);
    }
    addColor(yAxis, ...model.yAxisColor);
    const zAxis = vtkArrowSource.newInstance({
      direction: [0, 0, 1],
      ...model.config
    }).getOutputData();
    if (model.config.recenter) {
      centerDataSet(zAxis);
    } else {
      shiftDataset(zAxis, 2);
    }
    addColor(zAxis, ...model.zAxisColor);
    const source = vtkAppendPolyData.newInstance();
    source.setInputData(xAxis);
    source.addInputData(yAxis);
    source.addInputData(zAxis);
    _mapper.setInputConnection(source.getOutputPort());
  };
  publicAPI.update();
  const _debouncedUpdate = macro.debounce(publicAPI.update, 0);
  const {
    setConfig,
    setXAxisColor,
    setYAxisColor,
    setZAxisColor
  } = publicAPI;
  publicAPI.setConfig = c => {
    if (setConfig(c)) {
      _debouncedUpdate();
      return true;
    }
    return false;
  };
  publicAPI.setXAxisColor = c => {
    if (setXAxisColor(c)) {
      _debouncedUpdate();
      return true;
    }
    return false;
  };
  publicAPI.setYAxisColor = c => {
    if (setYAxisColor(c)) {
      _debouncedUpdate();
      return true;
    }
    return false;
  };
  publicAPI.setZAxisColor = c => {
    if (setZAxisColor(c)) {
      _debouncedUpdate();
      return true;
    }
    return false;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  config: {
    recenter: true,
    tipResolution: 60,
    tipRadius: 0.1,
    tipLength: 0.2,
    shaftResolution: 60,
    shaftRadius: 0.03,
    invert: false
  },
  xAxisColor: [255, 0, 0],
  yAxisColor: [255, 255, 0],
  zAxisColor: [0, 128, 0]
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Inheritance
  vtkActor.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['config']);
  macro.setGetArray(publicAPI, model, ['xAxisColor', 'yAxisColor', 'zAxisColor'], 3, 255);

  // Object methods
  vtkAxesActor(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkAxesActor');

// ----------------------------------------------------------------------------

var vtkAxesActor$1 = {
  newInstance,
  extend
};

export { DEFAULT_VALUES, vtkAxesActor$1 as default, extend, newInstance };
