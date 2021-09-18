// Imports 
import { 
    Client,
    Message,
    Presence,
    Channel,
    ClientPresenceStatus,
    Intents,
    Constants,
    User,
    GuildMember,
    Role
} from "discord.js";

//#region Class(es)
export class config {
    public constructor (va: IConfig);
    public readonly ping: number;
    private readonly token: string;
    public prefix: string;
    public readonly id: number;
    public readonly tag: string;
    public guildMemberAdd(va: IGuildMember): Message;
    public guildMemberRemove(va: IGuildMember): Message;
    public readonly currentStatus: string;
    public status(status:string, type:ActivityTypes);
    public cmd(cmd: ICommand): Message;
    public MessageDetect(): Message;
    public loopStatus(arrayOfStatus: string[], time: number, type: ActivityTypes): Presence;
    public addIntents(int: Intents): Promise<void>;
    public removeIntents(int: Intents): Promise<void>;
    private readonly _slashName: string;
    private readonly _slashDesc: string;
    private readonly _slashCode: string;
    private readonly _slashGuildId: string | Channel;
    private readonly _slashOptions: ICMDSlashOptions[];
    private readonly _slashEphemeral: boolean;
    public slashCommandDetect(slashCommand:string): Promise<Message>;
    public slashCommand(command: ISlashCMD): void;
    public slashCommandOptionTypes: typeof Constants;
    public getSlashOptionNumber(target: string): number;
    public getSlashOptionString(target: string): string;
    public getSlashOptionBoolean(target: string): boolean;
    public getSlashOptionChannel(target: string): Channel;
    public getSlashOptionMember(target: string): GuildMember;
    public getSlashOptionUser(target: string): User;
    public getSlashOptionInteger(target: string): number;
    public getSlashOptionRole(target: string): Role;
    public getSlashOptionMentionable(target: string): string;
    public toJSON(): JSON;
    public setNormalStatus(status: NormalStatusTypes): Presence<Client>;
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

export type ActivityOptions = 
    | "PLAYING" 
    | "LISTENING"
    | "STREAMING"
    | "WATCHING"
    | "COMPETING";
    
export type NormalStatusTypes =
    | 'idle'
    | 'dnd'
    | 'invisible';

export interface ActivityTypes {
    type: ActivityOptions;
    url?: string;
}

export interface ICommand {
    name: string;
    code: string
    messageReply?: boolean;
}

export interface ISlashCMD {
    name?: string;
    description?: string;
    code?: string;
    ephemeral?: boolean;
    guildId?: Channel;
    options?: ICMDSlashOptions | ICMDSlashOptions[];
}

export interface ICMDSlashOptions {
    name?: string;
    description?: string;
    required?: boolean;
    type?: typeof Constants;
}

//#endregion