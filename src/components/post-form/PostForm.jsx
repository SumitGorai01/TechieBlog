
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Loading from '../loaders/Loading'

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
        <div className="max-w-4xl mx-auto">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl shadow-orange-500/20">
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-10 text-center">
                    {post ? "Edit Your Post" : "Add Your Post Here"}
                </h1>
                <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
                    <div className="w-full space-y-6">
                        <Input
                            label="Title"
                            placeholder="Enter your post title"
                            {...register("title", { required: true })}
                        />
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                            <RTE
                                label=""
                                name="content"
                                control={control}
                                defaultValue={getValues("content")}
                            />
                        </div>
                    </div>
                    <div className="w-full space-y-6">
                        <div className="space-y-2 group">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
                            <Input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                            />
                        </div>
                        {post && (
                            <div className="w-full mb-6 overflow-hidden rounded-lg border border-gray-300 dark:border-gray-600 group hover:shadow-xl transition-all">
                                <img
                                    src={appwriteService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                            <Select
                                options={["active", "inactive"]}
                                label="Status"
                                {...register("status", { required: true })}
                            />
                        </div>
                        <Button
                            type="submit"
                            bgColor={post ? "bg-green-500 dark:bg-green-600" : "bg-orange-500 dark:bg-orange-600"}
                            className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg hover:opacity-90 hover:shadow-lg active:scale-98 transition-all"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <ClipLoader color="#fff" size={20} />
                                    <span>Processing...</span>
                                </div>
                            ) : post ? "Update Post" : "Create Post"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
