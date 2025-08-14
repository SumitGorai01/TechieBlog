import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import appwriteService from "../../appwrite/config";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setLoading(true);

        try {
            if (!userData?.$id) {
                console.error("User ID missing: Cannot create post");
                setLoading(false);
                return;
            }

            if (post) {
                const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    await appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    data.featuredImage = file.$id;

                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`, { replace: true });
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-900 dark:via-orange-950/20 dark:to-gray-800">
                <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/30 dark:bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/20 dark:bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-orange-300/20 dark:bg-orange-500/10 rounded-full blur-2xl animate-bounce delay-2000" style={{ animationDuration: '6s' }}></div>
            </div>
            
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/30 rounded-3xl shadow-2xl shadow-orange-500/10 dark:shadow-orange-400/5 overflow-hidden">
                    <div className="relative p-8 pb-6">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent opacity-60"></div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-orange-600 via-amber-500 to-orange-700 bg-clip-text text-transparent text-center mb-2 tracking-tight">
                            {post ? "Edit Your Post" : "Create New Post"}
                        </h1>
                        <p className="text-center text-gray-600 dark:text-gray-400 font-medium">
                            {post ? "Update your content with style" : "Share your thoughts with the world"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(submit)} className="p-8 pt-4 space-y-8">
                        <div className="group">
                            <div className="relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/30 rounded-2xl border border-white/30 dark:border-gray-600/20 transition-all duration-300 group-focus-within:bg-white/60 dark:group-focus-within:bg-gray-800/40 group-focus-within:shadow-lg group-focus-within:shadow-orange-200/30">
                                <Input
                                    label="Post Title"
                                    placeholder="Enter your captivating title..."
                                    className="bg-transparent border-none focus:ring-2 focus:ring-orange-400/50 rounded-2xl text-lg"
                                    {...register("title", { required: true })}
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                                Content
                            </label>
                            <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/30 rounded-2xl border border-white/30 dark:border-gray-600/20 overflow-hidden transition-all duration-300 group-focus-within:bg-white/60 dark:group-focus-within:bg-gray-800/40 group-focus-within:shadow-lg group-focus-within:shadow-orange-200/30">
                                <RTE
                                    label=""
                                    name="content"
                                    control={control}
                                    defaultValue={getValues("content")}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                                    Featured Image
                                </label>
                                <div className="group relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/30 rounded-2xl border-2 border-dashed border-orange-300/50 dark:border-orange-400/30 transition-all duration-300 hover:border-orange-400/70 hover:bg-white/60 dark:hover:bg-gray-800/40 p-6">
                                    <Input
                                        type="file"
                                        accept="image/png, image/jpg, image/jpeg, image/gif"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        {...register("image", { required: !post })}
                                    />
                                    <div className="text-center pointer-events-none">
                                        <div className="mx-auto w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center mb-3">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 font-medium">Click to upload or drag & drop</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">PNG, JPG, JPEG, GIF up to 10MB</p>
                                    </div>
                                </div>
                                
                                {post && (
                                    <div className="group relative backdrop-blur-sm bg-white/50 dark:bg-gray-800/30 rounded-2xl overflow-hidden border border-white/30 dark:border-gray-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-orange-200/20">
                                        <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/50 text-white text-xs rounded-full backdrop-blur-sm">
                                            Current Image
                                        </div>
                                        <img
                                            src={appwriteService.getFileView(post.featuredImage)}
                                            alt={post.title}
                                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                                    Post Status
                                </label>
                                <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-800/30 rounded-2xl border border-white/30 dark:border-gray-600/20 transition-all duration-300 focus-within:bg-white/60 dark:focus-within:bg-gray-800/40 focus-within:shadow-lg focus-within:shadow-orange-200/30">
                                    <Select
                                        options={["active", "inactive"]}
                                        label=""
                                        className="bg-transparent border-none focus:ring-2 focus:ring-orange-400/50 rounded-2xl"
                                        {...register("status", { required: true })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className={`
                                    group relative w-full py-5 px-8 rounded-2xl font-bold text-lg text-white overflow-hidden
                                    backdrop-blur-xl border border-white/20 transition-all duration-300
                                    ${post 
                                        ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-600/90 hover:to-emerald-600/90 shadow-lg shadow-green-500/25' 
                                        : 'bg-gradient-to-r from-orange-500/90 to-amber-500/90 hover:from-orange-600/90 hover:to-amber-600/90 shadow-lg shadow-orange-500/25'
                                    }
                                    hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                                    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                                `}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative flex items-center justify-center gap-3">
                                    {loading ? (
                                        <>
                                            <ClipLoader color="#fff" size={24} />
                                            <span className="animate-pulse">Processing your post...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={post ? "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" : "M12 4v16m8-8H4"} />
                                            </svg>
                                            <span>{post ? "Update Post" : "Publish Post"}</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}