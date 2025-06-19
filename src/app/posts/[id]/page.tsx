import Post from "@/components/post/post";
import {IPost} from "@/types/IPost";
import {api} from "@/utils/api";
import {AxiosResponse} from "axios";
import Image from "next/image";

import styles from "./onePost.module.css";

type typeParams = {
	params: Promise<{id: string}>;
};

export const dynamic = "force-dynamic";

export default async function Page({params}: typeParams) {
	const {id} = await params;
	try {
		const {data}: AxiosResponse<IPost> = await api.get<IPost>(`/posts/${id}`);
		return (
			<div className={styles.post}>
				<Image
					src={"https://i.pinimg.com/736x/b7/64/29/b764292e20a9f55e844d538ddf419e35.jpg"}
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
