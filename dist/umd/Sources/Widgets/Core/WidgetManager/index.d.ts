import vtkAbstractWidget from 'vtk.js\Sources\Widgets\Core\AbstractWidget';
import vtkAbstractWidgetFactory from 'vtk.js\Sources\Widgets\Core\AbstractWidgetFactory';
import vtkCamera from 'vtk.js\Sources\Rendering\Core\Camera';
import vtkProp from 'vtk.js\Sources\Rendering\Core\Prop';
import vtkRenderer from 'vtk.js\Sources\Rendering\Core\Renderer';
import vtkRenderWindow from 'vtk.js\Sources\Rendering\Core\RenderWindow';
import vtkRenderWindowInteractor from 'vtk.js\Sources\Rendering\Core\RenderWindowInteractor';
import vtkSelectionNode from 'vtk.js\Sources\Common\DataModel\SelectionNode';
import vtkWidgetRepresentation from 'vtk.js\Sources\Widgets\Representations\WidgetRepresentation';
import vtkWidgetState from 'vtk.js\Sources\Widgets\Core\WidgetState';
import { vtkObject } from 'vtk.js\Sources\interfaces';
import { CaptureOn, ViewTypes } from 'vtk.js\Sources\Widgets\Core\WidgetManager\Constants';
import { Nullable } from 'vtk.js\Sources\types';

export interface ISelectedData {
  requestCount: number;
  propID: number;
  compositeID: number;
  prop: vtkProp;
  widget: vtkAbstractWidget;
  representation: vtkWidgetRepresentation;
  selectedState: vtkWidgetState;
}

export interface IRenderingComponents {
  renderer: vtkRenderer;
  renderWindow: vtkRenderWindow;
  interactor: vtkRenderWindowInteractor;
  apiSpecificRenderWindow: vtkRenderWindow;
  camera: vtkCamera;
}

/**
 * Extract the rendering components from the given renderer.
 * 
 * @param {vtkRenderer} renderer The vtkRenderer instance.
 */
export function extractRenderingComponents(renderer: vtkRenderer): IRenderingComponents;

/**
 * This method returns the world distance that corresponds to the height of a
 * single display pixel at a given coordinate. For example, to determine the
 * (vertical) distance that matches a display distance of 30px for a coordinate
 * `coord`, you would compute `30 * getPixelWorldHeightAtCoord(coord)`.
 */
export function getPixelWorldHeightAtCoord(coord: []): Number;

export interface vtkWidgetManager extends vtkObject {
  /**
   * The the captureOn value. 
   * `CaptureOn.MOUSE_MOVE`: captures small region when moving mouse
   * `CaptureOn.MOUSE_RELEASE`: captures entire region when mouse button is released
   * 
   * @param {CaptureOn} captureOn
   */
  setCaptureOn(captureOn: CaptureOn): boolean;

  /**
   * Get the captureOn value.
   */
  getCaptureOn(): CaptureOn;

  /**
   * The the view type.
   * 
   * @param {ViewTypes} type
   */
  setViewType(type: ViewTypes): boolean;

  /**
   * Get the view type.
   */
  getViewType(): ViewTypes;

  /**
   * Get the current selection.
   */
  getSelections(): vtkSelectionNode[];

  /**
   * Get all the underlying widgets.
   */
  getWidgets(): vtkAbstractWidget[];

  /**
   * Get the active widget.
   *
   * If no widget is active, returns null.
   */
  getActiveWidget(): Nullable<vtkAbstractWidget>;

  /**
   * Get the view id.
   */
  getViewId(): string;

  /**
   * Returns true if picking is enabled, false otherwise.
   */
  getPickingEnabled(): boolean;

  /**
   * Enable the picking.
   */
  enablePicking(): void;

  /**
   * Renders all the widgets.
   */
  renderWidgets(): void;

  /**
   * Disable the picking.
   */
  disablePicking(): void;

  /**
   * Set the renderer.
   * 
   * @param {vtkRenderer} renderer
   */
  setRenderer(renderer: vtkRenderer): void;

  /**
   * Register a widget on the widget manager instance. 
   * Please note that one should link the widget manager to a view before calling this method. 
   * 
   * @param {vtkAbstractWidgetFactory} widget The abstract widget factory.
   * @param {ViewTypes} [viewType]
   * @param {Object} [initialValues]
   */
  addWidget<WidgetFactory extends vtkAbstractWidgetFactory<any>>(
    widget: WidgetFactory,
    viewType?: ViewTypes,
    initialValues?: object
  ): WidgetFactory extends vtkAbstractWidgetFactory<infer WidgetInstance> ? WidgetInstance : never;

  /**
   * Unregister all widgets from the widget manager.
   */
  removeWidgets(): void;

  /**
   * Remove a widget from the widget manager.
   * 
   * @param {vtkAbstractWidget | vtkAbstractWidgetFactory} widget The widget to remove
   */
  removeWidget(widget: vtkAbstractWidget | vtkAbstractWidgetFactory<any>): void;

  /**
   * Given x and y parameter, get selected data.
   * 
   * @param {Number} x
   * @param {Number} y
   */
  getSelectedDataForXY(x: number, y: number): Promise<ISelectedData>;

  /**
   * The all currently selected data.
   */
  getSelectedData(): ISelectedData | {};

  /**
   * Given the focus to the given widget instance.
   * 
   * @param {vtkAbstractWidget | vtkAbstractWidgetFactory} widget The widget instance which should get the focus.
   */
  grabFocus(widget: vtkAbstractWidget | vtkAbstractWidgetFactory<any>): void;

  /**
   * Release the focus.
   */
  releaseFocus(): void;
}

export interface IWidgetManagerInitialValues {
  captureOn?: CaptureOn;
  viewType?: ViewTypes;
  pickingEnabled?: boolean;
}

/**
 * Method used to decorate a given object (publicAPI+model) with vtkWidgetManager characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param initialValues (default: {})
 */
export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IWidgetManagerInitialValues
): vtkWidgetManager;

/**
 * Method used to create a new instance of vtkCellArray
 * 
 * @param initialValues for pre-setting some of its content
 */
export function newInstance(initialValues?: IWidgetManagerInitialValues): vtkWidgetManager;

export declare const vtkWidgetManager: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};

export default vtkWidgetManager;
