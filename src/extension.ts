import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log(vscode.workspace.workspaceFolders);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'extension.helloWorld',
		() => {
			vscode.window.showInformationMessage('Hello World!');
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
