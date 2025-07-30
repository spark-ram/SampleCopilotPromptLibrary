"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
function activate(context) {
    console.log(' Copilot sample prompt extension is now active!');
    //load prompts from the prompts directory
    const promptsPath = path.join(context.extensionPath, 'src', 'data', 'prompts', 'samplePrompts.json');
    if (!fs.existsSync(promptsPath)) {
        console.error(`Prompts file not found at path: ${promptsPath}`);
        return;
    }
    const promptData = fs.readFileSync(promptsPath, 'utf8');
    //register the command to show prompts
    const showPromptsCommand = vscode.commands.registerCommand('sample-copilot-prompt-library.showPrompts', async () => {
        try {
            const selectedPrompt = await vscode.window.showQuickPick(JSON.parse(promptData).map((p) => p.title), {
                placeHolder: 'Select a prompt to use with Copilot',
                canPickMany: false
            });
            if (selectedPrompt) {
                const prompt = JSON.parse(promptData).find((p) => p.title === selectedPrompt);
                if (prompt && prompt.prompt) {
                    const editor = vscode.window.activeTextEditor;
                    if (editor) {
                        const position = editor.selection.active;
                        editor.edit(editBuilder => {
                            editBuilder.insert(position, prompt.prompt);
                        });
                    }
                    else {
                        vscode.window.showErrorMessage('No active text editor found.');
                    }
                }
            }
        }
        catch (error) {
            console.error('Error showing prompts:', error);
            vscode.window.showErrorMessage('Failed to load prompts. Check the console for details.');
        }
    });
    context.subscriptions.push(showPromptsCommand);
}
function deactivate() {
    console.log('Copilot sample prompt extension is now deactivated.');
}
//# sourceMappingURL=extension.js.map