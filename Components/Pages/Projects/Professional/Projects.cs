namespace albanPortfolio.Components.Pages.Projects.Professional;

public class Project
{
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public List<ProjectSection> Sections { get; set; } = [];
}

public class ProjectSection
{
    public string Title { get; set; } = "";
    public List<string> Bullets { get; set; } = [];
}

public static class ProjectsData
{
    public static List<Project> Projects =
    [
        new()
        {
            Title       = "Automated API Testing Framework",
            Description = "Our company utilized numerous APIs that required regular stability testing. "
                          + "The existing process involved an engineer manually running tests through Telerik Fiddler hourly - "
                          + "executing each API test individually, waiting for completion, and then analyzing results for errors. "
                          + "I was tasked with developing a more efficient and automated testing solution.<br /><br />"
                          + "I discovered that Fiddler's session files (.saz format) were essentially zip archives containing plain text files of the APIs and their expected outputs. "
                          + "This insight significantly simplified the project approach.<br /><br />"
                          + "I developed a Windows service to run on a company server that performed the following:",
            Sections    =
            [
                new()
                {
                    Title   = "API Information Extraction",
                    Bullets =
                    [
                        "Unpacked the SAZ file to local storage",
                        "Categorized files containing API information into REST or SOAP directories",
                        "Implemented FileSystemWatcher to detect SAZ file changes - automatically unpacking and updating saved APIs when modified, or reusing existing files to optimize performance"
                    ]
                },
                new()
                {
                    Title   = "Request Processing",
                    Bullets =
                    [
                        "Everything beyond this point was Implemented with Multithreaded Architecture using Semaphore",
                        "Parsed text file APIs into HttpRequest objects with validation logic for SOAP/REST protocols and request methods (GET/POST/PUT)",
                        "Transmitted requests to their respective endpoints",
                        "Captured HttpResponseMessage data",
                        "Validated responses against success criteria or expected response templates for failure test cases"
                    ]
                },
                new()
                {
                    Title   = "Results Management",
                    Bullets =
                    [
                        "Configured automated alert emails to stakeholders when tests failed (timeout, incorrect response, etc.)",
                        "Formatted HttpResponseMessage data into human-readable content (improving upon the default ToString() output)",
                        "Distributed results via SmtpClient"
                    ]
                },
                new()
                {
                    Title   = "Results & Impact",
                    Bullets =
                    [
                        "The service completed full testing cycles in approximately 10-15 seconds (excluding occasional extended response times)",
                        "This represented a 200x improvement in testing frequency compared to the previous hourly manual process",
                        "Stakeholders gained significantly faster awareness of API issues",
                        "The custom logging system effectively handled multithreaded operations",
                        "The configurable design allowed easy modification of SMTP settings, notification recipients, timeouts, and other variables",
                        "The FileSystemWatcher implementation enabled seamless updates - the API team could simply replace SAZ files and the service would automatically process the changes"
                    ]
                }
            ]
        },

        new()
        {
            Title       = "Enterprise Portal Modernization",
            Description = "The company operated a comprehensive web portal that served as the centralized hub for diverse business functions "
                          + "(ticketing, BOM creation/viewing, order maintenance, HR activities, etc.). This critical system had remained largely unchanged "
                          + "for over 20 years and was still running on .NET Framework 4.8. I was assigned the responsibility of completely redesigning and "
                          + "rebuilding the system from the ground up.",
            Sections    =
            [
                new()
                {
                    Title   = "Discovery & Analysis",
                    Bullets =
                    [
                        "Conducted thorough analysis of the existing system to establish core functional requirements",
                        "Consulted directly with users to identify pain points, appreciated features, and desired improvements",
                        "Expanded research to include external end users beyond immediate staff",
                        "Documented the underlying database schema powering portal functionality",
                        "Confirmed leadership's commitment to maintaining a '1-Click-Away' navigation philosophy"
                    ]
                },
                new()
                {
                    Title   = "Technical Planning",
                    Bullets =
                    [
                        "Developed efficient database access code to retrieve essential data (navigation menu items, homepage deliverables, etc.)",
                        "Prioritized a contemporary, user-friendly front-end design",
                        "Selected Blazor Server App architecture to:",
                        // Make these sub bullets later
                        "Maintain alignment with modern Microsoft development practices",
                        "Reduce processing demands on legacy client machines still in use throughout the organization"
                    ]
                },
                new()
                {
                    Title   = "Implementation",
                    Bullets =
                    [
                        "Designed a visually appealing, intuitive navigation system",
                        "Implemented a robust search feature to quickly locate menu items",
                        "Created a 'Favorites' system allowing users to pin frequently used items at the top of their navigation menu",
                        "Added contextual icons to menu items based on function type (email, create, export) using appropriate visual indicators (mail symbol, plus sign, document with arrow)",
                        "Developed seamless iframe-based integration to accommodate internally hosted legacy subsystems",
                        "Created a single Container.razor page to manage all non-homepage content, supporting both menu-based navigation and URL parameter access"
                    ]
                },
                new()
                {
                    Title   = "Results",
                    Bullets =
                    [
                        "The modernized portal delivered a completely transformed user experience that received overwhelmingly positive feedback",
                        "Users specifically expressed appreciation for the thoughtful details and intuitive design, with no negative criticism received"
                    ]
                }
            ]
        },

        new()
        {
            Title       = "Geofence Mapping",
            Description = "*Due to the nature of this project, and the sensitivity of the space, I will not be able to disclose any key details, but I will try "
                          + "to give a high level overview of the project and my role.*<br /><br />"
                          + "The goal of this project was to be the beginning steps of the autonomous driving (AD) map system, and ultimately act as a filter for roads "
                          + "that stakeholders deemed would be unfit or unsafe for autonomous driving. A general idea for this is that, for many liability and safety "
                          + "reasons, it is unwise for people to rely on AD to navigate a 100° turn at 90mph. We created any rules like this within the tool.<br /><br />"
                          + " ",
            Sections    =
            [
                new()
                {
                    Title   = "Data & Structure",
                    Bullets =
                    [
                        "You know those little cars that have a million cameras and sensors on them? We used the data from those to create a virtual map.",
                        "Our team was given very large XMLs that were gathered from the field from those vehicles.",
                        "These XMLs contained every possible detail of a roadway that you could imagine. All the way down to how faded the lines are.",
                        "We had to parse these XMLs and create a data structure that would allow us to easily access the data.",
                        "It was also crucial that the data could be used by the rest of the pipeline to later create the actual map the AD computer uses.",
                        "The "
                    ]
                },
                new()
                {
                    Title   = "",
                    Bullets =
                    [
                        ""
                    ]
                }
            ]
        }

        // new()
        // {
        //     Title       = "",
        //     Description = ""
        //                   + "",
        //     Sections    =
        //     [
        //         new()
        //         {
        //             Title   = "",
        //             Bullets =
        //             [
        //                 ""
        //             ]
        //         }
        //     ]
        // }

        /*
        // Add more projects here as needed
        */
    ];
}