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
        return <Twitter className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
      case "linkedin":
        return (
          <Linkedin className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        );
      case "github":
        return <Github className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
      case "facebook":
        return (
          <Facebook className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        );
      case "instagram":
        return (
          <Instagram className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        );
      default:
        return (
          <LinkIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        );
    }
  };

  const getData = async () => {
    try {
      const loggedInUser = await authService.getCurrentUser();
      setLoggedInUserId(loggedInUser?.$id);

      // Fetch custom profile document
      const profileDoc = await authService.getUserById(userId);
      // Fetch core Appwrite user info
      const coreProfile = await authService.getCoreUserById(userId);

      if (!coreProfile && !profileDoc) {
        setError("User profile not found.");
        return;
      }

      // Merge logic: prefer coreProfile.name/email, fallback to profileDoc, use profileDoc.bio/social
      const mergedProfile = {
        name:
          (coreProfile && coreProfile.name) ||
          (profileDoc && profileDoc.name) ||
          "",
        email:
          (coreProfile && coreProfile.email) ||
          (profileDoc && profileDoc.email) ||
          "",
        createdAt:
          (coreProfile && (coreProfile.registration || coreProfile.createdAt)) ||
          (profileDoc && profileDoc.createdAt) ||
          new Date().toISOString(),
        bio: (profileDoc && profileDoc.bio) || "",
        social: (profileDoc && profileDoc.social) || {},
      };

      setProfileUser(mergedProfile);
      setBio(mergedProfile.bio || "");
      setSocial(mergedProfile.social || {});

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
    <div className="p-3">
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-orange-100/50 dark:border-slate-700/50 p-6 hover:shadow-xl hover:shadow-orange-100/20 dark:hover:shadow-slate-900/20 transition-all duration-500">
        <Skeleton variant="rectangular" height={200} className="rounded-xl" />
        <Skeleton variant="text" height={32} className="mt-4" />
        <Skeleton variant="text" height={20} width="60%" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-slate-50 to-orange-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-orange-300/10 dark:from-orange-800/10 dark:to-orange-900/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200/20 to-orange-300/10 dark:from-orange-800/10 dark:to-orange-900/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Profile Card */}
        <div className="mb-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-orange-100/50 dark:border-slate-700/50 rounded-3xl shadow-xl shadow-orange-100/20 dark:shadow-slate-900/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-orange-100/30 dark:hover:shadow-slate-900/30">
            {/* Cover Section */}
            <div className="h-40 sm:h-56 bg-gradient-to-r from-orange-400/90 via-orange-300/80 to-orange-200/70 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            {/* Profile Content */}
            <div className="px-6 sm:px-10 pb-8 -mt-20 sm:-mt-24 relative">
              {loading ? (
                <div className="flex flex-col items-center sm:items-start">
                  <Skeleton
                    variant="circular"
                    width={128}
                    height={128}
                    className="border-6 border-white dark:border-slate-800 shadow-2xl"
                  />
                  <div className="mt-6 space-y-3">
                    <Skeleton variant="text" height={44} width="240px" />
                    <Skeleton variant="text" height={24} width="180px" />
                    <Skeleton variant="text" height={24} width="200px" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center sm:items-start">
                  {/* Avatar */}
                  <Avatar className="border-6 border-white dark:border-slate-800 bg-gradient-to-br from-orange-500 to-orange-600 w-32 h-32 text-5xl font-bold shadow-2xl shadow-orange-500/30">
                    {profileUser.name?.charAt(0).toUpperCase()}
                  </Avatar>

                  {/* Name and Info */}
                  <div className="mt-6 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mb-4 tracking-tight">
                      {profileUser.name}
                    </h1>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-center sm:justify-start text-slate-600 dark:text-slate-400 group">
                        <Mail className="w-4 h-4 mr-3 text-orange-500 group-hover:text-orange-600 transition-colors" />
                        <span className="text-sm font-medium">{profileUser.email}</span>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start text-slate-600 dark:text-slate-400 group">
                        <CalendarDays className="w-4 h-4 mr-3 text-orange-500 group-hover:text-orange-600 transition-colors" />
                        <span className="text-sm font-medium">
                          Joined{" "}
                          {profileUser.createdAt
                            ? format(new Date(profileUser.createdAt), "MMMM yyyy")
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
                      {Object.entries(social).map(
                        ([platform, url]) =>
                          url && (
                            <a
                              key={platform}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-orange-200/50 dark:hover:shadow-slate-900/50 transition-all duration-300 border border-orange-200/50 dark:border-slate-600/50"
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

                  {/* Bio Section */}
                  <div className="w-full max-w-2xl">
                    <div className="bg-gradient-to-r from-orange-50 to-orange-25 dark:from-slate-700/30 dark:to-slate-600/20 rounded-2xl p-6 border border-orange-100/50 dark:border-slate-600/30">
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4 flex items-center">
                        <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                        About
                      </h3>
                      
                      {loggedInUserId === userId ? (
                        <div>
                          {editingBio ? (
                            <div className="space-y-4">
                              <textarea
                                className="w-full p-4 border border-orange-200/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50 dark:focus:ring-orange-500/30 transition-all duration-300"
                                rows={4}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                disabled={bioLoading}
                                placeholder="Tell us about yourself..."
                              />
                              <div className="flex gap-3">
                                <button
                                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300/50 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-orange-500/25"
                                  onClick={handleBioSave}
                                  disabled={bioLoading}
                                >
                                  {bioLoading ? "Saving..." : "Save"}
                                </button>
                                <button
                                  className="px-6 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
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
                            <div className="flex items-start justify-between gap-4">
                              <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
                                {profileUser.bio || (
                                  <span className="italic text-slate-500 dark:text-slate-400">
                                    No bio added yet. Share something about yourself!
                                  </span>
                                )}
                              </p>
                              <button
                                className="px-4 py-2 bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium hover:bg-orange-500/20 transition-all duration-300 flex-shrink-0"
                                onClick={() => setEditingBio(true)}
                              >
                                Edit
                              </button>
                            </div>
                          )}

                          {/* Add Social Button */}
                          <div className="mt-6 pt-6 border-t border-orange-100/50 dark:border-slate-600/30">
                            <button
                              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-orange-700 hover:shadow-xl hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-300/50 transition-all duration-300 transform hover:scale-105"
                              onClick={() => setShowAddSocial(true)}
                              type="button"
                            >
                              <Plus className="w-5 h-5" />
                              <span>Add Social Link</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {profileUser.bio || (
                            <span className="italic text-slate-500 dark:text-slate-400">
                              No bio added yet.
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-4"></div>
            Posts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : blogs.length > 0 ? (
              blogs.map((post) => (
                <div key={post.$id} className="group">
                  <div className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-orange-100/50 dark:border-slate-700/50 overflow-hidden shadow-lg shadow-orange-100/10 dark:shadow-slate-900/20 hover:shadow-2xl hover:shadow-orange-100/20 dark:hover:shadow-slate-900/30 transition-all duration-500 transform hover:scale-[1.02] ${
                    post.status === "inactive" ? "opacity-60 grayscale" : ""
                  }`}>
                    <PostCard {...post} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-orange-100/50 dark:border-slate-700/50 p-12 text-center shadow-lg shadow-orange-100/10 dark:shadow-slate-900/20">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-800/50 dark:to-orange-700/50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-2">
                    No posts yet
                  </p>
                  <p className="text-slate-500 dark:text-slate-500 text-sm">
                    Published posts will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Social Modal */}
        {showAddSocial && loggedInUserId === userId && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl border border-orange-100/50 dark:border-slate-700/50 rounded-2xl shadow-2xl shadow-orange-500/20 dark:shadow-slate-900/40 p-8 w-full max-w-md">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full mr-3"></div>
                Add Social Link
              </h3>
              <div className="space-y-6">
                <input
                  type="text"
                  className="w-full p-4 border border-orange-200/50 dark:border-slate-600/50 rounded-xl bg-white/50 dark:bg-slate-700/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-300/50 dark:focus:ring-orange-500/30 transition-all duration-300"
                  placeholder="Paste your social profile URL..."
                  value={newSocialUrl}
                  onChange={(e) => setNewSocialUrl(e.target.value)}
                  disabled={socialLoading}
                />
                <div className="flex gap-3 justify-end">
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300/50 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-orange-500/25"
                    onClick={handleAddSocial}
                    disabled={socialLoading || !newSocialUrl.trim()}
                  >
                    {socialLoading ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="px-6 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;