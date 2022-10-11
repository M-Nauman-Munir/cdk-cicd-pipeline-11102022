import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as awsLambda from "aws-cdk-lib/aws-lambda";

export class MyLambdaStack extends cdk.Stack {
  constructor(
    scope: Construct,
    id: string,
    stageName: string,
    props?: cdk.StackProps,
  ) {
    super(scope, id, props);

    new awsLambda.Function(this, "LambdaFunction", {
      code: awsLambda.Code.fromAsset("lambda"),
      handler: "index.handler",
      runtime: awsLambda.Runtime.NODEJS_16_X,
      environment: {
        stageName,
      },
    });
  }
}
