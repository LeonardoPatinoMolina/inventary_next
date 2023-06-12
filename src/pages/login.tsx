import { Footer } from "@/components/Footer";
import Head from "next/head";
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from "react";

interface FormState {
  name: string;
  password: string;
}
const Login: React.FC = () => {

  const router = useRouter();
  const [formData, setformData] = useState<FormState>({
    name: "",
    password: "",
  });

  const [user, setUser] = useState<"operator" | "admin">("operator");

  const handleSwitch = ()=>{
    setUser((prev)=>{    
      if(prev === "operator"){
        return 'admin'
      }else{
        return 'operator'
      }
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    router.push('/')
  };

  return (
    <>
      <Head>
        <title>{"Login"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={
            "Ingrese a la app de seguimiento de inventario para acceder a todos sus beneficios potenciales"
          }
        />
      </Head>
      <main className={`gate back-${user}`}>
        <aside className="gate__aside">
          <h1 className="gate__aside__title">INVENTARY APP</h1>
          <div className="gate__aside__logos">
            <img 
              className={`gate__aside__logos__logo ${user === "operator" ? "logo_disappear_gate" :'logo_appear_gate'}`}
              src="assets/admin_logo.svg" 
              alt="Logo de usuario próximo a ingresar" 
              draggable={false} 
            />
            <img 
              className={`gate__aside__logos__logo ${user === "admin" ? "logo_disappear_gate" :'logo_appear_gate'}`}
              src="assets/operator_logo.svg" 
              alt="Logo de usuario próximo a ingresar" 
              draggable={false} 
            />
          </div>
        </aside>
        <section className="gate__section">
          <form id="form_login" className="login__form" onSubmit={handleSubmit}>
            <ul className="login__form__list">
              <li className="login__form__list__item">
                <h2 className="login__form__title">Ingreso de {user === "operator" ? "Operador" : "Administrador"}</h2>
              </li>
              <li className="login__form__list__item">
                <label className="login__form__list__item__label">
                  {user === "operator" ? "Cedula" : "Nombre"}
                  <input
                    type={user === "operator" ? "number" : "text"}
                    className="login__form__text-field"
                    placeholder={user === "operator" ? "cedula" : "nombre"}
                    defaultValue={formData.name}
                    onChange={(e) =>
                      setformData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                  />
                </label>
              </li>
              <li className="login__form__list__item">
                <label className="login__form__list__item__label">
                  Contraseña
                  <input
                    type="password"
                    className="login__form__text-field"
                    placeholder="contraseña"
                    defaultValue={formData.password}
                    onChange={(e) =>
                      setformData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </label>
              </li>
              <li className="login__form__list__item">
                <div 
                  className="section__switch" 
                  onClick={handleSwitch}
                >
                  <div className={`section__switch__trigger ${user === "admin" && "triggered"}`}>
                    <span className="material-symbols-outlined">
                      manage_accounts
                    </span>
                  </div>
                  <div className={`section__switch__trigger ${user === "operator" && "triggered"}`}>
                    <span className="material-symbols-outlined">
                      person
                    </span>
                  </div>
                </div>
                <button className="login__submit boton" type="submit">
                  Ingresar
                  <span className="material-symbols-outlined">login</span>
                </button>
              </li>
            </ul>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Login;