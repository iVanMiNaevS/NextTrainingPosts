import { IPost } from "@/types/IPost";
import styles from "./post.module.css";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IUser } from "@/types/IUser";

export type typePostProps = {
	post: { post: IPost; user: IUser | undefined };
};

export default function Post({ post }: typePostProps) {
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
				<h4>{post.post.title}</h4>
				<h4>
					{post.user?.name} - ({post.user?.email})
				</h4>
				<p>{post.post.body}</p>
				<button>
					<Link href={`/posts/${post.post.id}`}>Подробнее</Link>
				</button>
			</div>
		</div>
	);
}
