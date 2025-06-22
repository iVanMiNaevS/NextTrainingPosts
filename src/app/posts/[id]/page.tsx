import Post from "@/components/post/post";
import { IPost } from "@/types/IPost";
import { api } from "@/utils/api";
import Image from "next/image";

import styles from "./onePost.module.css";
import { IUser } from "@/types/IUser";

type typeParams = {
	params: Promise<{ id: string }>;
};
export const revalidate = 600;

export default async function Page({ params }: typeParams) {
	const { id } = await params;
	const { data } = await api.get<IPost>(`/posts/${id}`); // axios
	const user = await api.get<IUser>(`/users/${data.userId}`); // axios
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
					<p>{user.data.name}</p>
					<p>({user.data.email})</p>
				</div>
			</>
		);
	} catch (error) {
		console.error(error);
		return <div>Пост не найден</div>;
	}
}
