import vtkCompositeCameraManipulator, {
  ICompositeCameraManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeCameraManipulator';
import vtkCompositeMouseManipulator, {
  ICompositeMouseManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeMouseManipulator';
import { vtkObject } from 'vtk.js\Sources\interfaces';

export interface vtkMouseCameraTrackballRollManipulator
  extends vtkObject,
    vtkCompositeCameraManipulator,
    vtkCompositeMouseManipulator {}

export interface IMouseCameraTrackballRollManipulatorInitialValues
  extends ICompositeCameraManipulatorInitialValues,
    ICompositeMouseManipulatorInitialValues {}

export function newInstance(
  initialValues?: IMouseCameraTrackballRollManipulatorInitialValues
): vtkMouseCameraTrackballRollManipulator;

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IMouseCameraTrackballRollManipulatorInitialValues
): void;

export const vtkMouseCameraTrackballRollManipulator: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkMouseCameraTrackballRollManipulator;
