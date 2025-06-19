import {IPost} from "@/types/IPost";
import styles from "./post.module.css";
import Image from "next/image";
import Link from "next/link";
import {FC} from "react";

type typePostProps = {
	post: IPost;
};

export default function Post({post}: typePostProps) {
	return (
		<div className={styles.post}>
			<Image
				src={"https://i.pinimg.com/736x/b7/64/29/b764292e20a9f55e844d538ddf419e35.jpg"}
				alt="post image"
				width={400}
				height={200}
			/>
			<div className={styles.post__textBox}>
				<h4>{post.title}</h4>
				<p>{post.body}</p>
				<button>
					<Link href={`/posts/${post.id}`}>Подробнее</Link>
				</button>
			</div>
		</div>
	);
}
