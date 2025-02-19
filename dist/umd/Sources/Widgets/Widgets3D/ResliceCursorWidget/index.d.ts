import { mat4 } from 'gl-matrix';
import { vtkAbstractWidgetFactory, IAbstractWidgetFactoryInitialValues } from 'vtk.js\Sources\Widgets\Core\AbstractWidgetFactory';
import vtkResliceCursorWidgetDefaultInstance from 'vtk.js\Sources\Widgets\Widgets3D\ResliceCursorWidget\behavior';
import vtkAbstractWidget from 'vtk.js\Sources\Widgets\Core\AbstractWidget'
import vtkImageData from 'vtk.js\Sources\Common\DataModel\ImageData';
import vtkImageReslice from 'vtk.js\Sources\Imaging\Core\ImageReslice';
import vtkPlaneSource from 'vtk.js\Sources\Filters\Sources\PlaneSource';
import vtkRenderer from 'vtk.js\Sources\Rendering\Core\Renderer';
import vtkPlaneManipulator from 'vtk.js\Sources\Widgets\Manipulators\PlaneManipulator';
import { ViewTypes } from 'vtk.js\Sources\Widgets\Core\WidgetManager\Constants';
import { Vector2, Vector3 } from 'vtk.js\Sources\types';

export interface IDisplayScaleParams {
  dispHeightFactor: number,
  cameraPosition: Vector3,
  cameraDir: Vector3,
  isParallel: false,
  rendererPixelDims: Vector2
}

export interface vtkResliceCursorWidget<WidgetInstance extends vtkAbstractWidget = vtkResliceCursorWidgetDefaultInstance> extends vtkAbstractWidgetFactory<WidgetInstance> {

  /**
   * @param {ViewTypes} viewType
   */
  getRepresentationsForViewType(viewType: ViewTypes): unknown;

  setImage(image: vtkImageData): void;

  setCenter(center: Vector3): void;

  updateCameraPoints(
    renderer: vtkRenderer,
    viewType: ViewTypes,
    resetFocalPoint: boolean,
    keepCenterFocalDistance: boolean,
    computeFocalPointOffset: boolean
  ): void;

  resetCamera(
    renderer: vtkRenderer,
    viewType: ViewTypes,
    resetFocalPoint: boolean,
    keepCenterFocalDistance: boolean
  ): void;


  getPlaneSource(viewType: ViewTypes): vtkPlaneSource;

  getResliceAxes(viewType: ViewTypes): mat4;

  updateReslicePlane(imageReslice: vtkImageReslice, viewType: ViewTypes): boolean;

  getPlaneSourceFromViewType(type: ViewTypes): vtkPlaneSource;

  getPlaneNormalFromViewType(viewType: ViewTypes): Vector3;

  getOtherPlaneNormals(viewType: ViewTypes): Array<Vector3>;

  getResliceMatrix(): mat4;

  getDisplayScaleParams(): IDisplayScaleParams;

  setScaleInPixels(scale: boolean): boolean;

  getScaleInPixels(): boolean;

  setRotationHandlePosition(position: number): boolean;

  getRotationHandlePosition(): number;

  setManipulator(manipulator: vtkPlaneManipulator): boolean;

  getManipulator(): vtkPlaneManipulator;

  /**
   * Return an array of the first and the last possible points of the plane
   * along its normal.
   * @param {ViewTypes} viewType
   * @returns {Array<Vector3>} two Vector3 arrays (first and last points)
   */
  getPlaneExtremities(viewType: ViewTypes): Array<Vector3>;

}

export interface IResliceCursorWidgetInitialValues<WidgetInstance extends vtkAbstractWidget> extends IAbstractWidgetFactoryInitialValues<WidgetInstance> {}

/**
 * Method used to decorate a given object (publicAPI+model) with vtkResliceCursorWidget characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param initialValues (default: {})
 */
export function extend<WidgetInstance extends vtkAbstractWidget>(
  publicAPI: object,
  model: object,
  initialValues?: IResliceCursorWidgetInitialValues<WidgetInstance>
): void;

/**
 * Method used to create a new instance of vtkResliceCursorWidget
 * 
 * @param initialValues for pre-setting some of its content
 */
export function newInstance<WidgetInstance extends vtkAbstractWidget = vtkResliceCursorWidgetDefaultInstance>(initialValues?: IResliceCursorWidgetInitialValues<WidgetInstance>): vtkResliceCursorWidget<WidgetInstance>;

export declare const vtkResliceCursorWidget: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkResliceCursorWidget;
