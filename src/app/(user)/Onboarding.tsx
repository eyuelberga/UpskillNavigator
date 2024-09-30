"use client";
import {
  Box,
  Flex,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import YourInformation from "./YourInformation";
import Goals from "./Goals";
import Suggestions from "./Suggestions";
import Welcome from "./Welcome";
import Path from "./Path";
import { AppContext } from "./AppContext";

export default function Onboarding() {
  const steps = [
    { title: "Your Information" },
    { title: "Your Career Goals and Aspirations" },
    { title: "Ready to start your Journey?" },
  ];
  const app = useContext(AppContext);
  const [learningPathDraft, setLearningPathDraft] = useState(null);

  const { activeStep, setActiveStep } = useSteps({
    index: -1,
    count: steps.length,
  });
  const maxStep = steps.length - 1;
  const goToNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  return (
    <>
      <Flex gap="2">
        {activeStep >= 0 && activeStep <= maxStep && (
          <Stepper
            colorScheme="orange"
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        )}
        <Box w="100%">
          {activeStep < 0 && (
            <Welcome
              onClick={async () => {
                goToNextStep();
              }}
            />
          )}
          {activeStep == 0 && (
            <YourInformation
              profile={app.data.profile}
              isLoading={app.isLoading}
              departments={app.data.departments}
              roles={app.data.roles}
              groups={app.data.groups}
              onClick={async (p:any) => {
                await app.updateProfileAsync.request(p);
                goToNextStep();
              }}
            />
          )}

          {activeStep == 1 && (
            <Goals
              isLoading={app.isLoading}
              profile={app.data.profile}
              departments={app.data.departments}
              roles={app.data.roles}
              groups={app.data.groups}
              onClick={async (goal:any) => {
                const lp = await app.genLearningPathAsync.request(goal);
                setLearningPathDraft(lp);
                goToNextStep();
              }}
            />
          )}
          {activeStep == 2 && (
            <Path
              isLoading={app.isLoading}
              profile={app.data.profile}
              learningPath={learningPathDraft}
              setLearningPath={setLearningPathDraft}
              onClick={async (lp:any)=>{
                await app.updateLearningPathAsync.request(lp);
              }}
            />
          )}
        </Box>
      </Flex>
    </>
  );
}
