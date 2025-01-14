import vtkCompositeCameraManipulator, {
  ICompositeCameraManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeCameraManipulator';
import vtkCompositeMouseManipulator, {
  ICompositeMouseManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeMouseManipulator';
import { vtkObject } from 'vtk.js\Sources\interfaces';

export interface vtkMouseCameraTrackballPanManipulator
  extends vtkObject,
    vtkCompositeCameraManipulator,
    vtkCompositeMouseManipulator {}

export interface IMouseCameraTrackballPanManipulatorInitialValues
  extends ICompositeCameraManipulatorInitialValues,
    ICompositeMouseManipulatorInitialValues {}

export function newInstance(
  initialValues?: IMouseCameraTrackballPanManipulatorInitialValues
): vtkMouseCameraTrackballPanManipulator;

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IMouseCameraTrackballPanManipulatorInitialValues
): void;

export const vtkMouseCameraTrackballPanManipulator: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkMouseCameraTrackballPanManipulator;
