import { window, workspace, StatusBarAlignment, StatusBarItem } from 'vscode';

export default class NpmOnSave {
	private _statusBarItem: StatusBarItem = window.createStatusBarItem(
		StatusBarAlignment.Left
	);

	public runScripts(): void {
		// Get the current text editor
		const editor = window.activeTextEditor;
		if (!editor) {
			this._statusBarItem.hide();
			return;
		}

		this._statusBarItem.text = 'Run Scripts';
		this._statusBarItem.tooltip = 'Click to run save scripts';
		this._statusBarItem.command = 'extension.runNpmOnSave';
	}

	dispose() {
		this._statusBarItem.dispose();
	}
}
