import vtkCompositeCameraManipulator, {
  ICompositeCameraManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeCameraManipulator';
import vtkCompositeGestureManipulator, {
  ICompositeGestureManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeGestureManipulator';
import { vtkObject } from 'vtk.js\Sources\interfaces';
export interface vtkGestureCameraManipulator
  extends vtkObject,
    vtkCompositeCameraManipulator,
    vtkCompositeGestureManipulator {}

export interface IGestureCameraManipulatorInitialValues
  extends ICompositeCameraManipulatorInitialValues,
    ICompositeGestureManipulatorInitialValues {
  flipDirection?: boolean;
}

export function newInstance(
  initialValues?: IGestureCameraManipulatorInitialValues
): vtkGestureCameraManipulator;

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IGestureCameraManipulatorInitialValues
): void;

export const vtkGestureCameraManipulator: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkGestureCameraManipulator;
