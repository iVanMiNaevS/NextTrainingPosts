import { IPost } from "@/types/IPost";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import styles from "./posts.module.css";
import Post from "@/components/post/post";
import { unstable_cache } from "next/cache";
// export const getStaticProps = async () => {
// 	const { data }: AxiosResponse<IPost[], any> = await api.get<IPost[]>(
// 		"/posts",
// 		{
// 			params: { _limit: 10 },
// 		}
// 	);
// 	return {
// 		props: { posts: data },
// 		revalidate: 3600,
// 	};
// };
export const getCashedPosts = unstable_cache(
	async () => {
		const { data }: AxiosResponse<IPost[], any> = await api.get<IPost[]>(
			"/posts",
			{
				params: { _limit: 10 },
			}
		);
		return data;
	},
	["postsCashe"],
	{ revalidate: 600 }
);

export default async function PostsPage() {
	const posts = await getCashedPosts();
	try {
		return (
			<div className={styles.wrapp_posts}>
				<h2 className={styles.title_page}>Posts</h2>
				{posts.length === 0 ? (
					<h3>Постов нет</h3>
				) : (
					<div className={styles.posts}>
						{posts.map((post: IPost) => (
							<Post key={post.id} post={post} />
						))}
					</div>
				)}
			</div>
		);
	} catch (error) {
		return <div>Ошибка</div>;
	}
}
