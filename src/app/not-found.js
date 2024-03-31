import Link from "next/link"

const Notfound = () => {
    return (
        <div>
            <h2>
                Notfound
            </h2>
            <p>
                Sorry, the page you're looking is not available.
            </p>
            <Link href="/">Return Home</Link>
        </div>
    )
}

export default Notfound