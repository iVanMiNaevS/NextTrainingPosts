import Post from "@/components/post/post";
import { IPost } from "@/types/IPost";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import Image from "next/image";

import styles from "./onePost.module.css";
import { unstable_cache } from "next/cache";
import { IUser } from "@/types/IUser";

type typeParams = {
	params: Promise<{ id: string }>;
};

export const generateStaticParams = async () => {
	const { data }: AxiosResponse<IPost[], any> = await api.get<IPost[]>(
		"/posts",
		{
			params: { _limit: 100 },
		}
	);
	return data.map((post) => {
		return { id: post.id.toString() };
	});
};

export const getCachedUser = unstable_cache(
	async (userId) => {
		const { data } = await api.get<IUser>(`/users/${userId}`);
		return data;
	},
	["users-cache"],
	{ revalidate: 600 }
);

export const getCashedPost = unstable_cache(
	async (postId) => {
		const { data }: AxiosResponse<IPost> = await api.get<IPost>(
			`/posts/${postId}`
		);
		return data;
	},
	["postCashe"],
	{ revalidate: 600 }
);
export default async function Page({ params }: typeParams) {
	const { id } = await params;
	const data = await getCashedPost(id);
	const user = await getCachedUser(data.userId);
	try {
		return (
			<>
				<div className={styles.post}>
					<Image
						src={
							"https://i.pinimg.com/736x/b7/64/29/b764292e20a9f55e844d538ddf419e35.jpg"
						}
						alt="post image"
						width={400}
						height={200}
					/>
					<div className={styles.post__textBox}>
						<h4>
							<span>Title:</span> {data.title}
						</h4>
						<p>{data.body}</p>
					</div>
				</div>
				<div className={styles.post + " " + styles.postUserInfo}>
					<p>{user.name}</p>
					<p>({user.email})</p>
				</div>
			</>
		);
	} catch (error) {
		console.error(error);
		return <div>Пост не найден</div>;
	}
}
