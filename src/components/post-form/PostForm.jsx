import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from "../../appwrite/config"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Loading from '../loaders/Loading'

export default function PostForm({ post }) {
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        setLoading(true);
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            // TODO : improve the logic , see if block in above
            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`, { replace: true });
                }
            }
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-")
        }
        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title),
                    { shouldValidate: true });
            }
        })

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <div>
            <div className="max-w-4xl mx-auto">
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl shadow-orange-500/20">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-10 text-center">
                        Add Your Post Here
                    </h1>
                    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-6">
                        <div className="w-full space-y-6">
                            <Input
                                label="Title"
                                placeholder="Enter your post title"
                                className="mb-4 p-4 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300 dark:hover:border-orange-500 backdrop-blur-sm bg-white/70 dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100"
                                {...register("title", { required: true })}
                            />
                            <Input
                                label="Slug"
                                placeholder="Enter post slug"
                                className="mb-4 p-4 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all hover:border-orange-300 dark:hover:border-orange-500 backdrop-blur-sm bg-white/70 dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100"
                                {...register("slug", { required: true })}
                                onInput={(e) => {
                                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                                }}
                            />
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                                <RTE
                                    label=""
                                    name="content"
                                    control={control}
                                    defaultValue={getValues("content")}
                                    className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-all backdrop-blur-sm bg-white/70 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </div>
                        <div className="w-full space-y-6">
                            <div className="space-y-2 group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Featured Image</label>
                                <Input
                                    type="file"
                                    className="mb-4 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 dark:file:bg-orange-900 dark:file:text-orange-200 file:transition-colors file:cursor-pointer group-hover:border-orange-300 dark:group-hover:border-orange-500 backdrop-blur-sm bg-white/70 dark:bg-gray-700 shadow-sm"
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
                                    className="mb-4 p-4 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 dark:hover:border-orange-500 transition-all backdrop-blur-sm bg-white/70 dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100"
                                    {...register("status", { required: true })}
                                />
                            </div>
                            <Button
                                type="submit"
                                bgColor={post ? "bg-green-500 dark:bg-green-600" : "bg-orange-500 dark:bg-orange-600"}
                                className="w-full py-4 px-6 rounded-lg text-white font-semibold text-lg hover:opacity-90 hover:shadow-lg active:scale-98 transition-all backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
        </div>

    )
}


