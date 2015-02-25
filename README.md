winston-slack-pls
=================

Usage:

var WinstonSlack = require('winston-slack-pls').Slack

winston.add(WinstonSlack, {
        apiToken: "slackApiToken",
        channel: "channelId",
        name: "slack"
    });