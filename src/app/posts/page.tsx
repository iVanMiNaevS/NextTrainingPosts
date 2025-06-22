import { IPost } from "@/types/IPost";
import { api } from "@/utils/api";
import { AxiosResponse } from "axios";
import styles from "./posts.module.css";
import Post, { typePostProps } from "@/components/post/post";
import { unstable_cache } from "next/cache";
import { IUser } from "@/types/IUser";
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

export const revalidate = 600;

export const getUsers = async () => {
	const { data } = await api.get<IUser[]>("/users");
	return data;
};

export const getPosts = async () => {
	const { data } = await api.get<IPost[]>("/posts", {
		params: { _limit: 10 },
	});
	return data;
};

export default async function PostsPage() {
	const [posts, users] = await Promise.all([getPosts(), getUsers()]);

	const postsWithUsers = posts.map((post) => ({
		post: { ...post },
		user: users.find((user) => user.id === post.userId),
	}));
	try {
		return (
			<div className={styles.wrapp_posts}>
				<h2 className={styles.title_page}>Posts</h2>
				{postsWithUsers.length === 0 ? (
					<h3>Постов нет</h3>
				) : (
					<div className={styles.posts}>
						{postsWithUsers.map((post) => (
							<Post key={post.post.id} post={post} />
						))}
					</div>
				)}
			</div>
		);
	} catch (error) {
		return <div>Ошибка</div>;
	}
}
