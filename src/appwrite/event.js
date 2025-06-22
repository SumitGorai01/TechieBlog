import { Client, ID, Databases } from 'appwrite';
import conf from '../conf/conf';

export class EventService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
    }

    async createEvent({ title, date, time, location, eligibility, description, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEventCollectionId, // Should be defined in conf.js
                ID.unique(),
                {
                    title,
                    date,
                    time,
                    location,
                    eligibility,
                    description,
                    userId
                }
            );
        } catch (error) {
            console.error("EventService :: createEvent :: error", error);
            return false;
        }
    }
}

const eventService = new EventService();
export default eventService;
