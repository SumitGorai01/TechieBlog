import conf from "../conf/conf";
import { Client, Account, Databases, ID ,Query } from "appwrite";

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
        this.databases = new Databases(this.client); // ✅ Initialize Databases SDK
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
            // await this.account.deleteSessions();

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

    async updateVerification({id, secret}) {
        try {
            return await this.account.updateVerification(id, secret);
        } catch (error) {
            throw error;
        }
    }
    
    async createSession({email, password}){
        try{
            const session = await this.account.createEmailPasswordSession(email, password);
            return session;
        }catch(error){
            throw error;
        }
    }

    
    async createVerification(){
        try{
            const link = await this.account.createVerification(`${baseLink}/verify-email`)
            return link;
        }catch(error){
            throw error;
        }
    }
    
    async login({email, password}) {
        try {
            // First create session
            const session = await this.account.createEmailPasswordSession(email, password);
            console.log(session);
            // Get user details
            const user = await this.account.get();
            console.log(user);

            // Check if email is verified
            if (!user.emailVerification) {
                // Delete the session since email isn't verified
                await this.account.deleteSessions();
                throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
            }
            
            return user;
        } catch (error) {
            // Clean up any session if there was an error
            try {
                await this.account.deleteSessions();
            } catch (sessionError) {
                console.log("Error cleaning up session:", sessionError);
            }

            if (error.code === 401) {
                throw new Error('Invalid email or password');
            }
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        
        return null;
    }

    async getUserById(userId){
        try {
            return await this.account.get(userId);
        } catch (error) {
            console.log("Appwrite service :: getUserById :: error", error);
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }

    // New methods for password reset functionality
    async resetPassword(email) {
        try {
            const response = await this.account.createRecovery(
                email,
                `${window.location.origin}/reset-password`  // This URL should match your reset password route
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: resetPassword :: error", error);
            throw error;
        }
    }

    async completeReset(userId, secret, newPassword, confirmPassword) {
        try {
            const response = await this.account.updateRecovery(
                userId,
                secret,
                newPassword,
                confirmPassword
            );
            return response;
        } catch (error) {
            console.log("Appwrite service :: completeReset :: error", error);
            throw error;
        }
    }
    
    async changePassword(oldPassword, newPassword) {
        try {
            return this.account.updatePassword(
                newPassword, 
                oldPassword
            );
        } catch (error) {
            console.log("Appwrite service :: changePassword :: error", error);
            throw error;
            
        }
    }
    async getUserNameById(userId) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId, // Your database ID
                conf.appwriteUserCollectionId, // Your users collection ID
                [Query.equal("userId", userId)] // Corrected syntax
            );
    
            if (response.documents.length > 0) {
                return response.documents[0].name; // Assuming 'name' field exists
            } else {
                return "Unknown User";
            }
        } catch (error) {
            console.error("Error fetching user:", error);
            return "Unknown User";
        }
    }
    
}

const authService = new AuthService();

export default authService;