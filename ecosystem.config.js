module.exports = {
  apps: [
    {
      name: 'nextjs-dev',
      // script: 'node_modules/next/dist/bin/next',
      // args: 'dev -p 3000',

      script: 'npm',
      args: 'run dev -- --port 3000',
      interpreter: 'bash',

      cwd: process.cwd(),
    },
  ],
};
