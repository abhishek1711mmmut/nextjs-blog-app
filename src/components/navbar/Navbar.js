import Link from "next/link"
import Links from "./links/Links"
import styles from "./navbar.module.css"
import { auth } from "@/lib/auth"

const Navbar = async () => {
    const session = await auth();
    // console.log("in navbar",session)
    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logo}>logo</Link>
            <Links session={session} />
        </div>
    )
}

export default Navbar