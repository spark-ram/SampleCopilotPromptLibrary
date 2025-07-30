using Microsoft.VisualStudio.Shell;
using EnvDTE;
using EnvDTE80;
using System;
using System.Linq;
using System.Threading.Tasks;

public class TaskExecution : PopulatePromptCommand
/* Replace with your base command class, e.g., OleMenuCommand */
{
    // If your base class defines Execute as virtual, keep override. Otherwise, remove override.
    protected /*override*/ void Execute(object sender, EventArgs e)
    {
        InsertPromptAsync("greeting").FireAndForget();
    }

    private async Task InsertPromptAsync(string promptId)
    {
        await ThreadHelper.JoinableTaskFactory.SwitchToMainThreadAsync();

        var dte = (DTE2)ServiceProvider.GlobalProvider.GetService(typeof(DTE));
        if (dte == null)
            return;

        var activeDoc = dte.ActiveDocument?.Selection as TextSelection;
        if (activeDoc == null)
            return;

        var manager = new PromptManager();
        manager.LoadPrompts();
        var prompt = manager.Library.Prompts.FirstOrDefault(p => p.Title == "Create a rest API prompt ");
        if (prompt != null)
        {
            activeDoc.Insert(prompt.PromptText);
        }
    }
}

// Helper extension for fire-and-forget async
public static class TaskExtensions
{
    public static void FireAndForget(this Task task) { }
}
