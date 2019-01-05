import { exec } from 'child_process';
import { StatusBarAlignment, StatusBarItem, window, workspace } from 'vscode';

type StdObj = {
	stderr: string;
	stdout: string;
};

export default class NpmOnSave {
	private _statusBarItem: StatusBarItem = window.createStatusBarItem(
		StatusBarAlignment.Left
	);

	public runScript(packageJsonPath: string, script: string): void {
		this.sh(`cd ${workspace.rootPath}/${packageJsonPath} && npm run ${script}`)
			.then(obj => console.log((obj as StdObj).stdout))
			.catch(e => console.log(e));

		const editor = window.activeTextEditor;
		if (!editor) {
			this._statusBarItem.hide();
			return;
		}

		this._statusBarItem.text = 'Run Scripts';
		this._statusBarItem.tooltip = 'Click to run save scripts';
		this._statusBarItem.command = 'extension.runNpmOnSave';
	}

	private async sh(cmd: string): Promise<string | StdObj> {
		return new Promise((resolve, reject) => {
			exec(cmd, (err, stdout, stderr) => {
				if (err) {
					reject(err);
				} else {
					resolve({ stdout, stderr });
				}
			});
		});
	}

	dispose() {
		this._statusBarItem.dispose();
	}
}
