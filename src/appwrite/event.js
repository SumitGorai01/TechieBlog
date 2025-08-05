import { Client, ID, Databases } from 'appwrite';
import conf from '../conf/conf'; // ✅ Ensure conf contains correct collection IDs

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
                conf.appwriteEventCollectionId,
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

    async registerForEvent({ fullName, email, phoneNumber, workshop, comments }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEventRegistrationCollectionId,
                ID.unique(),
                {
                    fullName,
                    email,
                    phoneNumber,
                    workshop,
                    comments
                }
            );
        } catch (error) {
            console.error("EventService :: registerForEvent :: error", error);
            return false;
        }
    }
}

const eventService = new EventService();
export default eventService;
