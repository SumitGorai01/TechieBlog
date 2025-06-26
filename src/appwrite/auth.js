import conf from "../conf/conf";
import { Client, Account, Databases, ID, Query } from "appwrite";

const baseLink = import.meta.env.VITE_BASE_LINK;

export class AuthService {
    client = new Client();
    account;
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async createAccount({ email, password, name }) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        console.log("User Account Created:", userAccount);

        // ⚠️ Step 1: Create a session *BEFORE* sending verification
        const session = await this.account.createEmailPasswordSession(email, password);
        console.log("Temporary Session Created:", session);

        // Step 2: Send verification email (now session is active)
        await this.account.createVerification(`${baseLink}/verify-email`);

        // Step 3: Store user in DB (optional, but safe to do after session)
        await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteUserCollectionId,
            ID.unique(),
            {
                userId: userAccount.$id,
                name: name,
                email,
                createdAt: new Date().toISOString()
            }
        );


        // Step 4: Clean up session
        await this.account.deleteSessions();

        return userAccount;
    } catch (error) {
        console.error("Error during account creation:", error);
        try {
            await this.account.deleteSessions();
        } catch (sessionError) {
            console.log("Error cleaning up session:", sessionError);
        }
        throw error;
    }
}

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            const user = await this.account.get();

            if (!user.emailVerification) {
                await this.account.deleteSessions();
                throw new Error("Please verify your email before logging in.");
            }

            return user;
        } catch (error) {
            try {
                await this.account.deleteSessions();
            } catch (sessionError) {
                console.error("Error cleaning session:", sessionError);
            }

            if (error.code === 401) {
                throw new Error("Invalid email or password");
            }

            throw error;
        }
    }

    async createSession({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async createVerification() {
        try {
            return await this.account.createVerification(`${baseLink}/verify-email`);
        } catch (error) {
            throw error;
        }
    }

    async updateVerification({ id, secret }) {
        try {
            return await this.account.updateVerification(id, secret);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    async getUserById(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("userId", userId)]
            );

            return response.documents[0] || null;
        } catch (error) {
            console.error("Appwrite service :: getUserById :: error", error);
            return null;
        }
    }

    async getUserNameById(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("userId", userId)]
            );

            if (response.documents.length > 0) {
                return response.documents[0].name;
            } else {
                return "Unknown User";
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return "Unknown User";
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }

    async resetPassword(email) {
        try {
            return await this.account.createRecovery(
                email,
                `${window.location.origin}/reset-password`
            );
        } catch (error) {
            console.error("Appwrite service :: resetPassword :: error", error);
            throw error;
        }
    }

    async completeReset(userId, secret, newPassword, confirmPassword) {
        try {
            return await this.account.updateRecovery(
                userId,
                secret,
                newPassword,
                confirmPassword
            );
        } catch (error) {
            console.error("Appwrite service :: completeReset :: error", error);
            throw error;
        }
    }

    async changePassword(oldPassword, newPassword) {
        try {
            return await this.account.updatePassword(newPassword, oldPassword);
        } catch (error) {
            console.error("Appwrite service :: changePassword :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
