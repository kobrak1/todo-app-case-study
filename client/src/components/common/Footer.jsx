const Footer = () => {
    return (
        <footer className="footer bg-slate-500 text-white py-4 fixed bottom-0 w-full">
            <div className="container flex flex-col justify-center items-center mx-auto px-4">
                <p>&copy; {new Date().getFullYear()} Ahmet Burak Karhan. All rights reserved.</p>
                <p className="mt-2">Developed with 🤍 and React</p>
            </div>
        </footer>
    )
}

export default Footer
