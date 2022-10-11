import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as awsCodePipeline from "aws-cdk-lib/pipelines";
import { MyPipelineAppStage } from "./stage";

export class CdkCicdPipeline11102022Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new awsCodePipeline.CodePipeline(
      this,
      "AWS-Code-Pipeline",
      {
        pipelineName: "test-code-pipeline",
        synth: new awsCodePipeline.ShellStep("Synth", {
          input: awsCodePipeline.CodePipelineSource.gitHub(
            "M-Nauman-Munir/cdk-cicd-pipeline-11102022",
            "master",
          ),
          commands: ["npm ci", "npm run build", "npx cdk synth"],
        }),
      },
    );

    const testingStage = pipeline.addStage(
      new MyPipelineAppStage(this, "test"),
    );

    testingStage.addPost(
      new awsCodePipeline.ManualApprovalStep(
        "Manual approval is needed before production",
      ),
    );

    const prodStage = pipeline.addStage(new MyPipelineAppStage(this, "prod"));
  }
}
