import { 
    Client,
    Message,
    Presence,
    Channel,
    ClientPresenceStatus,
    Intents
} from "discord.js";

//#region Class(es)
export class config {
    public constructor (va: IConfig);
    public readonly ping: number;
    private token: string;
    public prefix: string;
    public readonly username: string;
    public guildMemberAdd(va: IGuildMember): Message;
    public guildMemberRemove(va: IGuildMember): Message;
    public currentStatus(status: string, type:ActivityTypes): Presence;
    public readonly status: string | Presence;
    public cmd(cmd: ICommand): Message;
    public MessageDetect(): Message;
    public loopStatus(arrayOfStatus: string[], time: number, type: ActivityTypes): Presence;
    public addIntents(int: Intents): Promise<void>;
    public removeIntents(int: Intents): Promise<void>;
}

// Interfaces
export interface IConfig {
    token: string;
    prefix: string;
}

export interface IGuildMember {
    channel: Channel;
    message: Message;
}

export type ActivityTypes = 
    | "PLAYING" 
    | "LISTENING" 
    | "STREAMING" 
    | "WATCHING" 
    | "COMPETING";

export interface ICommand {
    name: string;
    code: string;
}

//#endregion