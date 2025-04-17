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
                          + "that stakeholders deemed would be unfit or unsafe for autonomous driving. A general example for this is that, for many liability and safety "
                          + "reasons, it is unwise for people to rely on AD to navigate a 100° turn at 90mph. We created many algorithms to apply rules like this within "
                          + "the tool.<br /><br />"
                          + "Once our tool finished the data processing (described below), we would then pass the data to the next team in the pipeline, and the first step "
                          + "to the self driving vehicle map was complete.",
            Sections    =
            [
                new()
                {
                    Title   = "Data & Structure",
                    Bullets =
                    [
                        "You know those little cars that have a million cameras and sensors on them? We use the data from those to create a virtual map.",
                        "Our team was given very large XMLs that were gathered from the field from those vehicles.",
                        "These XMLs contained every possible detail of a roadway that you could imagine. All the way down to how faded the lines are.",
                        "We had to parse these XMLs and create a data structure that would allow us to easily access the data.",
                        "It was also crucial that the data could be used by the rest of the pipeline to later create the actual map the AD computer uses.",
                        "I am unable to share the exact method that we did this, but we were able to create Ordered Dictionaries that held an entire roadway, "
                        + "which was comprised of individual lane data.",
                        "These roadways also contained information on how they interacted with other roadways.",
                    ]
                },
                new()
                {
                    Title   = "Processing the data",
                    Bullets =
                    [
                        "With the foundation of the data structure in place, we were able to start parsing the XML data into the structures.",
                        "Afterwards, we started on the task of creating the algorithms that would apply the filter rules to the data.",
                        "Since the data was so large, much of the tool utilized multithreading to process the data. I mean think about cross-country interstates with "
                        + "1000s of miles and imagine how big a dictionary containing that data every few feet would be, AND the fact that each lane is it's own data point... Its a lot of data.",
                        "As far as data processing goes, I am afraid I cannot share much more than that.",
                        "I can say that we were able to create a system that was able to process the data in a 'reasonable' amount of time.",
                    ]
                },
                new()
                {
                    Title   = "Testing & Validation",
                    Bullets =
                    [
                        "Due to the life-critical nature of the system, we took unit testing very seriously.",
                        "Every single component of the tool had a battery of unit tests made for each one of them. Especially the algorithms that we created.",
                        "Entire meetings revolved around trying to find more and more test cases. Users love to break things, and with the amount of miles that "
                        + "our end users could put in within a day, we had to be sure that we were able to catch every possible edge case before they did.",
                        "This also meant that with every change in the tool or maps, we would religiously compare the new results with the old results. Even a "
                        + "delta of 1 would spark a full investigation into what had changed.",
                        "We would also have regular meetings with the stakeholders to discuss our data, changes, and validation.",
                        "I cant speak directly to how we did our validation, but I can say it involved looking at a lot of real maps.",
                        "Since our data structure was more or less a map, the only real way to validate one map is with another."
                    ]
                },
                new()
                {
                    Title   = "Data Visualization",
                    Bullets =
                    [
                        "Did I mention that the data was huge? Well, I'll say it again. This was BIG data, and even the data of roads we filtered out was in the 100k's.",
                        "We needed a way to visualize the data so that we could see what our filters were doing, and how it was affecting the data.",
                        "This was an entire project in itself. To read further, please visit \"Data Visualization Platform\" tab."
                    ]
                },
                new()
                {
                    Title   = "Afterwards",
                    Bullets =
                    [
                        "The tool was a huge success, but even perfect needs tweaks when talking about a system like this.",
                        "After completion, we spent a few weeks making upgrades and tweaks to the tool, but overall we said \"Yay! It's done!\".... until...",
                        "So the original tool was created entirely in python. We choose it because we all had experience in it, and it was an amazing language for the job.",
                        "But... shortly after completion, stakeholders noticed that the pipeline after us was developed in C# and .NET.",
                        "After this realization, we were asked to convert the tool to match the rest of the pipeline.",
                        "This was a huge undertaking, and we had to rewrite the entire tool in C#",
                        "Thankfully, we already had all of the logic tuned in, so we were able to use that as a base.",
                        "A lot of time was spent in validating the new tool against the old tool, and ANY deviation was met with a full investigation. Once the new version was "
                        + "completed, we ran it in parallel with the old version for a few months to ensure that it was working as expected.",
                        "There was a lot of stress and long hours involved, and a lot of debating when the right time was to fully switch over to the new tool.",
                        "In the end, I believe out new was very well tailored. Since we didn't have to worry about the logic and structures, we were able to focus on the "
                        + "performance of the tool. We were able to make a lot of optimizations that we didn't have time to do in the original.",
                        "Overall, this change was in fact a very smart one, as we now had a direct handshake with the rest of the pipeline which meant our handoff time was "
                        + "reduced to almost nothing.",
                        "I just wish someone had this genius idea a little earlier in the project haha.",
                    ]
                }
            ],
        },

        new()
        {
            Title       = "Data Visualization Platform",
            Description = "The data visualization platform was a project that I took on during the Geofence Mapping project."
                          + "Some things may make not make as much sense without reading the \"Geofence Mapping\" tab.<br /><br />"
                          + "Much like the Geofence project, this project was broken up into two parts: PowerBI and .NET<br /><br />"
                          + "The PowerBI was the original version of our DVP. Seeing as I was the only one on my team with any experience in PowerBI, "
                          + "I took it upon myself to personally champion and lead the development.<br /><br />"
                          + "The goal of this project was to be able to visualize the data that we were processing in the Geofence Mapping project."
                          + "We needed a way to visualize the data so that we could see what our filters were doing, and how it was affecting the data.<br /><br />"
                          + "While some people are able to look at an XML and 'get it', most people prefer pretty charts.",
            Sections    =
            [
                new()
                {
                    Title   = "PowerBI",
                    Bullets =
                    [
                        "We specifically cared about changes from new maps to old maps and changes with tool updates.",
                        "The first step was creating a function withing the tool. This function was called after all the processing was done, and it would the output filter data into a JSON.",
                        "The JSONs were iterative by map version, and contained variations of the data.",
                        "I then created a PowerBI report that would take the JSONs and create a map of the data.",
                        "The big focus on the PBI was for stakeholders to easily see how many roads a filter would apply to.",
                        "The data was pulled in from the JSON storage location and then many transformations were done in order to properly organize the data.",
                        "This involved a lot of parsing and reformatting to make sure that each section in the json was identified by month and run variation.",
                        "Overall there were about 20 different pages on the PBI report, each tailored to a different point of interest.",
                        "Since a big focus was month to month changes, there were a lot of filters in place to allow users to fine tune what changes they wanted to see.",
                        "I worked directly with the stakeholders to determine what they wanted to see, and how they wanted to see it.",
                        "The PBI was a huge success, and the stakeholders loved it. They were able to see how many roads were filtered out, and how many were added.",
                        "Honestly the most difficult part of all of this was dealing with Microsoft's licensing and security policies.",
                    ]
                },
                new()
                {
                    Title   = ".NET Conversion",
                    Bullets =
                    [
                        "As mentioned in the Geofence Mapping tab, the original tool was created in python and later converted into a C#/.NET microservice.",
                        "Once the conversion was complete, there were a lot of talks about how we wanted the entire Mapping Groups data to be visualized.",
                        "This led to the creation of MapHUB, a Blazor based web app that would allow users to visualize what is happening in the Mapping space.",
                        "The goal of this was to be a one stop shop for all things mapping, including the visualization of the Geofence Mapping data, map versioning, and making pipeline actions.",
                        "Due to the team's strong .NET background, we decided to go with a Blazor Server App architecture that used Telerik for frontend components.",
                        "Seeing as we were all software engineers, there was no division of frontend and backend. Each of us were expected to be the full stack developer for our domain.",
                        "On the visualization side, we wanted to consolidate dashboards that were all around the place into one central location.",
                        "Since I made the original tool, I was tasked with leading the development of the data visualization side of the project.",
                    ]
                },
                new()
                {
                    Title   = "Implementation",
                    Bullets =
                    [
                        "Due to our companies strong security policies, our team's architect personally developed authentication, security, and general structure of the app.",
                        "This also meant that using third party libraries and NuGet Packages was a bit of a challenge, as everything had to be cleared first.",
                        "The plus side of a corporation like this is that we had a lot of resources at our disposal.",
                        "The Geofence Pipeline was altered to output its data into an SQL database (specifically PostgreSQL), which was then used to power the Blazor app.",
                        "The automatic data stream within the tool was a lot better than exporting JSONs (crazy, right?).",
                        "Since the goal was unification and consistency, a lot of time was spent on data structures. This created a lot of arguments with engineers who kept wanting to rename their variables.",
                        "This also meant that we put in a lot of thought into how to structure our classes. We wanted things to be easy to read and understand, but also easy to use.",
                        "The classes were structured to create their own IEnumerable collections, which allowed us to easily iterate over the data.",
                        "With the data structure in place, we were able to start creating the Blazor components.",
                        "At this point, my goal was to recreate the PowerBI dashboards in Blazor, making sure to keep all the requirements met on the new platform.",
                        "Luckily I take a lot of notes, and C# is a lot easier to work with than PowerBI.",
                        "The main page consisted of a Telerik TabStrip where each tab called on the individual components.",
                        "Each components razor page held it's own logic for for data processing and visualization (adhering to the One Responsibility Principle).",
                        "Since a lot of the time stakeholders only care about comparing two maps, the page was also given url parameters to automatically retrieve and filter the map versions they wanted to compare.",
                        "These url params were implemented in areas of the site where a map was able to be selected, thus directing the user to the page with the data they wanted already loaded.",
                    ]
                },
                new()
                {
                    Title   = "Further Integrations",
                    Bullets =
                    [
                        "The Blazor app was designed to be a one stop shop for all things mapping.",
                        "This meant that we wanted to integrate with other teams inside the mapping space.",
                        "To accomplish this, we created Rest APIs that would allow other teams to push their data to our app.",
                        "Obviously due to security APIs were also designed to be strictly secure, and only allow access to authorized users.",
                        "With their data structures in hand, I created visualization pages for them. Since we had strict security protocols, users could only see pages and data that they were authorized for.",
                        "This meant that we had to create a lot of different pages for different teams, but it was worth it.",
                        "The Blazor app was able to pull in data from the Geofence Mapping tool, and the APIs streamlined the process of getting data from other teams."
                    ]
                }

            ]
        },

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