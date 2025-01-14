import vtkActor from 'vtk.js\Sources\Rendering\Core\Actor';
import vtkAbstractRepresentationProxy from 'vtk.js\Sources\Proxy\Core\AbstractRepresentationProxy';
import { Vector3, Vector4 } from 'vtk.js\Sources\types';
import vtkCamera from 'vtk.js\Sources\Rendering\Core\Camera';
import vtkRenderWindowInteractor from 'vtk.js\Sources\Rendering\Core\RenderWindowInteractor';
import vtkInteractorStyle from 'vtk.js\Sources\Rendering\Core\InteractorStyle';
import { vtkSubscription, vtkObject } from 'vtk.js\Sources\interfaces';
import vtkRenderer from 'vtk.js\Sources\Rendering\Core\Renderer';
import vtkRenderWindow from 'vtk.js\Sources\Rendering\Core\RenderWindow';
import vtkOpenGLRenderWindow from 'vtk.js\Sources\Rendering\OpenGL\RenderWindow';
import vtkWebGPURenderWindow from 'vtk.js\Sources\Rendering\WebGPU\RenderWindow';
import { VtkProxy } from 'vtk.js\Sources\macros';

export interface vtkViewProxy extends VtkProxy {
  setPresetToInteractor3D(nameOrDefinitions: string | Object): boolean;
  setPresetToInteractor2D(nameOrDefinitions: string | Object): boolean;

  setOrientationAxesType(type: string): void;
  setOrientationAxesVisibility(visible: boolean): boolean;
  registerOrientationAxis(name: string, actor: vtkActor): void;
  unregisterOrientationAxis(name: string): void;
  listOrientationAxis(): string[];
  setPresetToOrientationAxes(nameOrDefinitions: string | Object): boolean;

  setContainer(container: HTMLElement | null): void;
  resize(): void;
  renderLater(): void;
  render(blocking?: boolean): void;
  resetCamera(): void;

  addRepresentation(representation: vtkAbstractRepresentationProxy): void;
  removeRepresentation(representation: vtkAbstractRepresentationProxy): void;

  // TODO correct?
  captureImage(opts: { format: string } & Object): Array<Promise<string>>;
  openCaptureImage(target: string): void;

  // TODO corner annotations

  setBackground(color: Vector3 | Vector4): void;
  getBackground(): Vector3 | Vector4;

  setAnimation(enable: boolean, requester?: vtkObject);

  updateOrientation(
    axisIndex: 0 | 1 | 2,
    orientation: -1 | 1,
    viewUp: Vector3,
    animateSteps: number
  ): Promise<void>;
  moveCamera(
    focalPoint: Vector3,
    position: Vector3,
    viewUp: Vector3,
    animateSteps: number
  ): Promise<void>;

  resetOrientation(animateSteps: number): void;
  rotate(angle): void;

  focusTo(focalPoint: Vector3): void;

  getCamera(): vtkCamera;
  // getAnnotationOpacity
  getContainer(): HTMLElement | null;
  // getCornerAnnotation
  getInteractor(): vtkRenderWindowInteractor;
  getInteractorStyle2D(): vtkInteractorStyle;
  getInteractorStyle3D(): vtkInteractorStyle;
  getApiSpecificRenderWindow(): vtkOpenGLRenderWindow|vtkWebGPURenderWindow;
  getOrientationAxesType(): string;
  getPresetToOrientationAxes(): any;
  getRenderer(): vtkRenderer;
  getRenderWindow(): vtkRenderWindow;
  getRepresentations(): vtkAbstractRepresentationProxy[];
  getUseParallelRendering(): boolean;
  getDisableAnimation(): boolean;
  setDisableAnimation(disabled: boolean): boolean;

  onResize(
    cb: (size: { width: number; height: number }) => void
  ): vtkSubscription;

  // TODO proxy property mappings
}

export default vtkViewProxy;
