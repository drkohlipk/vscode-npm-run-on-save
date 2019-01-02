import { Disposable, workspace } from 'vscode';
import NpmOnSave from './NpmOnSave';

export default class NpmOnSaveController {
	private npmOnSave: NpmOnSave;
	private disposable: Disposable;

	constructor(npmOnSave: NpmOnSave) {
		this.npmOnSave = npmOnSave;

		// subscribe to selection change and editor activation events
		const subscriptions: Disposable[] = [];
		workspace.onWillSaveTextDocument(this.onSaveEvent, this, subscriptions);

		this.disposable = Disposable.from(...subscriptions);
	}

	dispose() {
		this.disposable.dispose();
	}

	private onSaveEvent() {
		this.npmOnSave.runScripts();
	}
}
