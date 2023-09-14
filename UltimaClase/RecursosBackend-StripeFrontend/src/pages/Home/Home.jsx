import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

const Home = () => {
    return (<>
        <div className={styles.container}>
            <h1 className={styles.title}>APRENDIENDO PASARELAS DE PAGO</h1>
        </div>
        <div className={styles.container}>
            <p className={styles.title}>Selecciona la pasarela de Stripe para continuar</p>
            <br/>
            <div className={styles.buttonsContainer}>
                <Link to="/stripe"><button className={styles.genericButton}>Stripe</button></Link>
            </div>
        </div>
    </>)
}

export default Home;