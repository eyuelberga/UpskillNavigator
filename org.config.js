export default {
  organization: {
    name: "Example Corp",
    departments: [
      "Engineering",
      "Sales",
      "Marketing",
      "Human Resources",
      "Finance",
      "Product",
    ],
    roles: [
      "Software Engineer",
      "Sales Associate",
      "Marketing Specialist",
      "HR Manager",
      "Finance Analyst",
      "Product Manager",
    ],
    groups: [
      "Women in Tech",
      "LGBTQ+ Network",
      "Black Professionals Group",
      "Latinx Leadership Network",
      "Veterans Group",
    ],
  },

  internalResources: {
    jobBoard: {
      // Webhook function to fetch job listings from the internal job board
      fetchJobs: {
        function: async () => {
          const response = await fetch(process.env.JOB_BOARD_API_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          });
          return await response.json();
        },
        description:
          "Fetch a list of job openings from the internal job board.",
        parameters: {
          type: "object",
          properties: {
            department: {
              type: "string",
              description:
                "The department to filter job listings by (optional).",
            },
            role: {
              type: "string",
              description: "The role to filter job listings by (optional).",
            },
          },
          required: [],
        },
        returns: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Job ID" },
              title: { type: "string", description: "Job title" },
              department: { type: "string", description: "Department name" },
              location: { type: "string", description: "Job location" },
              description: { type: "string", description: "Job description" },
            },
          },
        },
      },
    },
    courses: {
      // Webhook function to fetch internal training courses
      fetchCourses: {
        function: async () => {
          const response = await fetch(process.env.COURSES_API_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          });
          return await response.json();
        },
        description: "Fetch a list of available internal training courses.",
        parameters: {
          type: "object",
          properties: {
            category: {
              type: "string",
              description: "Category to filter courses (optional).",
            },
          },
          required: [],
        },
        returns: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Course ID" },
              title: { type: "string", description: "Course title" },
              category: { type: "string", description: "Course category" },
              duration: {
                type: "number",
                description: "Course duration in hours",
              },
            },
          },
        },
      },
    },
    announcements: {
      // Webhook function to fetch internal announcements
      fetchAnnouncements: {
        function: async () => {
          const response = await fetch(process.env.ANNOUNCEMENTS_API_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          });
          return await response.json();
        },
        description: "Fetch a list of recent internal announcements.",
        parameters: {
          type: "object",
          properties: {
            since: {
              type: "string",
              format: "date-time",
              description: "Fetch announcements since this date (optional).",
            },
          },
          required: [],
        },
        returns: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Announcement ID" },
              title: { type: "string", description: "Announcement title" },
              content: { type: "string", description: "Announcement content" },
              date: {
                type: "string",
                format: "date-time",
                description: "Announcement date",
              },
            },
          },
        },
      },
    },
    mentorship: {
      // Webhook function to fetch the employee list for mentorship matches
      fetchMentorshipMatches: {
        function: async () => {
          const response = await fetch(process.env.MENTORSHIP_API_URL, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          });
          return await response.json();
        },
        description:
          "Fetch a list of potential mentorship matches within the organization.",
        parameters: {
          type: "object",
          properties: {
            department: {
              type: "string",
              description:
                "Department to filter potential mentors by (optional).",
            },
            role: {
              type: "string",
              description: "Role to filter potential mentors by (optional).",
            },
          },
          required: [],
        },
        returns: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string", description: "Employee ID" },
              name: { type: "string", description: "Employee name" },
              department: {
                type: "string",
                description: "Employee department",
              },
              role: { type: "string", description: "Employee role" },
              experience: {
                type: "string",
                description: "Years of experience",
              },
            },
          },
        },
      },
    },
  },

  // SSO Integration
  sso: {
    provider: "custom",
    ssoUrl: process.env.SSO_URL, // URL to the organization's SSO provider
    clientId: process.env.SSO_CLIENT_ID, // App client ID for SSO
    clientSecret: process.env.SSO_CLIENT_SECRET, // App client secret for SSO
    redirectUri: process.env.SSO_REDIRECT_URI, // Redirect URI for authentication flow
  },

  // Security
  security: {
    encryptionKey: process.env.ENCRYPTION_KEY, // Secret for data encryption
    sessionTimeout: 3600, // Session timeout in seconds
  },
};
