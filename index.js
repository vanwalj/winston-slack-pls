/**
 * Created by Jordan on 11/24/2014.
 */

var util = require('util'),
    request = require('request'),
    winston = require('winston');

var Slack = exports.Slack  = function (params) {
    params = params || {};
    if(!params.apiToken || !params.channel){
        throw new Error("options cannot be null");
    }
    else{
        this.channel    = params.channel;
        this.apiToken   = params.apiToken;
        this.username   = params.username || "Winston";
        this.level      = params.level    || "silly";
        this.silent     = params.silent   || false;
        this.raw        = params.raw      || false;
        this.customFormatter = params.customFormatter;
        this.iconEmoji = {
            error: ":finnadie:",
            warn: ":feelsgood:",
            info: ":goberserk:",
            verbose: ":rage4:",
            debug: ":rage2:",
            silly: ":suspect:"
        } || params.iconEmoji;
        this.iconEmojiDefault = params.iconEmojiDefault || ":troll:";
        this.handleExceptions = params.handleExceptions || false;

    }
};

util.inherits(Slack, winston.Transport);

winston.transports.Slack = Slack;

Slack.prototype.log = function (level, msg, meta, callback) {

    var message = this.customFormatter ? this.customFormatter(level, msg, meta) :
    "https://slack.com/api/chat.postMessage" +
        "?token=" + encodeURIComponent(this.apiToken) +
        "&channel=" + encodeURIComponent(this.channel) +
        "&text=" + encodeURIComponent(msg) +
        "&username=" + encodeURIComponent("[" + level + "] " + this.username) +
        "&icon_emoji=" + encodeURIComponent(this.iconEmoji[level] || this.iconEmojiDefault);
    request.get(message);

    callback(null, true);
};