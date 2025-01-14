import vtkCompositeCameraManipulator, {
  ICompositeCameraManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeCameraManipulator';
import vtkCompositeMouseManipulator, {
  ICompositeMouseManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeMouseManipulator';
import { vtkObject } from 'vtk.js\Sources\interfaces';
export interface vtkMouseCameraTrackballMultiRotateManipulator
  extends vtkObject,
    vtkCompositeCameraManipulator,
    vtkCompositeMouseManipulator {}

export interface IMouseCameraTrackballMultiRotateManipulatorInitialValues
  extends ICompositeCameraManipulatorInitialValues,
    ICompositeMouseManipulatorInitialValues {}

export function newInstance(
  initialValues?: IMouseCameraTrackballMultiRotateManipulatorInitialValues
): vtkMouseCameraTrackballMultiRotateManipulator;

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IMouseCameraTrackballMultiRotateManipulatorInitialValues
): void;

export const vtkMouseCameraTrackballMultiRotateManipulator: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkMouseCameraTrackballMultiRotateManipulator;
