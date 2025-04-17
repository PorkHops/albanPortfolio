namespace albanPortfolio.Components.Utils;

public class ResumeProject
{
    public string? Title { get; set; }
    public List<string>? Achievements { get; set; }
}

public class Experience
{
    public string? Title { get; set; }
    public string? Company { get; set; }
    public string? Period { get; set; }
    public List<ResumeProject>? Projects { get; set; }
}