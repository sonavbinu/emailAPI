import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Determine the server URL based on environment
const getServerUrl = () => {
  if (NODE_ENV === 'production') {
    // Use the actual deployed URL (Render provides this)
    return (
      process.env.RENDER_EXTERNAL_URL || `https://email-api-kdxj.onrender.com`
    );
  }
  return `http://localhost:${PORT}`;
};

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Email Sending API',
      version: '1.0.0',
      description:
        'A simple and powerful Email sending API built with node.js, Express,and Typescript',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: getServerUrl(),
        description:
          NODE_ENV === 'production'
            ? 'Production server'
            : 'Development server',
      },
    ],
    tags: [
      { name: 'Email', description: 'Email sending and management endpoints' },
    ],
  },
  // Use different paths for development vs production
  apis:
    NODE_ENV === 'production' ? ['./dist/routes/*.js'] : ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
