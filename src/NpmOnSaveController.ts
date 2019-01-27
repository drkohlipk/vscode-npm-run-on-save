import { Disposable, workspace } from 'vscode';
import NpmOnSave from './NpmOnSave';

export default class NpmOnSaveController {
	private disposable: Disposable;
	private npmOnSave: NpmOnSave;
	private packageJsonPath: string;
	private script: string;

	constructor(npmOnSave: NpmOnSave) {
		const config = workspace.getConfiguration('runNpmOnSave');
		const subscriptions: Disposable[] = [];

		this.npmOnSave = npmOnSave;
		this.packageJsonPath = config.get('packageJsonPath') || '';
		this.script = config.get('scriptToRun') || '';

		workspace.onDidSaveTextDocument(this.onSaveEvent, this, subscriptions);

		this.disposable = Disposable.from(...subscriptions);
	}

	dispose() {
		this.disposable.dispose();
	}

	private onSaveEvent() {
		if (this.script) {
			this.npmOnSave.runScript(this.packageJsonPath, this.script);
		}
	}
}
