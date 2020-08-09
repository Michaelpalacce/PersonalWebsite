module.exports = {
  apps : [
    {
      script: 'index.js',
      watch: true,
      ignore_watch : ["node_modules", "public", "cache", "logs", "*.log", "*.json", "*.tmp", ".idea", ".git"],
      watch_options: {
        "followSymlinks": false
      }
    }
  ]
};
