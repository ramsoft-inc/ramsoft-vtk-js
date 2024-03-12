import { States } from 'vtk.js\Sources\Rendering\Core\InteractorStyle\Constants';
import vtkRenderer from 'vtk.js\Sources\Rendering\Core\Renderer';
import vtkRenderWindowInteractor from 'vtk.js\Sources\Rendering\Core\RenderWindowInteractor';
import {
  Device,
  Input,
} from 'vtk.js\Sources\Rendering\Core\RenderWindowInteractor\Constants';

export interface vtkCompositeVRManipulator {
  onButton3D(
    interactor: vtkRenderWindowInteractor,
    renderer: vtkRenderer,
    state: States,
    device: Device,
    input: Input,
    pressed: boolean
  ): void;

  onMove3D(
    interactor: vtkRenderWindowInteractor,
    renderer: vtkRenderer,
    state: States,
    device: Device,
    input: Input,
    pressed: boolean
  ): void;
}

export interface ICompositeVRManipulatorInitialValues {
  device?: Device;
  input?: Input;
}

export function extend(
  publicAPI: object,
  model: object,
  initialValues?: ICompositeVRManipulatorInitialValues
): void;

export const vtkCompositeVRManipulator: {
  extend: typeof extend;
};

export default vtkCompositeVRManipulator;
