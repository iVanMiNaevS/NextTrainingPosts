import Post from "@/components/post/post";
import { IPost } from "@/types/IPost";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import Image from "next/image";

import styles from "./onePost.module.css";
import { unstable_cache } from "next/cache";

type typeParams = {
	params: { id: string };
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
export const getCashedPosts = unstable_cache(
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
	const { id } = params;
	const data = await getCashedPosts(id);
	try {
		return (
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
					<h4>Title: {data.title}</h4>
					<p>{data.body}</p>
				</div>
			</div>
		);
	} catch (error) {
		console.error(error);
		return <div>Пост не найден</div>;
	}
}
