import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import authService from "../appwrite/auth";
import { Avatar, Skeleton } from "@mui/material";
import PostCard from "../components/PostCard";
import { CalendarDays, Mail } from "lucide-react";
import { format } from "date-fns";
import {
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
  Github,
  Link as LinkIcon,
  Plus,
} from "lucide-react";

function Profile() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [bioLoading, setBioLoading] = useState(false);
  const [social, setSocial] = useState({});
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [socialLoading, setSocialLoading] = useState(false);

  // Detecting platform from URL
  const getPlatform = (url) => {
    if (/x\.com/i.test(url)) return "twitter";
    if (/linkedin\.com/i.test(url)) return "linkedin";
    if (/github\.com/i.test(url)) return "github";
    if (/facebook\.com/i.test(url)) return "facebook";
    if (/instagram\.com/i.test(url)) return "instagram";
    return "other";
  };

  // Icon for platform
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
      case "linkedin":
        return (
          <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
      case "github":
        return <Github className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
      case "facebook":
        return (
          <Facebook className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
      case "instagram":
        return (
          <Instagram className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
      default:
        return (
          <LinkIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        );
    }
  };

  const getData = async () => {
    try {
      const loggedInUser = await authService.getCurrentUser();
      setLoggedInUserId(loggedInUser?.$id);

      const profile = await authService.getUserById(userId);
      if (!profile) {
        setError("User profile not found.");
        return;
      }

      setProfileUser({
        name: profile.name,
        email: profile.email,
        createdAt: profile.createdAt || new Date().toISOString(),
        bio: profile.bio || "",
        social: profile.social || {},
      });
      setBio(profile.bio || "");
      setSocial(profile.social || {});

      if (loggedInUser?.$id === userId) {
        getBlogs(userId);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  const getBlogs = async (uid) => {
    try {
      const response = await appwriteService.getPostsByUser(uid);
      if (response) {
        setBlogs(response.documents);
        setError("");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch posts.");
    }
  };

  // Add handler for saving bio
  const handleBioSave = async () => {
    setBioLoading(true);
    try {
      await authService.updateUserBio(userId, bio);
      setProfileUser((prev) => ({ ...prev, bio }));
      setEditingBio(false);
    } catch (err) {
      setError(err.message || "Failed to update bio.");
    } finally {
      setBioLoading(false);
    }
  };

  // Add handler for saving social links
  const handleSocialSave = async () => {
    setSocialLoading(true);
    try {
      await authService.updateUserSocial(userId, social);
      setProfileUser((prev) => ({ ...prev, social }));
      setEditingSocial(false);
    } catch (err) {
      setError(err.message || "Failed to update social links.");
    } finally {
      setSocialLoading(false);
    }
  };

  // Add handler for saving new social link
  const handleAddSocial = async () => {
    setSocialLoading(true);
    try {
      const url = newSocialUrl.trim();
      if (!url) return;
      const platform = getPlatform(url);
      const updatedSocial = { ...social, [platform]: url };
      await authService.updateUserSocial(userId, updatedSocial);
      setSocial(updatedSocial);
      setProfileUser((prev) => ({ ...prev, social: updatedSocial }));
      setShowAddSocial(false);
      setNewSocialUrl("");
    } catch (err) {
      setError(err.message || "Failed to add social link.");
    } finally {
      setSocialLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [userId]);

  const PostSkeleton = () => (
    <div className="p-2 w-full md:w-1/2 lg:w-1/3">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-4">
        <Skeleton variant="rectangular" height={200} className="rounded-lg" />
        <Skeleton variant="text" height={32} className="mt-2" />
        <Skeleton variant="text" height={20} width="60%" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-900 dark:to-black transition-colors duration-300 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-colors duration-300">
          <div className="h-32 sm:h-48 bg-gradient-to-r from-orange-400 to-rose-400"></div>

          {/* Profile Info */}
          <div className="px-6 sm:px-8 md:px-10 pb-6 -mt-16 sm:-mt-20">
            {loading ? (
              <div className="flex flex-col items-center sm:items-start">
                <Skeleton
                  variant="circular"
                  width={120}
                  height={120}
                  className="border-4"
                />
                <div className="mt-4">
                  <Skeleton variant="text" height={40} width="200px" />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center sm:items-start">
                <Avatar className="border-4 border-white dark:border-gray-800 bg-orange-600 w-32 h-32 text-5xl shadow-lg">
                  {profileUser.name?.charAt(0).toUpperCase()}
                </Avatar>
                <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {profileUser.name}
                </h1>
                <div className="mt-3 space-y-2 w-full">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">{profileUser.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      Joined{" "}
                      {profileUser.createdAt
                        ? format(new Date(profileUser.createdAt), "MMMM yyyy")
                        : "N/A"}
                    </span>
                  </div>
                  {/* Social Icons Row */}
                  <div className="flex items-center gap-3 mt-2">
                    {Object.entries(social).map(
                      ([platform, url]) =>
                        url && (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                            title={
                              platform.charAt(0).toUpperCase() +
                              platform.slice(1)
                            }
                          >
                            {getPlatformIcon(platform)}
                          </a>
                        )
                    )}
                  </div>
                </div>
                {/* Add Social Modal/Input */}
                {showAddSocial && loggedInUserId === userId && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-4 w-full max-w-xs">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Add Social Link
                      </h3>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white"
                        placeholder="Paste your social profile URL"
                        value={newSocialUrl}
                        onChange={(e) => setNewSocialUrl(e.target.value)}
                        disabled={socialLoading}
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                          onClick={handleAddSocial}
                          disabled={socialLoading || !newSocialUrl.trim()}
                        >
                          {socialLoading ? "Saving..." : "Save"}
                        </button>
                        <button
                          className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                          onClick={() => {
                            setShowAddSocial(false);
                            setNewSocialUrl("");
                          }}
                          type="button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Bio Section */}
                <div className="mt-4 w-full max-w-xl">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                    Bio
                  </h3>
                  {loggedInUserId === userId ? (
                    <div>
                      {editingBio ? (
                        <div className="flex flex-col gap-2">
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg dark:bg-gray-900 dark:text-white"
                            rows={3}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            disabled={bioLoading}
                          />
                          <div className="flex gap-2">
                            <button
                              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                              onClick={handleBioSave}
                              disabled={bioLoading}
                            >
                              {bioLoading ? "Saving..." : "Save"}
                            </button>
                            <button
                              className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                              onClick={() => {
                                setEditingBio(false);
                                setBio(profileUser.bio || "");
                              }}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-700 dark:text-gray-300">
                            {profileUser.bio || "No bio added yet."}
                          </span>
                          <button
                            className="ml-2 px-2 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600"
                            onClick={() => setEditingBio(true)}
                          >
                            Edit
                          </button>
                        </div>
                      )}
                      {/* Add Social Button below bio */}
                      <div className="flex justify-start mt-6">
                        <button
                          className="flex items-center gap-2 px-5 py-2 bg-gradient-to-tr from-orange-400 to-rose-400 text-white font-semibold rounded-full shadow-md hover:from-orange-500 hover:to-rose-500 transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-orange-300"
                          onClick={() => setShowAddSocial(true)}
                          type="button"
                        >
                          <Plus className="w-5 h-5" />
                          <span>Add Social</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-700 dark:text-gray-300">
                      {profileUser.bio || "No bio added yet."}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-2">
          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : blogs.length > 0 ? (
            blogs.map((post) => (
              <div key={post.$id} className={`p-2 w-full md:w-1/2 lg:w-1/4`}>
                <div
                  className={`h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col ${
                    post.status === "inactive" ? "opacity-50" : ""
                  }`}
                >
                  <PostCard {...post} />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full bg-white dark:bg-gray-800 rounded-xl p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Your published posts will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;