import { ExtensionContext } from 'vscode';

import NpmOnSave from './NpmOnSave';
import NpmOnSaveController from './NpmOnSaveController';

export function activate(context: ExtensionContext) {
	console.log('Extension Run NPM on Save is active');

	const npmOnSave = new NpmOnSave();
	const controller = new NpmOnSaveController(npmOnSave);

	// Add to a list of disposables which are disposed when this extension is deactivated.
	context.subscriptions.push(controller);
	context.subscriptions.push(npmOnSave);
}

export function deactivate() {}
