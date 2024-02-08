import { useNavigate } from 'react-router-dom'
//@ts-check
/**
 * @param {{error?: string}} props
 * @returns {React.ReactNode}
 */
function ErrorNotification(props) {
    const navigate = useNavigate()
    if (!props.error) {
        return null
    }

    console.log(props.error)

    const returnHome = () => {
        navigate('/')
    }

    return (
    <div>
        <img src="https://www.jesusfreakhideout.com/movies/pics/tomandjerrymousetroubledvd1.jpg"/>
        <div className="notification is-danger">{props.error}</div>
        <div>
            <button onClick={returnHome}>
              Return home
            </button>
        </div>
    </div>
    )
}

export default ErrorNotification
