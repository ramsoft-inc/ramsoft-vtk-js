import vtkAbstractWidget from 'vtk.js\Sources\Widgets\Core\AbstractWidget';

export default interface vtkResliceCursorWidgetDefaultInstance extends vtkAbstractWidget {
    invokeInternalInteractionEvent: () => void;
}
