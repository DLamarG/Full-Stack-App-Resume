
document.addEventListener('DOMContentLoaded', function() {

    // Backend API Fetch
    async function triggerBackendAPI() {
        try {
          await fetch("http://127.0.0.1:5500/visit");
        } catch (error) {
          console.error("Error triggering backend API:", error);
        }
      }
      
      // Call the function
      triggerBackendAPI();
      

    

    // Skills Section: Expand/Collapse Descriptions
    const skillTitles = document.querySelectorAll('.skills-title');

    skillTitles.forEach(title => {
        title.addEventListener('click', function() {
            const description = this.nextElementSibling; // Get the associated description
            description.style.display = description.style.display === 'none' ? 'block' : 'none'; // Toggle visibility
        });
    });

    // Experience Section: Populate Timeline
    const timelineData = [
        {
            date: '2022 – 2024',
            title: 'Application Support Engineer',
            company: 'Miranda Healthcare',
            location: 'Chicago, IL, USA',
            description: 
                `<ul class="experience-list">
                    <li><span class="bullet"></span> Proactively monitored the hybrid cloud environment and responded to alerts with appropriate actions to maintain SLA’s.</li>
                    <li><span class="bullet"></span> Leveraged Grafana to create custom dashboards, enabling real-time visibility into application and system performance.</li>
                    <li><span class="bullet"></span> Managed the deployment and configuration of cloud applications with Docker, EKS, Terraform, and Jenkins for the entire organization.</li>
                    <li><span class="bullet"></span> Ensured the stability and reliability of critical cloud resources by proactively monitoring CloudWatch for health and performance metrics.</li>
                    <li><span class="bullet"></span> Developed and implemented bash scripts to streamline routine tasks and reduce the need for manual effort.</li>
                    <li><span class="bullet"></span> Supported distributed system architecture, including EC2, AWS RDS, API Gateway, Route53, Autoscaling, ELB’s, and Lambda.</li>
                    <li><span class="bullet"></span> Debugged issues related to middleware components such as gateways, message queues, and application servers via secure shell.</li>
                    <li><span class="bullet"></span> Provided day-to-day support for production environments, including troubleshooting issues, and performing system upgrades.</li>
                    <li><span class="bullet"></span> Collaborated with the IT Service Desk to efficiently triage and escalate incidents, ensuring timely and effective resolutions.</li>
                    <li><span class="bullet"></span> Analyzed server and application logs, identifying health and performance metrics that impact infrastructure reliability i.e. resource utilization, error rates, and response times.</li>
                </ul>`
        },
        {
            date: '2019 – 2022',
            title: 'IT Project Manager',
            company: 'Minor-Morris Ltd.',
            location: 'Joliet, IL, USA',
            description: 
                `<ul class="experience-list">
                    <li><span class="bullet"></span> Led Agile transformation and guided teams through Scrum implementation, resulting in improved team collaboration and performance.</li>
                    <li><span class="bullet"></span> Developed a detailed 2-year cloud migration roadmap for all service areas (task management, booking system, fleet tools), ensuring business continuity and clear communication of project objectives.</li>
                    <li><span class="bullet"></span> Worked with APN solution architects to design cloud architecture that met performance and budget requirements for the business.</li>
                    <li><span class="bullet"></span> Provided guidance on leveraging AWS services such as EC2, EKS, S3, RDS, and Lambda to create scalable, secure, and cost-effective solutions for the business.</li>
                    <li><span class="bullet"></span> Migrated the legacy task management system to a Kubernetes-managed (Docker runtime) microservices architecture in 3 months.</li>
                    <li><span class="bullet"></span> Facilitated communication between cross-functional teams and Product Owners to ensure clarity in requirements and expectations.</li>
                    <li><span class="bullet"></span> Employed Scrum methodologies wherever possible to leverage the adaptability of dynamic project environments.</li>
                    <li><span class="bullet"></span> Utilized problem-solving skills to resolve issues, improving team productivity and project delivery timelines.</li>
                </ul>`
        },
        {
            date: '2018 – 2019',
            title: 'Brand Manager',
            company: 'Rust-Oleum',
            location: 'Vernon Hills, IL, USA',
            description: 
                `<ul class="experience-list">
                    <li><span class="bullet"></span> Led initiatives to foster innovation across industrial platforms, aligning with corporate strategies and stakeholder needs for strategic ideation and commercialization of new industrial products.</li>
                    <li><span class="bullet"></span> Drove the financial performance of a $90MM portfolio with data-driven strategies, utilizing multiple CRM tools (e.g., SAP, Salesforce Reports, Salesforce Dashboard, DAX).</li>
                    <li><span class="bullet"></span> Facilitated communication between sales, R&D, and brand management to ensure alignment for ongoing strategic projects.</li>
                    <li><span class="bullet"></span> Leveraged Power BI to analyze consumer behavior and sales trends from consumer reports, transforming raw data into actionable insights for strategic direction.</li>
                    <li><span class="bullet"></span> Employed agile methods to create a process for streamlining the development and improvement of the industrial product line.</li>
                    <li><span class="bullet"></span> Directed brand messaging and digital strategy, leveraging digital campaigns designed to strengthen market position.</li>
                </ul>`
        },
        {
            date: '2015 – 2018',
            title: 'Technical Product Manager',
            company: 'Fuchs',
            location: 'Harvey, IL, USA',
            description: 
                `<ul class="experience-list">
                    <li><span class="bullet"></span> Managed the P&L for a product portfolio consisting of 225 SKUs, driving $30MM in annual revenue using analytical tools (e.g., ATD, SAP, Salesforce Analytics).</li>
                    <li><span class="bullet"></span> Developed communication materials to educate customers and sales teams on the value-add positioning for the 225 SKUs in the industrial portfolio.</li>
                    <li><span class="bullet"></span> Supported digital marketing strategies utilizing marketing tools (e.g., Adobe Suite, Placeit, Canva, Meta for Business) to grow customer engagement for all 190 industrial products.</li>
                    <li><span class="bullet"></span> Served as a technical expert, effectively translating complex technical concepts into clear, actionable insights for non-technical stakeholders.</li>
                    <li><span class="bullet"></span> Facilitated communication between technical teams and business units to ensure alignment, understanding, and success in implementing technical solutions.</li>
                    <li><span class="bullet"></span> Updated sales tools with the latest communication technologies (e.g., Adobe Suite, Canva).</li>
                    <li><span class="bullet"></span> Visited customers’ facilities for product presentations and collected relevant market data. (Travel 25-30%)</li>
                </ul>`
        }
    ];

    const timeline = document.getElementById('timeline');

    timelineData.forEach((item, index) => {
        const entry = document.createElement('div');
        entry.classList.add('timeline-entry');
        entry.setAttribute('id', 'entry-' + index);

        const dot = document.createElement('div');
        dot.classList.add('timeline-dot');

        const date = document.createElement('div');
        date.textContent = item.date;
        date.classList.add('timeline-date');

        const content = document.createElement('div');
        content.classList.add('timeline-content');
        content.setAttribute('id', 'content-' + index);

        const title = document.createElement('h3');
        title.textContent = item.title;

        const company = document.createElement('h4');
        company.textContent = item.company;
        company.classList.add('company-name');

        const location = document.createElement('h4');
        location.textContent = item.location;
        location.classList.add('location');

        const description = document.createElement('div');
        description.innerHTML = item.description;
        description.style.display = 'none';

        entry.addEventListener('click', function() {
            description.style.display = description.style.display === 'none' ? 'block' : 'none';
        });

        content.appendChild(title);
        content.appendChild(company);
        content.appendChild(location);
        content.appendChild(description);

        entry.appendChild(dot);
        entry.appendChild(date);
        entry.appendChild(content);

        timeline.appendChild(entry);
    });
});
