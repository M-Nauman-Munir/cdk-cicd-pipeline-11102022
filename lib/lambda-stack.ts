import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Function, Code, Runtime } from "aws-cdk-lib/aws-lambda";

export class MyLambdaStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    new Function(this, "LambdaFunction", {
      code: Code.fromAsset("lambda"),
      handler: "index.handler",
      runtime: Runtime.NODEJS_16_X,
      environment: {
        stageName,
      },
    });
  }
}
