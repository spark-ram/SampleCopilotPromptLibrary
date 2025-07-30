using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;
public class Prompt
{
    public string Title { get; set; }

    [JsonProperty("prompt")]
    public string PromptText { get; set; }

    public List<string> Tags { get; set; }
}

public class PromptLibrary
{
    public List<Prompt> Prompts { get; set; }
}

public class PromptManager
{
    private const string FilePath = "prompts.json";
    public PromptLibrary Library { get; private set; }

    public void LoadPrompts()
    {
        if (File.Exists(FilePath))
        {
            string json = File.ReadAllText(FilePath);
            Library = JsonConvert.DeserializeObject<PromptLibrary>(json);
        }
        else
        {
            Library = new PromptLibrary { Prompts = new List<Prompt>() };
        }
    }
}
