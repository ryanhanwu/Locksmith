# Locksmith


## Development

### Install Ionic and Cordova
```
npm install -g ionic cordova
npm install -g gulp
```

### Config
#### 1. Create config.json from your [Parse](http://parse.com) credientials

```
{
    "PARSE" : {
        "APP_ID" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "REST_API_KEY" : "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
}
```
#### 2. Generate config file for application

```
gulp config
```
