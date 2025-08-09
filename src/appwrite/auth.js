/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
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
            // ✅ Step 1: Create User in Authentication
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("User Account Created:", userAccount);

            // ✅ Step 2: Store User Data in the Database
            const userData = await this.databases.createDocument(
                conf.appwriteDatabaseId,  // Replace with your actual Database ID
                conf.appwriteUserCollectionId, // Replace with your actual Collection ID
                ID.unique(), // Use unique ID for the document
                {
                    userId: userAccount.$id, // Store the User ID
                    name: name,
                }
            );
            console.log("User Data Stored in Database:", userData);

            // ✅ Step 3: Send Verification Email
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Temporary Session Created:", session);

            await this.account.createVerification(`${baseLink}/verify-email`);

            // ✅ Step 4: Clean Up Session
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
    async createAccountwitbio({ email, password, name, bio = "", social = {} }) {
        try {
            // ✅ Step 1: Create User in Authentication
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("User Account Created:", userAccount);

            // ✅ Step 2: Store User Data in the Database
            const userData = await this.databases.createDocument(
                conf.appwriteDatabaseId,  // Replace with your actual Database ID
                conf.appwriteUserCollectionId, // Replace with your actual Collection ID
                ID.unique(), // Use unique ID for the document
                {
                    userId: userAccount.$id, // Store the User ID
                    name: name,
                    bio: bio,
                    social: social,
                }
            );
            console.log("User Data Stored in Database:", userData);

            // ✅ Step 3: Send Verification Email
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log("Temporary Session Created:", session);

            await this.account.createVerification(`${baseLink}/verify-email`);

            // ✅ Step 4: Clean Up Session
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
            const redirectUrl = `${window.location.origin}/forgot-password`;
            
            return await this.account.createRecovery(
                email,
                `${redirectUrl}`
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

    // User Bio
    async updateUserBio(userId, bio) {
        try {
            // Find the user's document
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("userId", userId)]
            );
            const userDoc = response.documents[0];
            if (!userDoc) throw new Error("User not found");
            // Update the bio field
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                userDoc.$id,
                { bio }
            );
        } catch (error) {
            console.error("Error updating user bio:", error);
            throw error;
        }
    }

    // User Socials
    async updateUserSocial(userId, social) {
        try {
            // Find the user's document
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("userId", userId)]
            );
            const userDoc = response.documents[0];
            if (!userDoc) throw new Error("User not found");
            // Update the social field
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                userDoc.$id,
                { social }
            );
        } catch (error) {
            console.error("Error updating user social:", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
