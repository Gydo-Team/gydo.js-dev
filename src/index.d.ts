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
    Role,
    MessageEmbed
} from "discord.js";

//#region Class(es)
export class config {
    public constructor (va: IConfig);
    public readonly ping: number;
    private readonly token: string;
    public readonly prefix: string;
    public readonly id: number;
    public readonly tag: string;
    public guildMemberAdd(va: IGuildMember): Message;
    public guildMemberRemove(va: IGuildMember): Message;
    public cmd(cmd: ICommand): Message;
    public MessageDetect(): Message;
    public toJSON(): JSON;
}

export class Activity {
    public constructor(client: Client);
    public setActivity(status: string, options: ActivityTypes): Presence;
    public setUserStatus(status: NormalStatusTypes): Presence;
    public loopStatus(arrayOfStatus: string[], time: number, type: ActivityTypes): Presence[];
    public readonly normalStatus: string;
    public readonly currentStatus: string;
}

export class SlashCommand {
    public constructor(client: Client);
    public optionTypes: typeof Constants;
    public detect(slashCommand: string): Promise<Message>;
    public create(command: ISlashCMD): void;
    private readonly _slashName: string;
    private readonly _slashDesc: string;
    private readonly _slashCode: string;
    private readonly _slashGuildId: string | Channel;
    private readonly _slashOptions: ICMDSlashOptions[];
    private readonly _slashEphemeral: boolean;
}

export class Embed {
    public constructor(cmd: string, options: IEmbed);
    private readonly __cmd: string;
    private readonly __embedTitle: string;
    private readonly __embedDesc: string;
    private readonly __embedFooter: string;
    private readonly __embedFields: string[];
    private readonly __embedColor: string;
    private readonly __embedTimestamp: boolean;
    private readonly __embedAuthor: string;
    private readonly __embedAuthorURL: string;
    public JSONtoEmbed(rawjson: JSON): MessageEmbed;
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

export interface IEmbed {
    title?: string;
    author?: string;
    authorURL?: string;
    description?: string;
    footer?: string;
    fields?: IEmbedFields[] | object[];
    color?: ColorResolvable;
    timestamp?: boolean;
}

// HexColorString from discord.js' Embeds
export type HexColorString = `#${string}`;

// ColorResolvable from discord.js' Embeds
export type ColorResolvable =
  | 'DEFAULT'
  | 'WHITE'
  | 'AQUA'
  | 'GREEN'
  | 'BLUE'
  | 'YELLOW'
  | 'PURPLE'
  | 'LUMINOUS_VIVID_PINK'
  | 'FUCHSIA'
  | 'GOLD'
  | 'ORANGE'
  | 'RED'
  | 'GREY'
  | 'DARKER_GREY'
  | 'NAVY'
  | 'DARK_AQUA'
  | 'DARK_GREEN'
  | 'DARK_BLUE'
  | 'DARK_PURPLE'
  | 'DARK_VIVID_PINK'
  | 'DARK_GOLD'
  | 'DARK_ORANGE'
  | 'DARK_RED'
  | 'DARK_GREY'
  | 'LIGHT_GREY'
  | 'DARK_NAVY'
  | 'BLURPLE'
  | 'GREYPLE'
  | 'DARK_BUT_NOT_BLACK'
  | 'NOT_QUITE_BLACK'
  | 'RANDOM'
  | readonly [number, number, number]
  | number
  | HexColorString;

export interface IEmbedFields {
    name?: string;
    value?: string;
    inline?: boolean;
}

//#endregion