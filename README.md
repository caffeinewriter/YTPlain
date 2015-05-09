YTSimple
========

A plain text API that will return the most popular video ID for a search.

Includes Redis caching.

## Configuration:

This app must be configured before it can be used.

```
{
  "redis": {
    "host": "127.0.0.1", // Redis hostname
    "port": 6379, // Redis port
    "pass": "" // Redis password
  },
  "port": 8080, // Application port (where it will bind to)
  "addr": "0.0.0.0", // Application address (where it will bind to)
  "api": {
    "key": "ytAPIKeyGoesHere" // Youtube API key: https://console.developers.google.com/
  }
}
```
