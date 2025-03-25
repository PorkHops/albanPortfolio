using MudBlazor;

public class ContactData
{
    public List<SocialLink> SocialLinks { get; set; } = new();
}

public class SocialLink
{
    public string Name { get; set; } = "";
    public string Icon { get; set; } = "";
    public string Url { get; set; } = "";
    public string Color { get; set; } = "Primary";

    public string GetIconString() => Icon.ToLower() switch
    {
        "github" => Icons.Custom.Brands.GitHub,
        "linkedin" => Icons.Custom.Brands.LinkedIn,
        "email" => Icons.Material.Filled.Email,
        _ => Icons.Material.Filled.Link
    };
}