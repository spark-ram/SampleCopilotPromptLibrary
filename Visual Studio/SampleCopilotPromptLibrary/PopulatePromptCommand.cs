using EnvDTE;
using EnvDTE80;
using Microsoft.VisualStudio.Shell;
using System;
using System.Linq;
using System.Threading.Tasks;

public class PopulatePromptCommand
{
    // Other members of your command class...

    public async Task InsertPromptAsync(string promptId)
    {
        // Ensure we are on the UI thread
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

    // Use async void for event handler
    public async void Execute(object sender, EventArgs e)
    {
        await InsertPromptAsync("greeting");
    }
}
