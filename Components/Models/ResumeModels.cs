namespace albanPortfolio.Components.Models;

public class Skill
{
    public string Name { get; set; }
    public int Level { get; set; }
}

public class SkillCategory
{
    public string Name { get; set; }
    public List<Skill> Skills { get; set; }
}

public class Project
{
    public string Title { get; set; }
    public List<string> Achievements { get; set; }
}

public class Experience
{
    public string Title { get; set; }
    public string Company { get; set; }
    public string Period { get; set; }
    public List<Project> Projects { get; set; }
}