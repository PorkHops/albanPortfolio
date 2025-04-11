using System.Text.Json;
using System.Text.Json.Serialization;

namespace albanPortfolio.Components.Utils;

public class PuzzleRow
{
    public string[] Values { get; set; } = null!;
}

public class HexdokuPuzzle
{
    [JsonPropertyName("puzzle")]
    public List<List<string>>? Puzzle { get; set; }

    [JsonPropertyName("solution")]
    public List<List<string>>? Solution { get; set; }
}

public class HexdokuData
{
    [JsonPropertyName("easy")]
    public List<HexdokuPuzzle>? Easy { get; set; }

    [JsonPropertyName("medium")]
    public List<HexdokuPuzzle>? Medium { get; set; }

    [JsonPropertyName("hard")]
    public List<HexdokuPuzzle>? Hard { get; set; }
    public static async Task<HexdokuData?> LoadFromFile(string jsonPath)
    {
        try
        {
            string jsonContent = await File.ReadAllTextAsync(jsonPath);
            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
                WriteIndented = true
            };
            
            return JsonSerializer.Deserialize<HexdokuData>(jsonContent, options);
        }
        catch (Exception)
        {
            return null;
        }
    }
}