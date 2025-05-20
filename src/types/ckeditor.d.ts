declare module '@ckeditor/ckeditor5-build-classic' {
  import * as ClassicEditorTypes from '@ckeditor/ckeditor5-core';
  import { EditorWatchdog, ContextWatchdog } from '@ckeditor/ckeditor5-watchdog';

  const ClassicEditor: {
    create(...args: any): Promise<any>;
    EditorWatchdog: typeof EditorWatchdog;
    ContextWatchdog: typeof ContextWatchdog;
    prototype: ClassicEditorTypes.Editor;
  };

  export = ClassicEditor;
}