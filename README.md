# Potassium

## Preface

Potassium or as most people know it as Fanadmin or Fanatics Administration is a Discord bot that handles certain tasks automatically in certain niches.
The purpose of this bot was to meet the demands that the moderation team had at the time.
After my resignation due to my mental health at the time I took a massive break from coding in general. After more then 6 months I decided to look back on what I managed to do at the time.
After some thinking I've decided to open source this project so other developers or servers with similar demands can fork this project and even modify it to meet their own demands. I've worked on this for almost two years with joy. Even if this is for me obsolete, I think there are some people out there that currently need this more then I do.

## Installation

The installation is purely to set up a Discord bot with the **files given as it is**.

Before we can progress there are a few requirements you must meet:

- have a node.js 16.11.0 or higher installed
- have a PostgreSQL database
- a basic understanding of Typescript and Javascript
- a basic understanding of SQL

### Configuring the bot

Open up the `config` directory and you should see `botconfig.json`, `keys.json` and `manifest.json` in there. <br />

`botconfig.json`
```json
{
  "token": "", // your bot's token
  "postgresUrl": "postgres://user:password@localhost:5432/database" // the url that is used to access the database
}
```

`manifest.json`
```json
{
    "guild": "", // the guild (server) id
    "newMemberRole": "", // The role id the bot should give out to members that just joined
    "regularMemberRole": "", // the role id the bot should give out to members who've stayed in the server for over a week
    "staffRole": "", // the role id that your staff team uses
    "appealChannel": "", // the channel id where new appeals gets posted
    "logChannel": "" // the channel where moderation actions are logged
}
```

For `keys.json` you first must run the command `npm run generateKey` and will generate your `key` and `iv`.
```json
{
    "key": "", // paste your generated key in here
    "iv": "" // paste your generated iv in here
}
```

### Configuring the database

This bot uses [postgreSQL](https://www.postgresql.org/) to handle data being stored. On the database the bot has the following structure that you must replicate in order to let it function properly.
```
database
└ public
  └ tables
    └ user_data
      └ columns
        └ user_id
        └ userdata
```
You can use pgAdmin to create the structure or you can run the following query inside the database.
```SQL
CREATE TABLE user_data (
    user_id VARCHAR,
    userdata VARCHAR
);
```

Once you've configured everything you're ready to start up the bot. Type in the root directory `npm run test` to start it up.

## Issues

It is possible that there can be a few hiccups and that the bot won't start up. Check first if you have the right versions installed and that there aren't any typos in the config files.
If it still won't start up consider opening an issue on Github. 

## Contributions

This is an open source project and if you found some optimizations inside the code or you wish to improve the documentation feel free to do so by creating a pull request.

## License

Copyright (c) 2023 steveYanneck

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.