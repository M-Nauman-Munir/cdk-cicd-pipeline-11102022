export async function handler(event: string, context: string) {
  console.log(`Stage Name is: ${process.env.stage}`);

  return {
    body: `Hey There! This is coming from lambda function`,
    statusCode: 200,
  };
}
