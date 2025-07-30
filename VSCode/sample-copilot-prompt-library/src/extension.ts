import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
export function activate(context: vscode.ExtensionContext) {
console.log(' Copilot sample prompt extension is now active!');

//load prompts from the prompts directory
const promptsPath = path.join(context.extensionPath, 'src','data', 'prompts','samplePrompts.json');
if (!fs.existsSync(promptsPath)) {
	console.error(`Prompts file not found at path: ${promptsPath}`);
	return;
}
const promptData = fs.readFileSync(promptsPath, 'utf8');

//register the command to show prompts
const showPromptsCommand = vscode.commands.registerCommand('sample-copilot-prompt-library.showPrompts', async () => {
	try {
		const selectedPrompt = await vscode.window.showQuickPick(
			JSON.parse(promptData).map((p: any) =>  p.title),
			{
				placeHolder: 'Select a prompt to use with Copilot',
				canPickMany: false
			}
		);
		if (selectedPrompt) {
			const prompt = JSON.parse(promptData).find((p: any) => p.title === selectedPrompt);
			if (prompt && prompt.prompt) {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					const position = editor.selection.active;
					editor.edit(editBuilder => {
						editBuilder.insert(position, prompt.prompt);
					});
				} else {
					vscode.window.showErrorMessage('No active text editor found.');
				}
			}
		}
	} catch (error) {
		console.error('Error showing prompts:', error);
		vscode.window.showErrorMessage('Failed to load prompts. Check the console for details.');
	}
});
context.subscriptions.push(showPromptsCommand);
}

export function deactivate() {
	console.log('Copilot sample prompt extension is now deactivated.');
}

