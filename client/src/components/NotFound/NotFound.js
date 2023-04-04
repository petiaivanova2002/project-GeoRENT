import { Link } from "react-router-dom"
export default function NotFound (){
return (
    <>
    <h1>404 ...not found</h1>
    <p>The Page you are looking for doesn't exist or another error occurred. Go to <Link to="/"
    class="btn">Crypto</Link>.
</p>
    </>
    

)
}