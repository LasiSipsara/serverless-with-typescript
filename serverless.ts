import type { AWS } from "@serverless/typescript";

import functions from "@functions/index";

const serverlessConfiguration: AWS = {
  service: "weather-api-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
    profile: "sls",
    stage: "dev",
    apiName: "${self:service}-${self:provider.stage}",
    stackName: "${self:service}-stack-${self:provider.stage}",
    region: "eu-north-1",
    endpointType: "regional",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: ["${self:provider.apiName}--apikey"],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      WEATHER_API_KEY: "4a0d716697311de4ada9a7f39829810c",
    },
  },
  // import the function via paths
  functions: functions,
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
