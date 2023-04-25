import { PageLayout } from '@/components/PageLayout'
import { setActive } from '@/context/store/features/headernav';
import { useAppDispatch } from '@/context/reduxHooks';
import React, { useEffect } from 'react'
import { Slider } from '@/components/Slider';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActive({ active: "icon" }));
  }, []);

  return (
    <PageLayout title='inicio' desc="Realice sus consultas en la app de seguimiento de inventario">
      <main className='home back-operator'>
        <h1 className='home__title'>Bienvenido a la app de seguimiento de invetario</h1>
        <img className='home__img' src='/assets/operator_logo.svg' alt='logo' height={200} width={'auto'} style={{float: 'left', opacity: 0.5}} />
        <p className='home__p'>Esta app fue desarrollada en 2019 con las tecnologías: <b>PHP</b>, <b>React.js</b> y <b>MySQL</b> como manejador de base de datos, todo ello durante mi formación como analísta y desarrollador de sistemas, desde entones he continuado perfeccionando mis conocimientos, y como parte de ese oficio, quise migrar este proyecto al framework <b>Next.js</b>, Limpiando malos hábitos y aplicando las buenas prácticas que en aquel entonces me hicieron falta, otro aspecto importante es que en esta oportunidad doy uso de <b>Typescript</b>, una tecnología que aprendí los últimos méses y que es perfecta para este tipo de inventibas.</p>
        <p className='home__p'>La migración no es algo tan simple como copiar el código de los componentes de aquel proyecto anterior y pegarlos en el nuevo, en esta transición me tomaré la delicadeza de <b>rediseñar</b> interfaces y <b>refactorizar</b> algunas implementaciones desde la organización misma de las páginas (como es el caso de esta), hasta el consumo del back-end.</p>
        <p className='home__p'>El back-end es sin duda el trabajo más laborioso, este implica migrar toda la lógica de <b>PHP</b> a <b>Node.js</b>, y además implementaré patrones de diseño y técnicas de código limpio con <b>DDD (Domain Driven Design)</b>.</p>
        <p className='home__p'>La funcionalidades generales son las siguientes:</p>
        <div className="home__sector_slider">
        <Slider 
          className='home__slider' 
          width={600} 
          smallWidth={300}
          height={400}
          smallHeight={250}
        >
          <div className="home__slider__slide">
            <h2>Salga de la app</h2>
            <p>Navegue hasta el apartado de cuenta y realice la salida de la app dando click en le botón salir y confirme.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Ingrese a la app</h2>
            <p>Ingrese sus datos de cuenta y acceda a los veneficicos potenciales de la app, ya sea como operador o como administrador.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Consulte sus productos</h2>
            <p>Navegue hasta el apartado de consultar roductos y filtre según le convenga con la herramienta de búsqueda integradad.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Regitre sus productos</h2>
            <p>realice registros de mercancía navegando al apartado de consultas y dando click en el botón emergente que se encuentra en la parte inferior derecha.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Repare los tropiezos</h2>
            <p>Edite la información registrada de los productos navegando hasta el apartado de edición de producto y modifique según convenga.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Remueva un producto</h2>
            <p>Remueva un producto previamente registrado dando click en el botón rojo en el registro de interés en el apartado de consulta de producto.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Consulte su actividad</h2>
            <p>Navegue hasta el apartado de consulta de registros de actividad y acceda a información referente a las acciones realizadas en la app.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Administre la app</h2>
            <p>Ingrese a la app desde la ventana de ingreso de cuenta como administrador tenga acceso a las configuraciones de la app.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Edite los datos de su cuenta</h2>
            <p>Navegue hasta el apartado cuenta y modifique sus datos según le convenga dando click en le botón editar.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Registre operadores</h2>
            <p>Con persmiso de administrador registre más operadores en la app navegando hasta el apartado operadores y dando click en el emergente que se encuentra en la parte inferior derecha.</p>
          </div>
          <div className="home__slider__slide">
            <h2>Remueva un operador</h2>
            <p>Con persmiso de administrador navegue hasta el apartado de operadores y remueva un operador click en el botón rojo en el operador de interés</p>
          </div>
        </Slider>
        </div>
      </main>
    </PageLayout>
  )
}

export default Home