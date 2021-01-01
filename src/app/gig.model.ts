import { Venues } from './venue.model';


export interface Gigs {

    id?: string;
    gigDescription?: string;
    gigVenue?: Venues;
    gigArtistName?: string;
    gigDate?: Date;
    gigTotalPrice?: number;
    gigRunningCostPerPunter?: number;
    gigPunterCount?: number;
    giguserID?: string;
    gigID?: string;
    gigGenre?: string;
}
