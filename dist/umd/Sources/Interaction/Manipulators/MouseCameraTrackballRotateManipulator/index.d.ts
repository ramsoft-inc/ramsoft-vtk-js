import vtkCompositeCameraManipulator, {
  ICompositeCameraManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeCameraManipulator';
import vtkCompositeMouseManipulator, {
  ICompositeMouseManipulatorInitialValues,
} from 'vtk.js\Sources\Interaction\Manipulators\CompositeMouseManipulator';
import { vtkObject } from 'vtk.js\Sources\interfaces';
import { Vector3 } from 'vtk.js\Sources\types';

export interface vtkMouseCameraTrackballRotateManipulator
  extends vtkObject,
    vtkCompositeCameraManipulator,
    vtkCompositeMouseManipulator {
  /**
   * Sets whether to use a given world-up vector.
   * @param use boolean
   */
  setUseWorldUpVec(use: boolean): boolean;

  /**
   * Sets the world-up vector.
   * @param vec the world-up vector
   */
  setWorldUpVec(vec: Vector3): boolean;
  setWorldUpVec(x: number, y: number, z: number): boolean;

  /**
   * Gets the world-up vector.
   */
  getWorldUpVec(): Vector3;

  /**
   * Gets whether to use the focal point as the center of rotation.
   */
  getUseFocalPointAsCenterOfRotation(): boolean;

  /**
   * Sets using the focal point as the center of rotation.
   * @param useFocalPoint
   */
  setUseFocalPointAsCenterOfRotation(useFocalPoint: boolean): boolean;
}

export interface IMouseCameraTrackballRotateManipulatorInitialValues
  extends ICompositeCameraManipulatorInitialValues,
    ICompositeMouseManipulatorInitialValues {
  useWorldUpVec?: boolean;
  worldUpVec?: Vector3;
  useFocalPointAsCenterOfRotation?: boolean;
}

export function newInstance(
  initialValues?: IMouseCameraTrackballRotateManipulatorInitialValues
): vtkMouseCameraTrackballRotateManipulator;

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IMouseCameraTrackballRotateManipulatorInitialValues
): void;

export const vtkMouseCameraTrackballRotateManipulator: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkMouseCameraTrackballRotateManipulator;
