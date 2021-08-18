import { Message } from "../../node_modules/discord.js/src/structures/Message";

export interface Config {
    constructor(va: any): void;
    guildMemberAdd(va: any): Message;
    guildMemberRemove(va: any): Message;
    status(status: String, type: Object): void;
    cmd(cmd: any): Message;
    MessageDetect(): Message;
    loopStatus(object:Object, time:number, type: Object): void
}