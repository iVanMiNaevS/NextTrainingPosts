import {IPost} from "@/types/IPost";
import {api} from "@/utils/api";
import {AxiosResponse} from "axios";
import styles from "./posts.module.css";
import Post from "@/components/post/post";
export default async function PostsPage() {
	try {
		const {data}: AxiosResponse<IPost[], any> = await api.get<IPost[]>("/posts", {
			params: {_limit: 10},
		});

		return (
			<div className={styles.wrapp_posts}>
				<h2 className={styles.title_page}>Posts</h2>
				{data.length === 0 ? (
					<h3>Постов нет</h3>
				) : (
					<div className={styles.posts}>
						{data.map((post: IPost) => (
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
