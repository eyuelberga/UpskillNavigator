import { client } from "./client";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { searchTrainingMaterials, searchEmployee } from "./functions";

async function getOrgConfig() {
  const filePath = path.join(process.cwd(), "org.config.json");
  const fileContents = await fs.promises.readFile(filePath, "utf8");
  return JSON.parse(fileContents);
}

async function getAllDepartments() {
  const org = await getOrgConfig();
  return org.departments;
}

async function getAllRoles() {
  const org = await getOrgConfig();
  return org.roles;
}

async function getAllGroups() {
  const org = await getOrgConfig();
  return org.groups;
}

export async function generate(message: string) {
  const org = await getOrgConfig();
  const SOURCE = ["External", "Internal"] as const;
  const TYPE = ["Training Material", "Activity", "Mentorship"] as const;
  const MilestoneProps = z.object({
    index: z.number(),
    source: z.enum(SOURCE),
    type: z.enum(TYPE),
    title: z.string(),
    description: z.string(),
    duration: z.string(),
    link: z.string(),
  });
  const LearningPathProps = z.object({
    title: z.string(),
    milestones: z.array(MilestoneProps),
  });
  const systemMessage = `You are a helpful career advisor for ${org.name} that helps employees navigate their career journey by creating a learning path for them based on their goals and your deep insight about the organization.
You provide a response with a learning path for the employee with a list of milestones that are no larger than 5.
Come up with a learning path title that is concise and easy to understand. 
When selecting a mentorship milestone, take into consideration the DEI groups that the employee is a member of, so that the mentor would also be able to help with overcoming the unique challenges the employee might face during the learning journey.
The training materials in the learning path should have a good balance of technical and non-technical resources.
In each milestone description write a good descriptive message on how it is aligned to the employee's goals and how to successfully complete it.
If you have a website link for a milestone, include it in the description.   
Begin!`;

  const runner = client.beta.chat.completions
    .runTools({
      model: "gpt-4o-mini",
      response_format: zodResponseFormat(LearningPathProps, "learning_path"),
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: message },
      ],
      tools: [
        {
          type: "function",
          function: {
            function: getAllDepartments,
            description:
              "Return an array of all departments in the organization",
            parameters: { type: "object", properties: {}, required: [] },
          },
        },
        {
          type: "function",
          function: {
            function: getAllRoles,
            description: "Return an array of all job roles in the organization",
            parameters: { type: "object", properties: {}, required: [] },
          },
        },
        {
          type: "function",
          function: {
            function: getAllGroups,
            description:
              "Return an array of all DEI groups in the organization",
            parameters: { type: "object", properties: {}, required: [] },
          },
        },

        {
          type: "function",
          function: {
            function: searchTrainingMaterials,
            parse: JSON.parse,
            description:
              "Return an array of internal training materials that contain the query",
            parameters: {
              type: "object",
              properties: {
                contains: {
                  type: "string",
                  description: "the search query string",
                },
              },
              required: [],
            },
          },
        },

        {
          type: "function",
          function: {
            function: searchEmployee,
            parse: JSON.parse,
            description:
              "Return an array of employee profiles",
            parameters: {
              type: "object",
              properties: {
                department: {
                  type: "string",
                  description: "the department the employee works at",
                },
                role: {
                  type: "string",
                  description: "the job title for the employee",
                },
                group: {
                  type: "string",
                  description: "the DEI group the employee is a member of",
                },
              },
              required: [],
            },
          },
        },

        
      ],
    })
    .on("message", (message) => console.log(message));

  const finalContent = await runner.finalContent();
  if (finalContent) return JSON.parse(finalContent);
  return {};
}
